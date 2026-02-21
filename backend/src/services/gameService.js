import { expandedQuestions } from '../data/expandedQuestions.js';

// In-memory storage
export const gameSessions = new Map();
const askedQuestions = new Map();

export async function generateBoard() {
  const squares = ['start'];
  
  // Add 30 easy squares
  for (let i = 0; i < 30; i++) squares.push('easy');
  
  // Add 30 medium squares
  for (let i = 0; i < 30; i++) squares.push('medium');
  
  // Add 30 hard squares
  for (let i = 0; i < 30; i++) squares.push('hard');
  
  // Add 5 random squares
  for (let i = 0; i < 5; i++) squares.push('random');
  
  // Shuffle the middle squares (keep start and end fixed)
  // Fisher-Yates shuffle on elements from index 1 to length-2
  for (let i = squares.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * (i - 1)) + 1;
    [squares[i], squares[j]] = [squares[j], squares[i]];
  }
  
  // Add end square at the end
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
    status: 'active',
    createdAt: new Date()
  };
  
  gameSessions.set(gameId, gameSession);
  askedQuestions.set(gameId, new Set());
  
  return gameSession;
}

export async function getRandomQuestion(difficulty, gameId = null) {
  try {
    // If square requested 'random', choose a real difficulty randomly
    let chosenDifficulty = difficulty;
    if (difficulty === 'random') {
      const choices = ['easy', 'medium', 'hard'];
      chosenDifficulty = choices[Math.floor(Math.random() * choices.length)];
    }

    // Filter questions by difficulty
    const availableQuestions = expandedQuestions.filter(q => q.difficulty === chosenDifficulty);
    
    if (availableQuestions.length === 0) return null;
    
    // If gameId provided, exclude already asked questions
    let questionsToChooseFrom = availableQuestions;
    if (gameId && askedQuestions.has(gameId)) {
      const asked = askedQuestions.get(gameId);
      questionsToChooseFrom = availableQuestions.filter((q, idx) => !asked.has(idx));
      
      // If all questions asked, reset
      if (questionsToChooseFrom.length === 0) {
        askedQuestions.set(gameId, new Set());
        questionsToChooseFrom = availableQuestions;
      }
    }
    
    // Pick random question
    const randomIndex = Math.floor(Math.random() * questionsToChooseFrom.length);
    const randomQuestion = questionsToChooseFrom[randomIndex];
    
    // Track this question if gameId provided
    if (gameId) {
      const originalIndex = expandedQuestions.indexOf(randomQuestion);
      const asked = askedQuestions.get(gameId) || new Set();
      asked.add(originalIndex);
      askedQuestions.set(gameId, asked);
    }

    // Shuffle options so the correct answer isn't always in the same position
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

export function calculatePoints(difficulty, isCorrect, bet = 0) {
  if (!isCorrect) {
    return 0;
  }
  
  const pointsMap = {
    easy: 1,
    medium: 3,
    hard: 5,
    random: 5
  };
  
  return pointsMap[difficulty] || 0;
}