import { gameSessions, saveSessions } from '../services/gameService.js';

export async function getPendingGames(req, res) {
  try {
    const pendingGames = [];
    for (const [gameId, session] of gameSessions.entries()) {
      if (session.status === 'pending') {
        pendingGames.push(session);
      }
    }
    res.json({ success: true, pendingGames });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function approveGame(req, res) {
  try {
    const { gameId } = req.body;
    const session = gameSessions.get(gameId);
    if (!session) {
      return res.status(404).json({ error: 'Game session not found' });
    }
    
    session.status = 'active';
    gameSessions.set(gameId, session);
    saveSessions();
    
    res.json({ success: true, message: 'Game approved', gameId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function rejectGame(req, res) {
  try {
    const { gameId } = req.body;
    const session = gameSessions.get(gameId);
    if (!session) {
      return res.status(404).json({ error: 'Game session not found' });
    }
    
    session.status = 'rejected';
    gameSessions.set(gameId, session);
    saveSessions();
    
    res.json({ success: true, message: 'Game rejected', gameId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
