"use client";

import React from 'react';
import { SQUARE_COLORS } from '../../../lib/utils/constants';

// Warm, muted palette — no neon
const MUTED_COLORS = {
  easy: '#6fbf8a',
  medium: '#e0b95c',
  hard: '#c45e5e',
  random: '#e8e2d4',
  risk: '#cf9456',
  trap: '#6caec9',
  start: '#3a7c6e',
  end: '#e0b95c',
  bonus: '#a78bdb',
  mystery: '#8dafc7',
};

export default function Square({ index, type, playersOnSquare = [], style = {}, isLast = false }) {
  const hasPlayers = playersOnSquare.length > 0;
  const baseColor = MUTED_COLORS[type] || SQUARE_COLORS[type] || '#b8cfc3';
  const playerColors = ['#8B1538', '#4a8c5e', '#3b7dd8', '#d48a2e'];
  const playerAvatars = [
    '/game-assets/images/players/avatar1.png',
    '/game-assets/images/players/avatar2.png',
    '/game-assets/images/players/avatar3.png',
    '/game-assets/images/players/avatar4.png',
  ];

  const isStart = index === 0;

  return (
    <div
      className={`square ${type || 'empty'} ${hasPlayers ? 'has-players' : ''} ${isLast ? 'square-last' : ''} ${isStart ? 'square-start' : ''}`}
      style={{
        ...style,
        '--sq-color': isStart ? '#2a6b5a' : baseColor,
      }}
      title={`Case ${index + 1}: ${type}${hasPlayers ? ` (${playersOnSquare.map(p => p.name).join(', ')})` : ''}`}
    >
      {/* Inner gradient overlay for non-flat look */}
      <span className="square-inner" />

      {/* Start label */}
      {isStart && !hasPlayers && <span className="start-label">GO</span>}
      {isStart && !hasPlayers && <span className="start-flag">🚩</span>}

      {/* Number */}
      {!hasPlayers && !isStart && <span className="square-number">{index + 1}</span>}

      {/* Players */}
      {hasPlayers && (
        <div className="players-container">
          {playersOnSquare.map((player, idx) => (
            <div
              key={idx}
              className="player-circle"
              style={{
                borderColor: playerColors[player.index % playerColors.length],
                order: player.index
              }}
              title={player.name}
            >
              <img
                src={playerAvatars[player.index % playerAvatars.length]}
                alt={player.name}
                className="player-avatar-img"
              />
            </div>
          ))}
        </div>
      )}

      {/* Mystery / bonus icon */}
      {(type === 'mystery' || type === 'bonus') && !hasPlayers && (
        <span className="mystery-icon">?</span>
      )}
    </div>
  );
}
