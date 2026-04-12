"use client";

import React, { useContext, useMemo } from 'react';
import { GameContextAPI } from '../../../lib/context/GameContext';
import Square from './Square';
import '../../../styles/board.css';

/**
 * Place tiles along a tight Archimedean spiral where each ring
 * is spaced exactly one tile-diameter apart. Tiles sit like cells,
 * touching their neighbours without overlapping.
 */
function generateSpiralPositions(totalSquares) {
  const cx = 50;
  const cy = 45;

  // Tile diameter in % of the board
  const tileDiameter = 4.2;
  const gap = 1.0; // breathing room between tiles along the arc
  const step = tileDiameter + gap; // center-to-center along the arc

  // Ring spacing — generous so rings are clearly separated
  const ringGap = tileDiameter + gap + 1.2;

  // Archimedean spiral: r = a + b*θ
  const b = ringGap / (2 * Math.PI);
  const a = 6 ; // inner radius — room for trophy

  // First pass: compute raw angles & find max radius
  const rawAngles = [];
  let angle = 0;
  for (let i = 0; i < totalSquares; i++) {
    rawAngles.push(angle);
    const r = a + b * angle;
    const dTheta = step / Math.max(r, 1);
    angle += dTheta;
  }

  // Find the max radius the spiral reaches
  const maxR = a + b * rawAngles[rawAngles.length - 1];

  // Scale factor: fit the spiral within 48% of the board (leaves ~2% margin)
  const scale = 48 / maxR;

  // Rotate so tile #1 (outermost after reverse) lands at top-left
  const lastAngle = rawAngles[rawAngles.length - 1];
  const targetAngle = -3 * Math.PI / 4; // top-left
  const angleOffset = targetAngle - lastAngle;

  const positions = [];
  for (let i = 0; i < totalSquares; i++) {
    const theta = rawAngles[i];
    const r = (a + b * theta) * scale;
    const x = cx + r * Math.cos(theta + angleOffset);
    const y = cy + r * Math.sin(theta + angleOffset);

    positions.push({
      left: `${x}%`,
      top: `${y}%`,
    });
  }

  // Reverse so tile #1 is on the outside (top-left) spiraling inward to trophy
  return positions.reverse();
}

/** Build SVG path matching the same spiral the tiles follow */
function buildTrackPath(totalSquares) {
  const cx = 50, cy = 45;
  const tileDiameter = 4.2, gap = 1.0;
  const step = tileDiameter + gap;
  const ringGap = tileDiameter + gap + 1.2;
  const b = ringGap / (2 * Math.PI);
  const a = 10 ;

  // Compute total angle span (same as tile placement)
  let angle = 0;
  for (let i = 0; i < totalSquares; i++) {
    const r = a + b * angle;
    angle += step / Math.max(r, 1);
  }
  const maxAngle = angle;
  const maxR = a + b * maxAngle;
  const scale = 48 / maxR;

  // Angle offset (same as tiles)
  const targetAngle = -3 * Math.PI / 4;
  const angleOffset = targetAngle - maxAngle;

  // Draw smooth path with many steps
  const steps = 600;
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * maxAngle;
    const r = (a + b * t) * scale;
    const x = cx + r * Math.cos(t + angleOffset);
    const y = cy + r * Math.sin(t + angleOffset);
    d += (i === 0 ? 'M' : 'L') + `${x.toFixed(2)},${y.toFixed(2)} `;
  }
  return d;
}

export default function GameBoard() {
  const { state } = useContext(GameContextAPI);
  // Defensive: ensure boardSquares is always an array
  const boardSquares = Array.isArray(state.boardSquares) ? state.boardSquares : [];
  const totalSquares = boardSquares.length;

  const spiralPositions = useMemo(() => generateSpiralPositions(totalSquares), [totalSquares]);
  const trackPath = useMemo(() => buildTrackPath(totalSquares), [totalSquares]);

  const getPlayersOnSquare = (squareIndex) => {
    const playersOnSquare = [];
    Object.entries(state.playerPositions).forEach(([playerIndex, position]) => {
      if (position === squareIndex) {
        playersOnSquare.push({
          index: parseInt(playerIndex),
          name: state.players[playerIndex]?.name || `P${parseInt(playerIndex) + 1}`
        });
      }
    });
    return playersOnSquare;
  };

  // Show loading or placeholder if board is not ready
  if (!totalSquares) {
    return <div className="board-container"><div className="loading">Loading board...</div></div>;
  }

  return (
    <div className="board-container">
      {/* Floating decorations */}
      <img src="/images/deco1.png" alt="" className="board-deco deco-1" />
      <img src="/images/deco2.png" alt="" className="board-deco deco-2" />
      <img src="/images/Avatar Logo.png" alt="" className="board-deco deco-3" />
      <img src="/images/logodes.png" alt="" className="board-deco deco-4" />

      {/* Floating emojis */}
      <div className="board-emoji emoji-1">✨</div>
      <div className="board-emoji emoji-2">🎮</div>
      <div className="board-emoji emoji-3">🎯</div>
      <div className="board-emoji emoji-4">⚡</div>
      <div className="board-emoji emoji-5">💫</div>

      {/* Twinkling particles */}
      <div className="board-particle particle-1"></div>
      <div className="board-particle particle-2"></div>
      <div className="board-particle particle-3"></div>
      <div className="board-particle particle-4"></div>
      <div className="board-particle particle-5"></div>
      <div className="board-particle particle-6"></div>

      {/* Question mark decorations */}
      <div className="board-question q-1">?</div>
      <div className="board-question q-2">?</div>
      <div className="board-question q-3">?</div>

      {/* ─── THE BOARD ─── */}
      <div className="game-board-spiral">
        {/* Warm yellowish path behind the tiles */}
        <svg className="spiral-track" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <path d={trackPath} fill="none" stroke="rgba(180,160,120,0.18)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d={trackPath} fill="none" stroke="rgba(200,180,140,0.12)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Center finish zone */}
        <div className="finish-zone">
          <div className="finish-ring ring-1"></div>
          <div className="finish-ring ring-2"></div>
          <div className="finish-ring ring-3"></div>
          <div className="finish-glow"></div>
          <div className="trophy-center">
            <div className="trophy-icon">🏆</div>
            <div className="sparkle s1">✦</div>
            <div className="sparkle s2">✦</div>
            <div className="sparkle s3">✦</div>
            <div className="sparkle s4">⭑</div>
            <div className="sparkle s5">⭑</div>
          </div>
        </div>

        {/* Tiles */}
        {boardSquares.map((squareType, index) => (
          <Square
            key={index}
            index={index}
            type={squareType}
            playersOnSquare={getPlayersOnSquare(index)}
            style={spiralPositions[index]}
            isLast={index === totalSquares - 1}
          />
        ))}
      </div>
    </div>
  );
}
