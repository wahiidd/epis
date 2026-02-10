Place your sound effect files in this folder (frontend/src/assets/sounds).

Naming suggestions (recommended):
- `dice-roll.mp3` or `dice-roll.wav` — played when rolling dice
- `move.mp3` — when a player moves
- `question-open.mp3` — when a question card appears
- `correct.mp3` — correct answer sound
- `incorrect.mp3` — incorrect answer sound
- `win.mp3` — final podium/win sound

Supported formats: `.mp3`, `.wav`, `.ogg` (browser-dependent).

Usage notes (Vite):
- Files in `src/assets` are processed by Vite; the helper loads them via `import.meta.glob` and provides URLs at runtime.
- Example usage via provided helper (`src/services/sound.js`):

```js
import { playSound, preloadSounds } from '../services/sound';

useEffect(() => {
  preloadSounds(['dice-roll.mp3', 'question-open.mp3', 'correct.mp3']);
}, []);

function onRoll() {
  playSound('dice-roll.mp3');
}
```

Notes:
- Keep filenames short and lowercase.
- After adding files here, Vite dev server will automatically serve them and the helper will find them.
