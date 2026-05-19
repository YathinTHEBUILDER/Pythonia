import React, { useState } from 'react';
import { REFERENCE_DATA } from '../data/referenceData';
import { MODULES } from '../data/gameData';

export default function Reference({ setView }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModuleFilter, setActiveModuleFilter] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  // Filter concepts based on search query and module selection
  const filteredConcepts = REFERENCE_DATA.filter((item) => {
    const matchesSearch = 
      item.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesModule = 
      activeModuleFilter === 'all' || 
      item.module === parseInt(activeModuleFilter);

    return matchesSearch && matchesModule;
  });

  const handleCopyCode = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px 40px' }}>
      
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button onClick={() => setView('dashboard')} className="btn-blue" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>
          ← BACK TO MAP
        </button>
        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-pixel)', color: 'var(--text-muted)' }}>
          SYNTAX REFERENCE MANUAL
        </span>
      </div>

      {/* Title block */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.4rem' }}>📖</span>
          <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text)' }}>
            PYTHON LAB SYNTAX MANUAL
          </h2>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Search and query any syntax keyword, built-in function, or data type included in the VTU 1BPLCSL207 programming syllabus.
        </p>
      </div>

      {/* FILTER PANEL */}
      <div className="glass-panel" style={{
        padding: '20px',
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        marginBottom: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {/* Search Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Filter by Search Keyword:
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type 'print', 'list', 'class', 'exceptions'..."
            className="custom-input"
            style={{ width: '100%', fontSize: '0.85rem' }}
          />
        </div>

        {/* Tab Module filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Filter by Syllabus Module:
          </label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <button
              onClick={() => setActiveModuleFilter('all')}
              style={{
                padding: '6px 12px',
                fontSize: '0.7rem',
                borderColor: activeModuleFilter === 'all' ? 'var(--neon)' : 'var(--border)',
                color: activeModuleFilter === 'all' ? 'var(--neon)' : 'var(--text)'
              }}
            >
              ALL MODULES
            </button>
            {MODULES.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => setActiveModuleFilter(m.id.replace('m', ''))}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.7rem',
                  borderColor: activeModuleFilter === m.id.replace('m', '') ? 'var(--neon)' : 'var(--border)',
                  color: activeModuleFilter === m.id.replace('m', '') ? 'var(--neon)' : 'var(--text)'
                }}
              >
                MOD {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONCEPTS LIST GRID */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-pixel)', color: 'var(--text-muted)' }}>
            CATALOG MATCHES ({filteredConcepts.length} FOUND)
          </span>
        </div>

        {filteredConcepts.length === 0 ? (
          <div style={{
            padding: '40px',
            border: '1px dashed var(--border)',
            borderRadius: 'var(--radius)',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.85rem'
          }}>
            No syntax concepts matched your filters. Try clearing your query!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredConcepts.map((item) => (
              <div 
                key={item.id} 
                className="glass-panel"
                style={{
                  padding: '24px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-glass)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  position: 'relative'
                }}
              >
                {/* Entry header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '0.85rem', color: '#ffffff', fontFamily: 'var(--font-code)', fontWeight: 'bold' }}>
                      {item.concept}
                    </h3>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.55rem',
                        fontFamily: 'var(--font-pixel)',
                        background: 'rgba(88,166,255,0.08)',
                        border: '1px solid rgba(88,166,255,0.3)',
                        padding: '1px 4px',
                        borderRadius: '3px',
                        color: 'var(--blue)'
                      }}>
                        MOD {item.module}
                      </span>
                      {item.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: '0.55rem',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid var(--border)',
                          padding: '1px 5px',
                          borderRadius: '3px',
                          color: 'var(--text-muted)'
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Copy button */}
                  <button
                    onClick={() => handleCopyCode(item.id, item.example)}
                    className={copiedId === item.id ? 'btn-primary' : 'btn-blue'}
                    style={{
                      padding: '4px 10px',
                      fontSize: '0.65rem',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-pixel)'
                    }}
                  >
                    {copiedId === item.id ? 'COPIED! ✓' : 'COPY CODE'}
                  </button>
                </div>

                {/* Entry description */}
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {item.description}
                </p>

                {/* Entry syntax block */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Syntax:
                  </span>
                  <code style={{
                    padding: '8px 12px',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    color: 'var(--purple)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-code)',
                    display: 'block',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {item.syntax}
                  </code>
                </div>

                {/* Entry code example */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Minimal code example:
                  </span>
                  <pre style={{
                    padding: '12px 16px',
                    background: '#0a0e14',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    color: 'var(--neon)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-code)',
                    display: 'block',
                    margin: 0,
                    overflowX: 'auto'
                  }}><code>{item.example}</code></pre>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
