import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { expandedQuestions } from '../data/expandedQuestions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SESSIONS_FILE = path.join(__dirname, '../../game_sessions.json');

// Memory storage
export const gameSessions = new Map();
const askedQuestions = new Map();

// Helper to persist sessions to disk
export function saveSessions() {
  try {
    const data = JSON.stringify(Array.from(gameSessions.entries()));
    fs.writeFileSync(SESSIONS_FILE, data);
  } catch (err) {
    console.error('Failed to save sessions:', err);
  }
}

// Helper to load sessions from disk
function loadSessions() {
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      const data = fs.readFileSync(SESSIONS_FILE, 'utf8');
      const entries = JSON.parse(data);
      entries.forEach(([id, session]) => gameSessions.set(id, session));
      console.log(`✅ Loaded ${gameSessions.size} sessions from disk`);
    }
  } catch (err) {
    console.error('Failed to load sessions:', err);
  }
}

// Initial load
loadSessions();

export async function generateBoard() {
  const squares = ['start'];
  
  // Basic distribution: 30 easy, 30 medium, 30 hard, 5 random
  for (let i = 0; i < 30; i++) squares.push('easy');
  for (let i = 0; i < 30; i++) squares.push('medium');
  for (let i = 0; i < 30; i++) squares.push('hard');
  for (let i = 0; i < 5; i++) squares.push('random');
  
  // Shuffle the middle squares
  for (let i = squares.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * (i - 1)) + 1;
    [squares[i], squares[j]] = [squares[j], squares[i]];
  }
  
  squares.push('end');
  return squares;
}

export async function createGameSession(gameId, mode, players) {
  const boardState = await generateBoard();
  
  const playerData = players.map((name, index) => ({
    playerId: `player_${index}`,
    name,
    score: 0,
    position: 0
  }));
  
  const gameSession = {
    gameId,
    mode,
    players: playerData,
    boardState,
    status: 'pending',
    createdAt: new Date()
  };
  
  gameSessions.set(gameId, gameSession);
  askedQuestions.set(gameId, new Set());
  saveSessions();
  
  return gameSession;
}

export async function getRandomQuestion(difficulty, gameId = null) {
  try {
    let chosenDifficulty = difficulty;
    if (difficulty === 'random') {
      const choices = ['easy', 'medium', 'hard'];
      chosenDifficulty = choices[Math.floor(Math.random() * choices.length)];
    }

    const availableQuestions = expandedQuestions.filter(q => q.difficulty === chosenDifficulty);
    if (availableQuestions.length === 0) return null;
    
    // Pick random question
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const randomQuestion = availableQuestions[randomIndex];
    
    // Shuffle options
    const shuffledOptions = [...randomQuestion.options].sort(() => Math.random() - 0.5);

    return {
      ...randomQuestion,
      options: shuffledOptions
    };
  } catch (error) {
    console.error('Error getting random question:', error);
    return null;
  }
}

export function calculatePoints(difficulty, isCorrect) {
  if (!isCorrect) return 0;
  const pointsMap = { easy: 1, medium: 3, hard: 5, random: 5 };
  return pointsMap[difficulty] || 0;
}
