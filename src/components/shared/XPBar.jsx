import React from 'react';
import { RANKS } from '../../data/gameData';

export default function XPBar({ xp, rankLevel, showDetails = true }) {
  const currentRank = RANKS.find(r => r.rank === rankLevel) || RANKS[0];
  const nextRankIndex = RANKS.findIndex(r => r.rank === rankLevel) + 1;
  const nextRank = nextRankIndex < RANKS.length ? RANKS[nextRankIndex] : null;

  let percent = 100;
  let label = `${xp} XP (MAX Rank)`;

  if (nextRank) {
    const range = nextRank.xpRequired - currentRank.xpRequired;
    const progress = xp - currentRank.xpRequired;
    percent = Math.min(100, Math.max(0, (progress / range) * 100));
    label = `${xp} / ${nextRank.xpRequired} XP`;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'var(--gold)', fontWeight: 'bold' }}>⚔️ Level {currentRank.rank}</span>
          <span style={{ color: 'var(--text)', fontFamily: 'var(--font-pixel)', fontSize: '0.6rem' }}>
            {currentRank.title.toUpperCase()}
          </span>
        </span>
        {showDetails && (
          <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-code)', fontSize: '0.75rem' }}>
            {label}
          </span>
        )}
      </div>

      <div style={{
        height: '10px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid var(--border)',
        borderRadius: '50px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{
          height: '100%',
          width: `${percent}%`,
          background: 'linear-gradient(90deg, #39ff14 0%, #20c20f 100%)',
          borderRadius: '50px',
          boxShadow: '0 0 10px rgba(57, 255, 20, 0.7)',
          transition: 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
        }} />
      </div>
      
      {nextRank && showDetails && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
          <span>Next Rank: {nextRank.title} ({nextRank.xpRequired} XP)</span>
        </div>
      )}
    </div>
  );
}
