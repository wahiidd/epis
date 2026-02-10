"use client";

import React, { useContext, useState } from 'react';
import { GameContextAPI } from '../../../lib/context/GameContext';
import { useGameLogic } from '../../../lib/hooks/useGameLogic';
import '../../../styles/ui.css';
import { playSound } from '../../../lib/services/sound';

export default function DiceRoller() {
  const { state } = useContext(GameContextAPI);
  const { rollDice, movePlayer } = useGameLogic();
  const [isRolling, setIsRolling] = useState(false);
  const [diceValue, setDiceValue] = useState(0);

  const isAwaitingAnswer = state.awaitingAnswer;
  const isMultiplayer = state.players && state.players.length > 1;
  const currentPlayer = state.players?.[state.currentPlayerIndex];

  const handleRollDice = async () => {
    if (isAwaitingAnswer) return;

    setIsRolling(true);
    const value = rollDice();
    setDiceValue(value);

    playSound('lancement-de-de.mp3');

    setTimeout(() => {
      movePlayer(value);
      playSound('mouvement-du-pion.mp3');
      setIsRolling(false);
      setDiceValue(0);
    }, 1000);
  };

  const isDisabled = isRolling || !state.gameActive || isAwaitingAnswer;

  return (
    <div className="dice-compact">
      {/* Player turn label — only in multiplayer */}
      {isMultiplayer && currentPlayer && (
        <div className="dice-turn-label">
          <span className="turn-player-name">{currentPlayer.name}</span>
          <span className="turn-text">à toi !</span>
        </div>
      )}

      {/* Dice result display */}
      {diceValue > 0 && !isRolling && (
        <div className="dice-result-bubble">
          <span className="dice-result-number">{diceValue}</span>
        </div>
      )}

      {/* The dice button */}
      <button
        className={`dice-btn ${isRolling ? 'rolling' : ''} ${isDisabled ? 'disabled' : ''}`}
        onClick={handleRollDice}
        disabled={isDisabled}
        title="Lancer le dé"
      >
        <span className="dice-btn-icon">{isRolling ? '🎲' : '🎲'}</span>
      </button>
      <span className="dice-label">Lancer le dé</span>
    </div>
  );
}
