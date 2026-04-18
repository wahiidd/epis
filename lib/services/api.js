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
    api.get('/health'),

  checkStatus: (gameId) => {
    if (gameId === 'null' || !gameId) {
      console.warn('gameAPI.checkStatus called with invalid gameId');
    }
    return api.get(`/game/status/${gameId}`);
  }
};

export const adminAPI = {
  getPending: () => api.get('/admin/pending'),
  approveGame: (gameId) => api.post('/admin/approve', { gameId }),
  rejectGame: (gameId) => api.post('/admin/reject', { gameId })
};

export default api;
