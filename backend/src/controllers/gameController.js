import { createGameSession, getRandomQuestion, calculatePoints, gameSessions } from '../services/gameService.js';

export async function startGame(req, res) {
  try {
    const { mode, players } = req.body;
    
    if (!mode || !players || players.length === 0) {
      return res.status(400).json({ error: 'Mode and players required' });
    }
    
    const gameId = `game_${Date.now()}`;
    const gameSession = await createGameSession(gameId, mode, players);
    
    res.json({
      success: true,
      gameId,
      boardState: gameSession.boardState,
      players: gameSession.players
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getQuestion(req, res) {
  try {
    const { difficulty, gameId } = req.query;
    
    if (!difficulty) {
      return res.status(400).json({ error: 'Difficulty required' });
    }
    
    const question = await getRandomQuestion(difficulty, gameId);
    
    if (!question) {
      return res.status(404).json({ error: 'No questions found' });
    }
    
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function submitAnswer(req, res) {
  try {
    const { gameId, playerId, difficulty, isCorrect, bet } = req.body;
    
    const points = calculatePoints(difficulty, isCorrect, bet);
    
    const gameSession = gameSessions.get(gameId);
    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }
    
    const playerIndex = gameSession.players.findIndex(p => p.playerId === playerId);
    if (playerIndex !== -1) {
      gameSession.players[playerIndex].score += points;
      gameSessions.set(gameId, gameSession);
    }
    
    res.json({
      success: true,
      pointsEarned: points,
      newScore: gameSession.players[playerIndex]?.score
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
    gameSession.completedAt = new Date();
    gameSessions.set(gameId, gameSession);
    
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
  try {
    // Get all completed game sessions and extract scores
    const allScores = [];
    
    for (const [gameId, session] of gameSessions.entries()) {
      if (session.status === 'completed') {
        session.players.forEach(player => {
          allScores.push({
            playerName: player.name,
            finalScore: player.score,
            gameId: session.gameId,
            mode: session.mode
          });
        });
      }
    }
    
    // Sort by score and limit to top 10
    const leaderboard = allScores
      .sort((a, b) => b.finalScore - a.finalScore)
      .slice(0, 10);
    
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
