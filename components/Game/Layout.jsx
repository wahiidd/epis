"use client";

import React, { useContext } from 'react';
import { GameContextAPI } from '../context/GameContext';
import HomeScreen from './Screens/HomeScreen';
import ModeScreen from './Screens/ModeScreen';
import GameScreen from './Screens/GameScreen';
import PodiumScreen from './Screens/PodiumScreen';
import '../styles/layout.css';

export default function Layout() {
  const { state } = useContext(GameContextAPI);

  return (
    <div className="layout">
      {state.currentScreen === 'home' && <HomeScreen />}
      {state.currentScreen === 'mode' && <ModeScreen />}
      {state.currentScreen === 'game' && <GameScreen />}
      {state.currentScreen === 'podium' && <PodiumScreen />}
    </div>
  );
}
