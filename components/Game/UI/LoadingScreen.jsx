"use client";

import React, { useEffect } from 'react';
import '../../../styles/loading.css';
import { playSound } from '../../../lib/services/sound';

export default function LoadingScreen() {
  useEffect(() => {
    // play a subtle loading sound once
    playSound('chargement.mp3');
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-center">
        <div className="logo-anim">
          <span className="l">E</span>
          <span className="l">P</span>
          <span className="l">I</span>
          <span className="l">S</span>
          <span className="l">T</span>
          <span className="l">E</span>
          <span className="l">M</span>
          <span className="l">I</span>
          <span className="l">A</span>
        </div>
        <div className="loading-sub">The Knowledge Board Game</div>
      </div>
    </div>
  );
}
