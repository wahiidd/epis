"use client";

import React, { useState, useEffect } from 'react';
import Button from '../../components/Game/UI/Button';
import '../../styles/screens.css';
import { listenToPendingGames, updateGameStatus } from '../../lib/services/firebaseService';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingGames, setPendingGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    if (isAuthenticated) {
      setLoading(true);
      unsubscribe = listenToPendingGames((games: any[]) => {
        setPendingGames(games);
        setLoading(false);
      });
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isAuthenticated]);

  const handleAction = async (gameId: string, status: string) => {
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
      <div className="screen mode-screen flex items-center justify-center">
        <div className="mode-content p-8 max-w-md w-full shadow-2xl border-2 border-white/20">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">🔐 Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#56bf7c]"
                placeholder="Entrez le mot de passe..."
              />
            </div>
            <Button variant="primary" type="submit" className="w-full py-4 text-lg">
              Se connecter
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="screen mode-screen p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
            Tableau de Bord <span className="text-[#56bf7c]">Admin</span>
          </h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 text-white/60 hover:text-white transition-colors"
          >
            Déconnexion
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white/90">Demandes en attente ({pendingGames.length})</h2>
          </div>

          {pendingGames.length === 0 ? (
            <div className="p-12 text-center bg-white/5 rounded-3xl border-2 border-dashed border-white/10">
              <p className="text-white/40 text-lg">Aucune partie en attente d'approbation.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {pendingGames.map((game) => (
                <div 
                  key={game.id} 
                  className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fadeIn"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[#56bf7c] font-mono text-xs bg-[#56bf7c]/10 px-2 py-1 rounded">
                        {game.id}
                      </span>
                      <span className="text-white/40 text-xs">
                        {game.createdAt?.toDate?.() ? game.createdAt.toDate().toLocaleTimeString() : 'En attente...'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1 uppercase">
                      Mode: {game.mode}
                    </h3>
                    <p className="text-white/60">
                      Joueurs: {game.players?.map(p => p.name).join(', ') || 'N/A'}
                    </p>
                  </div>
                  
                  <div className="flex gap-3 w-full md:w-auto">
                    <Button 
                      variant="primary" 
                      onClick={() => handleAction(game.id, 'active')}
                      className="flex-1 md:flex-none !px-8"
                    >
                      Approuver
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => handleAction(game.id, 'rejected')}
                      className="flex-1 md:flex-none border-[#ff4444]/30 hover:bg-[#ff4444]/10 text-[#ff4444]"
                    >
                      Rejeter
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
