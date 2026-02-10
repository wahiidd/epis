"use client";

import { useState, useCallback, useContext } from 'react';
import { GameContextAPI } from '../context/GameContext';
import { generateBoard } from '../utils/gameEngine';
import { MOTIVATIONAL_MESSAGES } from '../utils/constants';
import { gameAPI } from '../services/api';
import { playSound, stopSound } from '../services/sound';

export function useGameLogic() {
  const { state, dispatch } = useContext(GameContextAPI);

  const startGame = useCallback(async (mode, playerNames) => {
    try {
      const response = await gameAPI.startGame(mode, playerNames);
      const { gameId, boardState, players } = response.data;

      dispatch({ 
        type: 'START_GAME', 
        payload: { gameId, boardSquares: boardState } 
      });
      dispatch({ type: 'SET_MODE', payload: mode });
      dispatch({ 
        type: 'SET_PLAYERS', 
        payload: players.map(p => ({ 
          playerId: p.playerId || p.playerId, 
          name: p.name, 
          score: p.score || 0,
          position: 0 
        })) 
      });
      dispatch({ type: 'SWITCH_SCREEN', payload: 'game' });
      // Stop menu music then play start sound
      stopSound('menu-principal.mp3');
      playSound('debut-de-partie.mp3');
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  }, [dispatch]);

  const rollDice = useCallback(() => {
    const value = Math.floor(Math.random() * 6) + 1;
    return value;
  }, []);

  const movePlayer = useCallback(async (steps) => {
    const playerIdx = state.currentPlayerIndex;
    const currentPos = state.playerPositions[playerIdx] || 0;
    const newPos = Math.min(currentPos + steps, state.boardSquares.length - 1);

    dispatch({ 
      type: 'UPDATE_POSITION', 
      payload: { playerIndex: playerIdx, position: newPos } 
    });

    // small movement sound (also played from DiceRoller) in case of auto-move
    playSound('mouvement-du-pion.mp3');

    if (newPos === state.boardSquares.length - 1) {
      // Reached final square — end the game
      try {
        await endGame();
      } catch (e) {
        console.error('Error ending game:', e);
      }
      return;
    }

    const squareType = state.boardSquares[newPos];
    await handleSquare(squareType, playerIdx);
  }, [state, dispatch]);

  const handleSquare = useCallback(async (squareType, playerIdx) => {
    if (squareType === 'start' || squareType === 'end') {
      return;
    }

    // Play card drawn and reveal sounds, then fetch question
    if (squareType === 'random') {
      playSound('carte-aleatoire-suspense.wav');
      // suspense then reveal
      setTimeout(() => playSound('revelation-des-options.mp3'), 800);
    } else {
      playSound('carte-tiree.mp3');
      setTimeout(() => playSound('revelation-des-options.mp3'), 350);
    }
    await getQuestion(squareType);
  }, [state.mode, dispatch]);

  const getQuestion = useCallback(async (difficulty) => {
    try {
      const response = await gameAPI.getQuestion(difficulty, state.gameId);
      const questionData = response.data;
      // Shuffle options to avoid correct answer always appearing in same position
      const shuffleArray = (arr) => {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };

      const shuffledOptions = questionData.options ? shuffleArray(questionData.options) : [];
      const questionWithShuffledOptions = { ...questionData, options: shuffledOptions };

      // Dispatch to GameContext so CardModal can access it
      dispatch({ type: 'SET_QUESTION', payload: questionWithShuffledOptions });
    } catch (error) {
      console.error('Failed to get question:', error);
    }
  }, [dispatch]);

  const submitAnswer = useCallback(async (isCorrect, { playFeedback = true } = {}) => {
    if (!state.currentQuestion) return;

    // Persist answer to backend, then sync frontend score from server
    try {
      const player = state.players[state.currentPlayerIndex] || {};
      const playerId = player.playerId;
      const res = await gameAPI.submitAnswer(state.gameId, playerId, state.currentQuestion.difficulty, isCorrect, 0);
      if (res && res.data && typeof res.data.newScore !== 'undefined') {
        dispatch({ type: 'SET_PLAYER_SCORE', payload: { playerIndex: state.currentPlayerIndex, score: res.data.newScore } });
      } else {
        // fallback: update locally if API didn't return newScore
        const points = isCorrect ? getPointsForDifficulty(state.currentQuestion.difficulty) : 0;
        dispatch({ type: 'UPDATE_SCORE', payload: { playerIndex: state.currentPlayerIndex, points } });
      }
    } catch (apiErr) {
      console.error('Failed to persist answer to backend:', apiErr);
      // still update locally to keep game responsive
      const points = isCorrect ? getPointsForDifficulty(state.currentQuestion.difficulty) : 0;
      dispatch({ type: 'UPDATE_SCORE', payload: { playerIndex: state.currentPlayerIndex, points } });
    }

    // Play feedback sound (optionally suppressed by caller)
    if (playFeedback) {
      if (isCorrect) {
        playSound('bonne-reponse.wav');
      } else {
        playSound('mauvaise-reponse.mp3');
      }
    }

    // If incorrect, revert the player's position to where they came from
    if (!isCorrect) {
      try {
        console.log(`[submitAnswer] Wrong answer for player ${state.currentPlayerIndex}, reverting position...`);
        dispatch({ type: 'REVERT_POSITION', payload: { playerIndex: state.currentPlayerIndex } });
      } catch (e) {
        console.error('Failed to revert position:', e);
      }
    }
    
    // After answer, clear question and move to next player (multiplayer only)
    setTimeout(() => {
      dispatch({ type: 'CLEAR_QUESTION' });
      if (state.mode === 'team') {
        dispatch({ type: 'NEXT_PLAYER' });
      }
    }, 1500);
  }, [state, dispatch]);

  const endGame = useCallback(async () => {
    try {
      const response = await gameAPI.endGame(state.gameId);
      dispatch({ 
        type: 'END_GAME', 
        payload: response.data.ranking 
      });
      // play victory/outro sound
      playSound('victoire.wav');
    } catch (error) {
      console.error('Failed to end game:', error);
    }
  }, [state.gameId, dispatch]);

  const getPointsForDifficulty = (difficulty) => {
    const pointsMap = {
      easy: 1,
      medium: 3,
      hard: 5,
      random: 5
    };
    return pointsMap[difficulty] || 0;
  };

  return {
    startGame,
    rollDice,
    movePlayer,
    getQuestion,
    submitAnswer,
    endGame
  };
}
