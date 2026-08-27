# Rāga & Reverb — Curated 174-Track Master Archive & Sound Portfolio

An independent artist/producer music archive and portfolio website built with a restrained, high-craft editorial design sensibility (analog paper linen & vinyl studio themes, *Instrument Serif* + *Space Grotesk* typography, 60fps audio spectrum visualizer, turntable animations, and custom audio player deck).

---

## 🌟 Features

- **174 Curated Master Recordings**: Extracted and merged from YouTube playlists with clean artist, film/album, and mood metadata.
- **Custom Master Audio Deck**: Complete custom controls (Play/Pause, Scrub bar, Timecodes, Volume, Shuffle, Repeat, and Queue drawer) powered by background YouTube IFrame API without default iframe frames or CORS limitations.
- **Tactile Visuals**: Animated spinning vinyl record with tonearm reactivity and 60fps HTML5 Canvas frequency spectrum analyzer.
- **Interactive 174-Track Catalog**: Live search, mood filter pills (*Romantic Soundscapes, Acoustic & Soul, Late Night Melancholy, Nostalgia & Classics, Sufi & Devotional, Uplifting*), List vs. Album sleeve Grid view switcher, and curatorial liner notes drawer.
- **Dual Themes**: Analog Paper Linen (Light) and Vinyl Studio (Dark) with smooth CSS variable transitions.
- **Playlist Merge Utility**: Built-in non-destructive, deduplicating CLI merge tool (`merge_playlist.py`) with automated unit tests (`test_merge.py`).

---

## 🚀 Live Deployment via GitHub Pages

This repository is 100% static (semantic HTML5, hand-crafted CSS, vanilla JavaScript).

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `raga-and-reverb`).
2. Push this repository:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
   git branch -M main
   git push -u origin main
   ```
3. Go to **Settings** → **Pages** in your GitHub repository:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: `main` / `root`
   - Click **Save**.
4. Your website will be live in ~30 seconds at:
   `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/`

---

## 🛠️ Local Development & Testing

To run locally:
```bash
python3 -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

To run playlist merge tests:
```bash
python3 test_merge.py
```
