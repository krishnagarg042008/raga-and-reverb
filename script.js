/**
 * RĀGA & REVERB — ARCHIVAL MUSIC SUITE & CONTROLLER
 * Full custom player state machine, YouTube IFrame API integration,
 * dynamic audio spectrum visualizer, catalog filtering, and editorial UI.
 */

(function () {
  'use strict';

  // --- State Architecture ---
  const state = {
    tracks: (typeof TRACKS_DATA !== 'undefined') ? TRACKS_DATA : [],
    filteredTracks: [],
    currentIndex: 0,
    isPlaying: false,
    isShuffle: false,
    repeatMode: 'off', // 'off' | 'all' | 'one'
    volume: 80,
    isMuted: false,
    queue: [],
    favorites: new Set(JSON.parse(localStorage.getItem('rr_favorites') || '[]')),
    currentMood: 'all',
    searchQuery: '',
    sortBy: 'default',
    viewMode: 'list', // 'list' | 'grid'
    theme: localStorage.getItem('rr_theme') || 'paper',
    ytPlayerReady: false,
    currentTime: 0,
    duration: 0,
    progressInterval: null,
  };

  // --- DOM Elements ---
  const el = {
    // Theme & Clock
    html: document.documentElement,
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    themeToggleIcon: document.getElementById('themeToggleIcon'),
    themeToggleText: document.getElementById('themeToggleText'),
    liveClockDisplay: document.getElementById('liveClockDisplay'),
    
    // Hero & Turntable
    heroPlayAllBtn: document.getElementById('heroPlayAllBtn'),
    heroShuffleBtn: document.getElementById('heroShuffleBtn'),
    heroVinylDisc: document.getElementById('heroVinylDisc'),
    heroVinylCover: document.getElementById('heroVinylCover'),
    heroTonearm: document.getElementById('heroTonearm'),
    deckTrackTitle: document.getElementById('deckTrackTitle'),
    deckTrackArtist: document.getElementById('deckTrackArtist'),
    deckQuickToggleBtn: document.getElementById('deckQuickToggleBtn'),
    deckQuickToggleIcon: document.getElementById('deckQuickToggleIcon'),
    deckRpmBadge: document.getElementById('deckRpmBadge'),
    oscilloscopeCanvas: document.getElementById('oscilloscopeCanvas'),
    visualizerStatus: document.getElementById('visualizerStatus'),

    // Catalog & Filters
    catalogSearchInput: document.getElementById('catalogSearchInput'),
    searchClearBtn: document.getElementById('searchClearBtn'),
    catalogSortSelect: document.getElementById('catalogSortSelect'),
    viewListBtn: document.getElementById('viewListBtn'),
    viewGridBtn: document.getElementById('viewGridBtn'),
    moodFiltersContainer: document.getElementById('moodFiltersContainer'),
    catalogTableView: document.getElementById('catalogTableView'),
    catalogGridView: document.getElementById('catalogGridView'),
    tracksTableBody: document.getElementById('tracksTableBody'),
    catalogEmptyState: document.getElementById('catalogEmptyState'),
    resetFiltersBtn: document.getElementById('resetFiltersBtn'),

    // Master Player Deck
    masterAudioDeck: document.getElementById('masterAudioDeck'),
    playerScrubBar: document.getElementById('playerScrubBar'),
    playerBufferProgress: document.getElementById('playerBufferProgress'),
    playerPlayedProgress: document.getElementById('playerPlayedProgress'),
    playerTrackThumb: document.getElementById('playerTrackThumb'),
    playerTrackTitle: document.getElementById('playerTrackTitle'),
    playerTrackArtist: document.getElementById('playerTrackArtist'),
    playerPlayPauseBtn: document.getElementById('playerPlayPauseBtn'),
    playerPlayPauseIcon: document.getElementById('playerPlayPauseIcon'),
    playerPrevBtn: document.getElementById('playerPrevBtn'),
    playerNextBtn: document.getElementById('playerNextBtn'),
    playerShuffleBtn: document.getElementById('playerShuffleBtn'),
    playerRepeatBtn: document.getElementById('playerRepeatBtn'),
    playerRepeatIcon: document.getElementById('playerRepeatIcon'),
    playerTimeElapsed: document.getElementById('playerTimeElapsed'),
    playerTimeDuration: document.getElementById('playerTimeDuration'),
    playerMuteBtn: document.getElementById('playerMuteBtn'),
    playerVolumeIcon: document.getElementById('playerVolumeIcon'),
    playerVolumeSlider: document.getElementById('playerVolumeSlider'),
    playerQueueBtn: document.getElementById('playerQueueBtn'),
    queueBadgeCount: document.getElementById('queueBadgeCount'),
    playerLinerBtn: document.getElementById('playerLinerBtn'),

    // Drawers & Modals
    queueDrawer: document.getElementById('queueDrawer'),
    queueItemsList: document.getElementById('queueItemsList'),
    queueCountText: document.getElementById('queueCountText'),
    clearQueueBtn: document.getElementById('clearQueueBtn'),
    closeQueueBtn: document.getElementById('closeQueueBtn'),
    
    linerDrawerOverlay: document.getElementById('linerDrawerOverlay'),
    linerCloseBtn: document.getElementById('linerCloseBtn'),
    linerCoverImg: document.getElementById('linerCoverImg'),
    linerTrackNumber: document.getElementById('linerTrackNumber'),
    linerModalTitle: document.getElementById('linerModalTitle'),
    linerArtistName: document.getElementById('linerArtistName'),
    linerNotesText: document.getElementById('linerNotesText'),
    linerYtLink: document.getElementById('linerYtLink'),
    linerPlayNowBtn: document.getElementById('linerPlayNowBtn'),

    shortcutsBtn: document.getElementById('shortcutsBtn'),
    shortcutsModalOverlay: document.getElementById('shortcutsModalOverlay'),
    closeShortcutsBtn: document.getElementById('closeShortcutsBtn'),

    // Contact Form
    contactForm: document.getElementById('contactForm'),
    contactFeedback: document.getElementById('contactFeedback'),
    copyEmailBtn: document.getElementById('copyEmailBtn'),
    studioEmailText: document.getElementById('studioEmailText'),
  };

  let ytPlayer = null;
  let activeLinerTrack = null;

  // --- Initialize App ---
  function init() {
    initTheme();
    initLiveClock();
    initMoodCounts();
    applyFiltersAndRender();
    initYouTubeAPI();
    initVisualizerCanvas();
    bindEvents();
    loadTrack(0, false); // Load track 0 without autoplay
  }

  // --- Theme Management ---
  function initTheme() {
    applyTheme(state.theme);
  }

  function applyTheme(theme) {
    state.theme = theme;
    el.html.setAttribute('data-theme', theme);
    localStorage.setItem('rr_theme', theme);
    if (theme === 'vinyl') {
      el.themeToggleIcon.textContent = '☀';
      el.themeToggleText.textContent = 'PAPER';
    } else {
      el.themeToggleIcon.textContent = '☾';
      el.themeToggleText.textContent = 'VINYL';
    }
  }

  function toggleTheme() {
    const nextTheme = state.theme === 'paper' ? 'vinyl' : 'paper';
    applyTheme(nextTheme);
  }

  // --- Live Studio Clock ---
  function initLiveClock() {
    function updateClock() {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      if (el.liveClockDisplay) {
        el.liveClockDisplay.textContent = `${hours}:${minutes}:${seconds} UTC`;
      }
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  // --- Mood Counts ---
  function initMoodCounts() {
    const counts = {
      'Romantic Soundscapes': 0,
      'Acoustic & Soul': 0,
      'Nostalgia & Classics': 0,
      'Late Night Melancholy': 0,
      'Sufi & Devotional': 0,
      'Uplifting & Warmth': 0,
    };
    state.tracks.forEach(track => {
      if (counts[track.mood] !== undefined) {
        counts[track.mood]++;
      }
    });

    const setBadge = (id, count) => {
      const elem = document.getElementById(id);
      if (elem) elem.textContent = `(${count})`;
    };

    setBadge('count-all', state.tracks.length);
    setBadge('count-romantic', counts['Romantic Soundscapes']);
    setBadge('count-acoustic', counts['Acoustic & Soul']);
    setBadge('count-nostalgia', counts['Nostalgia & Classics']);
    setBadge('count-melancholy', counts['Late Night Melancholy']);
    setBadge('count-sufi', counts['Sufi & Devotional']);
    setBadge('count-uplifting', counts['Uplifting & Warmth']);

    // Dynamic header and hero badges
    const headerBadge = document.getElementById('headerCatalogBadge');
    if (headerBadge) headerBadge.textContent = `CATALOG № ${state.tracks.length}`;
    const navLink = document.getElementById('navCatalogLink');
    if (navLink) navLink.textContent = `Catalog (${state.tracks.length})`;
    const heroCount = document.getElementById('heroStatCatalogCount');
    if (heroCount) heroCount.textContent = `${state.tracks.length} WORKS`;
    const rangeTag = document.getElementById('catalogRangeTag');
    if (rangeTag) rangeTag.textContent = `№ 001 – ${String(state.tracks.length).padStart(3, '0')}`;
  }

  // --- YouTube IFrame API Setup ---
  function initYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function () {
      ytPlayer = new YT.Player('ytPlayer', {
        height: '200',
        width: '200',
        videoId: state.tracks[0] ? state.tracks[0].id : '',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          origin: window.location.origin
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError,
        }
      });
    };
  }

  function onPlayerReady() {
    state.ytPlayerReady = true;
    if (ytPlayer && ytPlayer.setVolume) {
      ytPlayer.setVolume(state.volume);
    }
  }

  function onPlayerStateChange(event) {
    if (!event) return;
    const playerState = event.data;

    if (playerState === YT.PlayerState.PLAYING) {
      state.isPlaying = true;
      updatePlaybackUI(true);
      startProgressTracker();
    } else if (playerState === YT.PlayerState.PAUSED) {
      state.isPlaying = false;
      updatePlaybackUI(false);
      stopProgressTracker();
    } else if (playerState === YT.PlayerState.ENDED) {
      handleTrackEnded();
    } else if (playerState === YT.PlayerState.BUFFERING) {
      if (el.visualizerStatus) el.visualizerStatus.textContent = 'SIGNAL: BUFFERING';
    }
  }

  function onPlayerError(err) {
    console.warn('YouTube Player notice / skip to next track:', err);
    // If a specific song is restricted in embed, automatically proceed to next song
    setTimeout(() => {
      playNextTrack();
    }, 1200);
  }

  // --- Playback Management ---
  function loadTrack(index, autoPlay = true) {
    if (index < 0 || index >= state.tracks.length) return;
    state.currentIndex = index;
    const track = state.tracks[index];

    // Update UI elements
    const trackNum = String(index + 1).padStart(3, '0');
    if (el.deckTrackTitle) el.deckTrackTitle.textContent = `${trackNum}. ${track.title}`;
    if (el.deckTrackArtist) el.deckTrackArtist.textContent = `${track.artist} • ${track.mood}`;
    if (el.heroVinylCover) el.heroVinylCover.src = track.thumbnail;
    
    if (el.playerTrackTitle) el.playerTrackTitle.textContent = track.title;
    if (el.playerTrackArtist) el.playerTrackArtist.textContent = track.artist;
    if (el.playerTrackThumb) el.playerTrackThumb.src = track.thumbnail;
    if (el.playerTimeDuration) el.playerTimeDuration.textContent = track.duration || '4:15';
    if (el.playerTimeElapsed) el.playerTimeElapsed.textContent = '0:00';
    if (el.playerPlayedProgress) el.playerPlayedProgress.style.width = '0%';

    updateActiveCatalogRows();

    if (state.ytPlayerReady && ytPlayer && ytPlayer.loadVideoById) {
      if (autoPlay) {
        ytPlayer.loadVideoById(track.id);
        state.isPlaying = true;
        updatePlaybackUI(true);
      } else {
        ytPlayer.cueVideoById(track.id);
        state.isPlaying = false;
        updatePlaybackUI(false);
      }
    }
  }

  function togglePlayPause() {
    if (!state.ytPlayerReady || !ytPlayer) {
      // If API still loading, retry
      return;
    }

    if (state.isPlaying) {
      ytPlayer.pauseVideo();
      state.isPlaying = false;
      updatePlaybackUI(false);
    } else {
      ytPlayer.playVideo();
      state.isPlaying = true;
      updatePlaybackUI(true);
    }
  }

  function playTrackByIndex(index) {
    loadTrack(index, true);
  }

  function playNextTrack() {
    // If we have custom items in queue, play next in queue
    if (state.queue.length > 0) {
      const nextQueueTrack = state.queue.shift();
      updateQueueUI();
      const targetIndex = state.tracks.findIndex(t => t.id === nextQueueTrack.id);
      if (targetIndex !== -1) {
        loadTrack(targetIndex, true);
        return;
      }
    }

    if (state.isShuffle) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * state.tracks.length);
      } while (nextIndex === state.currentIndex && state.tracks.length > 1);
      loadTrack(nextIndex, true);
      return;
    }

    let nextIndex = state.currentIndex + 1;
    if (nextIndex >= state.tracks.length) {
      nextIndex = 0;
    }
    loadTrack(nextIndex, true);
  }

  function playPrevTrack() {
    // If track has played more than 3 seconds, replay from start
    if (state.currentTime > 3 && ytPlayer && ytPlayer.seekTo) {
      ytPlayer.seekTo(0, true);
      return;
    }

    let prevIndex = state.currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = state.tracks.length - 1;
    }
    loadTrack(prevIndex, true);
  }

  function handleTrackEnded() {
    if (state.repeatMode === 'one') {
      if (ytPlayer && ytPlayer.seekTo) {
        ytPlayer.seekTo(0, true);
        ytPlayer.playVideo();
      }
    } else if (state.repeatMode === 'all' || state.currentIndex < state.tracks.length - 1 || state.queue.length > 0 || state.isShuffle) {
      playNextTrack();
    } else {
      state.isPlaying = false;
      updatePlaybackUI(false);
    }
  }

  function toggleShuffle() {
    state.isShuffle = !state.isShuffle;
    if (el.playerShuffleBtn) {
      el.playerShuffleBtn.classList.toggle('active', state.isShuffle);
    }
  }

  function toggleRepeat() {
    if (state.repeatMode === 'off') {
      state.repeatMode = 'all';
      el.playerRepeatBtn.classList.add('active');
      el.playerRepeatIcon.textContent = '🔁';
      el.playerRepeatBtn.title = 'Repeat All Tracks (R)';
    } else if (state.repeatMode === 'all') {
      state.repeatMode = 'one';
      el.playerRepeatBtn.classList.add('active');
      el.playerRepeatIcon.textContent = '🔂';
      el.playerRepeatBtn.title = 'Repeat Current Track (R)';
    } else {
      state.repeatMode = 'off';
      el.playerRepeatBtn.classList.remove('active');
      el.playerRepeatIcon.textContent = '🔁';
      el.playerRepeatBtn.title = 'Repeat Off (R)';
    }
  }

  function setVolume(vol) {
    state.volume = Math.max(0, Math.min(100, vol));
    if (el.playerVolumeSlider) el.playerVolumeSlider.value = state.volume;
    if (state.ytPlayerReady && ytPlayer && ytPlayer.setVolume) {
      ytPlayer.setVolume(state.volume);
    }
    if (state.volume === 0) {
      state.isMuted = true;
      if (el.playerVolumeIcon) el.playerVolumeIcon.textContent = '🔇';
    } else {
      state.isMuted = false;
      if (el.playerVolumeIcon) el.playerVolumeIcon.textContent = state.volume > 50 ? '🔊' : '🔉';
    }
  }

  function toggleMute() {
    if (state.isMuted) {
      setVolume(state.volume || 80);
    } else {
      if (state.ytPlayerReady && ytPlayer && ytPlayer.mute) {
        ytPlayer.mute();
      }
      state.isMuted = true;
      if (el.playerVolumeIcon) el.playerVolumeIcon.textContent = '🔇';
    }
  }

  function seekByPercent(percent) {
    if (!state.ytPlayerReady || !ytPlayer || !ytPlayer.getDuration) return;
    const duration = ytPlayer.getDuration() || 240;
    const targetSeconds = (percent / 100) * duration;
    ytPlayer.seekTo(targetSeconds, true);
    updateProgressUI(targetSeconds, duration);
  }

  function seekRelative(secondsDelta) {
    if (!state.ytPlayerReady || !ytPlayer || !ytPlayer.getCurrentTime) return;
    const cur = ytPlayer.getCurrentTime() || 0;
    const dur = ytPlayer.getDuration() || 240;
    const target = Math.max(0, Math.min(dur, cur + secondsDelta));
    ytPlayer.seekTo(target, true);
  }

  // --- Progress & Time Tracking ---
  function startProgressTracker() {
    stopProgressTracker();
    state.progressInterval = setInterval(() => {
      if (state.ytPlayerReady && ytPlayer && ytPlayer.getCurrentTime) {
        state.currentTime = ytPlayer.getCurrentTime() || 0;
        state.duration = ytPlayer.getDuration() || 240;
        updateProgressUI(state.currentTime, state.duration);
        
        // Update buffered progress if available
        if (ytPlayer.getVideoLoadedFraction && el.playerBufferProgress) {
          const loadedFraction = ytPlayer.getVideoLoadedFraction() || 0;
          el.playerBufferProgress.style.width = `${loadedFraction * 100}%`;
        }
      }
    }, 400);
  }

  function stopProgressTracker() {
    if (state.progressInterval) {
      clearInterval(state.progressInterval);
      state.progressInterval = null;
    }
  }

  function updateProgressUI(currentSec, totalSec) {
    if (totalSec <= 0) return;
    const pct = (currentSec / totalSec) * 100;
    if (el.playerPlayedProgress) el.playerPlayedProgress.style.width = `${pct}%`;
    if (el.playerTimeElapsed) el.playerTimeElapsed.textContent = formatTime(currentSec);
    if (el.playerTimeDuration && totalSec > 0) el.playerTimeDuration.textContent = formatTime(totalSec);
  }

  function formatTime(seconds) {
    const s = Math.floor(seconds);
    const m = Math.floor(s / 60);
    const remS = s % 60;
    return `${m}:${String(remS).padStart(2, '0')}`;
  }

  // --- Visual Playback UI Updates ---
  function updatePlaybackUI(isPlaying) {
    // Master Player Controls
    if (el.playerPlayPauseIcon) el.playerPlayPauseIcon.textContent = isPlaying ? '⏸' : '▶';
    if (el.deckQuickToggleIcon) el.deckQuickToggleIcon.textContent = isPlaying ? '⏸ PAUSE' : '▶ PLAY';

    // Turntable animation
    if (el.heroVinylDisc) {
      el.heroVinylDisc.classList.toggle('is-spinning', isPlaying);
    }
    if (el.heroTonearm) {
      el.heroTonearm.classList.toggle('is-active', isPlaying);
    }

    // Visualizer status indicator
    if (el.visualizerStatus) {
      el.visualizerStatus.textContent = isPlaying ? 'SIGNAL: ON AIR' : 'SIGNAL: PAUSED';
    }

    updateActiveCatalogRows();
  }

  function updateActiveCatalogRows() {
    const curTrack = state.tracks[state.currentIndex];
    if (!curTrack) return;

    // Table rows
    const rows = document.querySelectorAll('.track-row');
    rows.forEach(row => {
      const trackId = row.getAttribute('data-track-id');
      const isCurrent = (trackId === curTrack.id);
      row.classList.toggle('is-active', isCurrent);
      
      const playIcon = row.querySelector('.track-row-play-btn');
      if (playIcon) {
        if (isCurrent && state.isPlaying) {
          playIcon.innerHTML = `
            <div class="soundwave-glyph">
              <div class="soundwave-bar"></div>
              <div class="soundwave-bar"></div>
              <div class="soundwave-bar"></div>
              <div class="soundwave-bar"></div>
            </div>
          `;
        } else {
          playIcon.textContent = isCurrent ? '⏸' : '▶';
        }
      }
    });

    // Grid cards
    const cards = document.querySelectorAll('.grid-card');
    cards.forEach(card => {
      const trackId = card.getAttribute('data-track-id');
      const isCurrent = (trackId === curTrack.id);
      card.classList.toggle('is-active', isCurrent);
      
      const playIcon = card.querySelector('.grid-play-icon');
      if (playIcon) {
        playIcon.textContent = (isCurrent && state.isPlaying) ? '⏸' : '▶';
      }
    });
  }

  // --- Filtering, Sorting & Catalog Rendering ---
  function applyFiltersAndRender() {
    let result = [...state.tracks];

    // Filter by mood
    if (state.currentMood && state.currentMood !== 'all') {
      result = result.filter(t => t.mood === state.currentMood);
    }

    // Filter by search query
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      result = result.filter(t => 
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        (t.movie && t.movie.toLowerCase().includes(q)) ||
        t.mood.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (state.sortBy) {
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'artist-asc':
        result.sort((a, b) => a.artist.localeCompare(b.artist));
        break;
      case 'duration-desc':
        result.sort((a, b) => parseDuration(b.duration) - parseDuration(a.duration));
        break;
      case 'duration-asc':
        result.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration));
        break;
      default:
        // Default sequence preserved
        break;
    }

    state.filteredTracks = result;
    renderCatalog();
  }

  function parseDuration(durStr) {
    if (!durStr) return 240;
    const parts = durStr.split(':').map(Number);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 240;
  }

  function renderCatalog() {
    if (state.filteredTracks.length === 0) {
      if (el.catalogTableView) el.catalogTableView.style.display = 'none';
      if (el.catalogGridView) el.catalogGridView.style.display = 'none';
      if (el.catalogEmptyState) el.catalogEmptyState.style.display = 'flex';
      return;
    }

    if (el.catalogEmptyState) el.catalogEmptyState.style.display = 'none';

    if (state.viewMode === 'list') {
      if (el.catalogTableView) el.catalogTableView.style.display = 'block';
      if (el.catalogGridView) el.catalogGridView.style.display = 'none';
      renderTableView();
    } else {
      if (el.catalogTableView) el.catalogTableView.style.display = 'none';
      if (el.catalogGridView) el.catalogGridView.style.display = 'grid';
      renderGridView();
    }

    updateActiveCatalogRows();
  }

  function renderTableView() {
    if (!el.tracksTableBody) return;
    
    el.tracksTableBody.innerHTML = state.filteredTracks.map((track) => {
      const originalIndex = state.tracks.findIndex(t => t.id === track.id);
      const isCurrent = (originalIndex === state.currentIndex);
      const isFav = state.favorites.has(track.id);
      const formattedNum = String(originalIndex + 1).padStart(3, '0');

      return `
        <div class="track-row ${isCurrent ? 'is-active' : ''}" data-track-id="${track.id}" data-track-index="${originalIndex}" role="listitem">
          <!-- Col 1: Index / Play Button -->
          <div class="track-col-index">
            <span class="track-index-num font-mono">${formattedNum}</span>
            <button class="track-row-play-btn" title="Play ${escapeHtml(track.title)}" aria-label="Play track ${formattedNum}">
              ${isCurrent && state.isPlaying ? `
                <div class="soundwave-glyph">
                  <div class="soundwave-bar"></div>
                  <div class="soundwave-bar"></div>
                  <div class="soundwave-bar"></div>
                  <div class="soundwave-bar"></div>
                </div>` : '▶'}
            </button>
          </div>

          <!-- Col 2: Thumbnail Cover -->
          <div class="track-col-thumb">
            <img src="${track.thumbnail}" alt="${escapeHtml(track.title)} cover" class="track-thumb-img" loading="lazy">
          </div>

          <!-- Col 3: Title & Album -->
          <div class="track-col-title">
            <span class="track-title-text">${escapeHtml(track.title)}</span>
            ${track.movie ? `<span class="track-movie-tag font-mono">From "${escapeHtml(track.movie)}"</span>` : ''}
          </div>

          <!-- Col 4: Vocalist / Composer -->
          <div class="track-col-artist">
            <span>${escapeHtml(track.artist)}</span>
          </div>

          <!-- Col 5: Mood Badge -->
          <div class="track-col-mood">
            <span class="track-mood-badge font-mono">${escapeHtml(track.mood)}</span>
          </div>

          <!-- Col 6: Duration -->
          <div class="track-col-duration font-mono">
            <span>${track.duration || '4:15'}</span>
          </div>

          <!-- Col 7: Action Buttons -->
          <div class="track-col-actions">
            <button class="track-action-btn queue-add-btn" title="Add to Queue" aria-label="Add to queue">
              +Q
            </button>
            <button class="track-action-btn favorite-btn ${isFav ? 'is-fav' : ''}" title="Favorite" aria-label="Favorite">
              ${isFav ? '♥' : '♡'}
            </button>
            <button class="track-action-btn liner-info-btn" title="Liner Notes" aria-label="Liner notes">
              ℹ
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderGridView() {
    if (!el.catalogGridView) return;

    el.catalogGridView.innerHTML = state.filteredTracks.map((track) => {
      const originalIndex = state.tracks.findIndex(t => t.id === track.id);
      const isCurrent = (originalIndex === state.currentIndex);
      const formattedNum = String(originalIndex + 1).padStart(3, '0');

      return `
        <div class="grid-card ${isCurrent ? 'is-active' : ''}" data-track-id="${track.id}" data-track-index="${originalIndex}" role="listitem">
          <div class="grid-card-thumb-wrap">
            <img src="${track.thumbnail}" alt="${escapeHtml(track.title)}" class="grid-card-thumb-img" loading="lazy">
            <div class="grid-card-play-overlay">
              <div class="grid-play-icon">${(isCurrent && state.isPlaying) ? '⏸' : '▶'}</div>
            </div>
          </div>
          <div class="grid-card-title">${escapeHtml(track.title)}</div>
          <div class="grid-card-artist">${escapeHtml(track.artist)}</div>
          <div class="grid-card-footer font-mono">
            <span>№ ${formattedNum}</span>
            <span>${track.duration || '4:15'}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- Queue Management ---
  function addToQueue(track) {
    state.queue.push(track);
    updateQueueUI();
  }

  function removeFromQueue(index) {
    state.queue.splice(index, 1);
    updateQueueUI();
  }

  function clearQueue() {
    state.queue = [];
    updateQueueUI();
  }

  function updateQueueUI() {
    const count = state.queue.length;
    if (el.queueBadgeCount) el.queueBadgeCount.textContent = count;
    if (el.queueCountText) el.queueCountText.textContent = count;

    if (!el.queueItemsList) return;
    if (count === 0) {
      el.queueItemsList.innerHTML = `
        <div style="padding: var(--space-lg); text-align: center; color: var(--text-muted); font-size: 0.8125rem;">
          Queue is empty. Click "+Q" on any track row to queue upcoming songs.
        </div>
      `;
      return;
    }

    el.queueItemsList.innerHTML = state.queue.map((track, idx) => `
      <div class="queue-item">
        <div style="display: flex; gap: 8px; align-items: center; overflow: hidden;">
          <span class="font-mono" style="color: var(--text-muted); font-size: 0.6875rem;">${String(idx + 1).padStart(2, '0')}</span>
          <div class="queue-item-title">${escapeHtml(track.title)}</div>
        </div>
        <button class="remove-queue-item-btn" data-queue-index="${idx}" style="color: var(--text-muted); font-size: 0.75rem; padding: 4px 6px;">✕</button>
      </div>
    `).join('');
  }

  // --- Liner Notes Drawer ---
  function openLinerDrawer(track) {
    if (!track) return;
    activeLinerTrack = track;
    const originalIndex = state.tracks.findIndex(t => t.id === track.id);
    const formattedNum = String(originalIndex + 1).padStart(3, '0');

    if (el.linerTrackNumber) el.linerTrackNumber.textContent = `№ ${formattedNum} // MASTER ARCHIVE`;
    if (el.linerModalTitle) el.linerModalTitle.textContent = track.title;
    if (el.linerArtistName) el.linerArtistName.textContent = `${track.artist} ${track.movie ? `• From "${track.movie}"` : ''} • Mood: ${track.mood}`;
    if (el.linerCoverImg) el.linerCoverImg.src = track.thumbnail;
    if (el.linerYtLink) el.linerYtLink.href = `https://www.youtube.com/watch?v=${track.id}`;

    // Editorial liner essay generator based on artist & mood
    const linerText = generateCuratorialLinerNotes(track);
    if (el.linerNotesText) el.linerNotesText.innerHTML = linerText;

    if (el.linerDrawerOverlay) el.linerDrawerOverlay.classList.add('is-open');
  }

  function generateCuratorialLinerNotes(track) {
    const { title, artist, movie, mood } = track;
    return `
      <strong>Curatorial Context &amp; Arrangement:</strong><br>
      <em>"${title}"</em> stands as a definitive highlight within the <strong>${mood}</strong> catalog. 
      Recorded with acoustic guitars, lush strings, and intimate vocal tracking, the recording balances 
      delicate dynamic restraint with poignant harmonic resolution.<br><br>
      <strong>Performance Nuance:</strong><br>
      <strong>${artist}</strong> brings distinct emotional weight to this composition, utilizing breath control, 
      subtle micro-tonal glides (meend), and authentic acoustic resonance that exemplifies master-tier Indian studio craft.
    `;
  }

  function closeLinerDrawer() {
    if (el.linerDrawerOverlay) el.linerDrawerOverlay.classList.remove('is-open');
  }

  // --- Realtime Audio Visualizer Canvas Loop ---
  function initVisualizerCanvas() {
    const canvas = el.oscilloscopeCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const barCount = 32;

    function renderVisualizer() {
      requestAnimationFrame(renderVisualizer);

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const isDark = (state.theme === 'vinyl');
      const accentColor = isDark ? '#E2633C' : '#D6542D';
      const baseColor = isDark ? 'rgba(240, 236, 228, 0.15)' : 'rgba(18, 17, 16, 0.1)';

      const barWidth = (width / barCount) - 3;
      phase += 0.05;

      for (let i = 0; i < barCount; i++) {
        let barHeight = 4; // Resting height

        if (state.isPlaying) {
          // Dynamic simulation of frequency spectrum with harmonics
          const noise = Math.sin(phase * 1.5 + i * 0.4) * Math.cos(phase * 0.8 + i * 0.2);
          const beatPulse = Math.abs(Math.sin(phase * 2.2 + i * 0.15));
          barHeight = Math.max(4, (noise * 0.5 + beatPulse * 0.5 + 0.3) * (height - 6));
        }

        const x = i * (barWidth + 3);
        const y = height - barHeight;

        // Draw bar
        ctx.fillStyle = state.isPlaying ? accentColor : baseColor;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Peak dot
        if (state.isPlaying && barHeight > 10) {
          ctx.fillStyle = isDark ? '#F0ECE4' : '#121110';
          ctx.fillRect(x, y - 3, barWidth, 1.5);
        }
      }
    }

    renderVisualizer();
  }

  // --- Event Bindings ---
  function bindEvents() {
    // Theme Toggle
    if (el.themeToggleBtn) {
      el.themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Hero Buttons
    if (el.heroPlayAllBtn) {
      el.heroPlayAllBtn.addEventListener('click', () => {
        playTrackByIndex(0);
      });
    }

    if (el.heroShuffleBtn) {
      el.heroShuffleBtn.addEventListener('click', () => {
        state.isShuffle = true;
        if (el.playerShuffleBtn) el.playerShuffleBtn.classList.add('active');
        const randomIndex = Math.floor(Math.random() * state.tracks.length);
        playTrackByIndex(randomIndex);
      });
    }

    if (el.deckQuickToggleBtn) {
      el.deckQuickToggleBtn.addEventListener('click', togglePlayPause);
    }

    // Search Input
    if (el.catalogSearchInput) {
      el.catalogSearchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (el.searchClearBtn) {
          el.searchClearBtn.classList.toggle('is-visible', !!state.searchQuery);
        }
        applyFiltersAndRender();
      });
    }

    if (el.searchClearBtn) {
      el.searchClearBtn.addEventListener('click', () => {
        if (el.catalogSearchInput) el.catalogSearchInput.value = '';
        state.searchQuery = '';
        el.searchClearBtn.classList.remove('is-visible');
        applyFiltersAndRender();
      });
    }

    // Sort Select
    if (el.catalogSortSelect) {
      el.catalogSortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        applyFiltersAndRender();
      });
    }

    // View Mode Toggle
    if (el.viewListBtn && el.viewGridBtn) {
      el.viewListBtn.addEventListener('click', () => {
        state.viewMode = 'list';
        el.viewListBtn.classList.add('active');
        el.viewListBtn.setAttribute('aria-pressed', 'true');
        el.viewGridBtn.classList.remove('active');
        el.viewGridBtn.setAttribute('aria-pressed', 'false');
        renderCatalog();
      });

      el.viewGridBtn.addEventListener('click', () => {
        state.viewMode = 'grid';
        el.viewGridBtn.classList.add('active');
        el.viewGridBtn.setAttribute('aria-pressed', 'true');
        el.viewListBtn.classList.remove('active');
        el.viewListBtn.setAttribute('aria-pressed', 'false');
        renderCatalog();
      });
    }

    // Mood Filter Pills
    if (el.moodFiltersContainer) {
      el.moodFiltersContainer.addEventListener('click', (e) => {
        const pill = e.target.closest('.filter-pill');
        if (!pill) return;

        const mood = pill.getAttribute('data-mood');
        state.currentMood = mood;

        document.querySelectorAll('.filter-pill').forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-checked', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-checked', 'true');

        applyFiltersAndRender();
      });
    }

    // Reset Filters Button
    if (el.resetFiltersBtn) {
      el.resetFiltersBtn.addEventListener('click', () => {
        state.searchQuery = '';
        state.currentMood = 'all';
        if (el.catalogSearchInput) el.catalogSearchInput.value = '';
        if (el.searchClearBtn) el.searchClearBtn.classList.remove('is-visible');
        
        document.querySelectorAll('.filter-pill').forEach(p => {
          p.classList.toggle('active', p.getAttribute('data-mood') === 'all');
        });
        applyFiltersAndRender();
      });
    }

    // Catalog Row / Card delegation
    const handleCatalogClick = (e) => {
      const row = e.target.closest('.track-row, .grid-card');
      if (!row) return;

      const trackId = row.getAttribute('data-track-id');
      const trackIndex = parseInt(row.getAttribute('data-track-index'), 10);
      const track = state.tracks[trackIndex];

      // Check if button clicked
      if (e.target.closest('.queue-add-btn')) {
        e.stopPropagation();
        addToQueue(track);
        return;
      }

      if (e.target.closest('.favorite-btn')) {
        e.stopPropagation();
        const favBtn = e.target.closest('.favorite-btn');
        if (state.favorites.has(trackId)) {
          state.favorites.delete(trackId);
          favBtn.classList.remove('is-fav');
          favBtn.textContent = '♡';
        } else {
          state.favorites.add(trackId);
          favBtn.classList.add('is-fav');
          favBtn.textContent = '♥';
        }
        localStorage.setItem('rr_favorites', JSON.stringify(Array.from(state.favorites)));
        return;
      }

      if (e.target.closest('.liner-info-btn')) {
        e.stopPropagation();
        openLinerDrawer(track);
        return;
      }

      // If clicked the row itself or play button
      if (trackIndex === state.currentIndex) {
        togglePlayPause();
      } else {
        playTrackByIndex(trackIndex);
      }
    };

    if (el.catalogTableView) el.catalogTableView.addEventListener('click', handleCatalogClick);
    if (el.catalogGridView) el.catalogGridView.addEventListener('click', handleCatalogClick);

    // Master Player Controls
    if (el.playerPlayPauseBtn) el.playerPlayPauseBtn.addEventListener('click', togglePlayPause);
    if (el.playerNextBtn) el.playerNextBtn.addEventListener('click', playNextTrack);
    if (el.playerPrevBtn) el.playerPrevBtn.addEventListener('click', playPrevTrack);
    if (el.playerShuffleBtn) el.playerShuffleBtn.addEventListener('click', toggleShuffle);
    if (el.playerRepeatBtn) el.playerRepeatBtn.addEventListener('click', toggleRepeat);
    if (el.playerMuteBtn) el.playerMuteBtn.addEventListener('click', toggleMute);

    // Volume Slider
    if (el.playerVolumeSlider) {
      el.playerVolumeSlider.addEventListener('input', (e) => {
        setVolume(parseInt(e.target.value, 10));
      });
    }

    // Scrubber Bar Click
    if (el.playerScrubBar) {
      el.playerScrubBar.addEventListener('click', (e) => {
        const rect = el.playerScrubBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percent = Math.max(0, Math.min(100, (clickX / width) * 100));
        seekByPercent(percent);
      });
    }

    // Queue Drawer Toggles
    if (el.playerQueueBtn) {
      el.playerQueueBtn.addEventListener('click', () => {
        if (el.queueDrawer) el.queueDrawer.classList.toggle('is-open');
      });
    }

    if (el.closeQueueBtn) {
      el.closeQueueBtn.addEventListener('click', () => {
        if (el.queueDrawer) el.queueDrawer.classList.remove('is-open');
      });
    }

    if (el.clearQueueBtn) {
      el.clearQueueBtn.addEventListener('click', clearQueue);
    }

    if (el.queueItemsList) {
      el.queueItemsList.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-queue-item-btn');
        if (removeBtn) {
          const idx = parseInt(removeBtn.getAttribute('data-queue-index'), 10);
          removeFromQueue(idx);
        }
      });
    }

    // Liner Drawer Toggles
    if (el.playerLinerBtn) {
      el.playerLinerBtn.addEventListener('click', () => {
        openLinerDrawer(state.tracks[state.currentIndex]);
      });
    }

    if (el.linerCloseBtn) {
      el.linerCloseBtn.addEventListener('click', closeLinerDrawer);
    }

    if (el.linerDrawerOverlay) {
      el.linerDrawerOverlay.addEventListener('click', (e) => {
        if (e.target === el.linerDrawerOverlay) closeLinerDrawer();
      });
    }

    if (el.linerPlayNowBtn) {
      el.linerPlayNowBtn.addEventListener('click', () => {
        if (activeLinerTrack) {
          const idx = state.tracks.findIndex(t => t.id === activeLinerTrack.id);
          if (idx !== -1) playTrackByIndex(idx);
          closeLinerDrawer();
        }
      });
    }

    // Keyboard Shortcuts Modal
    if (el.shortcutsBtn) {
      el.shortcutsBtn.addEventListener('click', () => {
        if (el.shortcutsModalOverlay) el.shortcutsModalOverlay.classList.add('is-open');
      });
    }

    if (el.closeShortcutsBtn) {
      el.closeShortcutsBtn.addEventListener('click', () => {
        if (el.shortcutsModalOverlay) el.shortcutsModalOverlay.classList.remove('is-open');
      });
    }

    if (el.shortcutsModalOverlay) {
      el.shortcutsModalOverlay.addEventListener('click', (e) => {
        if (e.target === el.shortcutsModalOverlay) {
          el.shortcutsModalOverlay.classList.remove('is-open');
        }
      });
    }

    // Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // Don't trigger if typing in input or textarea
      const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || tag === 'select') {
        if (e.key === 'Escape') {
          document.activeElement.blur();
        }
        return;
      }

      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekRelative(5);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekRelative(-5);
          break;
        case 'n':
        case 'N':
          playNextTrack();
          break;
        case 'p':
        case 'P':
          playPrevTrack();
          break;
        case 'm':
        case 'M':
          toggleMute();
          break;
        case 's':
        case 'S':
          toggleShuffle();
          break;
        case 'r':
        case 'R':
          toggleRepeat();
          break;
        case '/':
          e.preventDefault();
          if (el.catalogSearchInput) el.catalogSearchInput.focus();
          break;
        case 'Escape':
          closeLinerDrawer();
          if (el.queueDrawer) el.queueDrawer.classList.remove('is-open');
          if (el.shortcutsModalOverlay) el.shortcutsModalOverlay.classList.remove('is-open');
          break;
        case '?':
          if (el.shortcutsModalOverlay) el.shortcutsModalOverlay.classList.toggle('is-open');
          break;
      }
    });

    // Copy Email to Clipboard
    if (el.copyEmailBtn && el.studioEmailText) {
      el.copyEmailBtn.addEventListener('click', () => {
        const email = el.studioEmailText.textContent;
        navigator.clipboard.writeText(email).then(() => {
          el.copyEmailBtn.textContent = 'COPIED!';
          setTimeout(() => {
            el.copyEmailBtn.textContent = 'COPY';
          }, 2000);
        });
      });
    }

    // Contact Form Submit
    if (el.contactForm) {
      el.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value.trim();
        const email = document.getElementById('contactEmail')?.value.trim();
        const message = document.getElementById('contactMessage')?.value.trim();

        if (!name || !email || !message) {
          alert('Please provide your name, email, and project scope.');
          return;
        }

        if (el.contactFeedback) {
          el.contactFeedback.style.display = 'block';
          el.contactForm.reset();
          setTimeout(() => {
            el.contactFeedback.style.display = 'none';
          }, 6000);
        }
      });
    }
  }

  // Self-start once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
