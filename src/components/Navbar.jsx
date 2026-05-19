import React from 'react';
import { useGameState } from '../state/gameState';
import XPBar from './shared/XPBar';
import { RANKS } from '../data/gameData';

export default function Navbar({ currentView, setView }) {
  const { state } = useGameState();
  const { player, progress } = state;

  const currentRank = RANKS.find(r => r.rank === progress.rank) || RANKS[0];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      background: 'rgba(13, 17, 23, 0.8)',
      borderBottom: '1px solid var(--border)',
      padding: '12px 0',
      marginBottom: '30px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        
        {/* Left Side: Retro Hacker Logo */}
        <div 
          onClick={() => setView('dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <span style={{ fontSize: '1.6rem' }}>🐍</span>
          <span 
            className="glow-text-neon"
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.9rem',
              color: 'var(--neon)',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}
          >
            PYTHONIA
          </span>
        </div>

        {/* Center: Global XP Progress Bar */}
        <div style={{ flex: '1', minWidth: '240px', maxWidth: '400px' }}>
          <XPBar xp={progress.xp} rankLevel={progress.rank} showDetails={false} />
        </div>

        {/* Right Side: Player Rank, Name & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          {/* Quick Stats Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.75rem' }}>
            <span style={{ fontWeight: '600', color: 'var(--text)' }}>
              {player.name}
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--gold)', fontFamily: 'var(--font-pixel)', scale: '0.85', originX: '1' }}>
              {currentRank.title.toUpperCase()}
            </span>
          </div>

          {/* Nav Buttons Group */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setView('dashboard')}
              style={{
                padding: '6px 12px',
                fontSize: '0.75rem',
                borderColor: currentView === 'dashboard' || currentView === 'module' || currentView === 'mission' ? 'var(--neon)' : 'var(--border)',
                color: currentView === 'dashboard' || currentView === 'module' || currentView === 'mission' ? 'var(--neon)' : 'var(--text)'
              }}
            >
              🗺️ MAP
            </button>
            <button 
              onClick={() => setView('reference')}
              style={{
                padding: '6px 12px',
                fontSize: '0.75rem',
                borderColor: currentView === 'reference' ? 'var(--neon)' : 'var(--border)',
                color: currentView === 'reference' ? 'var(--neon)' : 'var(--text)'
              }}
            >
              📖 SYNTAX
            </button>
            <button 
              onClick={() => setView('sandbox')}
              style={{
                padding: '6px 12px',
                fontSize: '0.75rem',
                borderColor: currentView === 'sandbox' ? 'var(--neon)' : 'var(--border)',
                color: currentView === 'sandbox' ? 'var(--neon)' : 'var(--text)'
              }}
            >
              💻 CODE ARENA
            </button>
            <button 
              onClick={() => setView('profile')}
              style={{
                padding: '6px 12px',
                fontSize: '0.75rem',
                borderColor: currentView === 'profile' ? 'var(--neon)' : 'var(--border)',
                color: currentView === 'profile' ? 'var(--neon)' : 'var(--text)'
              }}
            >
              {player.avatar} PROFILE
            </button>
          </div>

        </div>

      </div>
    </nav>
  );
}
