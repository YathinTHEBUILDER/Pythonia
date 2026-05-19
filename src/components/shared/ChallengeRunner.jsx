import React from 'react';
import FillBlank from './challenges/FillBlank';
import MCQ from './challenges/MCQ';
import FixBug from './challenges/FixBug';
import TraceOutput from './challenges/TraceOutput';
import OrderSteps from './challenges/OrderSteps';
import Scenario from './challenges/Scenario';

export default function ChallengeRunner({ challenge, onAnswer, onEasterEgg }) {
  if (!challenge) return null;

  switch (challenge.type) {
    case 'fill_blank':
      return <FillBlank challenge={challenge} onAnswer={onAnswer} onEasterEgg={onEasterEgg} />;
    case 'mcq':
      return <MCQ challenge={challenge} onAnswer={onAnswer} />;
    case 'fix_bug':
      return <FixBug challenge={challenge} onAnswer={onAnswer} />;
    case 'trace':
      return <TraceOutput challenge={challenge} onAnswer={onAnswer} />;
    case 'order':
      return <OrderSteps challenge={challenge} onAnswer={onAnswer} />;
    case 'scenario':
      return <Scenario challenge={challenge} onAnswer={onAnswer} />;
    default:
      return (
        <div style={{ color: 'var(--red)', padding: '10px', border: '1px dashed var(--red)' }}>
          Unknown challenge type: {challenge.type}
        </div>
      );
  }
}
