"use client";

import React, { useContext } from 'react';
import { GameContextAPI } from '../../../lib/context/GameContext';
import '../../../styles/ui.css';

export default function PlayersList() {
  const { state } = useContext(GameContextAPI);

  const playerAvatars = [
    '/game-assets/images/players/avatar1.png',
    '/game-assets/images/players/avatar2.png',
    '/game-assets/images/players/avatar3.png',
    '/game-assets/images/players/avatar4.png',
  ];

  return (
    <div className="players-list">
      <h3>👥 Joueurs</h3>
      <div className="players-info">
        {state.players.map((player, index) => (
          <div
            key={index}
            className={`player-item ${index === state.currentPlayerIndex ? 'active' : ''}`}
          >
            <span className="player-indicator player-indicator-avatar">
              <img
                src={playerAvatars[index % playerAvatars.length]}
                alt={player.name}
                className="indicator-avatar-img"
              />
            </span>
            <span className="player-details">
              {player.name} - Case {(state.playerPositions[index] || 0) + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
