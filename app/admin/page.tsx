"use client";

import React, { useState, useEffect } from 'react';
import Button from '../../components/Game/UI/Button';
import '../../styles/admin.css';
import { listenToPendingGames, updateGameStatus } from '../../lib/services/firebaseService';

// --- Types pour éviter les erreurs de compilation ---

interface Player {
  playerId: string;
  name: string;
  score: number;
}

interface GameSession {
  id: string;
  mode: string;
  players: Player[];
  status: 'pending' | 'active' | 'rejected' | 'finished';
  createdAt?: {
    toDate: () => Date;
  };
  boardState?: any[];
}

// ----------------------------------------------------

export default function AdminPage() {
  const [password, setPassword] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pendingGames, setPendingGames] = useState<GameSession[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    if (isAuthenticated) {
      setLoading(true);
      unsubscribe = listenToPendingGames((games: GameSession[]) => {
        setPendingGames(games);
        setLoading(false);
      });
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isAuthenticated]);

  const handleAction = async (gameId: string, status: 'active' | 'rejected') => {
    try {
      const result = await updateGameStatus(gameId, status);
      if (!result.success) {
        alert('Erreur: ' + result.error);
      }
    } catch (error) {
      console.error('Failed to update game:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'JeuEpistemia2026') {
      setIsAuthenticated(true);
    } else {
      alert('Mot de passe incorrect');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div className="admin-login-wrapper">
          <div className="admin-login-card">
            <h2 className="admin-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              Accès <span>Admin</span>
            </h2>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', opacity: 0.6, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="admin-input"
                  placeholder="••••••••"
                />
              </div>
              <Button variant="primary" type="submit" className="w-full">
                Se connecter
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="max-w-4xl mx-auto">
        <header className="admin-header">
          <h1 className="admin-title">Tableau de Bord <span>Admin</span></h1>
          <button 
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 text-white/40 hover:text-white transition-all text-sm uppercase tracking-widest font-bold"
          >
            Déconnexion
          </button>
        </header>

        <section>
          <h2 className="admin-section-title">Demandes en attente ({pendingGames.length})</h2>

          {pendingGames.length === 0 ? (
            <div className="p-16 text-center bg-white/5 rounded-2xl border border-white/5">
              <p className="text-white/30 italic">Aucune partie en attente de validation.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingGames.map((game: GameSession) => (
                <div key={game.id} className="admin-request-card">
                  <div>
                    <span className="admin-game-id">{game.id}</span>
                    <h3 className="admin-game-mode">Mode {game.mode}</h3>
                    <p className="admin-players-list">
                      <strong>Joueurs :</strong> {game.players?.map((p: Player) => p.name).join(', ') || 'N/A'}
                    </p>
                    <p className="text-white/20 text-xs mt-2">
                       {game.createdAt?.toDate ? game.createdAt.toDate().toLocaleTimeString() : 'Maintenant'}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="primary" 
                      onClick={() => handleAction(game.id, 'active')}
                      className="px-8"
                    >
                      Approuver
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => handleAction(game.id, 'rejected')}
                      className="border-red-500/20 text-red-400 bg-red-500/5 hover:bg-red-500/10"
                    >
                      Rejeter
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
