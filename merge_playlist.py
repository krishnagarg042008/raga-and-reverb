#!/usr/bin/env python3
"""
RĀGA & REVERB — PLAYLIST MERGE UTILITY
=======================================
A restrained, robust CLI tool to merge an incoming playlist into an existing
track collection according to strict editorial rules:

1. Never delete, overwrite, or reorder a song already in the collection.
2. Never add a song that's already present (checked via stable ID or normalized title + primary artist).
3. Add every valid, distinct song from the incoming playlist in incoming order.

Features:
- Idempotent and additive-only
- O(1) set-based duplicate lookup
- Automated timestamped backup before writing
- Dry-run preview mode (--dry-run)
- Detailed editorial reporting of additions, duplicate matches, and invalid entries
"""

import argparse
import json
import os
import re
import shutil
import sys
from datetime import datetime
from typing import Any, Dict, List, Optional, Set, Tuple


def normalize_string(text: str) -> str:
    """Normalize string by lowercasing, stripping punctuation, and collapsing whitespace."""
    if not text:
        return ""
    # Lowercase
    s = text.lower().strip()
    # Strip punctuation except alphanumeric characters and single spaces
    s = re.sub(r'[^\w\s]', '', s)
    # Collapse multiple whitespaces
    s = re.sub(r'\s+', ' ', s).strip()
    return s


def extract_primary_artist(artist_str: str) -> str:
    """
    Extract the primary artist from an artist string, ignoring featured artists
    (e.g., 'Atif Aslam feat. Shirley Setia' -> 'Atif Aslam').
    """
    if not artist_str:
        return ""
    # Split on common featured artist indicators
    split_pattern = r'(?i)\s+(?:feat\.?|ft\.?|featuring|with|x|vs\.?|and|&|,)\s+.*$'
    primary = re.split(split_pattern, artist_str.strip())[0]
    return primary.strip()


def extract_stable_id(track: Dict[str, Any]) -> Optional[str]:
    """Extract a stable identifier if present (id, isrc, source_id, file_hash, etc.)."""
    id_fields = ['id', 'isrc', 'source_id', 'track_id', 'file_hash', 'audioSrc', 'src']
    for field in id_fields:
        val = track.get(field)
        if val and isinstance(val, str) and val.strip():
            return val.strip()
    return None


def get_normalized_key(track: Dict[str, Any]) -> str:
    """
    Build normalized lookup key: normalized_title + '__by__' + normalized_primary_artist.
    Preserves version details in title (e.g. remix, live, acoustic, remaster).
    """
    title = str(track.get('title') or track.get('name') or '').strip()
    artist = str(track.get('artist') or track.get('performer') or '').strip()
    primary_artist = extract_primary_artist(artist)

    norm_title = normalize_string(title)
    norm_artist = normalize_string(primary_artist)
    return f"{norm_title}__by__{norm_artist}"


def validate_track(track: Any) -> Tuple[bool, str]:
    """
    Validate track object. Must be a dict with non-empty title, artist, and audio reference.
    Returns (is_valid, reason_if_invalid).
    """
    if not isinstance(track, dict):
        return False, "Entry is not a valid JSON object/dictionary"

    title = track.get('title') or track.get('name')
    if not title or not str(title).strip():
        return False, "Missing or empty 'title'"

    artist = track.get('artist') or track.get('performer')
    if not artist or not str(artist).strip():
        return False, "Missing or empty 'artist'"

    audio_ref = (
        track.get('id')
        or track.get('audioSrc')
        or track.get('src')
        or track.get('url')
        or track.get('audio_url')
    )
    if not audio_ref or not str(audio_ref).strip():
        return False, "Missing or empty audio source / track ID ('id' or 'audioSrc')"

    return True, ""


def format_track_summary(track: Dict[str, Any]) -> str:
    """Format track for display in console reports."""
    title = track.get('title') or track.get('name') or '[Untitled]'
    artist = track.get('artist') or track.get('performer') or '[Unknown Artist]'
    duration = track.get('duration') or ''
    movie = track.get('movie') or track.get('album') or ''
    
    extra = []
    if movie:
        extra.append(f'from "{movie}"')
    if duration:
        extra.append(duration)
    
    extra_str = f" ({', '.join(extra)})" if extra else ""
    return f'"{title}" by {artist}{extra_str}'


