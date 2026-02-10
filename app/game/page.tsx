"use client";

import React, { useContext, useEffect } from 'react';
import { GameContextAPI } from '../../lib/context/GameContext';
import ModeScreen from '../../components/Game/Screens/ModeScreen';
import GameScreen from '../../components/Game/Screens/GameScreen';
import PodiumScreen from '../../components/Game/Screens/PodiumScreen';
import GameContext from '../../lib/context/GameContext';
import '../../styles/layout.css';
import '../../styles/index.css';
import '../../styles/loading.css';
import '../../styles/screens.css';
import '../../styles/board.css';
import '../../styles/cards.css';
import '../../styles/podium.css';
import '../../styles/ui.css';

function GameLayout() {
  const context = useContext(GameContextAPI);
  
  if (!context) {
    return null;
  }

  const { state, dispatch } = context;

  useEffect(() => {
    // When game page loads, switch to mode screen if still on home
    if (state.currentScreen === 'home') {
      dispatch({ type: 'SWITCH_SCREEN', payload: 'mode' });
    }
    
    // Récupérer le mode de jeu depuis localStorage
    const gameMode = localStorage.getItem('gameMode');
    if (gameMode) {
      dispatch({ type: 'SET_MODE', payload: gameMode });
    }
  }, []);

  return (
    <div className="layout">
      {state.currentScreen === 'mode' && <ModeScreen />}
      {state.currentScreen === 'game' && <GameScreen />}
      {state.currentScreen === 'podium' && <PodiumScreen />}
    </div>
  );
}

export default function GamePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Rich teal/green background with soft lighting falloff */}
      <div className="absolute inset-0" style={{
        zIndex: 0,
        background: 'linear-gradient(160deg, #1a5c4a 0%, #0f4639 30%, #0a3830 60%, #072c26 100%)'
      }} />
      {/* Soft radial light from center-top */}
      <div className="absolute inset-0" style={{
        zIndex: 1,
        background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(86,191,124,0.12) 0%, transparent 70%)'
      }} />
      {/* Subtle vignette */}
      <div className="absolute inset-0" style={{
        zIndex: 1,
        background: 'radial-gradient(circle at center, transparent 40%, rgba(5,20,16,0.4) 100%)'
      }} />

      {/* Decorative images — softer */}
      <img src="/images/deco1.png" alt="" className="absolute top-10 left-10 w-20 h-20 md:w-28 md:h-28 opacity-15 animate-float blur-[1px]" style={{ zIndex: 1 }} />
      <img src="/images/deco2.png" alt="" className="absolute bottom-20 right-20 w-24 h-24 md:w-36 md:h-36 opacity-12 animate-float-delayed blur-[1px]" style={{ zIndex: 1 }} />
      <img src="/images/Avatar Logo.png" alt="" className="absolute top-1/4 right-10 w-16 h-16 md:w-24 md:h-24 opacity-[0.06] animate-pulse-slow rotate-12" style={{ zIndex: 1 }} />
      <img src="/images/logodes.png" alt="" className="absolute bottom-10 left-1/4 w-12 h-12 md:w-20 md:h-20 opacity-[0.08] animate-spin-slow" style={{ zIndex: 1 }} />

      {/* Subtle particles */}
      <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-twinkle shadow-[0_0_6px_rgba(255,255,255,0.4)]" style={{ zIndex: 1 }}></div>
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#6fbf8a] rounded-full opacity-30 animate-twinkle-delayed shadow-[0_0_8px_rgba(111,191,138,0.3)]" style={{ zIndex: 1 }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-40 animate-twinkle shadow-[0_0_6px_rgba(255,255,255,0.3)]" style={{ zIndex: 1 }}></div>
      <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-[#c45e5e] rounded-full opacity-25 animate-twinkle-delayed shadow-[0_0_8px_rgba(196,94,94,0.2)]" style={{ zIndex: 1 }}></div>

      <GameContext>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <GameLayout />
        </div>
      </GameContext>
    </div>
  );
}
