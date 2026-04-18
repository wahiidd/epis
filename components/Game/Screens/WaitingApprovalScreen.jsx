"use client";

import React, { useContext, useEffect, useState } from 'react';
import { GameContextAPI } from '../../../lib/context/GameContext';
import { playSound } from '../../../lib/services/sound';
import Button from '../UI/Button';
import '../../../styles/screens.css';
import { listenToGameStatus } from '../../../lib/services/firebaseService';

export default function WaitingApprovalScreen() {
  const { state, dispatch } = useContext(GameContextAPI);
  console.log('WaitingApprovalScreen Render. gameId:', state.gameId, 'currentScreen:', state.currentScreen);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (!state.gameId || state.gameId === 'null' || state.gameId === 'undefined') {
      console.warn("WaitingApprovalScreen: skipping listen, gameId is invalid:", state.gameId);
      return;
    }

    console.log('WaitingApprovalScreen: starting real-time listener for:', state.gameId);
    
    // Subscribe to status changes in Firestore
    const unsubscribe = listenToGameStatus(state.gameId, (data) => {
      console.log('Firebase Update:', data);
      
      if (data.status === 'active') {
        setStatus('active');
        // Launch game
        playSound('debut-de-partie.mp3');
        dispatch({ 
          type: 'START_GAME', 
          payload: { gameId: state.gameId, boardSquares: data.boardState } 
        });
        dispatch({ type: 'SWITCH_SCREEN', payload: 'game' });
        // Clear persistence
        localStorage.removeItem('pendingGameId');
      } else if (data.status === 'rejected') {
        setStatus('rejected');
      }
    });

    return () => {
      console.log('WaitingApprovalScreen: cleaning up listener');
      unsubscribe();
    };
  }, [state.gameId, dispatch]);

  const handleBack = () => {
    localStorage.removeItem('pendingGameId');
    localStorage.removeItem('gameMode');
    dispatch({ type: 'SWITCH_SCREEN', payload: 'mode' });
  };

  return (
    <div className="screen mode-screen">
      <div className="mode-content shadow-[0_0_30px_rgba(86,191,124,0.3)] border-2 border-[#56bf7c]/50 relative overflow-hidden">
        
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#56bf7c] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ff0000] opacity-5 rounded-full blur-3xl" />

        <div className="text-center relative z-10 p-8">
          {status === 'pending' && (
            <>
              <div className="animate-spin-slow w-20 h-20 mx-auto mb-8 relative">
                <div className="absolute inset-0 rounded-full border-4 border-white/20 border-t-[#56bf7c]"></div>
                <div className="absolute inset-2 rounded-full border-4 border-white/10 border-b-[#a50606] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white uppercase tracking-widest textShadow-lg">
                En attente d'autorisation
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Veuillez patienter pendant qu'un administrateur valide votre partie.
              </p>
            </>
          )}

          {status === 'rejected' && (
            <>
              <div className="w-20 h-20 mx-auto mb-8 bg-[#a50606]/20 rounded-full flex items-center justify-center border-2 border-[#a50606]/50 shadow-[0_0_20px_rgba(165,6,6,0.5)]">
                <span className="text-4xl">❌</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-[#ff3333] tracking-wider">
                Demande Refusée
              </h2>
              <p className="text-white/80 text-lg mb-8">
                L'administrateur a refusé le démarrage de cette partie.
              </p>
              <Button variant="secondary" onClick={handleBack}>
                Retour au menu
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
