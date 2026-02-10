"use client";

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameContextAPI } from '../../../lib/context/GameContext';
import { useGameLogic } from '../../../lib/hooks/useGameLogic';
import Button from '../UI/Button';
import '../../../styles/screens.css';

export default function ModeScreen() {
  const { dispatch } = useContext(GameContextAPI);
  const { startGame } = useGameLogic();
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState(null);
  const [playerNames, setPlayerNames] = useState(['']);

  const [playerCount, setPlayerCount] = useState(null);

  const handleSolo = () => {
    setSelectedMode('solo');
    setPlayerNames(['Joueur 1']);
  };

  const handleTeam = () => {
    setSelectedMode('team');
    setPlayerCount(null); // Allow user to select count
  };

  const handlePlayerCountSelect = (count) => {
    setPlayerCount(count);
    const names = Array.from({ length: count }, (_, i) => `Joueur ${i + 1}`);
    setPlayerNames(names);
  };

  const handleStartGame = async () => {
    if (!selectedMode) return;
    const validNames = playerNames.filter(n => n.trim()).slice(0, selectedMode === 'solo' ? 1 : 4);
    if (validNames.length === 0) {
      alert('Veuillez entrer au moins un nom de joueur');
      return;
    }
    await startGame(selectedMode, validNames);
  };

  const handleNameChange = (index, value) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  const handleBack = () => {
    setSelectedMode(null);
    setPlayerCount(null);
    setPlayerNames(['']);
  };

  return (
    <div className="screen mode-screen">
      <div className="mode-content">
        <h2>Sélectionnez un mode</h2>

        {!selectedMode && (
          <div className="mode-buttons">
            <div className="mode-card" onClick={handleSolo}>
              <h3>👤 Solo</h3>
              <p>Jouez seul et affrontez le tableau!</p>
              <Button variant="primary">Sélectionner</Button>
            </div>

            <div className="mode-card" onClick={handleTeam}>
              <h3>👥 Équipe</h3>
              <p>Jouez jusqu'à 4 joueurs simultanément!</p>
              <Button variant="primary">Sélectionner</Button>
            </div>
          </div>
        )}

        {selectedMode === 'solo' && (
          <div className="player-setup">
            <h3>Configuration du joueur</h3>
            <div className="player-inputs">
              {playerNames.map((name, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Joueur ${index + 1}`}
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  className="player-input"
                />
              ))}
            </div>

            <div className="mode-action-buttons">
              <Button variant="primary" onClick={handleStartGame}>
                🎮 Démarrer le jeu
              </Button>
              <Button variant="secondary" onClick={handleBack}>
                ← Retour
              </Button>
            </div>
          </div>
        )}

        {selectedMode === 'team' && !playerCount && (
          <div className="player-setup">
            <h3>Combien de joueurs?</h3>
            <div className="player-count-buttons">
              {[2, 3, 4].map((count) => (
                <Button 
                  key={count}
                  variant="primary" 
                  onClick={() => handlePlayerCountSelect(count)}
                >
                  {count} joueurs
                </Button>
              ))}
            </div>
            <Button variant="secondary" onClick={handleBack}>
              ← Retour
            </Button>
          </div>
        )}

        {selectedMode === 'team' && playerCount && (
          <div className="player-setup">
            <h3>Configuration des joueurs ({playerCount})</h3>
            <div className="player-inputs">
              {playerNames.map((name, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Joueur ${index + 1}`}
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  className="player-input"
                />
              ))}
            </div>

            <div className="mode-action-buttons">
              <Button variant="primary" onClick={handleStartGame}>
                🎮 Démarrer le jeu
              </Button>
              <Button variant="secondary" onClick={() => setPlayerCount(null)}>
                ← Changer nombre
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
