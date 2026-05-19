import React, { useState, useEffect } from 'react';
import { ReactFlow, Background, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom Node for displaying variable states in memory
const VariableNode = ({ data }) => {
  const { name, value, type } = data;
  
  // Resolve border and glow colors based on data type
  const getTypeStyles = () => {
    switch (type) {
      case 'int':
        return {
          borderColor: 'var(--blue)',
          boxShadow: 'var(--glow-blue)',
          badgeColor: 'var(--blue)',
          bg: 'rgba(88, 166, 255, 0.08)'
        };
      case 'float':
        return {
          borderColor: 'rgba(88, 166, 255, 0.7)',
          boxShadow: '0 0 6px rgba(88, 166, 255, 0.3)',
          badgeColor: 'rgba(88, 166, 255, 0.7)',
          bg: 'rgba(88, 166, 255, 0.04)'
        };
      case 'str':
        return {
          borderColor: 'var(--purple)',
          boxShadow: '0 0 8px rgba(189, 147, 249, 0.4)',
          badgeColor: 'var(--purple)',
          bg: 'rgba(189, 147, 249, 0.08)'
        };
      case 'list':
        return {
          borderColor: 'var(--orange)',
          boxShadow: '0 0 8px rgba(255, 149, 0, 0.4)',
          badgeColor: 'var(--orange)',
          bg: 'rgba(255, 149, 0, 0.08)'
        };
      case 'dict':
        return {
          borderColor: 'var(--gold)',
          boxShadow: 'var(--glow-gold)',
          badgeColor: 'var(--gold)',
          bg: 'rgba(240, 192, 64, 0.08)'
        };
      case 'func':
        return {
          borderColor: 'var(--neon)',
          boxShadow: 'var(--glow-neon)',
          badgeColor: 'var(--neon)',
          bg: 'rgba(57, 255, 20, 0.08)'
        };
      default:
        return {
          borderColor: 'var(--text-muted)',
          boxShadow: 'none',
          badgeColor: 'var(--text-muted)',
          bg: 'rgba(255, 255, 255, 0.02)'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div style={{
      background: 'rgba(22, 27, 34, 0.95)',
      border: `1.5px solid ${styles.borderColor}`,
      borderRadius: '6px',
      padding: '8px 12px',
      minWidth: '120px',
      boxShadow: styles.boxShadow,
      fontFamily: 'var(--font-code)',
      fontSize: '0.75rem',
      color: 'var(--text)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <Handle type="target" position={Position.Left} style={{ background: styles.borderColor }} />
      
      {/* Variable Name Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: '4px',
        marginBottom: '6px'
      }}>
        <span style={{ fontWeight: 'bold', color: '#ffffff' }}>{name}</span>
        <span style={{
          fontSize: '0.55rem',
          color: styles.badgeColor,
          border: `1px solid ${styles.borderColor}`,
          borderRadius: '3px',
          padding: '1px 4px',
          background: styles.bg,
          fontWeight: '500'
        }}>{type}</span>
      </div>
      
      {/* Variable Value */}
      <div style={{
        wordBreak: 'break-all',
        color: 'var(--text)',
        fontSize: '0.7rem',
        padding: '2px 0'
      }}>
        {value}
      </div>

      <Handle type="source" position={Position.Right} style={{ background: styles.borderColor }} />
    </div>
  );
};

const nodeTypes = {
  variableNode: VariableNode
};

export default function TraceVisualizer({ traceSteps = [], interactive = true }) {
  const [stepIndex, setStepIndex] = useState(0);

  // Sync to traceSteps length
  useEffect(() => {
    setStepIndex(0);
  }, [traceSteps]);

  if (!traceSteps || traceSteps.length === 0) {
    return (
      <div style={{
        height: '100%',
        minHeight: '220px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#090d13',
        color: 'var(--text-muted)',
        border: '1px dashed var(--border)',
        borderRadius: 'var(--radius)',
        fontSize: '0.8rem'
      }}>
        No execution trace available for this mission.
      </div>
    );
  }

  const currentStep = traceSteps[stepIndex];
  
  // Format nodes for React Flow
  const nodes = currentStep.variables.map((v, idx) => {
    // Lay out nodes horizontally or diagonally to avoid overlap
    // For single nodes, center them. Otherwise offset.
    const columns = 2;
    const xSpacing = 160;
    const ySpacing = 90;
    const col = idx % columns;
    const row = Math.floor(idx / columns);

    return {
      id: v.id,
      type: 'variableNode',
      data: { name: v.id, value: v.value, type: v.type },
      position: { x: 40 + col * xSpacing, y: 30 + row * ySpacing }
    };
  });

  // Format edges for React Flow
  const edges = currentStep.edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    label: e.label,
    animated: true,
    style: { stroke: 'var(--neon)', strokeWidth: 1.5 },
    labelStyle: { fill: 'var(--text-muted)', fontSize: '8px', fontFamily: 'var(--font-code)' }
  }));

  const handlePrev = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const handleNext = () => {
    if (stepIndex < traceSteps.length - 1) setStepIndex(stepIndex + 1);
  };

  return (
    <div className="glass-panel" style={{
      height: '100%',
      minHeight: '320px',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid var(--border)',
      background: 'var(--bg-card)'
    }}>
      {/* Visualizer header */}
      <div className="terminal-header" style={{ background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '10px' }}>⚡</span>
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: 'var(--neon)' }}>
            MEMORY TRACE VISUALIZER
          </span>
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          {currentStep.code ? `Executing: ${currentStep.code}` : 'No statement active'}
        </div>
      </div>

      {/* React Flow Workspace */}
      <div style={{ flex: 1, minHeight: '220px', position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          zoomOnScroll={false}
          panOnDrag={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <Background color="rgba(255,255,255,0.03)" gap={16} />
        </ReactFlow>
      </div>

      {/* Step controls (Briefing Mode) */}
      {interactive && traceSteps.length > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 16px',
          borderTop: '1px solid var(--border)',
          background: 'rgba(0,0,0,0.15)'
        }}>
          <button 
            onClick={handlePrev} 
            disabled={stepIndex === 0}
            className="btn-blue"
            style={{ padding: '6px 12px', fontSize: '0.7rem', borderRadius: '4px' }}
          >
            ← PREV
          </button>
          
          <span style={{ 
            fontSize: '0.65rem', 
            fontFamily: 'var(--font-pixel)', 
            color: 'var(--text-muted)' 
          }}>
            STEP {stepIndex + 1} / {traceSteps.length}
          </span>
          
          <button 
            onClick={handleNext} 
            disabled={stepIndex === traceSteps.length - 1}
            className="btn-blue"
            style={{ padding: '6px 12px', fontSize: '0.7rem', borderRadius: '4px' }}
          >
            NEXT →
          </button>
        </div>
      )}
    </div>
  );
}
