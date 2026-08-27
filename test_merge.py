#!/usr/bin/env python3
"""
Comprehensive Verification Test Suite for merge_playlist.py
Verifies all 5 mandatory scenarios from the specification:
1. Empty existing collection + full playlist → everything added.
2. Playlist fully contained in the existing collection → nothing added, all reported as duplicates.
3. Partial overlap → only new songs added; diff the existing entries before/after to confirm they didn't change.
4. Same playlist run twice → second run adds zero.
5. Playlist with one malformed entry → that entry is skipped and reported, the rest still imports.
Plus version distinctions (e.g., Acoustic/Remix treated as distinct) and intra-playlist duplicates.
"""

import copy
import json
import os
import subprocess
import tempfile
import unittest

from merge_playlist import (
    extract_primary_artist,
    extract_stable_id,
    get_normalized_key,
    merge_playlists,
    normalize_string,
    validate_track,
)


class TestPlaylistMerge(unittest.TestCase):

    def setUp(self):
        # Sample realistic track fixtures
        self.track_a = {
            "id": "trk_001",
            "title": "Tum Se Hi",
            "artist": "Pritam & Mohit Chauhan",
            "movie": "Jab We Met",
            "duration": "5:22",
            "thumbnail": "https://example.com/tumsehi.jpg",
            "mood": "Romantic Soundscapes"
        }
        self.track_b = {
            "id": "trk_002",
            "title": "Pee Loon",
            "artist": "Pritam feat. Mohit Chauhan",
            "movie": "Once Upon A Time In Mumbaai",
            "duration": "4:46",
            "thumbnail": "https://example.com/peeloon.jpg",
            "mood": "Romantic Soundscapes"
        }
        self.track_c = {
            "id": "trk_003",
            "title": "Iktara",
            "artist": "Amit Trivedi & Kavita Seth",
            "movie": "Wake Up Sid",
            "duration": "4:14",
            "thumbnail": "https://example.com/iktara.jpg",
            "mood": "Acoustic & Soul"
        }
        self.track_d_new = {
            "id": "trk_004",
            "title": "Kesariya",
            "artist": "Pritam & Arijit Singh",
            "movie": "Brahmastra",
            "duration": "4:28",
            "thumbnail": "https://example.com/kesariya.jpg",
            "mood": "Romantic Soundscapes"
        }
        self.track_e_new = {
            "id": "trk_005",
            "title": "Channa Mereya",
            "artist": "Pritam & Arijit Singh",
            "movie": "Ae Dil Hai Mushkil",
            "duration": "4:49",
            "thumbnail": "https://example.com/channa.jpg",
            "mood": "Late Night Melancholy"
        }

    def test_scenario_1_empty_existing_plus_full_playlist(self):
        """Scenario 1: Empty existing collection + full playlist → everything added."""
        existing = []
        incoming = [self.track_a, self.track_b, self.track_c]

        result = merge_playlists(existing, incoming)

        self.assertEqual(len(result['added']), 3)
        self.assertEqual(len(result['skipped_duplicates']), 0)
        self.assertEqual(len(result['skipped_invalid']), 0)
        self.assertEqual(len(result['merged_tracks']), 3)
        self.assertEqual(result['merged_tracks'], incoming)

    def test_scenario_2_playlist_fully_contained_in_existing(self):
        """Scenario 2: Playlist fully contained in the existing collection → nothing added, all reported as duplicates."""
        existing = [self.track_a, self.track_b, self.track_c]
        incoming = [
            copy.deepcopy(self.track_a),
            # Same title and artist but slightly different spacing/casing
            {
                "id": "diff_id_same_song",
                "title": "pee loon",
                "artist": "Pritam",
                "duration": "4:46"
            },
            copy.deepcopy(self.track_c)
        ]

        result = merge_playlists(existing, incoming)

        self.assertEqual(len(result['added']), 0)
        self.assertEqual(len(result['skipped_duplicates']), 3)
        self.assertEqual(len(result['merged_tracks']), 3)
        # Existing collection completely unchanged
        self.assertEqual(result['merged_tracks'], existing)

    def test_scenario_3_partial_overlap_and_byte_for_byte_preservation(self):
        """
        Scenario 3: Partial overlap → only new songs added.
        Diff the existing entries before/after to confirm they didn't change.
        """
        existing = [self.track_a, self.track_b]
        existing_snapshot = json.dumps(existing, sort_keys=True)

        incoming = [
            copy.deepcopy(self.track_a),  # duplicate
            self.track_d_new,             # new
            self.track_e_new              # new
        ]

        result = merge_playlists(existing, incoming)

        self.assertEqual(len(result['added']), 2)
        self.assertEqual(len(result['skipped_duplicates']), 1)
        self.assertEqual(len(result['merged_tracks']), 4)

        # Confirm the first 2 tracks in merged_tracks are exactly identical to existing
        merged_existing_slice = result['merged_tracks'][:2]
        self.assertEqual(json.dumps(merged_existing_slice, sort_keys=True), existing_snapshot)
        self.assertEqual(result['merged_tracks'][0], self.track_a)
        self.assertEqual(result['merged_tracks'][1], self.track_b)
        self.assertEqual(result['merged_tracks'][2], self.track_d_new)
        self.assertEqual(result['merged_tracks'][3], self.track_e_new)

    def test_scenario_4_idempotent_double_run(self):
        """Scenario 4: Same playlist run twice → second run adds zero."""
        existing = [self.track_a]
        incoming = [self.track_b, self.track_d_new]

        # Run 1
        run1 = merge_playlists(existing, incoming)
        self.assertEqual(len(run1['added']), 2)
        self.assertEqual(len(run1['merged_tracks']), 3)

        # Run 2 with the merged collection from run 1
        run2 = merge_playlists(run1['merged_tracks'], incoming)
        self.assertEqual(len(run2['added']), 0)
        self.assertEqual(len(run2['skipped_duplicates']), 2)
        self.assertEqual(len(run2['merged_tracks']), 3)
        self.assertEqual(run1['merged_tracks'], run2['merged_tracks'])

    def test_scenario_5_malformed_entries_skipped_and_reported(self):
        """
        Scenario 5: Playlist with malformed entries → malformed entries skipped & reported,
        the rest still imports cleanly.
        """
        existing = [self.track_a]
        incoming = [
            {"title": "", "artist": "Singer", "id": "id1"},          # missing title
            {"title": "Valid Song", "artist": "", "id": "id2"},       # missing artist
            {"title": "Valid Song 2", "artist": "Singer", "id": ""},  # missing audio id/src
            self.track_d_new,                                          # valid new song
            "not a dictionary",                                        # totally invalid
            self.track_e_new                                           # valid new song
        ]

        result = merge_playlists(existing, incoming)

        self.assertEqual(len(result['added']), 2)
        self.assertEqual(len(result['skipped_invalid']), 4)
        self.assertEqual(len(result['merged_tracks']), 3)
        self.assertIn(self.track_d_new, result['merged_tracks'])
        self.assertIn(self.track_e_new, result['merged_tracks'])

    def test_version_distinctions_preserved(self):
        """Treat distinct versions (Acoustic, Remix, Live) as separate songs."""
        existing = [
            {"id": "t1", "title": "Kabira", "artist": "Pritam", "duration": "3:44"},
        ]
        incoming = [
            {"id": "t2", "title": "Kabira (Encore)", "artist": "Pritam", "duration": "4:28"},
            {"id": "t3", "title": "Kabira - Acoustic Live", "artist": "Pritam", "duration": "4:10"},
        ]

        result = merge_playlists(existing, incoming)
        self.assertEqual(len(result['added']), 2)
        self.assertEqual(len(result['skipped_duplicates']), 0)
        self.assertEqual(len(result['merged_tracks']), 3)

    def test_incoming_playlist_self_deduplication(self):
        """Incoming playlist cannot introduce duplicates against itself."""
        existing = []
        incoming = [
            self.track_a,
            copy.deepcopy(self.track_a),  # duplicate of item #1
            self.track_b,
            {
                "id": "different_id",
                "title": "Tum Se Hi",
                "artist": "Pritam feat. Mohit Chauhan",
                "duration": "5:22"
            }  # normalized duplicate of item #1
        ]

        result = merge_playlists(existing, incoming)
        self.assertEqual(len(result['added']), 2)
        self.assertEqual(len(result['skipped_duplicates']), 2)
        self.assertEqual(len(result['merged_tracks']), 2)

    def test_cli_dry_run_and_backup(self):
        """Test the CLI execution with --dry-run and file persistence with backup."""
        with tempfile.TemporaryDirectory() as tmpdir:
            existing_file = os.path.join(tmpdir, "existing.json")
            incoming_file = os.path.join(tmpdir, "incoming.json")

            with open(existing_file, "w") as f:
                json.dump([self.track_a], f)

            with open(incoming_file, "w") as f:
                json.dump([self.track_a, self.track_d_new], f)

            # Test 1: Dry run
            cmd_dry = [
                "python3", "merge_playlist.py",
                "-e", existing_file,
                "-i", incoming_file,
                "--dry-run"
            ]
            res_dry = subprocess.run(cmd_dry, capture_output=True, text=True)
            self.assertEqual(res_dry.returncode, 0)
            self.assertIn("DRY RUN", res_dry.stdout)
            self.assertIn("Songs Added     :    1", res_dry.stdout)

            # File should not have changed after dry-run
            with open(existing_file, "r") as f:
                data = json.load(f)
            self.assertEqual(len(data), 1)

            # Test 2: Live run
            cmd_live = [
                "python3", "merge_playlist.py",
                "-e", existing_file,
                "-i", incoming_file
            ]
            res_live = subprocess.run(cmd_live, capture_output=True, text=True)
            self.assertEqual(res_live.returncode, 0)
            self.assertIn("LIVE RUN", res_live.stdout)

            # File should now contain 2 tracks
            with open(existing_file, "r") as f:
                data = json.load(f)
            self.assertEqual(len(data), 2)

            # A backup file should exist in directory
            files = os.listdir(tmpdir)
            backups = [f for f in files if "backup" in f]
            self.assertTrue(len(backups) >= 1)


if __name__ == "__main__":
    unittest.main(verbosity=2)