def load_tracks_file(filepath: str) -> Tuple[List[Dict[str, Any]], str]:
    """
    Load tracks from either a .json file or a .js file (e.g. tracks.js with const TRACKS_DATA = [...]).
    Returns (tracks_list, file_format_type).
    """
    if not os.path.exists(filepath):
        return [], "json"

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read().strip()

    if not content:
        return [], "json"

    # Check if JavaScript export file (e.g. const TRACKS_DATA = [...];)
    js_match = re.search(r'(?:const|let|var)\s+\w+\s*=\s*(\[[\s\S]*?\])\s*;?', content)
    if js_match:
        try:
            data = json.loads(js_match.group(1))
            if isinstance(data, list):
                return data, "js"
        except json.JSONDecodeError:
            pass

    # Standard JSON parse
    try:
        data = json.loads(content)
        if isinstance(data, list):
            return data, "json"
        elif isinstance(data, dict) and 'tracks' in data and isinstance(data['tracks'], list):
            return data['tracks'], "json"
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse track data from {filepath}: {e}")

    raise ValueError(f"File {filepath} does not contain a JSON array or recognizable JS track export.")


def save_tracks_file(filepath: str, tracks: List[Dict[str, Any]], file_format: str, backup: bool = True) -> Optional[str]:
    """
    Save merged tracks to file. If backup is True, creates a backup file before writing.
    Returns the backup filepath if created.
    """
    backup_path = None
    if backup and os.path.exists(filepath):
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_path = f"{filepath}.backup.{timestamp}"
        shutil.copy2(filepath, backup_path)

    if file_format == "js":
        js_content = (
            "// 100+ Track Curated Archive Dataset\n"
            f"const TRACKS_DATA = {json.dumps(tracks, indent=2, ensure_ascii=False)};\n\n"
            "if (typeof module !== 'undefined') {\n"
            "  module.exports = { TRACKS_DATA };\n"
            "}\n"
        )
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(js_content)
    else:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(tracks, f, indent=2, ensure_ascii=False)
            f.write("\n")

    return backup_path


def merge_playlists(
    existing_tracks: List[Dict[str, Any]],
    incoming_tracks: List[Dict[str, Any]]
) -> Dict[str, Any]:
    """
    Perform pure playlist merge following all three hard rules:
    1. Never delete, overwrite, or reorder a song already in the collection.
    2. Never add a song that's already present (or duplicate within incoming).
    3. Add every valid, distinct song from the incoming playlist.
    """
    # 1. Build lookup sets/dicts from existing collection in O(N)
    stable_ids: Dict[str, Dict[str, Any]] = {}
    normalized_keys: Dict[str, Dict[str, Any]] = {}

    for track in existing_tracks:
        is_valid, _ = validate_track(track)
        if is_valid:
            sid = extract_stable_id(track)
            if sid:
                stable_ids[sid] = track
            norm_key = get_normalized_key(track)
            if norm_key:
                normalized_keys[norm_key] = track

    # 2. Process incoming tracks in O(M)
    merged_list = list(existing_tracks)  # Preserves existing exact items in original order
    added: List[Dict[str, Any]] = []
    skipped_duplicates: List[Dict[str, Any]] = []
    skipped_invalid: List[Dict[str, Any]] = []

    for incoming in incoming_tracks:
        # Check validity
        is_valid, reason = validate_track(incoming)
        if not is_valid:
            skipped_invalid.append({
                'track': incoming,
                'reason': reason
            })
            continue

        # Check Stable ID duplicate
        sid = extract_stable_id(incoming)
        if sid and sid in stable_ids:
            skipped_duplicates.append({
                'incoming': incoming,
                'matched_with': stable_ids[sid],
                'match_type': f'Stable ID match ("{sid}")'
            })
            continue

        # Check Normalized Title + Primary Artist duplicate
        norm_key = get_normalized_key(incoming)
        if norm_key in normalized_keys:
            skipped_duplicates.append({
                'incoming': incoming,
                'matched_with': normalized_keys[norm_key],
                'match_type': f'Normalized title + artist match ("{norm_key}")'
            })
            continue

        # Valid & New: Append and register in lookups to avoid duplicate within incoming playlist
        if sid:
            stable_ids[sid] = incoming
        if norm_key:
            normalized_keys[norm_key] = incoming

        merged_list.append(incoming)
        added.append(incoming)

    return {
        'merged_tracks': merged_list,
        'added': added,
        'skipped_duplicates': skipped_duplicates,
        'skipped_invalid': skipped_invalid,
        'existing_count': len(existing_tracks),
        'incoming_count': len(incoming_tracks),
        'final_count': len(merged_list)
    }


