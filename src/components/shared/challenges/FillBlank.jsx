import React, { useState } from 'react';

export default function FillBlank({ challenge, onAnswer, onEasterEgg }) {
  const [answers, setAnswers] = useState(Array(challenge.blanks.length).fill(''));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (index, value) => {
    const nextAnswers = [...answers];
    nextAnswers[index] = value;
    setAnswers(nextAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitted) return;

    // Check for Easter Egg
    const containsEasterEgg = answers.some(ans => 
      ans.trim().toLowerCase() === 'import antigravity'
    );

    if (containsEasterEgg && onEasterEgg) {
      onEasterEgg();
      return;
    }

    // Standard verification
    const isCorrect = answers.every((ans, idx) => 
      ans.trim().toLowerCase() === challenge.blanks[idx].trim().toLowerCase()
    );

    setIsSubmitted(true);
    onAnswer(isCorrect);
  };

  // Replace blanks with inputs
  const renderCodeWithInputs = () => {
    const lines = challenge.code.split('\n');
    let blankIndex = 0;

    return lines.map((line, lineIdx) => {
      // Split the line by underscores
      const parts = line.split(/___+/);
      
      if (parts.length === 1) {
        return <div key={lineIdx} style={{ minHeight: '1.2em' }}>{line}</div>;
      }

      return (
        <div key={lineIdx} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', minHeight: '1.2em' }}>
          {parts.map((part, partIdx) => {
            const currentBlank = blankIndex;
            const isLast = partIdx === parts.length - 1;
            if (!isLast) {
              blankIndex++;
            }

            return (
              <React.Fragment key={partIdx}>
                <span>{part}</span>
                {!isLast && (
                  <input
                    type="text"
                    value={answers[currentBlank] || ''}
                    disabled={isSubmitted}
                    onChange={(e) => handleInputChange(currentBlank, e.target.value)}
                    onPaste={(e) => e.preventDefault()}
                    onDrop={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    className="code-blank-input"
                    style={{
                      width: `${Math.max(50, (challenge.blanks[currentBlank]?.length || 3) * 12)}px`,
                      margin: '0 4px',
                      textAlign: 'center'
                    }}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>{challenge.question}</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Terminal panel */}
        <div className="glass-panel" style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
          <div className="terminal-header" style={{ background: 'rgba(0,0,0,0.1)' }}>
            <div className="terminal-dots">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
            </div>
            <div className="terminal-title">fill_blanks.py</div>
            <div></div>
          </div>
          <div style={{
            background: '#0a0e14',
            padding: '20px',
            fontFamily: 'var(--font-code)',
            fontSize: '0.9rem',
            color: 'var(--text)',
            lineHeight: '1.6'
          }}>
            {renderCodeWithInputs()}
          </div>
        </div>

        {!isSubmitted && (
          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
            CHECK ANSWER
          </button>
        )}
      </form>
    </div>
  );
}
