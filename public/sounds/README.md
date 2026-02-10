Place your sound effect files in this folder.

Naming suggestions (recommended):
- `dice-roll.mp3` or `dice-roll.wav` — played when rolling dice
- `move.mp3` — when a player moves
- `question-open.mp3` — when a question card appears
- `correct.mp3` — correct answer sound
- `incorrect.mp3` — incorrect answer sound
- `win.mp3` — final podium/win sound

Supported formats: `.mp3`, `.wav`, `.ogg` (browser-dependent).

Access from frontend at runtime via `/sounds/<filename>`, for example:

```js
const audio = new Audio('/sounds/correct.mp3');
audio.play();
```

Example React usage using provided helper (`src/services/sound.js`):

```jsx
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
- Replace these placeholders by uploading your real sound files to this folder.
- If using Vite dev server, files placed here will be served at `/sounds/<file>` immediately.
