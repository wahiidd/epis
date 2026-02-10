import { SQUARE_TYPES } from './constants.js';

export function generateBoard() {
  const squares = [];

  // Start square
  squares.push('start');

  // Add 30 easy squares
  for (let i = 0; i < 30; i++) squares.push('easy');

  // Add 30 medium squares
  for (let i = 0; i < 30; i++) squares.push('medium');

  // Add 30 hard squares
  for (let i = 0; i < 30; i++) squares.push('hard');
  
  // Add 5 random squares
  for (let i = 0; i < 5; i++) squares.push('random');    // Shuffle the middle squares (keep start and end fixed)
    // Fisher-Yates shuffle on elements from index 1 to length-2
    for (let i = squares.length - 2; i > 1; i--) {
      const j = Math.floor(Math.random() * (i - 1)) + 1;
      [squares[i], squares[j]] = [squares[j], squares[i]];
    }

    // Add end square at the end
    squares.push('end');

  return squares;
}

export function getSquareInfo(squareType) {
  return SQUARE_TYPES[squareType.toUpperCase()] || null;
}

export function calculatePoints(difficulty, isCorrect, bet = 0) {
  if (!isCorrect) return 0;

  const pointsMap = {
    easy: 1,
    medium: 3,
    hard: 5,
    random: 5
  };

  return pointsMap[difficulty] || 0;
}

export function getMilestoneMessage(score, messages) {
  return messages[score] || null;
}

export function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

export function validateMove(currentPosition, diceValue, boardSize) {
  return Math.min(currentPosition + diceValue, boardSize - 1);
}
