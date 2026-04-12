"use client";

import axios from 'axios';


const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const gameAPI = {
  startGame: (mode, players) => 
    api.post('/game/start', { mode, players }),
  
  getQuestion: (difficulty, gameId = null) => 
    api.get('/game/question', { params: { difficulty, gameId } }),
  
  submitAnswer: (gameId, playerId, difficulty, isCorrect, bet = 0) =>
    api.post('/game/answer', { 
      gameId, 
      playerId, 
      difficulty, 
      isCorrect, 
      bet 
    }),
  
  endGame: (gameId) =>
    api.post('/game/end', { gameId }),
  
  getLeaderboard: () =>
    api.get('/game/leaderboard'),
  
  checkHealth: () =>
    api.get('/health')
};

export default api;
