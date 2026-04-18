"use client";

import React, { createContext, useReducer, ReactNode } from 'react';


interface Player {
  name: string;
  avatar: string;
  score: number;
}

interface Question {
  _id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: string;
  points: number;
}

interface GameState {
  currentScreen: 'home' | 'mode' | 'game' | 'podium' | 'waiting_approval';
  mode: 'solo' | 'team' | null;
  players: Player[];
  currentPlayerIndex: number;
  boardSquares: any[];
  playerPositions: { [key: number]: number };
  gameActive: boolean;
  currentScore: number;
  topScores: any[];
  gameId: string | null;
  roundCount: number;
  currentQuestion: Question | null;
  awaitingAnswer: boolean;
  lastPositions: { [key: number]: number };
}

interface GameAction {
  type: string;
  payload?: any;
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export const GameContextAPI = createContext<GameContextType | undefined>(undefined);

const initialState: GameState = {
  currentScreen: 'home',
  mode: null,
  players: [],
  currentPlayerIndex: 0,
  boardSquares: [],
  playerPositions: {},
  gameActive: false,
  currentScore: 0,
  topScores: [],
  gameId: null,
  roundCount: 0,
  currentQuestion: null,
  awaitingAnswer: false,
  lastPositions: {}
};

function gameReducer(state: GameState, action: GameAction): GameState {
  console.log(`[REDUCER] Action: ${action.type}`, action.payload);
  switch (action.type) {
    case 'SWITCH_SCREEN':
      return { ...state, currentScreen: action.payload };
    case 'SET_PENDING_GAME':
      return {
        ...state,
        gameId: action.payload.gameId,
        players: action.payload.players.map((p: any) => ({
          playerId: p.playerId,
          name: p.name,
          score: p.score || 0,
          position: 0,
          avatar: p.avatar || '/images/Avatar Logo.png'
        }))
      };
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'SET_PLAYERS':
      return { ...state, players: action.payload };
    case 'SET_BOARD':
      return { ...state, boardSquares: action.payload };
    case 'UPDATE_POSITION':
      const prevPos = state.playerPositions[action.payload.playerIndex] || 0;
      console.log(`[UPDATE_POSITION] Player ${action.payload.playerIndex}: pos ${prevPos} → ${action.payload.position}, saved lastPositions[${action.payload.playerIndex}] = ${prevPos}`);
      return {
        ...state,
        playerPositions: {
          ...state.playerPositions,
          [action.payload.playerIndex]: action.payload.position
        },
        lastPositions: {
          ...state.lastPositions,
          [action.payload.playerIndex]: prevPos
        }
      };

    case 'REVERT_POSITION':
      const revertIdx = action.payload.playerIndex;
      const revertTo = state.lastPositions[revertIdx] || 0;
      console.log(`[REVERT_POSITION] Player ${revertIdx}: reverting to ${revertTo}, lastPositions available:`, state.lastPositions);
      return {
        ...state,
        playerPositions: {
          ...state.playerPositions,
          [revertIdx]: revertTo
        }
      };
    case 'UPDATE_SCORE': {
      const updatedPlayers = [...state.players];
      const idx = action.payload.playerIndex;
      const existing = updatedPlayers[idx] || { name: '', avatar: '', score: 0 };
      updatedPlayers[idx] = {
        ...existing,
        score: (existing.score || 0) + (action.payload.points || 0)
      };
      return { ...state, players: updatedPlayers };
    }
    case 'SET_PLAYER_SCORE': {
      const updatedPlayers = [...state.players];
      const idx = action.payload.playerIndex;
      const existing = updatedPlayers[idx] || { name: '', avatar: '', score: 0 };
      updatedPlayers[idx] = {
        ...existing,
        score: action.payload.score
      };
      return { ...state, players: updatedPlayers };
    }
    case 'START_GAME':
      const initialPositions: { [key: number]: number } = {};
      state.players.forEach((_, idx) => {
        initialPositions[idx] = 0;
      });
      console.log('[START_GAME] Initialized playerPositions:', initialPositions);
      return {
        ...state,
        gameActive: true,
        gameId: action.payload.gameId,
        boardSquares: action.payload.boardSquares,
        playerPositions: initialPositions
      };
    case 'END_GAME':
      return {
        ...state,
        gameActive: false,
        currentScreen: 'podium',
        topScores: action.payload
      };
    case 'SET_QUESTION':
      return { ...state, currentQuestion: action.payload, awaitingAnswer: true };
    case 'CLEAR_QUESTION':
      return { ...state, currentQuestion: null, awaitingAnswer: false };
    case 'NEXT_PLAYER':
      return { ...state, currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
}

export default function GameContext({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContextAPI.Provider value={{ state, dispatch }}>
      {children}
    </GameContextAPI.Provider>
  );
}
