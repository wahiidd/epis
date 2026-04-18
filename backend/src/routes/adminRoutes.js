import express from 'express';
import {
  getPendingGames,
  approveGame,
  rejectGame
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/pending', getPendingGames);
router.post('/approve', approveGame);
router.post('/reject', rejectGame);

export default router;
