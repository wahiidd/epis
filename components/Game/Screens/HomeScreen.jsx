"use client";

import React, { useContext, useEffect, useState } from 'react';
import { GameContextAPI } from '../../../lib/context/GameContext';
import Button from '../UI/Button';
import { playSound, stopSound } from '../../../lib/services/sound';
import '../../../styles/screens.css';

export default function HomeScreen() {
  const { dispatch } = useContext(GameContextAPI);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    // Play background music with autoplay muted fallback
    const playMusic = () => {
      try {
        playSound('menu-principal.mp3', { loop: true, volume: 0.5 });
      } catch (error) {
        console.log('Music autoplay may be blocked, will play on interaction');
      }
    };
    
    playMusic();
    
    // Also try to play on first user interaction if autoplay was blocked
    const handleInteraction = () => {
      playMusic();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
    
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const handlePlay = () => {
    dispatch({ type: 'SWITCH_SCREEN', payload: 'mode' });
    playSound('navigation.mp3');
  };

  const handleRulesClick = () => {
    setShowRules(true);
    playSound('navigation.mp3');
  };

  const handleCloseRules = () => {
    setShowRules(false);
    playSound('navigation.mp3');
  };

  return (
    <div className="screen home-screen">
      <div className="home-content">
        <div className="home-header">
          <img src="/game-assets/images/title.png" alt="Epistemia Title" className="game-title" />
          <p className="game-subtitle">Le jeu de la connaissance</p>
        </div>

        <div className="home-intro">
          <p>Bienvenue dans EPISTEMIA, un jeu éducatif fascinant où vous testez votre compréhension de l'épistémologie.</p>
          <p>Avancez sur le plateau, répondez aux questions et devinez le "Grand Épistémologue"!</p>
        </div>

        <div className="home-buttons">
          <Button variant="primary" onClick={handlePlay}>
            🎮 Jouer
          </Button>
          <Button variant="secondary" onClick={handleRulesClick}>
            📋 Règles
          </Button>
        </div>
      </div>

      {showRules && (
        <div className="rules-modal-overlay" onClick={handleCloseRules}>
          <div className="rules-modal" onClick={(e) => e.stopPropagation()}>
            <div className="rules-header">
              <h2>📋 Règles du Jeu</h2>
              <button className="rules-close" onClick={handleCloseRules}>✕</button>
            </div>

            <div className="rules-content">
              <section className="rules-section">
                <h3>🎮 Objectif Principal</h3>
                <p>Avancez sur le plateau de 73 cases, répondez aux questions et atteignez la fin avec le meilleur score!</p>
              </section>

              <section className="rules-section">
                <h3>🎲 Mécanique de Jeu</h3>
                <ul>
                  <li>Lancez le dé pour avancer sur le plateau</li>
                  <li>Répondez aux questions selon le type de case</li>
                  <li>Vous avez 20 secondes pour répondre</li>
                  <li>Une réponse incorrecte vous ramène à votre position précédente</li>
                  <li>Le timeout (fin du compte à rebours) vous ramène aussi en arrière</li>
                </ul>
              </section>

              <section className="rules-section">
                <h3>⭐ Système de Points</h3>
                <ul>
                  <li><strong>Facile:</strong> 1 point ✓</li>
                  <li><strong>Moyen:</strong> 3 points ✓</li>
                  <li><strong>Difficile:</strong> 5 points ✓</li>
                  <li><strong>Réponse incorrecte:</strong> 0 point</li>
                </ul>
              </section>

              <section className="rules-section">
                <h3>🟦 Types de Cases</h3>
                <div className="cases-grid">
                  <div className="case-item">
                    <span className="case-color" style={{backgroundColor: '#5FD89C'}}></span>
                    <div>
                      <strong>Vert - Facile</strong>
                      <p>Questions élémentaires</p>
                    </div>
                  </div>
                  <div className="case-item">
                    <span className="case-color" style={{backgroundColor: '#F4C430'}}></span>
                    <div>
                      <strong>Jaune - Moyen</strong>
                      <p>Niveau intermédiaire</p>
                    </div>
                  </div>
                  <div className="case-item">
                    <span className="case-color" style={{backgroundColor: '#C1272D'}}></span>
                    <div>
                      <strong>Rouge - Difficile</strong>
                      <p>Défis complexes</p>
                    </div>
                  </div>
                  <div className="case-item">
                    <span className="case-color" style={{backgroundColor: '#F5F1E8', border: '2px solid #8B1538'}}></span>
                    <div>
                      <strong>Beige - Aléatoire</strong>
                      <p>Surprise! (5 points)</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rules-section">
                <h3>✨ Indicateurs Joueur</h3>
                <p>De petits cercles colorés apparaissent dans chaque case pour indiquer où se trouvent les joueurs.</p>
                <p>Les cercles sont de couleurs différentes pour chaque joueur et affichent leur numéro en mode multijoueur.</p>
              </section>

              <section className="rules-section">
                <h3>🏆 Victoire</h3>
                <p>Le premier joueur à atteindre la fin du plateau gagne! Mais c'est le score final qui détermine le vrai "Grand Épistémologue"!</p>
              </section>
            </div>

            <div className="rules-footer">
              <Button variant="primary" onClick={handleCloseRules}>
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
