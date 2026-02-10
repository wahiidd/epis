// Sound helper for Next.js - loads files from public/game-assets/sounds
// It builds a mapping from filename -> URL so callers can play by filename.

const cache = new Map();

// Base path for sounds in Next.js public folder
const BASE_PATH = '/game-assets/sounds/';

export function preloadSounds(list = []) {
  list.forEach(name => {
    const url = BASE_PATH + name;
    if (!cache.has(name)) {
      const audio = new Audio(url);
      cache.set(name, audio);
      audio.load();
    }
  });
}

export function playSound(name, { volume = 1.0, loop = false } = {}) {
  try {
    const url = BASE_PATH + name;
    if (!url) return; // sound not found
    let audio = cache.get(name);
    if (!audio) {
      audio = new Audio(url);
      cache.set(name, audio);
    }
    // Only reset if not already playing with same loop setting
    if (audio.paused || audio.loop !== loop) {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = volume;
      audio.loop = loop;
      audio.play().catch(() => {});
    }
  } catch (err) {
    // ignore
  }
}

export function stopSound(name) {
  try {
    const audio = cache.get(name);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      cache.delete(name);
    }
  } catch (err) {
    // ignore
  }
}

export default {
  preloadSounds,
  playSound
};
