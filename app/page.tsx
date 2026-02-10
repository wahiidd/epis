"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulation de chargement progressif
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowMenu(true), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const handleJouerClick = () => {
    router.push('/game');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center font-['Poppins']">
      {/* Background avec gradient radial */}
      <div className="absolute inset-0 bg-gradient-radial from-[#56bf7c] via-[#3a9b68] to-[#00625d]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,98,93,0.3)_100%)]" />

      {/* Images décoratives - Galaxy vibe */}
      <img src="/images/deco1.png" alt="" className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 opacity-25 animate-float blur-[1px]" />
      <img src="/images/deco2.png" alt="" className="absolute bottom-20 right-20 w-24 h-24 md:w-40 md:h-40 opacity-20 animate-float-delayed blur-[1px]" />
      <img src="/images/Avatar Logo.png" alt="" className="absolute top-1/4 right-10 w-16 h-16 md:w-24 md:h-24 opacity-10 animate-pulse-slow rotate-12" />
      <img src="/images/logodes.png" alt="" className="absolute bottom-10 left-1/4 w-12 h-12 md:w-20 md:h-20 opacity-15 animate-spin-slow" />
      
      {/* Particules brillantes galaxy */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-80 animate-twinkle shadow-[0_0_10px_#fff]"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#56bf7c] rounded-full opacity-60 animate-twinkle-delayed shadow-[0_0_15px_#56bf7c]"></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white rounded-full opacity-70 animate-twinkle shadow-[0_0_10px_#fff]"></div>
      <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-[#a50606] rounded-full opacity-60 animate-twinkle-delayed shadow-[0_0_15px_#a50606]"></div>
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full opacity-50 animate-twinkle"></div>
      <div className="absolute top-1/6 right-1/6 w-2 h-2 bg-[#56bf7c] rounded-full opacity-40 animate-twinkle-delayed"></div>
      <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-white rounded-full opacity-30 animate-twinkle"></div>
      <div className="absolute top-3/4 left-3/4 w-2 h-2 bg-[#a50606] rounded-full opacity-50 animate-twinkle-delayed"></div>

      {/* Points décoratifs */}
      <div className="absolute top-20 right-32 w-4 h-4 bg-gradient-to-r from-[#ff0000] to-[#a50606] rounded-full animate-pulse shadow-[0_0_20px_#ff0000]"></div>
      <div className="absolute bottom-32 left-40 w-6 h-6 bg-gradient-to-r from-[#56bf7c] to-[#3a9b68] rounded-full animate-pulse-delayed shadow-[0_0_25px_#56bf7c]"></div>
      <div className="absolute top-40 right-60 w-3 h-3 bg-gradient-to-r from-[#ff9900] to-[#ff6600] rounded-full animate-pulse shadow-[0_0_15px_#ff9900]"></div>
      <div className="absolute bottom-40 left-60 w-5 h-5 bg-gradient-to-r from-[#9966ff] to-[#6600ff] rounded-full animate-pulse-delayed shadow-[0_0_20px_#9966ff]"></div>

      {/* Émojis flottants */}
      <div className="absolute top-16 left-1/3 text-3xl animate-float-emojis">✨</div>
      <div className="absolute bottom-24 right-1/4 text-2xl animate-float-emojis-delayed">🎮</div>
      <div className="absolute top-1/3 right-16 text-2xl animate-float-emojis">✨</div>
      <div className="absolute bottom-16 left-16 text-3xl animate-float-emojis-delayed">🎯</div>
      <div className="absolute top-2/3 left-1/2 text-2xl animate-float-emojis">⚡</div>

      {/* Points d'interrogation décoratifs */}
      <div className="absolute top-28 left-24 text-4xl text-white/10 animate-bounce-slow">?</div>
      <div className="absolute bottom-28 right-32 text-3xl text-white/15 animate-bounce-slow-delayed">?</div>
      <div className="absolute top-1/2 left-20 text-5xl text-white/5 animate-rotate-slow">?</div>
      <div className="absolute bottom-1/2 right-40 text-4xl text-white/10 animate-rotate-slow-delayed">?</div>

      {/* Icône menu en haut à droite - TOUJOURS visible */}
      {showMenu && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
          <button
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
            className="relative w-16 h-16 md:w-20 md:h-20 hover:scale-110 transition-all duration-300 drop-shadow-2xl group animate-pulse-gentle"
          >
            <img src="/images/IconLogo.png" alt="Menu" className="w-full h-full object-contain group-hover:brightness-110 group-hover:rotate-12 transition-all duration-300" />
            
            {/* Point d'interrogation TOUJOURS pulsant */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#ff0000] via-[#ff3333] to-[#a50606] rounded-full flex items-center justify-center animate-bounce-pulse shadow-lg border-2 border-white/80">
              <span className="text-white font-bold text-lg">?</span>
            </div>
          </button>

            {/* Tooltip brillant - caché quand le menu est ouvert */}
          {!showSidebar && (
            <div className="absolute top-full right-0 mt-3 px-5 py-3 bg-gradient-to-r from-[#a50606] via-[#ff0000] to-[#ff3333] text-white rounded-xl shadow-2xl animate-shine-pulse whitespace-nowrap border-2 border-white/30 backdrop-blur-sm"
                 style={{ fontFamily: 'Poppins, sans-serif' }}>
              <div className="text-sm font-bold flex items-center gap-2">
                ✨ Cliquez pour voir le menu
              </div>
              <div className="absolute -top-2 right-6 w-4 h-4 bg-[#a50606] transform rotate-45 border-t-2 border-l-2 border-white/30"></div>
            </div>
          )}
        </div>
      )}

      {/* Sidebar minimaliste avec police simple */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-[#00625d]/98 to-[#004d47]/98 backdrop-blur-xl shadow-2xl transform transition-all duration-500 z-40 border-l-4 border-[#56bf7c]/50 ${
        showSidebar ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-8">
          <button
            onClick={() => setShowSidebar(false)}
            className="absolute top-6 right-6 text-white/70 text-2xl hover:text-[#56bf7c] hover:rotate-90 transition-all duration-300"
          >
            ✕
          </button>

          <div className="mt-20 space-y-4">
            <button
              onClick={() => {
                setShowRulesModal(true);
                setShowSidebar(false);
              }}
              className="w-full text-left px-4 py-3 text-white hover:text-[#56bf7c] hover:bg-white/10 rounded-lg font-semibold text-lg transition-all duration-300 border-l-4 border-transparent hover:border-[#56bf7c] hover:pl-6 flex items-center gap-3 group"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <span className="text-xl group-hover:scale-125 transition-transform">📖</span>
              <span>Règles du jeu</span>
            </button>

            <button
              onClick={() => {
                setShowAboutModal(true);
                setShowSidebar(false);
              }}
              className="w-full text-left px-4 py-3 text-white hover:text-[#56bf7c] hover:bg-white/10 rounded-lg font-semibold text-lg transition-all duration-300 border-l-4 border-transparent hover:border-[#56bf7c] hover:pl-6 flex items-center gap-3 group"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <span className="text-xl group-hover:scale-125 transition-transform">ℹ️</span>
              <span>À propos</span>
            </button>
          </div>

          {/* Émojis décoratifs dans la sidebar */}
          <div className="mt-12 text-center">
            <div className="flex justify-center gap-4 text-2xl opacity-50">
              <span className="animate-bounce-slow">🎲</span>
              <span className="animate-bounce-slow-delayed">🏆</span>
              <span className="animate-bounce-slow">🌟</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page de chargement */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center px-4 transition-all duration-1000 ${
          showMenu ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <div className="mb-8 md:mb-16 animate-float">
          <img
            src="/images/Avatar Logo.png"
            alt="Logo"
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          />
        </div>

        <div className="w-[90%] max-w-md h-3 md:h-4 bg-[#4a0000] rounded-full overflow-hidden shadow-2xl border-2 border-[#a50606]/50">
          <div
            className="h-full bg-gradient-to-r from-[#a50606] via-[#ff0000] to-[#a50606] rounded-full transition-all duration-300 shadow-lg"
            style={{
              width: `${loadingProgress}%`,
              boxShadow: '0 0 25px rgba(165, 6, 6, 0.9), 0 0 50px rgba(165, 6, 6, 0.5)'
            }}
          />
        </div>

        <div 
          className="mt-4 md:mt-6 text-white text-xl md:text-2xl font-bold"
          style={{ 
            fontFamily: 'Poppins, sans-serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          {loadingProgress}%
        </div>
      </div>

      {/* Page Menu - Bouton Jouer */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center px-2 transition-all duration-1000 ${
          showMenu ? 'opacity-100 scale-95' : 'opacity-0 scale-105 pointer-events-none'
        }`}
      >
        <div className="mb-2 md:mb-4 animate-bounce-slow">
          <img
            src="/images/Avatar Logo.png"
            alt="Epistemia Logo"
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          />
        </div>

        <div className="mb-1 md:mb-2 text-center">
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[90px] font-bold tracking-wider transform hover:scale-105 transition-transform duration-300"
            style={{
              fontFamily: 'Poppins, sans-serif',
              color: '#a50606',
              textShadow: '4px 4px 8px rgba(0,0,0,0.4), 0 0 30px rgba(165,6,6,0.3)',
              letterSpacing: '0.05em',
              fontWeight: '800'
            }}
          >
            EPISTÉMIA
          </h1>
        </div>

        <div className="mb-4 md:mb-8 text-center">
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest"
            style={{
              fontFamily: 'Poppins, sans-serif',
              color: '#ffffff',
              letterSpacing: '0.2em',
              textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
              fontWeight: '600'
            }}
          >
            COMPÉTITION
          </h2>
        </div>

        <div className="mb-4 md:mb-8 animate-wiggle">
          <img
            src="/images/logodes.png"
            alt="Dés"
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_6px_15px_rgba(0,0,0,0.4)]"
          />
        </div>

        <button
          onClick={handleJouerClick}
          className="relative px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 text-lg sm:text-xl md:text-2xl font-bold rounded-full bg-gradient-to-br from-[#a50606] via-[#ff0000] to-[#a50606] text-white transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(165,6,6,0.7)] active:scale-95 shadow-2xl group"
          style={{
            fontFamily: 'Poppins, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: '700'
          }}
        >
          <span className="relative z-10">Jouer</span>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-[#56bf7c] rounded-full animate-pulse-delayed"></div>
        </button>

        <div 
          className="mt-4 md:mt-6 text-[#56bf7c] text-base sm:text-lg md:text-xl animate-pulse text-center font-medium" 
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <span className="inline-block animate-bounce">👆</span> Cliquez pour commencer <span className="inline-block animate-bounce">👆</span>
        </div>
      </div>

      {/* Modal Règles */}
      {showRulesModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setShowRulesModal(false)}>
          <div className="bg-gradient-to-br from-[#a50606] via-[#ff0000] to-[#a50606] rounded-3xl p-8 md:p-12 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border-4 border-white/30" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '800' }}>
                📖 RÈGLES DU JEU
              </h2>
              <button onClick={() => setShowRulesModal(false)} className="text-white/90 text-4xl hover:text-[#56bf7c] hover:rotate-180 transition-all duration-500">✕</button>
            </div>
            <div className="text-white space-y-6 text-lg leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <span><strong className="text-white font-bold">But du jeu</strong><br/>Avancez sur le plateau, répondez aux questions d'épistémologie et atteignez la case finale. Le meilleur score désigne le Grand Épistémologue.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🎲</span>
                <span><strong className="text-white font-bold">Déroulement</strong><br/>
                  1. Lancez le dé <br/>
                  2. Avancez votre pion<br/>
                  3. Répondez à la question de la case<br/>
                </span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🗺️</span>
                <span><strong className="text-white font-bold">Cases & Points</strong><br/>
                  Facile · +1<br/>
                  Moyen · +3<br/>
                  Difficile · +5<br/>
                  Aléatoire · +5
                </span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">⏱️</span>
                <span><strong className="text-white font-bold">Temps</strong><br/>20 secondes par question. Alerte à 10s.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">👥</span>
                <span><strong className="text-white font-bold">Modes</strong><br/>Solo ou Équipe (1-4 joueurs), chacun joue à tour de rôle.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🏆</span>
                <span><strong className="text-white font-bold">Victoire</strong><br/>Premier joueur à la case finale = fin de partie. Classement par score</span>
              </p>
            </div>
            {/* Points décoratifs dans la modal */}
            <div className="flex justify-center gap-6 mt-10 text-3xl">
              <span className="animate-bounce-slow">🎮</span>
              <span className="animate-bounce-slow-delayed">🧠</span>
              <span className="animate-bounce-slow">⚡</span>
            </div>
          </div>
        </div>
      )}

      {/* Modal À propos */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setShowAboutModal(false)}>
          <div className="bg-gradient-to-br from-[#00625d] via-[#56bf7c] to-[#00625d] rounded-3xl p-8 md:p-12 max-w-3xl w-full shadow-2xl border-4 border-white/30" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '800' }}>
                ℹ️ À PROPOS
              </h2>
              <button onClick={() => setShowAboutModal(false)} className="text-white/90 text-4xl hover:text-[#a50606] hover:rotate-180 transition-all duration-500">✕</button>
            </div>
            <div className="text-white space-y-8 text-lg leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <p className="text-xl">
                <strong className="text-white font-bold text-2xl">Epistémia</strong> est un jeu de culture générale compétitif conçu pour tester vos connaissances dans divers domaines.
              </p>
              <p>Développé avec passion pour offrir une expérience éducative et amusante à tous les joueurs.</p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white/10 p-4 rounded-xl">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="font-bold">Compétition</div>
                </div>
                <div className="bg-white/10 p-4 rounded-xl">
                  <div className="text-3xl mb-2">🧠</div>
                  <div className="font-bold">Connaissances</div>
                </div>
              </div>
              <p className="mt-8 pt-8 border-t border-white/30 text-center">
                <strong>Version :</strong> 1.0.0<br/>
                <strong className="text-2xl">© 2025 Epistémia</strong>
              </p>
            </div>
            {/* Émojis décoratifs */}
            <div className="flex justify-center gap-6 mt-10 text-3xl">
              <span className="animate-rotate-slow">🌟</span>
              <span className="animate-rotate-slow-delayed">✨</span>
              <span className="animate-rotate-slow">💫</span>
            </div>
          </div>
        </div>
      )}

      {/* Styles CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-3deg); }
        }
        @keyframes float-emojis {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-10px) translateX(5px) rotate(10deg); }
          66% { transform: translateY(5px) translateX(-5px) rotate(-10deg); }
        }
        @keyframes float-emojis-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-8px) translateX(-3px) rotate(-8deg); }
          66% { transform: translateY(4px) translateX(3px) rotate(8deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-slow-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes bounce-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        @keyframes shine-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(165, 6, 6, 0.8), 0 0 40px rgba(255, 0, 0, 0.6); }
          50% { box-shadow: 0 0 30px rgba(255, 0, 0, 1), 0 0 60px rgba(165, 6, 6, 0.8); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.8); }
        }
        @keyframes twinkle-delayed {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes pulse-delayed {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(0.9); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotate-slow-delayed {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; }
        .animate-float-emojis { animation: float-emojis 6s ease-in-out infinite; }
        .animate-float-emojis-delayed { animation: float-emojis-delayed 7s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2.5s ease-in-out infinite; }
        .animate-bounce-slow-delayed { animation: bounce-slow-delayed 3s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        .animate-bounce-pulse { animation: bounce-pulse 1.2s ease-in-out infinite; }
        .animate-shine-pulse { animation: shine-pulse 1.5s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2.5s ease-in-out infinite; }
        .animate-twinkle-delayed { animation: twinkle-delayed 3s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-pulse { animation: pulse 1s ease-in-out infinite; }
        .animate-pulse-delayed { animation: pulse-delayed 1.5s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-rotate-slow { animation: rotate-slow 10s linear infinite; }
        .animate-rotate-slow-delayed { animation: rotate-slow-delayed 12s linear infinite; }
        .bg-gradient-radial {
          background: radial-gradient(circle at center, #56bf7c 0%, #3a9b68 40%, #00625d 100%);
        }
      `}</style>
    </div>
  );
}