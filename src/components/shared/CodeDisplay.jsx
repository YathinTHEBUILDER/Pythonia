import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeDisplay({ code, title = 'script.py' }) {
  const customStyle = {
    ...atomDark,
    'code[class*="language-"]': {
      ...atomDark['code[class*="language-"]'],
      fontFamily: 'var(--font-code)',
      fontSize: '0.9rem',
    },
    'pre[class*="language-"]': {
      ...atomDark['pre[class*="language-"]'],
      fontFamily: 'var(--font-code)',
      background: 'transparent',
      margin: 0,
      padding: '16px',
    }
  };

  return (
    <div className="glass-panel" style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
      {/* Terminal Window Header */}
      <div className="terminal-header" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="terminal-dots">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot yellow"></span>
          <span className="terminal-dot green"></span>
        </div>
        <div className="terminal-title" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          {title}
        </div>
        <div style={{ width: '42px' }}></div> {/* Spacer to center name */}
      </div>
      
      {/* Terminal Code Body */}
      <div style={{ background: '#0a0e14', position: 'relative' }}>
        <SyntaxHighlighter 
          language="python" 
          style={customStyle} 
          showLineNumbers={true}
          lineNumberStyle={{ color: 'rgba(255, 255, 255, 0.2)', minWidth: '2em', paddingRight: '1em', textAlign: 'right' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
