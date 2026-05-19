import React, { useState } from 'react';

export default function FixBug({ challenge, onAnswer }) {
  const [userCorrection, setUserCorrection] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userCorrection.trim() || isSubmitted) return;

    // Normalizing code spacing to avoid frustating syntax failures on minor spaces
    const normalize = (str) => str.replace(/\s+/g, ' ').trim().toLowerCase();
    
    const isCorrect = normalize(userCorrection) === normalize(challenge.correctLine);
    
    setIsSubmitted(true);
    onAnswer(isCorrect);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>{challenge.question}</p>

      {/* Terminal showcasing Buggy Code */}
      <div className="glass-panel" style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
        <div className="terminal-header" style={{ background: 'rgba(0,0,0,0.1)' }}>
          <div className="terminal-dots">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
          </div>
          <div className="terminal-title">debug_me.py</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--red)', fontWeight: 'bold' }}>⚠️ BUG DETECTED</div>
        </div>
        <div style={{
          background: '#0a0e14',
          padding: '20px',
          fontFamily: 'var(--font-code)',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          color: 'var(--text)'
        }}>
          {challenge.code.split('\n').map((line, idx) => {
            const isBuggy = line.trim() === challenge.buggyLine.trim();
            return (
              <div
                key={idx}
                style={{
                  background: isBuggy ? 'rgba(255, 77, 77, 0.15)' : 'transparent',
                  color: isBuggy ? 'var(--red)' : 'var(--text)',
                  borderLeft: isBuggy ? '3px solid var(--red)' : 'none',
                  paddingLeft: isBuggy ? '8px' : '11px',
                  fontWeight: isBuggy ? 'bold' : 'normal'
                }}
              >
                {line}
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Type the corrected line below:
          </label>
          <input
            type="text"
            value={userCorrection}
            disabled={isSubmitted}
            onChange={(e) => setUserCorrection(e.target.value)}
            onPaste={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            placeholder={challenge.buggyLine.trim()}
            className="custom-input"
            style={{
              width: '100%',
              fontSize: '0.85rem',
              color: isSubmitted ? (userCorrection.trim().toLowerCase() === challenge.correctLine.trim().toLowerCase() ? 'var(--neon)' : 'var(--red)') : 'var(--text)'
            }}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>

        {isSubmitted && (
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-code)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Expected: </span>
            <code style={{ color: 'var(--neon)', fontWeight: 'bold' }}>{challenge.correctLine}</code>
          </div>
        )}

        {!isSubmitted && (
          <button type="submit" disabled={!userCorrection.trim()} className="btn-primary" style={{ alignSelf: 'flex-start' }}>
            SUBMIT FIX
          </button>
        )}
      </form>
    </div>
  );
}
