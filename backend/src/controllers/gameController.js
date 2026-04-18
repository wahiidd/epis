import { createGameSession, getRandomQuestion, calculatePoints, gameSessions, saveSessions } from '../services/gameService.js';

export async function startGame(req, res) {
  try {
    const { mode, players } = req.body;
    const gameId = `game_${Date.now()}`;
    const session = await createGameSession(gameId, mode, players);
    
    res.json({
      success: true,
      gameId,
      status: session.status,
      boardState: session.boardState,
      players: session.players
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getGameStatus(req, res) {
  try {
    const { gameId } = req.params;
    const session = gameSessions.get(gameId);
    
    if (!session) {
      return res.status(404).json({ error: 'Game session not found' });
    }
    
    res.json({
      success: true,
      status: session.status,
      boardState: session.boardState
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getQuestion(req, res) {
  try {
    const { difficulty, gameId } = req.query;
    const question = await getRandomQuestion(difficulty, gameId);
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function submitAnswer(req, res) {
  try {
    const { gameId, playerId, difficulty, isCorrect } = req.body;
    const gameSession = gameSessions.get(gameId);
    
    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }
    
    const points = calculatePoints(difficulty, isCorrect);
    const playerIndex = gameSession.players.findIndex(p => p.playerId === playerId);
    
    if (playerIndex !== -1) {
      gameSession.players[playerIndex].score += points;
      gameSessions.set(gameId, gameSession);
      saveSessions();
    }
    
    res.json({
      success: true,
      newScore: gameSession.players[playerIndex]?.score || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function endGame(req, res) {
  try {
    const { gameId } = req.body;
    const gameSession = gameSessions.get(gameId);
    
    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }
    
    gameSession.status = 'completed';
    gameSessions.set(gameId, gameSession);
    saveSessions();
    
    // Sort players by score
    const sortedPlayers = [...gameSession.players].sort((a, b) => b.score - a.score);
    
    res.json({
      success: true,
      ranking: sortedPlayers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getLeaderboard(req, res) {
  // Simple leaderboard return
  res.json({ success: true, leaders: [] });
}
