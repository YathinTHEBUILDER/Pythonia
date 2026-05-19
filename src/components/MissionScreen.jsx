import React, { useState, useEffect } from 'react';
import { useGameState } from '../state/gameState';
import { MODULES, BADGES } from '../data/gameData';
import CodeDisplay from './shared/CodeDisplay';
import TraceVisualizer from './shared/TraceVisualizer';
import ChallengeRunner from './shared/ChallengeRunner';

export default function MissionScreen({ missionId, moduleId, setView, setSelectedMissionId }) {
  const { state, dispatch } = useGameState();
  const { progress } = state;

  const module = MODULES.find(m => m.id === moduleId);
  const missions = module ? module.missions : [];
  const missionIndex = missions.findIndex(m => m.id === missionId);
  const mission = missions[missionIndex];

  // Phase state: 'briefing' | 'challenge' | 'reward'
  const [phase, setPhase] = useState('briefing');
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  
  // Challenge status states
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [showHint, setShowHint] = useState(false);
  const [hintsUsedThisMission, setHintsUsedThisMission] = useState(0);
  const [wrongAttemptsThisMission, setWrongAttemptsThisMission] = useState(0);
  
  // Easter egg modal
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Sync state if missionId changes
  useEffect(() => {
    setPhase('briefing');
    setCurrentChallengeIdx(0);
    setFeedback(null);
    setShowHint(false);
    setHintsUsedThisMission(0);
    setWrongAttemptsThisMission(0);
    setShowEasterEgg(false);
  }, [missionId]);

  if (!mission) {
    return (
      <div style={{ color: 'var(--red)', textAlign: 'center', marginTop: '40px' }}>
        Mission not found!
        <button onClick={() => setView('dashboard')} className="btn-blue">Back to Dashboard</button>
      </div>
    );
  }

  const currentChallenge = mission.challenges[currentChallengeIdx];

  // Action: Ready to launch challenge
  const handleReadyForChallenge = () => {
    setPhase('challenge');
  };

  // Action: Trigger Easter Egg
  const handleEasterEgg = () => {
    dispatch({ type: 'AWARD_EASTER_EGG' });
    setShowEasterEgg(true);
  };

  // Action: Trigger Hint
  const handleUseHint = () => {
    if (showHint) return;
    dispatch({ type: 'SPEND_HINT', payload: { missionId: mission.id } });
    setShowHint(true);
    setHintsUsedThisMission(prev => prev + 1);
  };

  // Action: Answer submission callback
  const handleChallengeAnswer = (isCorrect) => {
    if (isCorrect) {
      setFeedback('correct');
      setFeedbackMessage('CORRECT! + XP');
      
      // Delay transition to next challenge for animation effect
      setTimeout(() => {
        setFeedback(null);
        setShowHint(false);
        
        const nextIdx = currentChallengeIdx + 1;
        if (nextIdx < mission.challenges.length) {
          setCurrentChallengeIdx(nextIdx);
        } else {
          // Completed all challenges in this mission!
          handleCompleteMission();
        }
      }, 1000);

    } else {
      setFeedback('wrong');
      setFeedbackMessage('INCORRECT! Try again (-5 XP)');
      dispatch({ type: 'WRONG_ATTEMPT', payload: { challengeId: currentChallenge.id } });
      setWrongAttemptsThisMission(prev => prev + 1);

      // Reset wrong state after shake animation finishes
      setTimeout(() => {
        setFeedback(null);
      }, 800);
    }
  };

  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Action: End of all challenges, record completion
  const handleCompleteMission = () => {
    dispatch({
      type: 'COMPLETE_MISSION',
      payload: {
        missionId: mission.id,
        moduleId: module.id,
        xpEarned: mission.xpReward,
        badgeAwarded: mission.badge
      }
    });
    setPhase('reward');
  };

  const handleNextMission = () => {
    const nextMission = missions[missionIndex + 1];
    if (nextMission) {
      setSelectedMissionId(nextMission.id);
    } else {
      setView('module');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px', minHeight: '80vh' }}>
      
      {/* Easter Egg Overlay Modal */}
      {showEasterEgg && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(13, 17, 23, 0.9)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '500px',
            width: '100%',
            padding: '30px',
            textAlign: 'center',
            border: '2px solid var(--neon)',
            boxShadow: 'var(--glow-neon)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <span style={{ fontSize: '3rem' }}>☁️✈️</span>
            <h3 style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.8rem', color: 'var(--neon)' }}>
              import antigravity
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: '1.6' }}>
              "You discovered the Easter Egg!<br />
              In Python, typing <code>import antigravity</code> opens a webcomic about the simplicity of Python, jokes that you can fly!"
            </p>
            <div style={{
              padding: '12px',
              border: '1px dashed var(--gold)',
              background: 'rgba(240, 192, 64, 0.05)',
              borderRadius: '6px',
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.65rem',
              color: 'var(--gold)'
            }}>
              ⭐ + 50 BONUS XP AWARDED!
            </div>
            <button 
              onClick={() => {
                setShowEasterEgg(false);
                // Restart active blank with correct answer cleared
                window.location.reload();
              }} 
              className="btn-primary" 
              style={{ alignSelf: 'center', fontSize: '0.7rem' }}
            >
              RESUME FLIGHT
            </button>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '14px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <button 
            onClick={() => setView('module')} 
            className="btn-blue" 
            style={{ padding: '6px 12px', fontSize: '0.7rem', marginRight: '16px' }}
          >
            ← BACK TO UNIT
          </button>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            {module.title} › Mission {missionIndex + 1}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{
            fontSize: '0.55rem',
            fontFamily: 'var(--font-pixel)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            padding: '4px 8px',
            borderRadius: '4px',
            color: 'var(--text-muted)'
          }}>
            PHASE: {phase.toUpperCase()}
          </span>
        </div>
      </div>

      {/* PHASE 1: BRIEFING */}
      {phase === 'briefing' && (
        <div className="grid-cols-layout" style={{ gap: '30px' }}>
          {/* Briefing text & code panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border)' }}>
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: 'var(--neon)', display: 'block', marginBottom: '14px' }}>
                &gt;_ COMMAND BRIEFING
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', lineHeight: '1.6' }}>
                {mission.briefing.lines.map((line, idx) => (
                  <p key={idx} style={{ animation: `blink 0.3s ease forwards` }}>
                    <span style={{ color: 'var(--neon)', fontWeight: 'bold' }}>&gt;</span> {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Code syntax display */}
            <CodeDisplay 
              code={mission.briefing.codeExample} 
              title={`experiment_${mission.id}.py`} 
            />

            {/* Launch action */}
            <button 
              onClick={handleReadyForChallenge} 
              className="btn-primary" 
              style={{
                alignSelf: 'stretch',
                marginTop: '10px',
                padding: '16px'
              }}
            >
              READY FOR CHALLENGE →
            </button>
          </div>

          {/* Right side visualizer panel */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <TraceVisualizer traceSteps={mission.briefing.traceSteps} interactive={true} />
          </div>
        </div>
      )}

      {/* PHASE 2: CHALLENGE */}
      {phase === 'challenge' && currentChallenge && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Challenge header bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.02)',
            padding: '10px 16px',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius) var(--radius) 0 0',
            borderBottom: 'none'
          }}>
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.6rem', color: 'var(--blue)' }}>
              TASK {currentChallengeIdx + 1} OF {mission.challenges.length}
            </span>
            
            {/* Hint Button */}
            <button
              onClick={handleUseHint}
              disabled={showHint}
              className="btn-purple"
              style={{ padding: '4px 10px', fontSize: '0.65rem', borderRadius: '4px' }}
            >
              💡 HINT (-10 XP)
            </button>
          </div>

          {/* Main challenge interface */}
          <div 
            className={`glass-panel ${feedback === 'wrong' ? 'error-shake' : ''} ${feedback === 'correct' ? 'correct-flash' : ''}`}
            style={{
              padding: '24px',
              borderRadius: '0 0 var(--radius) var(--radius)',
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              transition: 'all 0.15s ease'
            }}
          >
            <ChallengeRunner 
              challenge={currentChallenge} 
              onAnswer={handleChallengeAnswer}
              onEasterEgg={handleEasterEgg}
            />

            {/* Live Feedback overlay messages */}
            {feedback && (
              <div style={{
                marginTop: '16px',
                padding: '12px',
                borderRadius: '6px',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                border: feedback === 'correct' ? '1px solid var(--neon)' : '1px solid var(--red)',
                background: feedback === 'correct' ? 'rgba(57,255,20,0.05)' : 'rgba(255,77,77,0.05)',
                color: feedback === 'correct' ? 'var(--neon)' : 'var(--red)',
                animation: 'blink 0.5s infinite'
              }}>
                {feedbackMessage}
              </div>
            )}

            {/* Active Hint display */}
            {showHint && (
              <div className="glass-panel" style={{
                marginTop: '20px',
                padding: '16px',
                border: '1px dashed var(--purple)',
                background: 'rgba(189, 147, 249, 0.03)',
                fontSize: '0.8rem',
                lineHeight: '1.5'
              }}>
                <span style={{ color: 'var(--purple)', fontWeight: 'bold' }}>💡 HINT SUGGESTION: </span>
                {currentChallenge.hint}
              </div>
            )}
          </div>

        </div>
      )}

      {/* PHASE 3: REWARD SUMMARY */}
      {phase === 'reward' && (
        <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
          
          <div className="glass-panel" style={{
            padding: '40px 30px',
            border: '2px solid var(--neon)',
            boxShadow: 'var(--glow-neon)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            background: 'var(--bg-card)'
          }}>
            
            <div>
              <span style={{ fontSize: '4rem', display: 'block', animation: 'blink 2s infinite' }}>🎉</span>
              <h2 style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '1.1rem',
                color: 'var(--neon)',
                marginTop: '16px',
                letterSpacing: '1px'
              }}>
                MISSION COMPLETE!
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                You successfully mastered: "{mission.title}"
              </p>
            </div>

            {/* Badge Unlocked Section */}
            {mission.badge && (() => {
              const badge = BADGES.find(b => b.id === mission.badge);
              if (!badge) return null;
              return (
                <div style={{
                  padding: '20px',
                  border: '1px solid var(--gold)',
                  boxShadow: 'var(--glow-gold)',
                  background: 'rgba(240, 192, 64, 0.04)',
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '0.55rem', fontFamily: 'var(--font-pixel)', color: 'var(--gold)' }}>
                    🏆 BADGE UNLOCKED!
                  </span>
                  <span style={{ fontSize: '2.5rem', margin: '4px 0' }}>{badge.emoji}</span>
                  <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#ffffff' }}>{badge.title}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{badge.description}</span>
                </div>
              );
            })()}

            {/* Score Yield Panel */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '16px',
              background: 'rgba(0,0,0,0.15)',
              borderRadius: '6px',
              border: '1px solid var(--border)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Base XP Yield:</span>
                <span style={{ color: 'var(--neon)', fontWeight: 'bold' }}>+{mission.xpReward} XP</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Hints Deductions:</span>
                <span style={{ color: 'var(--purple)', fontWeight: 'bold' }}>-{hintsUsedThisMission * 10} XP ({hintsUsedThisMission} used)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Wrong Tries Deductions:</span>
                <span style={{ color: 'var(--red)', fontWeight: 'bold' }}>-{wrongAttemptsThisMission * 5} XP ({wrongAttemptsThisMission} wrong)</span>
              </div>
            </div>

            {/* Navigations CTA */}
            <div style={{ display: 'flex', gap: '14px', width: '100%' }}>
              <button 
                onClick={() => setView('module')} 
                className="btn-blue"
                style={{ flex: 1, padding: '12px' }}
              >
                BACK TO UNIT
              </button>
              
              <button 
                onClick={handleNextMission}
                className="btn-primary"
                style={{ flex: 1, padding: '12px' }}
              >
                {missionIndex < missions.length - 1 ? 'NEXT MISSION →' : 'COMPLETE UNIT 🎓'}
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
