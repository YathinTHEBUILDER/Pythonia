import React from 'react';
import { useGameState } from '../state/gameState';
import { MODULES, BADGES, RANKS } from '../data/gameData';
import XPBar from './shared/XPBar';

export default function Dashboard({ setView, setSelectedModuleId }) {
  const { state } = useGameState();
  const { player, progress, stats } = state;

  const currentRank = RANKS.find(r => r.rank === progress.rank) || RANKS[0];

  // Helper to check if a module is unlocked
  const isModuleUnlocked = (index) => {
    if (index === 0) return true;
    
    // Check previous module completion percentage
    const prevModule = MODULES[index - 1];
    const prevMissions = prevModule.missions;
    const completedCount = prevMissions.filter(m => progress.missionsCompleted[m.id]).length;
    const percent = (completedCount / prevMissions.length) * 100;
    
    return percent >= 70;
  };

  const handleEnterModule = (moduleId) => {
    setSelectedModuleId(moduleId);
    setView('module');
  };

  return (
    <div className="grid-cols-layout" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flow-dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        @keyframes pulse-active {
          0%, 100% { box-shadow: 0 0 10px rgba(88, 166, 255, 0.15), inset 0 0 5px rgba(88, 166, 255, 0.05); }
          50% { box-shadow: 0 0 20px rgba(88, 166, 255, 0.35), inset 0 0 10px rgba(88, 166, 255, 0.15); }
        }
        @keyframes pulse-mastered {
          0%, 100% { box-shadow: 0 0 10px rgba(57, 255, 20, 0.2), inset 0 0 5px rgba(57, 255, 20, 0.08); }
          50% { box-shadow: 0 0 25px rgba(57, 255, 20, 0.45), inset 0 0 15px rgba(57, 255, 20, 0.15); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes streak-breath {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(255, 149, 0, 0.5)); }
          50% { transform: scale(1.22); filter: drop-shadow(0 0 8px rgba(255, 149, 0, 0.9)); }
        }
        .module-node-card {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform: translateY(0);
        }
        .module-node-card.unlocked:hover {
          transform: translateY(-5px) scale(1.005);
          border-color: var(--blue) !important;
          box-shadow: 0 12px 24px rgba(0,0,0,0.4), 0 0 15px rgba(88, 166, 255, 0.2) !important;
        }
        .module-node-card.unlocked.mastered:hover {
          border-color: var(--neon) !important;
          box-shadow: 0 12px 24px rgba(0,0,0,0.4), var(--glow-neon) !important;
        }
        .module-node-card.locked {
          background: rgba(22, 27, 34, 0.35) !important;
          border-color: rgba(255, 255, 255, 0.03) !important;
        }
        .module-node-card.locked:hover {
          border-color: rgba(255, 77, 77, 0.2) !important;
          box-shadow: inset 0 0 15px rgba(255, 77, 77, 0.05) !important;
        }
        .badge-grid-item {
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .badge-grid-item:hover {
          transform: scale(1.15) rotate(3deg);
          border-color: var(--gold) !important;
          box-shadow: 0 0 12px rgba(240, 192, 64, 0.4) !important;
          background: rgba(240, 192, 64, 0.08) !important;
        }
      `}} />
      
      {/* LEFT COLUMN: THE SKILL TREE MAP */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>🗺️</span>
          <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text)', letterSpacing: '0.5px' }}>
            MISSION MAP & SKILL TREE
          </h2>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {MODULES.map((mod, index) => {
            const unlocked = isModuleUnlocked(index);
            const missions = mod.missions;
            const completedCount = missions.filter(m => progress.missionsCompleted[m.id]).length;
            const percent = Math.round((completedCount / missions.length) * 100);
            
            // Stars difficulty array
            const difficultyStars = Array(5).fill(false).map((_, i) => i < mod.difficulty);

            return (
              <React.Fragment key={mod.id}>
                {/* Module Node Card */}
                <div 
                  className={`glass-panel module-node-card ${unlocked ? 'unlocked' : 'locked'} ${percent === 100 ? 'mastered' : ''}`}
                  style={{
                    width: '100%',
                    padding: '24px',
                    position: 'relative',
                    cursor: unlocked ? 'pointer' : 'not-allowed',
                    opacity: unlocked ? 1 : 0.6,
                    border: unlocked 
                      ? (percent === 100 ? '1.5px solid var(--neon)' : '1px solid rgba(88, 166, 255, 0.3)')
                      : '1px solid rgba(255, 255, 255, 0.04)',
                    boxShadow: unlocked 
                      ? (percent === 100 ? '0 0 15px rgba(57, 255, 20, 0.08)' : '0 0 10px rgba(88, 166, 255, 0.04)')
                      : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    animation: unlocked 
                      ? (percent === 100 ? 'pulse-mastered 4s infinite' : 'pulse-active 5s infinite')
                      : 'none'
                  }}
                  onClick={() => unlocked && handleEnterModule(mod.id)}
                >
                  {/* Lock Overlay Mask for Locked Modules */}
                  {!unlocked && (
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: 'rgba(13, 17, 23, 0.88)',
                      backdropFilter: 'blur(3px)',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      zIndex: 10,
                      border: '1px dashed rgba(255, 77, 77, 0.25)'
                    }}>
                      <span style={{ fontSize: '1.6rem' }}>🔒</span>
                      <span style={{ 
                        fontSize: '0.55rem', 
                        fontFamily: 'var(--font-pixel)', 
                        color: 'var(--red)',
                        letterSpacing: '1px'
                      }}>
                        MINIMUM 70% OF PREVIOUS UNIT REQUIRED
                      </span>
                    </div>
                  )}

                  {/* Card top details */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '2.2rem',
                        padding: '10px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {unlocked ? mod.icon : '🔒'}
                      </span>
                      <div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-pixel)', color: 'var(--text-muted)' }}>
                            MODULE {index + 1}
                          </span>
                          {percent === 100 && (
                            <span style={{
                              fontSize: '0.5rem',
                              fontFamily: 'var(--font-pixel)',
                              background: 'rgba(57,255,20,0.1)',
                              color: 'var(--neon)',
                              padding: '2px 6px',
                              borderRadius: '3px',
                              border: '1px solid var(--neon)'
                            }}>
                              MASTERED
                            </span>
                          )}
                        </div>
                        <h3 style={{ fontSize: '0.8rem', marginTop: '6px', color: '#ffffff' }}>
                          {mod.title}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Module difficulty dot meter */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                      <div style={{ display: 'flex', gap: '3px' }}>
                        {difficultyStars.map((isLit, sIdx) => (
                          <span 
                            key={sIdx} 
                            style={{ 
                              color: isLit ? 'var(--orange)' : 'var(--text-muted)',
                              fontSize: '0.85rem'
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-pixel)' }}>
                        DIFFICULTY
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Progress indicator */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>
                        Missions: {completedCount} / {missions.length} completed
                      </span>
                      <span style={{ color: unlocked ? 'var(--neon)' : 'var(--text-muted)', fontWeight: 'bold' }}>
                        {percent}%
                      </span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${percent}%`,
                        background: percent === 100 ? 'var(--neon)' : 'var(--blue)',
                        borderRadius: '10px',
                        transition: 'width 0.5s ease-out'
                      }} />
                    </div>
                  </div>

                  {/* Card bottom CTA */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: '600' }}>
                      🏆 XP Pool: {mod.xpPool} XP
                    </span>
                    <button 
                      disabled={!unlocked}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnterModule(mod.id);
                      }}
                      className={unlocked ? 'btn-primary' : ''}
                      style={{ padding: '6px 16px', fontSize: '0.65rem' }}
                    >
                      {unlocked ? (percent === 100 ? 'ENTER MODULE' : 'START CHALLENGE →') : 'LOCKED'}
                    </button>
                  </div>
                </div>

                {/* Vertical tree connecting line */}
                {index < MODULES.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
                    <svg width="40" height="40" style={{ overflow: 'visible' }}>
                      <line 
                        x1="20" y1="0" x2="20" y2="40" 
                        stroke={isModuleUnlocked(index + 1) ? 'var(--neon)' : 'rgba(255,255,255,0.06)'} 
                        strokeWidth="3" 
                        strokeDasharray={isModuleUnlocked(index + 1) ? "6, 6" : "none"}
                        style={{
                          filter: isModuleUnlocked(index + 1) ? 'drop-shadow(0 0 6px var(--neon))' : 'none',
                          animation: isModuleUnlocked(index + 1) ? 'flow-dash 1.5s linear infinite' : 'none'
                        }}
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: PLAYER PROFILE SIDEBAR SUMMARY */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>🛡️</span>
          <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text)', letterSpacing: '0.5px' }}>
            PLAYER DOSSIER
          </h2>
        </div>

        <div className="glass-panel dossier-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', border: '1px solid var(--border)' }}>
          {/* Avatar & Rank details */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              border: '2.5px solid var(--gold)',
              boxShadow: 'var(--glow-gold)',
              background: 'rgba(240, 192, 64, 0.03)',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              width: '84px',
              height: '84px',
              flexShrink: 0
            }}>
              {/* Scanline element */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '3px',
                background: 'rgba(240, 192, 64, 0.4)',
                boxShadow: '0 0 8px var(--gold)',
                animation: 'scanline 2.5s linear infinite',
                pointerEvents: 'none'
              }} />
              <span style={{ fontSize: '3.4rem', lineHeight: 1 }}>{player.avatar}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h3 style={{ fontSize: '0.9rem', color: '#ffffff' }}>{player.name}</h3>
              <span style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.55rem',
                color: 'var(--gold)',
                letterSpacing: '0.5px'
              }}>
                {currentRank.title.toUpperCase()}
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                Recruit since {new Date(player.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <hr style={{ border: 'none', borderBottom: '1px solid var(--border)' }} />

          {/* XP Bar */}
          <XPBar xp={progress.xp} rankLevel={progress.rank} showDetails={true} />

          <hr style={{ border: 'none', borderBottom: '1px solid var(--border)' }} />

          {/* Stats quick breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '0.6rem', fontFamily: 'var(--font-pixel)', color: 'var(--text-muted)' }}>
              CORE STATISTICS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>🔥 Daily Streak:</span>
                <span style={{ 
                  color: 'var(--orange)', 
                  fontWeight: 'bold',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ animation: 'streak-breath 1.5s infinite', display: 'inline-block' }}>🔥</span>
                  {progress.streak} days
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>✅ Solved:</span>
                <span style={{ color: 'var(--neon)', fontWeight: 'bold' }}>{stats.totalChallengesSolved} challenges</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>💡 Hints Used:</span>
                <span style={{ color: 'var(--purple)', fontWeight: 'bold' }}>{stats.totalHintsUsed}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>⚠️ Wrong Attempts:</span>
                <span style={{ color: 'var(--red)', fontWeight: 'bold' }}>{stats.totalWrongAttempts}</span>
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderBottom: '1px solid var(--border)' }} />

          {/* Badges overview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '0.6rem', fontFamily: 'var(--font-pixel)', color: 'var(--text-muted)' }}>
                BADGES EARNED ({progress.badgesEarned.length} / {BADGES.length})
              </h4>
              <button 
                onClick={() => setView('profile')}
                style={{ background: 'transparent', border: 'none', color: 'var(--blue)', fontSize: '0.65rem', padding: 0 }}
              >
                VIEW ALL
              </button>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px'
            }}>
              {BADGES.slice(0, 4).map((badge) => {
                const isEarned = progress.badgesEarned.includes(badge.id);
                return (
                  <div 
                    key={badge.id}
                    className="badge-item badge-grid-item"
                    style={{
                      padding: '12px 6px',
                      background: isEarned ? 'rgba(240, 192, 64, 0.05)' : 'rgba(255,255,255,0.01)',
                      borderColor: isEarned ? 'var(--gold)' : 'var(--border)',
                      opacity: isEarned ? 1 : 0.25,
                      filter: isEarned ? 'none' : 'grayscale(100%)',
                      cursor: 'help',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      transition: 'all 0.2s ease'
                    }}
                    title={`${badge.title}: ${badge.description}`}
                  >
                    <span style={{ fontSize: '1.6rem' }}>{badge.emoji}</span>
                  </div>
                );
              })}
              {BADGES.length > 4 && (
                <div 
                  onClick={() => setView('profile')}
                  className="badge-item glow-neon-hover"
                  style={{
                    padding: '12px 6px',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: 'var(--blue)',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  +{BADGES.length - 4}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
