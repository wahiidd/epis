import express from 'express';
import {
  startGame,
  getGameStatus,
  getQuestion,
  submitAnswer,
  endGame,
  getLeaderboard
} from '../controllers/gameController.js';

const router = express.Router();

router.post('/start', startGame);
router.get('/question', getQuestion);
router.get('/status/:gameId', getGameStatus);
router.post('/answer', submitAnswer);
router.post('/end', endGame);
router.get('/leaderboard', getLeaderboard);

export default router;
