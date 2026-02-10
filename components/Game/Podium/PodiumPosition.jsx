"use client";

import React from 'react';
import '../../../styles/podium.css';

export default function PodiumPosition({ rank, player }) {
  const medals = {
    1: '🥇',
    2: '🥈',
    3: '🥉'
  };

  const getMedalColor = (rank) => {
    if (rank === 1) return '#FFD700';
    if (rank === 2) return '#C0C0C0';
    return '#CD7F32';
  };

  return (
    <div className={`podium-position rank-${rank}`}>
      <div className="medal" style={{ color: getMedalColor(rank) }}>
        {medals[rank]}
      </div>
      <div className="podium-info">
        <h3>{player.name}</h3>
        <p className="score">{player.score} points</p>
        <p className="rank">#{rank}</p>
      </div>
    </div>
  );
}
