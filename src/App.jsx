import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ModuleScreen from './components/ModuleScreen';
import MissionScreen from './components/MissionScreen';
import Profile from './components/Profile';
import Reference from './components/Reference';
import { useGameState } from './state/gameState';

export default function App() {
  const { state } = useGameState();
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'module' | 'mission' | 'profile' | 'reference'
  const [selectedModuleId, setSelectedModuleId] = useState('m1');
  const [selectedMissionId, setSelectedMissionId] = useState(null);

  // Security violation overlay trigger (activates globally on window defocus)
  const [securityViolationActive, setSecurityViolationActive] = useState(false);
  
  // Custom Toast state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2000);
    return () => clearTimeout(timer);
  };

  // Global listeners for active security checks (Registered once on mount)
  useEffect(() => {
    // 1. Right Click Prevention
    const handleContextMenu = (e) => {
      e.preventDefault();
      showToast('🛡️ SHIELD ACTIVE');
    };

    // 2. Anti-inspect / Copy keyboard shortcuts
    const handleKeyDown = (e) => {
      const isCtrl = e.ctrlKey || e.metaKey;
      
      // Block dev tools (F12, Ctrl+Shift+I)
      const isDevTools = e.key === 'F12' || (isCtrl && e.shiftKey && e.key.toLowerCase() === 'i');
      
      // Block copy (Ctrl+C), paste (Ctrl+V), cut (Ctrl+X), view source (Ctrl+U), save (Ctrl+S), print (Ctrl+P)
      const isForbiddenShortcut = isCtrl && ['c', 'v', 'x', 'u', 's', 'p'].includes(e.key.toLowerCase());

      if (isDevTools || isForbiddenShortcut) {
        e.preventDefault();
        showToast('🛡️ SHIELD ACTIVE');
      }
    };

    // 3. Defocus / Tab Deflection Blocker (triggers globally on any page view)
    const handleVisibilityOrBlur = () => {
      setSecurityViolationActive(true);
    };

    const handleFocusOrVisible = () => {
      setSecurityViolationActive(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleVisibilityOrBlur();
      } else {
        handleFocusOrVisible();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleVisibilityOrBlur);
    window.addEventListener('focus', handleFocusOrVisible);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleVisibilityOrBlur);
      window.removeEventListener('focus', handleFocusOrVisible);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []); // Empty dependency array ensures listeners are locked permanently on app boot

  const renderActiveView = () => {
    switch (view) {
      case 'dashboard':
        return (
          <Dashboard 
            setView={setView} 
            setSelectedModuleId={setSelectedModuleId} 
          />
        );
      case 'module':
        return (
          <ModuleScreen 
            moduleId={selectedModuleId} 
            setView={setView} 
            setSelectedMissionId={setSelectedMissionId} 
          />
        );
      case 'mission':
        return (
          <MissionScreen 
            missionId={selectedMissionId} 
            moduleId={selectedModuleId} 
            setView={setView} 
            setSelectedMissionId={setSelectedMissionId} 
          />
        );
      case 'profile':
        return <Profile setView={setView} />;
      case 'reference':
        return <Reference setView={setView} />;
      default:
        return (
          <div style={{ textAlign: 'center', marginTop: '40px', color: 'var(--red)' }}>
            Error: View state '{view}' unrecognized!
          </div>
        );
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'var(--bg-main)',
      color: 'var(--text)',
      overflowX: 'hidden'
    }}>
      
      {/* 🛡️ Custom Floating Security Toast (Neon green theme) */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(57, 255, 20, 0.95)',
          border: '1px solid var(--neon)',
          boxShadow: 'var(--glow-neon)',
          color: '#000000',
          borderRadius: '50px',
          padding: '10px 24px',
          fontFamily: 'var(--font-code)',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          zIndex: 9999999,
          whiteSpace: 'nowrap',
          pointerEvents: 'none'
        }}>
          {toastMessage}
        </div>
      )}

      {/* 🛡️ Fullscreen Neon Shield Overlay Cover */}
      {securityViolationActive && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(10, 14, 20, 0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          zIndex: 999998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          border: '4px solid var(--neon)',
          boxShadow: 'var(--glow-neon)'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '450px',
            width: '100%',
            padding: '36px',
            textAlign: 'center',
            border: '2px solid var(--neon)',
            boxShadow: 'var(--glow-neon)',
            background: 'var(--bg-card)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}>
            <span style={{ fontSize: '4rem', display: 'block', textShadow: '0 0 10px rgba(57,255,20,0.5)' }}>🛡️</span>
            
            <h2 style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.9rem',
              color: 'var(--neon)',
              letterSpacing: '1.5px',
              textShadow: 'var(--glow-neon)'
            }}>
              SHIELD ACTIVE
            </h2>
            
            <p style={{ 
              fontSize: '0.8rem', 
              color: 'var(--text-muted)', 
              lineHeight: '1.5',
              fontFamily: 'var(--font-code)',
              margin: 0
            }}>
              Game environment protected.
            </p>
          </div>
        </div>
      )}

      {/* Dynamic top navigation */}
      <Navbar currentView={view} setView={setView} />
      
      {/* Active page screen content */}
      <main style={{ flex: 1, position: 'relative' }}>
        {renderActiveView()}
      </main>

      {/* Decorative matrix style bottom ticks */}
      <div className="ticks" style={{ margin: '40px 0 0' }}></div>
      
      {/* Sticky Hacker Footer */}
      <footer style={{
        padding: '24px 0',
        borderTop: '1px solid var(--border)',
        background: 'rgba(10, 14, 20, 0.7)',
        textAlign: 'center',
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-code)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span>
            BUILT WITH 🐍 FOR VVCE PYTHON PROGRAMMING LAB (22CSE24)
          </span>
          <span style={{ fontSize: '0.6rem', opacity: 0.8 }}>
            PAIR PROGRAMMED BY <span style={{ color: 'var(--neon)', fontWeight: 'bold' }}>YATHIN K</span> & <span style={{ color: 'var(--blue)', fontWeight: 'bold' }}>ANTIGRAVITY</span> • INSPIRED BY THE GITOPIA DESIGN SYSTEM
          </span>
        </div>
      </footer>

    </div>
  );
}
