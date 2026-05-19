import React, { useState } from 'react';
import { useGameState } from '../state/gameState';
import { BADGES, RANKS } from '../data/gameData';
import XPBar from './shared/XPBar';

const AVATARS = [
  { char: '🐍', name: 'Green Snake' },
  { char: '👾', name: 'Cyber Snake' },
  { char: '🔥', name: 'Fire Snake' },
  { char: '❄️', name: 'Frost Snake' },
  { char: '⚡', name: 'Volt Snake' },
  { char: '🌸', name: 'Sakura Snake' },
  { char: '💀', name: 'Shadow Snake' },
  { char: '🧿', name: 'Mystic Snake' },
  { char: '👑', name: 'Royal Snake' },
  { char: '🌈', name: 'Rainbow Snake' },
  { char: '👽', name: 'Alien Snake' },
  { char: '🤖', name: 'Mech Snake' }
];

export default function Profile({ setView }) {
  const { state, dispatch } = useGameState();
  const { player, progress, stats } = state;

  const [username, setUsername] = useState(player.name);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarSelected, setAvatarSelected] = useState(player.avatar);

  const currentRank = RANKS.find(r => r.rank === progress.rank) || RANKS[0];

  const handleSaveProfile = () => {
    dispatch({
      type: 'INIT_PLAYER',
      payload: { name: username, avatar: avatarSelected }
    });
    setIsEditing(false);
  };

  const handleResetProgress = () => {
    if (window.confirm('🚨 WARNING: Are you sure you want to reset all your progress? This deletes your XP, completed missions, and badges!')) {
      dispatch({ type: 'RESET_PROGRESS' });
      setUsername('Snake Rookie');
      setAvatarSelected('🐍');
      alert('Progress has been fully reset. Back to rookie level!');
      setView('dashboard');
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px 40px' }}>
      
      {/* Back button header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button onClick={() => setView('dashboard')} className="btn-blue" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>
          ← BACK TO MAP
        </button>
        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-pixel)', color: 'var(--text-muted)' }}>
          HACKER DOSSIER & PROFILE
        </span>
      </div>

      <div className="grid-cols-layout" style={{ gap: '30px' }}>
        
        {/* LEFT COLUMN: PROFILE CARD & AVATAR PICKER */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Main profile glass card */}
          <div className="glass-panel" style={{ padding: '30px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
              
              {/* Animated Glowing Avatar */}
              <span style={{
                fontSize: '4.5rem',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '50%',
                border: '2px solid var(--gold)',
                boxShadow: 'var(--glow-gold)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '130px',
                height: '130px',
                animation: 'blink 5s infinite'
              }}>
                {player.avatar}
              </span>

              {/* Username Input / Toggle */}
              {isEditing ? (
                <div style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '300px' }}>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="custom-input"
                    style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}
                    maxLength={16}
                  />
                  <button onClick={handleSaveProfile} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>
                    SAVE
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ fontSize: '1rem', color: '#ffffff' }}>{player.name}</h2>
                  <button 
                    onClick={() => setIsEditing(true)} 
                    style={{ background: 'transparent', border: 'none', color: 'var(--blue)', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}
                  >
                    ✏️ Edit
                  </button>
                </div>
              )}

              {/* Rank & Subtitle */}
              <div>
                <span style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.65rem',
                  color: 'var(--gold)',
                  display: 'block',
                  letterSpacing: '1px'
                }}>
                  {currentRank.title.toUpperCase()}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                  Student ID: VVCE_2SEM_CSE_YATHIN
                </span>
              </div>

              <hr style={{ border: 'none', borderBottom: '1px solid var(--border)', width: '100%' }} />

              {/* Dynamic XP Progress */}
              <XPBar xp={progress.xp} rankLevel={progress.rank} showDetails={true} />

            </div>
          </div>

          {/* Avatar selection subcard */}
          <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: 'var(--blue)', display: 'block', marginBottom: '14px' }}>
              CHOOSE SNAKE CLASS (AVATAR)
            </span>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px'
            }}>
              {AVATARS.map((av) => {
                const isSelected = avatarSelected === av.char;
                return (
                  <button
                    key={av.name}
                    onClick={() => {
                      setAvatarSelected(av.char);
                      dispatch({ type: 'SELECT_AVATAR', payload: { avatar: av.char } });
                    }}
                    style={{
                      padding: '12px 6px',
                      borderRadius: 'var(--radius)',
                      border: isSelected ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                      background: isSelected ? 'rgba(240, 192, 64, 0.08)' : 'var(--bg-card)',
                      boxShadow: isSelected ? 'var(--glow-gold)' : 'none',
                      fontSize: '1.8rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.2s ease'
                    }}
                    title={av.name}
                    className={!isSelected ? 'glow-neon-hover' : ''}
                  >
                    <span>{av.char}</span>
                    <span style={{ fontSize: '0.45rem', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
                      {av.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Danger Zone */}
          <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(255, 77, 77, 0.25)', background: 'rgba(255, 77, 77, 0.01)' }}>
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: 'var(--red)', display: 'block', marginBottom: '8px' }}>
              SYSTEM DANGER ZONE
            </span>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Resetting progress wipes your entire localStorage history and returns you to rookie state.
            </p>
            <button onClick={handleResetProgress} className="btn-red" style={{ borderColor: 'var(--red)', color: 'var(--red)', padding: '8px 16px', fontSize: '0.7rem' }}>
              🚨 WIPE ALL SYSTEM PROGRESS
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: STATS AND ACHIEVEMENTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Telemetry dossier */}
          <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: 'var(--neon)', display: 'block', marginBottom: '16px' }}>
              TELEMETRY & HISTOGRAM STATS
            </span>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 0', color: 'var(--text-muted)' }}>🔥 Daily Streak</td>
                  <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 'bold', color: 'var(--orange)' }}>{progress.streak} Days</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 0', color: 'var(--text-muted)' }}>🌟 Current Score</td>
                  <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 'bold', color: 'var(--gold)' }}>{progress.xp} XP</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 0', color: 'var(--text-muted)' }}>✅ Solved Tasks</td>
                  <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 'bold', color: 'var(--neon)' }}>{stats.totalChallengesSolved} Solves</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 0', color: 'var(--text-muted)' }}>💡 Hint Requests</td>
                  <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 'bold', color: 'var(--purple)' }}>{stats.totalHintsUsed} Hits</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 0', color: 'var(--text-muted)' }}>⚠️ Syntax Faults</td>
                  <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 'bold', color: 'var(--red)' }}>{stats.totalWrongAttempts} Overflows</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 0', color: 'var(--text-muted)' }}>📅 Joined Orbit</td>
                  <td style={{ padding: '12px 0', textAlign: 'right', color: 'var(--text-muted)' }}>{new Date(player.createdAt).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Golden Badge Grid */}
          <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: 'var(--gold)' }}>
                BADGE GRID ({progress.badgesEarned.length} / {BADGES.length})
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '14px'
            }}>
              {BADGES.map((badge) => {
                const isEarned = progress.badgesEarned.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`badge-item ${isEarned ? 'unlocked' : 'locked'}`}
                    style={{
                      border: isEarned ? '1px solid var(--gold)' : '1px dashed var(--border)',
                      padding: '16px 8px',
                      background: isEarned ? 'rgba(240, 192, 64, 0.03)' : 'transparent',
                      textAlign: 'center',
                      position: 'relative'
                    }}
                  >
                    <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '6px' }}>
                      {isEarned ? badge.emoji : '🔒'}
                    </span>
                    <span className="badge-name" style={{ color: isEarned ? '#ffffff' : 'var(--text-muted)' }}>
                      {isEarned ? badge.title.replace(/^[^\s]+\s+/, '') : '???'}
                    </span>
                    <span style={{
                      fontSize: '0.5rem',
                      color: 'var(--text-muted)',
                      display: 'block',
                      marginTop: '4px',
                      lineHeight: '1.2'
                    }}>
                      {isEarned ? badge.description : 'Locked node'}
                    </span>
                  </div>
                );
              })}
              
              {/* Optional easter egg badge representation */}
              {progress.badgesEarned.includes('antigravity_easter_egg') && (
                <div
                  className="badge-item unlocked"
                  style={{
                    border: '1px solid var(--neon)',
                    padding: '16px 8px',
                    background: 'rgba(57, 255, 20, 0.03)',
                    textAlign: 'center',
                    boxShadow: 'var(--glow-neon)'
                  }}
                >
                  <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '6px' }}>☁️</span>
                  <span className="badge-name" style={{ color: '#ffffff' }}>Antigravity</span>
                  <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px', lineHeight: '1.2' }}>
                    Type the secret import to fly!
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
