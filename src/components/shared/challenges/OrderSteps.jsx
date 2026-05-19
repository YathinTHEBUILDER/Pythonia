import React, { useState } from 'react';

export default function OrderSteps({ challenge, onAnswer }) {
  const [selectedSteps, setSelectedSteps] = useState([]); // Array of step IDs
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const availableSteps = challenge.steps.filter(
    (step) => !selectedSteps.includes(step.id)
  );

  const handleSelect = (stepId) => {
    if (isSubmitted) return;
    setSelectedSteps([...selectedSteps, stepId]);
  };

  const handleDeselect = (stepId) => {
    if (isSubmitted) return;
    setSelectedSteps(selectedSteps.filter((id) => id !== stepId));
  };

  const moveUp = (index, e) => {
    e.stopPropagation();
    if (index === 0 || isSubmitted) return;
    const nextSelected = [...selectedSteps];
    const temp = nextSelected[index];
    nextSelected[index] = nextSelected[index - 1];
    nextSelected[index - 1] = temp;
    setSelectedSteps(nextSelected);
  };

  const moveDown = (index, e) => {
    e.stopPropagation();
    if (index === selectedSteps.length - 1 || isSubmitted) return;
    const nextSelected = [...selectedSteps];
    const temp = nextSelected[index];
    nextSelected[index] = nextSelected[index + 1];
    nextSelected[index + 1] = temp;
    setSelectedSteps(nextSelected);
  };

  const handleSubmit = () => {
    if (selectedSteps.length !== challenge.steps.length || isSubmitted) return;
    
    const correct = selectedSteps.every(
      (id, idx) => id === challenge.correctOrder[idx]
    );

    setIsCorrect(correct);
    setIsSubmitted(true);
    onAnswer(correct);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>{challenge.question}</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '20px',
        width: '100%'
      }}>
        
        {/* Available Blocks Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Available Blocks (Click to add):
          </span>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.02)',
            padding: '12px',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            minHeight: '80px'
          }}>
            {availableSteps.length === 0 && !isSubmitted && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>
                All blocks added! Reorder below.
              </span>
            )}
            {availableSteps.map((step) => (
              <div
                key={step.id}
                onClick={() => handleSelect(step.id)}
                className="glow-neon-hover"
                style={{
                  padding: '10px 14px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  color: 'var(--text)',
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {step.text}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Workspace Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Your Reconstructed Code (Click to remove / use arrows to sort):
          </span>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            background: '#0a0e14',
            padding: '12px',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            minHeight: '120px'
          }}>
            {selectedSteps.length === 0 && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>
                Workspace empty. Click blocks above to construct program.
              </span>
            )}
            {selectedSteps.map((id, index) => {
              const step = challenge.steps.find((s) => s.id === id);
              if (!step) return null;
              
              let borderStyle = '1px solid var(--border)';
              let bgStyle = 'var(--bg-card)';
              if (isSubmitted) {
                const isCorrectIndex = id === challenge.correctOrder[index];
                borderStyle = isCorrectIndex ? '1px solid var(--neon)' : '1px solid var(--red)';
                bgStyle = isCorrectIndex ? 'rgba(57, 255, 20, 0.03)' : 'rgba(255, 77, 77, 0.03)';
              }

              return (
                <div
                  key={id}
                  onClick={() => handleDeselect(id)}
                  style={{
                    padding: '8px 12px',
                    background: bgStyle,
                    border: borderStyle,
                    borderRadius: '6px',
                    fontFamily: 'var(--font-code)',
                    fontSize: '0.8rem',
                    cursor: isSubmitted ? 'not-allowed' : 'pointer',
                    color: 'var(--text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  <span>{step.text}</span>
                  
                  {/* Sorting Controls */}
                  {!isSubmitted && (
                    <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                      <button
                        onClick={(e) => moveUp(index, e)}
                        disabled={index === 0}
                        style={{ padding: '2px 6px', fontSize: '0.6rem', background: 'rgba(255,255,255,0.03)' }}
                      >
                        ▲
                      </button>
                      <button
                        onClick={(e) => moveDown(index, e)}
                        disabled={index === selectedSteps.length - 1}
                        style={{ padding: '2px 6px', fontSize: '0.6rem', background: 'rgba(255,255,255,0.03)' }}
                      >
                        ▼
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedSteps.length !== challenge.steps.length}
          className="btn-primary"
          style={{ alignSelf: 'flex-start', marginTop: '8px' }}
        >
          SUBMIT ORDER
        </button>
      ) : (
        !isCorrect && (
          <button
            onClick={() => {
              setIsSubmitted(false);
              setIsCorrect(null);
              setSelectedSteps([]);
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