def print_merge_report(result: Dict[str, Any], dry_run: bool, backup_path: Optional[str] = None):
    """Print an editorial, structured report of the merge run."""
    print("\n" + "=" * 70)
    print("  RĀGA & REVERB — PLAYLIST MERGE REPORT")
    print("=" * 70)

    if dry_run:
        print("  MODE: [DRY RUN] — Previewing operations only. No files modified.")
    else:
        print("  MODE: [LIVE RUN] — Changes committed to archive.")
        if backup_path:
            print(f"  BACKUP CREATED: {backup_path}")

    print("-" * 70)
    print(f"  Existing Collection : {result['existing_count']:>4} tracks")
    print(f"  Incoming Playlist   : {result['incoming_count']:>4} tracks")
    print(f"  ----------------------------------------")
    print(f"  [+] Songs Added     : {len(result['added']):>4} tracks")
    print(f"  [~] Duplicates      : {len(result['skipped_duplicates']):>4} tracks (skipped)")
    print(f"  [!] Invalid Entries : {len(result['skipped_invalid']):>4} tracks (skipped)")
    print(f"  Total After Merge   : {result['final_count']:>4} tracks")
    print("=" * 70)

    # Detailed Added
    if result['added']:
        print(f"\n[+] ADDED SONGS ({len(result['added'])}):")
        for i, track in enumerate(result['added'], 1):
            print(f"  {i:>2}. {format_track_summary(track)}")

    # Detailed Duplicates
    if result['skipped_duplicates']:
        print(f"\n[~] SKIPPED DUPLICATES ({len(result['skipped_duplicates'])}):")
        for i, item in enumerate(result['skipped_duplicates'], 1):
            inc = item['incoming']
            matched = item['matched_with']
            mtype = item['match_type']
            print(f"  {i:>2}. {format_track_summary(inc)}")
            print(f"      -> Matched existing: {format_track_summary(matched)}")
            print(f"      -> Rule: {mtype}")

    # Detailed Invalid
    if result['skipped_invalid']:
        print(f"\n[!] SKIPPED INVALID ENTRIES ({len(result['skipped_invalid'])}):")
        for i, item in enumerate(result['skipped_invalid'], 1):
            trk = item['track']
            reason = item['reason']
            desc = format_track_summary(trk) if isinstance(trk, dict) else str(trk)
            print(f"  {i:>2}. {desc}")
            print(f"      -> Reason: {reason}")

    print("\n" + "=" * 70 + "\n")


def main():
    parser = argparse.ArgumentParser(
        description="Merge incoming playlist into existing track collection with strict non-destructive duplicate avoidance."
    )
    parser.add_argument(
        '--existing', '-e',
        default='tracks.js',
        help="Path to existing collection file (tracks.js or songs.json). Default: tracks.js"
    )
    parser.add_argument(
        '--incoming', '-i',
        required=True,
        help="Path to incoming playlist JSON or JS file to merge."
    )
    parser.add_argument(
        '--output', '-o',
        help="Optional output file path. Defaults to overwriting --existing (with automated backup)."
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help="Preview the merge report without writing any files."
    )
    parser.add_argument(
        '--no-backup',
        action='store_true',
        help="Disable automatic backup creation before writing."
    )

    args = parser.parse_args()

    # Load existing tracks
    try:
        existing_tracks, existing_format = load_tracks_file(args.existing)
    except Exception as e:
        print(f"Error reading existing file '{args.existing}': {e}", file=sys.stderr)
        sys.exit(1)

    # Load incoming tracks
    try:
        incoming_tracks, _ = load_tracks_file(args.incoming)
    except Exception as e:
        print(f"Error reading incoming file '{args.incoming}': {e}", file=sys.stderr)
        sys.exit(1)

    # Perform Merge
    result = merge_playlists(existing_tracks, incoming_tracks)

    # Target output
    target_out = args.output if args.output else args.existing
    out_format = "js" if target_out.endswith(".js") else "json"

    backup_path = None
    if not args.dry_run:
        should_backup = not args.no_backup
        backup_path = save_tracks_file(
            target_out,
            result['merged_tracks'],
            file_format=out_format,
            backup=should_backup
        )

    # Print Report
    print_merge_report(result, dry_run=args.dry_run, backup_path=backup_path)


if __name__ == '__main__':
    main()
