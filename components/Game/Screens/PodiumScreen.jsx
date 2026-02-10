"use client";

import React, { useContext, useEffect } from 'react';
import { GameContextAPI } from '../../../lib/context/GameContext';
import { playSound } from '../../../lib/services/sound';
import Button from '../UI/Button';
import PodiumPosition from '../Podium/PodiumPosition';
import '../../../styles/screens.css';

export default function PodiumScreen() {
  const { state, dispatch } = useContext(GameContextAPI);

  useEffect(() => {
    playSound('outro-ecran-final.mp3');
  }, []);

  const handlePlayAgain = () => {
    dispatch({ type: 'RESET_GAME' });
    dispatch({ type: 'SWITCH_SCREEN', payload: 'home' });
  };

  const topThree = state.topScores.slice(0, 3);

  return (
    <div className="screen podium-screen">
      <div className="podium-content">
        <h2>🏆 Podium Final</h2>

        <div className="podium">
          {topThree.map((player, index) => (
            <PodiumPosition
              key={index}
              rank={index + 1}
              player={player}
            />
          ))}
        </div>

        <div className="podium-buttons">
          <Button variant="primary" onClick={handlePlayAgain}>
            🎮 Rejouer
          </Button>
        </div>
      </div>
    </div>
  );
}

