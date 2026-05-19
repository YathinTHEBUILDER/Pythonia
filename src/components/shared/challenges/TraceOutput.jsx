import React, { useState } from 'react';

export default function TraceOutput({ challenge, onAnswer }) {
  const [userOutput, setUserOutput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userOutput.trim() || isSubmitted) return;

    const normalize = (str) => str.replace(/\s+/g, '').trim().toLowerCase();
    const correct = normalize(userOutput) === normalize(challenge.correctAnswer);

    setIsCorrect(correct);
    setIsSubmitted(true);
    onAnswer(correct);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>{challenge.question}</p>

      {/* Code display inside a Console */}
      <div className="glass-panel" style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
        <div className="terminal-header" style={{ background: 'rgba(0,0,0,0.1)' }}>
          <div className="terminal-dots">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
          </div>
          <div className="terminal-title">trace_output.py</div>
          <div></div>
        </div>
        <pre style={{
          background: '#0a0e14',
          padding: '20px',
          fontFamily: 'var(--font-code)',
          fontSize: '0.85rem',
          color: 'var(--text)',
          margin: 0
        }}>{challenge.code || `print(2 ** 3)`}</pre>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Console stdout:
          </label>
          <input
            type="text"
            value={userOutput}
            disabled={isSubmitted}
            onChange={(e) => setUserOutput(e.target.value)}
            onPaste={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            placeholder="Type what gets printed..."
            className="custom-input"
            style={{
              width: '100%',
              fontSize: '0.85rem',
              color: isSubmitted ? (userOutput.trim().toLowerCase() === challenge.correctAnswer.trim().toLowerCase() ? 'var(--neon)' : 'var(--red)') : 'var(--text)'
            }}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>

        {isSubmitted && isCorrect && (
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-code)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Correct Output: </span>
            <code style={{ color: 'var(--neon)', fontWeight: 'bold' }}>{challenge.correctAnswer}</code>
          </div>
        )}

        {!isSubmitted ? (
          <button type="submit" disabled={!userOutput.trim()} className="btn-primary" style={{ alignSelf: 'flex-start' }}>
            SUBMIT OUTPUT
          </button>
        ) : (
          !isCorrect && (
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setIsCorrect(null);
                setUserOutput('');
              }}
              className="btn-purple"
              style={{ alignSelf: 'flex-start' }}
            >
              🔄 TRY AGAIN
            </button>
          )
        )}
      </form>
    </div>
  );
}
