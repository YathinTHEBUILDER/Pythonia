import React, { useState } from 'react';

export default function Scenario({ challenge, onAnswer }) {
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
      {/* Scenario Situation Prompt */}
      <div className="glass-panel" style={{
        padding: '16px',
        border: '1px solid var(--orange)',
        background: 'rgba(255, 149, 0, 0.03)',
        borderRadius: 'var(--radius)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <span style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.55rem',
          color: 'var(--orange)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          ⚠️ LAB SITUATION SCENARIO
        </span>
        <p style={{
          fontSize: '0.85rem',
          lineHeight: '1.5',
          fontFamily: 'var(--font-code)',
          color: 'var(--text)'
        }}>
          {challenge.question}
        </p>
      </div>

      {/* Choices Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {challenge.options.map((option, idx) => {
          let cardStyle = {
            padding: '12px 16px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            color: 'var(--text)',
            textAlign: 'left',
            fontFamily: 'var(--font-code)',
            fontSize: '0.8rem',
            cursor: isSubmitted ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            outline: 'none',
            justifyContent: 'flex-start'
          };

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
              <span style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                border: '1px solid currentColor',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.6rem',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {idx + 1}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedIdx === null}
          className="btn-primary"
          style={{ alignSelf: 'flex-start', marginTop: '8px' }}
        >
          RESOLVE SCENARIO
        </button>
      ) : (
        selectedIdx !== challenge.correct && (
          <button
            onClick={() => {
              setIsSubmitted(false);
              setSelectedIdx(null);
            }}
            className="btn-purple"
            style={{ alignSelf: 'flex-start', marginTop: '8px' }}
          >
            🔄 TRY AGAIN
          </button>
        )
      )}
    </div>
  );
}
