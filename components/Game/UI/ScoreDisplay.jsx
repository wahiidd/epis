"use client";

import React, { useContext } from 'react';
import { GameContextAPI } from '../../../lib/context/GameContext';
import '../../../styles/ui.css';

export default function ScoreDisplay() {
  const { state } = useContext(GameContextAPI);

  const currentPlayerScore = state.players[state.currentPlayerIndex]?.score || 0;
  
  console.log('[ScoreDisplay] Players:', state.players, 'Current index:', state.currentPlayerIndex);

  return (
    <div className="score-display">
      <h3>📊 Scores</h3>
      <div className="score-info">
        {state.players && state.players.length > 0 ? (
          state.players.map((player, index) => (
            <div
              key={index}
              className={`score-item ${index === state.currentPlayerIndex ? 'active' : ''}`}
            >
              <span className="player-name">{player.name}</span>
              <span className="player-score">{player.score || 0}</span>
            </div>
          ))
        ) : (
          <div className="no-players">No players in game</div>
        )}
      </div>
    </div>
  );
}
