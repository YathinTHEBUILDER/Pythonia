import React, { useState } from 'react';

export default function MCQ({ challenge, onAnswer }) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedIdx === null || isSubmitted) return;
    setIsSubmitted(true);
    const isCorrect = selectedIdx === challenge.correct;
    onAnswer(isCorrect);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      <p style={{ fontWeight: '500', fontSize: '0.9rem', marginBottom: '8px' }}>{challenge.question}</p>

      {/* Code Snippet context if present */}
      {challenge.code && (
        <div className="glass-panel" style={{ overflow: 'hidden', marginBottom: '12px' }}>
          <div className="terminal-header" style={{ background: 'rgba(0,0,0,0.1)' }}>
            <div className="terminal-dots">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
            </div>
            <div className="terminal-title">code_context.py</div>
            <div></div>
          </div>
          <pre style={{
            background: '#0a0e14',
            padding: '16px',
            fontFamily: 'var(--font-code)',
            fontSize: '0.85rem',
            color: 'var(--text)',
            margin: 0
          }}>{challenge.code}</pre>
        </div>
      )}

      {/* Option Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '12px',
        width: '100%'
      }}>
        {challenge.options.map((option, idx) => {
          let cardStyle = {
            padding: '14px 18px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            color: 'var(--text)',
            textAlign: 'left',
            fontFamily: 'var(--font-code)',
            fontSize: '0.85rem',
            cursor: isSubmitted ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            outline: 'none',
            justifyContent: 'flex-start'
          };

          // Active/Hover styling depending on state
          if (selectedIdx === idx) {
            cardStyle.borderColor = 'var(--blue)';
            cardStyle.background = 'rgba(88, 166, 255, 0.08)';
            cardStyle.boxShadow = 'var(--glow-blue)';
          }

          if (isSubmitted) {
            if (idx === challenge.correct) {
              cardStyle.borderColor = 'var(--neon)';
              cardStyle.background = 'rgba(57, 255, 20, 0.08)';
              cardStyle.boxShadow = 'var(--glow-neon)';
              cardStyle.color = 'var(--neon)';
            } else if (selectedIdx === idx) {
              cardStyle.borderColor = 'var(--red)';
              cardStyle.background = 'rgba(255, 77, 77, 0.08)';
              cardStyle.boxShadow = 'var(--glow-red)';
              cardStyle.color = 'var(--red)';
            }
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => setSelectedIdx(idx)}
              style={cardStyle}
              className={!isSubmitted ? 'glow-neon-hover' : ''}
            >
              {/* Retro option bullet */}
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '1.5px solid currentColor',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {!isSubmitted && (
        <button
          onClick={handleSubmit}
          disabled={selectedIdx === null}
          className="btn-primary"
          style={{ alignSelf: 'flex-start', marginTop: '8px' }}
        >
          CHECK ANSWER
        </button>
      )}
    </div>
  );
}
