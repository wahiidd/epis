"use client";

import { useCallback, useContext } from 'react';
import { GameContextAPI } from '../context/GameContext';
import { generateBoard } from '../utils/gameEngine';
import { createGameSession, updateGamePlayers, completeGame } from '../services/firebaseService';
import { playSound, stopSound } from '../services/sound';
import axios from 'axios';

export function useGameLogic() {
  const { state, dispatch } = useContext(GameContextAPI);

  const getPointsForDifficulty = useCallback((difficulty) => {
    const pointsMap = {
      easy: 1,
      medium: 3,
      hard: 5,
      random: 5
    };
    return pointsMap[difficulty] || 0;
  }, []);

  const getQuestion = useCallback(async (difficulty) => {
    try {
      const response = await axios.get(`/api/game/question?difficulty=${difficulty}`);
      const questionData = response.data;
      
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

      dispatch({ type: 'SET_QUESTION', payload: questionWithShuffledOptions });
    } catch (error) {
      console.error('Failed to get question:', error);
    }
  }, [dispatch]);

  const handleSquare = useCallback(async (squareType, playerIdx) => {
    if (squareType === 'start' || squareType === 'end') {
      return;
    }

    if (squareType === 'random') {
      playSound('carte-aleatoire-suspense.wav');
      setTimeout(() => playSound('revelation-des-options.mp3'), 800);
    } else {
      playSound('carte-tiree.mp3');
      setTimeout(() => playSound('revelation-des-options.mp3'), 350);
    }
    await getQuestion(squareType);
  }, [getQuestion]);

  const endGame = useCallback(async () => {
    try {
      const ranking = [...state.players].sort((a, b) => (b.score || 0) - (a.score || 0));
      await completeGame(state.gameId, ranking);
      dispatch({ type: 'END_GAME', payload: ranking });
      playSound('victoire.wav');
    } catch (error) {
      console.error('Failed to end game:', error);
    }
  }, [state.gameId, state.players, dispatch]);

  const movePlayer = useCallback(async (steps) => {
    const playerIdx = state.currentPlayerIndex;
    const currentPos = state.playerPositions[playerIdx] || 0;
    const newPos = Math.min(currentPos + steps, state.boardSquares.length - 1);

    dispatch({ 
      type: 'UPDATE_POSITION', 
      payload: { playerIndex: playerIdx, position: newPos } 
    });

    playSound('mouvement-du-pion.mp3');

    if (newPos === state.boardSquares.length - 1) {
      try {
        await endGame();
      } catch (e) {
        console.error('Error ending game:', e);
      }
      return;
    }

    const squareType = state.boardSquares[newPos];
    await handleSquare(squareType, playerIdx);
  }, [state.currentPlayerIndex, state.playerPositions, state.boardSquares, endGame, handleSquare, dispatch]);

  const startGame = useCallback(async (mode, playerNames) => {
    try {
      const gameData = {
        mode,
        players: playerNames.map((name, idx) => ({
          name,
          playerId: `p${idx + 1}`,
          score: 0
        })),
        boardState: generateBoard(),
        createdAt: new Date().toISOString()
      };

      const result = await createGameSession(gameData);
      
      if (!result.success) {
        throw new Error(result.error || "Invalid response from server");
      }

      const { gameId } = result;

      dispatch({ type: 'SET_MODE', payload: mode });
      dispatch({ 
        type: 'SET_PENDING_GAME', 
        payload: { gameId, players: gameData.players } 
      });
      
      localStorage.setItem('pendingGameId', gameId);
      localStorage.setItem('gameMode', mode);

      dispatch({ type: 'SWITCH_SCREEN', payload: 'waiting_approval' });
      stopSound('menu-principal.mp3');
    } catch (error) {
      console.error('Failed to start game:', error);
      localStorage.removeItem('pendingGameId');
    }
  }, [dispatch]);

  const submitAnswer = useCallback(async (isCorrect, { playFeedback = true } = {}) => {
    if (!state.currentQuestion) return;

    try {
      const points = isCorrect ? getPointsForDifficulty(state.currentQuestion.difficulty) : 0;
      
      const updatedPlayers = state.players.map((p, idx) => {
        if (idx === state.currentPlayerIndex) {
          return { ...p, score: (p.score || 0) + points };
        }
        return p;
      });

      await updateGamePlayers(state.gameId, updatedPlayers);

      dispatch({ 
        type: 'SET_PLAYER_SCORE', 
        payload: { 
          playerIndex: state.currentPlayerIndex, 
          score: updatedPlayers[state.currentPlayerIndex].score 
        } 
      });

    } catch (err) {
      console.error('Failed to persist answer to Firebase:', err);
      const points = isCorrect ? getPointsForDifficulty(state.currentQuestion.difficulty) : 0;
      dispatch({ type: 'UPDATE_SCORE', payload: { playerIndex: state.currentPlayerIndex, points } });
    }

    if (playFeedback) {
      if (isCorrect) playSound('bonne-reponse.wav');
      else playSound('mauvaise-reponse.mp3');
    }

    if (!isCorrect) {
      dispatch({ type: 'REVERT_POSITION', payload: { playerIndex: state.currentPlayerIndex } });
    }
    
    setTimeout(() => {
      dispatch({ type: 'CLEAR_QUESTION' });
      if (state.mode === 'team') {
        dispatch({ type: 'NEXT_PLAYER' });
      }
    }, 1500);
  }, [state, dispatch, getPointsForDifficulty]);

  const rollDice = useCallback(() => {
    return Math.floor(Math.random() * 6) + 1;
  }, []);

  return {
    startGame,
    rollDice,
    movePlayer,
    getQuestion,
    submitAnswer,
    endGame
  };
}
