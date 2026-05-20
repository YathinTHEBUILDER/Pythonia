import React from 'react';
import { MODULES, BADGES } from '../data/gameData';
import { useGameState } from '../state/gameState';

export default function ModuleScreen({ moduleId, setView, setSelectedMissionId }) {
  const { state } = useGameState();
  const { progress } = state;

  const module = MODULES.find(m => m.id === moduleId);
  
  if (!module) {
    return (
      <div style={{ color: 'var(--red)', textAlign: 'center', marginTop: '40px' }}>
        Module not found!
        <button onClick={() => setView('dashboard')} className="btn-blue" style={{ marginTop: '10px' }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Helper to check if a mission is unlocked (sequential within the module)
  const isMissionUnlocked = (index) => {
    if (index === 0) return true;
    const prevMission = module.missions[index - 1];
    return !!progress.missionsCompleted[prevMission.id];
  };

  const handleEnterMission = (missionId) => {
    setSelectedMissionId(missionId);
    setView('mission');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px 40px' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .mission-row-card {
          transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform: translateX(0);
        }
        .mission-row-card.unlocked:hover {
          transform: translateX(6px) scale(1.002);
          border-color: var(--blue) !important;
          box-shadow: 0 4px 15px rgba(88, 166, 255, 0.15) !important;
        }
        .mission-row-card.completed.unlocked:hover {
          border-color: var(--neon) !important;
          box-shadow: 0 4px 15px rgba(57, 255, 20, 0.15) !important;
        }
        .badge-pill {
          background: rgba(240, 192, 64, 0.08);
          border: 1px solid rgba(240, 192, 64, 0.3);
          border-radius: 4px;
          padding: 4px 10px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          animation: badge-pulse 3s infinite;
        }
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 5px rgba(240, 192, 64, 0.1); }
          50% { box-shadow: 0 0 12px rgba(240, 192, 64, 0.35); }
        }
        @keyframes ping-glow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.7; box-shadow: 0 0 8px currentColor; }
        }
        .status-ping {
          animation: ping-glow 2s ease-in-out infinite;
        }
      `}} />
      
      {/* Navigation & Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <button onClick={() => setView('dashboard')} className="btn-blue" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>
          ← MAP OVERVIEW
        </button>
        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-pixel)', color: 'var(--text-muted)' }}>
          MODULE FOCUS SCREEN
        </span>
      </div>

      {/* Module Title Banner */}
      <div className="glass-panel" style={{
        padding: '24px',
        border: '1px solid var(--border)',
        background: 'rgba(22, 27, 34, 0.8)',
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        <span style={{
          fontSize: '3rem',
          padding: '12px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>{module.icon}</span>
        <div>
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-pixel)', color: 'var(--blue)' }}>
            MODULE SYLLABUS UNIT
          </span>
          <h2 style={{ fontSize: '0.95rem', marginTop: '6px', color: '#ffffff' }}>{module.title}</h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Complete the topics sequentially to master this unit and unlock the next module.
          </p>
        </div>
      </div>

      {/* Sub-Missions Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 style={{ fontSize: '0.7rem', fontFamily: 'var(--font-pixel)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          MISSIONS & TASKS
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {module.missions.map((mission, index) => {
            const unlocked = isMissionUnlocked(index);
            const completed = !!progress.missionsCompleted[mission.id];
            
            // Check if there is an associated badge
            const badge = mission.badge ? BADGES.find(b => b.id === mission.badge) : null;

            return (
              <div
                key={mission.id}
                onClick={() => unlocked && handleEnterMission(mission.id)}
                className={`glass-panel mission-row-card ${unlocked ? 'unlocked' : 'locked'} ${completed ? 'completed' : ''}`}
                style={{
                  padding: '18px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: unlocked ? 'pointer' : 'not-allowed',
                  opacity: unlocked ? 1 : 0.5,
                  border: completed 
                    ? '1.5px solid var(--neon)' 
                    : (unlocked ? '1px solid rgba(88, 166, 255, 0.35)' : '1px solid rgba(255,255,255,0.03)'),
                  boxShadow: completed ? '0 0 12px rgba(57, 255, 20, 0.08)' : 'none',
                  transition: 'all 0.25s ease',
                  flexWrap: 'wrap',
                  gap: '16px',
                  position: 'relative'
                }}
              >
                {/* Left Side: Mission Info */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  {/* Status indicator */}
                  <span 
                    className={unlocked && !completed ? "status-ping" : ""}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: completed 
                        ? '1.5px solid var(--neon)' 
                        : (unlocked ? '1.5px solid var(--blue)' : '1.5px solid rgba(255,255,255,0.08)'),
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-pixel)',
                      fontSize: '0.65rem',
                      color: completed ? 'var(--neon)' : (unlocked ? 'var(--blue)' : 'var(--text-muted)'),
                      background: completed 
                        ? 'rgba(57,255,20,0.05)' 
                        : (unlocked ? 'rgba(88,166,255,0.05)' : 'transparent'),
                      flexShrink: 0
                    }}
                  >
                    {completed ? '✓' : (index + 1)}
                  </span>
                  
                  <div>
                    <h4 style={{
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      color: completed ? 'var(--neon)' : (unlocked ? '#ffffff' : 'var(--text-muted)'),
                      margin: 0
                    }}>
                      {mission.title}
                    </h4>
                    
                    {/* Badge alert */}
                    {badge && (
                      <div className="badge-pill" style={{ marginTop: '6px' }}>
                        <span style={{ fontSize: '0.85rem' }}>{badge.emoji}</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--gold)', fontFamily: 'var(--font-pixel)', fontWeight: 'bold' }}>
                          AWARD: {badge.title.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Action & XP */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 'bold', fontFamily: 'var(--font-code)' }}>
                    +{mission.xpReward} XP
                  </span>

                  <button
                    disabled={!unlocked}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnterMission(mission.id);
                    }}
                    className={completed ? 'btn-blue' : (unlocked ? 'btn-primary' : '')}
                    style={{
                      padding: '6px 14px',
                      fontSize: '0.65rem',
                      fontFamily: 'var(--font-pixel)',
                      borderRadius: '4px'
                    }}
                  >
                    {completed ? 'REPLAY' : (unlocked ? 'LAUNCH' : 'LOCKED')}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
