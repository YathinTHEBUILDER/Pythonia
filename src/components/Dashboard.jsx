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
      
      {/* LEFT COLUMN: THE SKILL TREE MAP */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>🗺️</span>
          <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text)' }}>
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
                  className={`glass-panel ${unlocked ? 'glow-neon-hover' : ''}`}
                  style={{
                    width: '100%',
                    padding: '24px',
                    position: 'relative',
                    cursor: unlocked ? 'pointer' : 'not-allowed',
                    opacity: unlocked ? 1 : 0.6,
                    border: unlocked && percent === 100 ? '1px solid var(--neon)' : '1px solid var(--border)',
                    boxShadow: unlocked && percent === 100 ? 'var(--glow-neon)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => unlocked && handleEnterModule(mod.id)}
                >
                  {/* Card top details */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '2.2rem',
                        padding: '10px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '8px',
                        border: '1px solid var(--border)'
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
                    <div style={{ height: '6px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', border: '1px solid var(--border)' }}>
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
                  <div 
                    className={`map-connector ${isModuleUnlocked(index + 1) ? 'active' : ''}`}
                    style={{ height: '36px' }}
                  />
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
          <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text)' }}>
            PLAYER DOSSIER
          </h2>
        </div>

        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', border: '1px solid var(--border)' }}>
          {/* Avatar & Rank details */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{
              fontSize: '3.2rem',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '16px',
              border: '1.5px solid var(--gold)',
              boxShadow: 'var(--glow-gold)',
              animation: 'blink 3s infinite'
            }}>
              {player.avatar}
            </span>
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
                <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>{progress.streak} days</span>
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
                    className="badge-item"
                    style={{
                      padding: '8px 4px',
                      background: isEarned ? 'rgba(240, 192, 64, 0.05)' : 'rgba(255,255,255,0.01)',
                      borderColor: isEarned ? 'var(--gold)' : 'var(--border)',
                      opacity: isEarned ? 1 : 0.25,
                      filter: isEarned ? 'none' : 'grayscale(100%)',
                      cursor: 'help'
                    }}
                    title={`${badge.title}: ${badge.description}`}
                  >
                    <span style={{ fontSize: '1.4rem' }}>{badge.emoji}</span>
                  </div>
                );
              })}
              {BADGES.length > 4 && (
                <div 
                  onClick={() => setView('profile')}
                  className="badge-item glow-neon-hover"
                  style={{
                    padding: '8px 4px',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: 'var(--blue)'
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
