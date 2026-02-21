"use client";

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameContextAPI } from '../../../lib/context/GameContext';
import GameBoard from '../Board/GameBoard';
import CardModal from '../Cards/CardModal';
import DiceRoller from '../UI/DiceRoller';
import ScoreDisplay from '../UI/ScoreDisplay';
import PlayersList from '../UI/PlayersList';
import '../../../styles/screens.css';

export default function GameScreen() {
  const { state, dispatch } = useContext(GameContextAPI);
  const router = useRouter();
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  const handleQuit = () => {
    setShowQuitConfirm(true);
  };

  const confirmQuit = () => {
    dispatch({ type: 'RESET_GAME' });
    router.push('/');
  };

  return (
    <div className="screen game-screen">
      <div className="game-layout">
        <div className="game-main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <GameBoard />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
            <DiceRoller />
          </div>
        </div>

        <div className="game-sidebar">
          <button onClick={handleQuit} className="quit-game-btn">
            ✕ Quitter
          </button>
          <ScoreDisplay />
          <PlayersList />
        </div>
      </div>

  {state.currentQuestion && <CardModal />}

  {showQuitConfirm && (
    <div className="quit-confirm-overlay" onClick={() => setShowQuitConfirm(false)}>
      <div className="quit-confirm-box" onClick={e => e.stopPropagation()}>
        <p>Voulez-vous vraiment quitter la partie ?</p>
        <div className="quit-confirm-buttons">
          <button className="quit-confirm-yes" onClick={confirmQuit}>Oui, quitter</button>
          <button className="quit-confirm-no" onClick={() => setShowQuitConfirm(false)}>Annuler</button>
        </div>
      </div>
    </div>
  )}
    </div>
  );
}
