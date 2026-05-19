# 🐍 PYTHONIA — Improvement Roadmap
> Based on repo analysis: `YathinTHEBUILDER/Pythonia` · 2 commits · deployed at pythonia-two.vercel.app
> Dependencies installed correctly. This is the scaffold stage. Everything below is what to build next.

---

## CURRENT STATE DIAGNOSIS

| Signal | What It Tells Us |
|---|---|
| 2 commits | Vite scaffold + PYTHONIA_SPEC.md committed. No real app code yet. |
| JS 94.7% / CSS 4.9% | Same ratio as Gitopia. CSS is still near-empty (Vite default). |
| All 5 deps installed | `framer-motion`, `@xyflow/react`, `react-syntax-highlighter` ready. |
| Live on Vercel | Auto-deploy is wired up. Every push goes live. |
| No README content | No screenshots, no GIF, nobody knows what this is. |

**Bottom line:** The plumbing exists. The house hasn't been built. Everything below is ordered by what blocks what.

---

## PRIORITY MAP

```
P0 — Blocker       Must exist before anything else runs
P1 — Core          The actual game. Nothing works without these.
P2 — Content       The missions, challenges, data. Empty game = useless.
P3 — Polish        Makes it feel like Gitopia, not a student project.
P4 — Growth        Post-launch features for reach and retention.
```

---

## P0 — BLOCKERS (Do These First, In Order)

### P0.1 — Design System: `src/index.css`

The Vite default CSS is still there. Replace the entire file with the design system from the spec. Nothing will look right until this exists.

**The exact variables to add:**

```css
/* RESET */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-code);
  min-height: 100vh;
}

/* DESIGN TOKENS */
:root {
  --bg:          #0d1117;
  --bg-card:     #161b22;
  --bg-glass:    rgba(22, 27, 34, 0.7);
  --neon:        #39ff14;
  --blue:        #58a6ff;
  --gold:        #f0c040;
  --red:         #ff4d4d;
  --purple:      #bd93f9;
  --orange:      #ff9500;
  --text:        #e6edf3;
  --text-muted:  #8b949e;
  --font-pixel:  'Press Start 2P', monospace;
  --font-code:   'Fira Code', monospace;
  --glow-neon:   0 0 8px rgba(57,255,20,0.6), 0 0 24px rgba(57,255,20,0.2);
  --glow-blue:   0 0 8px rgba(88,166,255,0.5);
  --glow-gold:   0 0 8px rgba(240,192,64,0.6);
  --glow-red:    0 0 8px rgba(255,77,77,0.7);
  --border:      rgba(255,255,255,0.08);
  --border-neon: rgba(57,255,20,0.3);
  --radius:      8px;
  --radius-lg:   16px;
}

/* REUSABLE CLASSES */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}
.card-glass {
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}
.neon-text { color: var(--neon); text-shadow: var(--glow-neon); }
.btn-neon {
  background: transparent;
  border: 1px solid var(--neon);
  color: var(--neon);
  font-family: var(--font-code);
  font-size: 0.85rem;
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius);
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s;
}
.btn-neon:hover { box-shadow: var(--glow-neon); background: rgba(57,255,20,0.08); }

/* KEYFRAMES */
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes errorFlash {
  0%   { border-color: var(--red); box-shadow: var(--glow-red); }
  100% { border-color: var(--border); box-shadow: none; }
}
@keyframes successGlow {
  0%   { border-color: var(--neon); box-shadow: var(--glow-neon); }
  100% { border-color: var(--border); box-shadow: none; }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

**Why it's P0:** Every component depends on these variables. Without them, every card looks like a white box.

---

### P0.2 — State Machine: `src/state/gameState.js`

The entire game is one `useReducer`. Without this, components can't share XP, progress, or badges.

```js
// src/state/gameState.js

const RANK_THRESHOLDS = [
  { xp: 0,    title: 'Snake Rookie',         rank: 1 },
  { xp: 150,  title: 'Indentation Initiate', rank: 2 },
  { xp: 400,  title: 'Variable Scout',       rank: 3 },
  { xp: 750,  title: 'Loop Apprentice',      rank: 4 },
  { xp: 1200, title: 'Function Knight',      rank: 5 },
  { xp: 1700, title: 'List Paladin',         rank: 6 },
  { xp: 2200, title: 'Dict Ranger',          rank: 7 },
  { xp: 2700, title: 'Exception Slayer',     rank: 8 },
  { xp: 3300, title: 'File Warrior',         rank: 9 },
  { xp: 3900, title: 'OOP Master',           rank: 10 },
  { xp: 4300, title: 'Python Ninja',         rank: 11 },
  { xp: 4600, title: 'Python God',           rank: 12 },
];

const getRank = (xp) =>
  [...RANK_THRESHOLDS].reverse().find(r => xp >= r.xp) || RANK_THRESHOLDS[0];

export const INITIAL_STATE = {
  view: 'onboarding',           // 'onboarding' | 'dashboard' | 'module' | 'mission' | 'profile' | 'reference'
  activeModuleId: null,
  activeMissionId: null,
  player: { name: '', avatar: 0 },
  progress: {
    xp: 0,
    rank: 1,
    rankTitle: 'Snake Rookie',
    missionsCompleted: {},       // { missionId: true }
    modulesCompleted: {},        // { moduleId: true }
    badgesEarned: [],
    streak: 0,
    lastPlayed: null,
  },
  stats: {
    totalHintsUsed: 0,
    totalChallengesSolved: 0,
    totalWrongAttempts: 0,
  },
};

export function gameReducer(state, action) {
  switch (action.type) {
    case 'INIT_PLAYER':
      return { ...state, player: { name: action.name, avatar: action.avatar }, view: 'dashboard' };

    case 'NAVIGATE':
      return { ...state, view: action.view, activeModuleId: action.moduleId ?? null, activeMissionId: action.missionId ?? null };

    case 'COMPLETE_MISSION': {
      const newXp = state.progress.xp + action.xpEarned;
      const { title: rankTitle, rank } = getRank(newXp);
      const badges = action.badge && !state.progress.badgesEarned.includes(action.badge)
        ? [...state.progress.badgesEarned, action.badge]
        : state.progress.badgesEarned;
      return {
        ...state,
        progress: {
          ...state.progress,
          xp: newXp,
          rank,
          rankTitle,
          missionsCompleted: { ...state.progress.missionsCompleted, [action.missionId]: true },
          badgesEarned: badges,
          lastPlayed: new Date().toISOString(),
        },
        stats: {
          ...state.stats,
          totalChallengesSolved: state.stats.totalChallengesSolved + action.challengesSolved,
        },
      };
    }

    case 'SPEND_HINT':
      return {
        ...state,
        progress: { ...state.progress, xp: Math.max(0, state.progress.xp - 10) },
        stats: { ...state.stats, totalHintsUsed: state.stats.totalHintsUsed + 1 },
      };

    case 'WRONG_ATTEMPT':
      return {
        ...state,
        progress: { ...state.progress, xp: Math.max(0, state.progress.xp - 5) },
        stats: { ...state.stats, totalWrongAttempts: state.stats.totalWrongAttempts + 1 },
      };

    case 'LOAD_FROM_STORAGE':
      return { ...INITIAL_STATE, ...action.savedState };

    case 'RESET':
      return INITIAL_STATE;

    default:
      return state;
  }
}
```

**Then wire it in `App.jsx`:**

```jsx
import { useReducer, useEffect, createContext, useContext } from 'react';
import { gameReducer, INITIAL_STATE } from './state/gameState';

export const GameContext = createContext(null);
export const useGame = () => useContext(GameContext);

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pythonia_v1');
    if (saved) dispatch({ type: 'LOAD_FROM_STORAGE', savedState: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem('pythonia_v1', JSON.stringify(state));
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {/* Route based on state.view */}
      {state.view === 'onboarding' && <Onboarding />}
      {state.view === 'dashboard'  && <Dashboard />}
      {state.view === 'module'     && <ModuleScreen />}
      {state.view === 'mission'    && <MissionScreen />}
      {state.view === 'profile'    && <Profile />}
      {state.view === 'reference'  && <Reference />}
    </GameContext.Provider>
  );
}
```

**Why it's P0:** No other component can work without shared state. XP bars, locked modules, badge checks — all require this.

---

### P0.3 — Google Fonts: `index.html`

Without this, `Press Start 2P` renders as Arial and the whole aesthetic collapses.

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Pythonia — Learn Python Like a Game. Missions, XP, badges for VTU 1BPLCSL207." />
  <title>🐍 PYTHONIA — Learn Python Like a Game</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet">
</head>
```

---

## P1 — CORE FEATURES

### P1.1 — Onboarding Screen (Missing entirely)

Right now users land on whatever Vite's default `App.jsx` shows. The first screen needs to be an onboarding that collects username + avatar before entering the game.

**What to build:**

```
┌────────────────────────────────────────────────────┐
│                                                    │
│       🐍  PYTHONIA                                 │
│       Learn Python Like a Game                    │
│                                                    │
│       Enter your username:                         │
│       [ Yathin _________________ ]                 │
│                                                    │
│       Choose your avatar:                          │
│       [🐍][🐉][👾][🤖][🦎][💀][⚡][🔥][🌀][🎯][🧬][🦾] │
│                                                    │
│              [ START MISSION ]                     │
│                                                    │
└────────────────────────────────────────────────────┘
```

```jsx
// src/components/Onboarding.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../App';

const AVATARS = ['🐍','🐉','👾','🤖','🦎','💀','⚡','🔥','🌀','🎯','🧬','🦾'];

export default function Onboarding() {
  const { dispatch } = useGame();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(0);

  const handleStart = () => {
    if (!name.trim()) return;
    dispatch({ type: 'INIT_PLAYER', name: name.trim(), avatar });
  };

  return (
    <motion.div
      className="onboarding-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="neon-text" style={{ fontFamily: 'var(--font-pixel)', fontSize: '1.2rem' }}>
        🐍 PYTHONIA
      </h1>
      <p className="text-muted">Learn Python Like a Game</p>

      <div className="input-group">
        <label>Enter your username</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleStart()}
          placeholder="YathinTHEBUILDER"
          maxLength={20}
        />
      </div>

      <div className="avatar-grid">
        {AVATARS.map((emoji, i) => (
          <button
            key={i}
            className={`avatar-option ${avatar === i ? 'selected' : ''}`}
            onClick={() => setAvatar(i)}
          >
            {emoji}
          </button>
        ))}
      </div>

      <button className="btn-neon" onClick={handleStart} disabled={!name.trim()}>
        START MISSION →
      </button>
    </motion.div>
  );
}
```

---

### P1.2 — Navbar: `src/components/Navbar.jsx`

Currently missing or placeholder. Needs to be in every view.

**Critical bugs to avoid:**
- Don't conditionally render the Navbar — it should always be present after onboarding
- The XP bar must animate on XP change (use `key={xp}` to trigger re-render)
- The rank badge needs `font-family: var(--font-pixel)` at a tiny size or it looks wrong

```jsx
// XP bar — the animated fill is the key detail
<div className="xp-bar-track">
  <div
    className="xp-bar-fill"
    style={{
      width: `${(xp / nextRankXp) * 100}%`,
      transition: 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
    }}
  />
</div>
```

---

### P1.3 — Dashboard Module Cards: `src/components/Dashboard.jsx`

The current dashboard (if it exists) is likely placeholder. The module cards need:

**Locked state logic:**

```jsx
// A module is unlocked if prerequisite module is completed OR it's module 1
const isUnlocked = (module) => {
  if (!module.prerequisite) return true;
  return state.progress.modulesCompleted[module.prerequisite] === true;
};
```

**Completion percentage:**

```jsx
const getModuleProgress = (module) => {
  const total = module.missions.length;
  const done = module.missions.filter(m => state.progress.missionsCompleted[m.id]).length;
  return { done, total, pct: total > 0 ? (done / total) * 100 : 0 };
};
```

**The card itself must visually communicate:**
- Locked (greyed out, lock icon, no hover effect)
- In progress (XP bar partially filled, neon border)
- Completed (gold border, checkmark)

---

### P1.4 — Mission Screen Phase Machine: `src/components/MissionScreen.jsx`

This is the most complex component. It must be a **state machine** — not a series of conditionals.

```jsx
// Phase state: 'briefing' | 'challenge' | 'reward'
const [phase, setPhase] = useState('briefing');
const [challengeIndex, setChallengeIndex] = useState(0);
const [xpEarned, setXpEarned] = useState(0);
const [hintsUsed, setHintsUsed] = useState(0);
```

**Critical: Don't allow skipping.** The "Ready for Challenge" button should only appear after the full briefing text has finished typing. Track a `briefingComplete` boolean via a `useEffect` tied to the typewriter animation.

**Typewriter effect for briefing lines:**

```jsx
// Efficient typewriter — animates one line, then moves to next
useEffect(() => {
  if (lineIndex >= mission.briefing.lines.length) {
    setBriefingComplete(true);
    return;
  }
  let charIndex = 0;
  const line = mission.briefing.lines[lineIndex];
  const interval = setInterval(() => {
    setDisplayedText(prev => prev + line[charIndex]);
    charIndex++;
    if (charIndex >= line.length) {
      clearInterval(interval);
      setTimeout(() => {
        setDisplayedLines(prev => [...prev, line]);
        setDisplayedText('');
        setLineIndex(prev => prev + 1);
      }, 300);
    }
  }, 28); // 28ms per char = readable speed
  return () => clearInterval(interval);
}, [lineIndex]);
```

---

### P1.5 — Challenge Types: `src/components/challenges/`

All 6 need to be built. Priority order (easiest → hardest):

**Build order:**
1. `MCQ.jsx` — multiple choice, just button grid
2. `FillBlank.jsx` — text input(s) with pattern matching
3. `TraceOutput.jsx` — single text input, match expected output
4. `Scenario.jsx` — same as MCQ but with longer text
5. `FixBug.jsx` — textarea, validate edited code
6. `OrderSteps.jsx` — drag-and-drop (use HTML5 `draggable` or a simple click-to-place system)

**Common validation pattern — use this for all types:**

```jsx
const checkAnswer = (userAnswer, correctAnswer) => {
  // Trim, lowercase, normalize whitespace before comparing
  const normalize = (s) => String(s).trim().toLowerCase().replace(/\s+/g, ' ');
  return normalize(userAnswer) === normalize(correctAnswer);
};
```

**For FillBlank — accept common variations:**

```jsx
// Accept both 1.8 and "1.8" and "  1.8  "
const checkBlank = (input, correct) => {
  const a = input.trim();
  const b = String(correct).trim();
  return a === b || parseFloat(a) === parseFloat(b);
};
```

**For OrderSteps — simplest implementation (click-to-place, no drag library needed):**

```jsx
// Two columns: "Available steps" and "Your order"
// Click a step in Available → moves to Your order (appended)
// Click a step in Your order → moves back to Available
// On submit → compare order arrays
```

---

### P1.6 — XP Bar Component: `src/components/shared/XPBar.jsx`

Reusable. Used in Navbar and Reward screen.

```jsx
export default function XPBar({ xp, nextXp, showLabel = true }) {
  const pct = Math.min((xp / nextXp) * 100, 100);
  return (
    <div className="xp-bar-wrapper">
      {showLabel && <span className="xp-label">{xp} / {nextXp} XP</span>}
      <div className="xp-bar-track">
        <div className="xp-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
```

---

## P2 — CONTENT (The Actual Missions)

### P2.1 — `src/data/gameData.js` is the most important file in the project

Without real challenge content, the game is just a pretty shell. This file is what makes it actually useful for exam prep.

**Current status:** Almost certainly empty or has placeholder data.

**What must exist for Module 1 alone to be fully playable:**

```js
// Minimum viable mission (m1_5 — Temperature Converter)
{
  id: 'm1_5',
  title: 'Temperature Converter',
  badge: 'temperature_wizard',
  xpReward: 120,
  briefing: {
    lines: [
      'Python uses float() to read decimal numbers from input.',
      'The Celsius to Fahrenheit formula is: F = (C × 1.8) + 32',
      'The Fahrenheit to Celsius formula is: C = (F - 32) / 1.8',
      'We format the output with %.1f to show one decimal place.',
    ],
    codeExample: `c = float(input("Enter temperature in Celsius: "))
fahrenheit = (c * 1.8) + 32
print('%.1f degree Celsius is %.1f degree Fahrenheit' % (c, fahrenheit))`,
    traceSteps: [
      { step: 1, label: 'User inputs 88', variables: [{ id: 'c', value: '88.0', type: 'float' }] },
      { step: 2, label: 'Calculate F', variables: [
        { id: 'c', value: '88.0', type: 'float' },
        { id: 'fahrenheit', value: '190.4', type: 'float' },
      ]},
    ]
  },
  challenges: [
    {
      id: 'c_m1_5_1',
      type: 'fill_blank',
      question: 'Fill in the formula to convert Celsius to Fahrenheit:',
      code: 'fahrenheit = (c * ___) + ___',
      blanks: ['1.8', '32'],
      hint: 'The formula is F = (C × 1.8) + 32',
      xpValue: 30,
    },
    {
      id: 'c_m1_5_2',
      type: 'trace',
      question: 'What does this code print when c = 0?',
      code: `c = 0.0\nfahrenheit = (c * 1.8) + 32\nprint(fahrenheit)`,
      answer: '32.0',
      hint: '0°C = 32°F — the freezing point of water.',
      xpValue: 30,
    },
    {
      id: 'c_m1_5_3',
      type: 'mcq',
      question: 'Which function converts a string to a decimal number in Python?',
      options: ['int()', 'float()', 'str()', 'num()'],
      correct: 1,
      hint: 'float() handles decimals. int() only handles whole numbers.',
      xpValue: 25,
    },
    {
      id: 'c_m1_5_4',
      type: 'fix_bug',
      question: 'Fix the bug in this temperature converter:',
      buggyCode: `c = input("Enter Celsius: ")\nfahrenheit = (c * 1.8) + 32\nprint(fahrenheit)`,
      fixedCode: `c = float(input("Enter Celsius: "))\nfahrenheit = (c * 1.8) + 32\nprint(fahrenheit)`,
      hint: 'input() returns a string. You need to convert it before doing math.',
      xpValue: 35,
    },
  ]
}
```

**Content checklist — write all of this:**

- [ ] Module 1: 8 missions × ~4 challenges = ~32 challenges
- [ ] Module 2: 8 missions × ~4 challenges = ~32 challenges
- [ ] Module 3: 8 missions × ~4 challenges = ~32 challenges
- [ ] Module 4: 8 missions × ~4 challenges = ~32 challenges
- [ ] Module 5: 9 missions × ~4 challenges = ~36 challenges
- **Total: ~164 challenges** across 41 missions

**Tip:** Write Module 1 fully first. Ship that. Then write the rest one module at a time.

---

### P2.2 — Reference Database: `src/data/referenceData.js`

80 entries. Each entry is small. This can be AI-generated rapidly. Schema:

```js
export const referenceData = [
  {
    id: 'ref_001',
    module: 1,
    concept: 'print()',
    syntax: 'print(value, sep=" ", end="\\n")',
    description: 'Outputs values to stdout.',
    example: 'print("Hello", "World")  # Hello World',
    tags: ['output', 'basics'],
  },
  // ... 79 more
];
```

---

## P3 — POLISH

### P3.1 — Framer Motion Page Transitions

Every view change must animate. Without this it feels like a static webpage, not a game.

```jsx
// Wrap every screen in this
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.15 } },
};

// In App.jsx — use AnimatePresence around the view router
import { AnimatePresence } from 'framer-motion';

<AnimatePresence mode="wait">
  <motion.div key={state.view} {...pageVariants}>
    {/* current view */}
  </motion.div>
</AnimatePresence>
```

**Specific animations to add:**

| Interaction | Animation |
|---|---|
| Wrong answer | `animation: errorFlash 0.4s ease` on input border |
| Correct answer | `animation: successGlow 0.8s ease` + neon pulse |
| XP gain in reward | Counter ticks up from 0 to earned XP over 1.5s |
| Badge unlock | Scale 0 → 1.2 → 1.0 with spring, gold glow |
| Module card hover | `translateY(-4px)` + neon border brightens |
| Level up | Full-screen flash + rank text animates in |

---

### P3.2 — Reward Screen Animations

The reward screen is the emotional peak of every mission. Make it feel earned.

```jsx
// Animated XP counter
const [displayedXp, setDisplayedXp] = useState(0);
useEffect(() => {
  const target = xpEarned;
  let current = 0;
  const step = Math.max(1, Math.floor(target / 60));
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    setDisplayedXp(current);
    if (current >= target) clearInterval(interval);
  }, 25); // 60fps-ish
  return () => clearInterval(interval);
}, [xpEarned]);
```

---

### P3.3 — Code Display

`react-syntax-highlighter` is installed but not used. Add it to all briefings.

```jsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeDisplay({ code }) {
  return (
    <SyntaxHighlighter
      language="python"
      style={vscDarkPlus}
      customStyle={{
        background: '#0d1117',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px',
        fontSize: '0.85rem',
        fontFamily: 'var(--font-code)',
        margin: '1rem 0',
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
```

---

### P3.4 — Execution Trace Visualizer

`@xyflow/react` is installed. This is the showstopper feature — the equivalent of Gitopia's commit graph.

**Minimum viable implementation:**

```jsx
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function TraceVisualizer({ steps, currentStep }) {
  const step = steps[currentStep];
  if (!step) return null;

  const nodes = step.variables.map((v, i) => ({
    id: v.id,
    position: { x: i * 180, y: 50 },
    data: { label: `${v.id}\n${v.value}` },
    style: {
      background: getNodeColor(v.type),
      color: '#0d1117',
      border: 'none',
      borderRadius: '8px',
      fontFamily: 'var(--font-code)',
      fontWeight: 600,
      minWidth: 120,
      textAlign: 'center',
    },
  }));

  const edges = step.edges ?? [];

  return (
    <div style={{ height: 200, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background color="#21262d" gap={16} />
      </ReactFlow>
    </div>
  );
}

const TYPE_COLORS = {
  int: '#58a6ff', float: '#58a6ff', str: '#bd93f9',
  list: '#ff9500', dict: '#f0c040', bool: '#39ff14', none: '#8b949e',
};
const getNodeColor = (type) => TYPE_COLORS[type] || '#e6edf3';
```

---

### P3.5 — Mobile Responsiveness

The current layout likely breaks on mobile. Add these media queries:

```css
/* Dashboard — stack to single column on mobile */
@media (max-width: 768px) {
  .dashboard-layout { flex-direction: column; }
  .module-card { width: 100%; }
  .navbar { padding: 0.75rem 1rem; }
  .xp-label { display: none; }      /* hide XP numbers, keep bar */
  .rank-title { display: none; }    /* hide rank text, keep icon */
}

/* Mission screen — briefing and trace stack vertically */
@media (max-width: 768px) {
  .mission-layout { flex-direction: column; }
  .trace-visualizer { height: 160px; }
}
```

---

### P3.6 — Error Boundary

Without this, one JS error anywhere wipes the whole game. Add this before shipping.

```jsx
// src/components/ErrorBoundary.jsx
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'var(--font-code)' }}>
          <h2 style={{ color: 'var(--red)' }}>⚠️ RUNTIME ERROR</h2>
          <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>
            The game crashed. Your progress is saved.
          </p>
          <button className="btn-neon" onClick={() => window.location.reload()}>
            RESTART
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

---

### P3.7 — `import antigravity` Easter Egg

This is the soul of the project name. Wire it into the FillBlank challenge validator:

```jsx
// In FillBlank.jsx or ChallengeRunner.jsx
const checkEasterEgg = (input) => {
  if (input.trim() === 'import antigravity') {
    dispatch({ type: 'COMPLETE_MISSION', xpEarned: 50, missionId: 'easter_egg', badge: null, challengesSolved: 0 });
    setEasterEggTriggered(true);
  }
};
```

---

## P4 — GROWTH (Post-Launch)

### P4.1 — Pyodide: Real Python Execution (v2)

Replace static string matching with actual Python evaluation. Drop-in upgrade.

```jsx
// Load Pyodide once in App.jsx
useEffect(() => {
  const loadPyodide = async () => {
    const pyodide = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.0/full/' });
    setPyodide(pyodide);
  };
  loadPyodide();
}, []);

// In TraceOutput.jsx
const runCode = async (code) => {
  try {
    const result = await pyodide.runPythonAsync(code);
    return String(result);
  } catch (e) {
    return `Error: ${e.message}`;
  }
};
```

Add to `index.html`:
```html
<script src="https://cdn.jsdelivr.net/pyodide/v0.26.0/full/pyodide.js"></script>
```

**Note:** Pyodide is ~10MB. Lazy-load it. Don't block the initial render.

---

### P4.2 — Daily Challenge

One challenge per day from a fixed rotation. Keeps users coming back.

```jsx
const getDailyChallenge = (allChallenges) => {
  const dayIndex = Math.floor(Date.now() / 86400000); // changes daily
  return allChallenges[dayIndex % allChallenges.length];
};
```

---

### P4.3 — PWA (Offline Support)

Students study offline. Add a service worker.

```js
// vite.config.js — add vite-plugin-pwa
import { VitePWA } from 'vite-plugin-pwa';

export default {
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Pythonia',
        short_name: 'Pythonia',
        theme_color: '#0d1117',
        background_color: '#0d1117',
        icons: [{ src: '/snake-icon-192.png', sizes: '192x192', type: 'image/png' }]
      }
    })
  ]
}
```

```bash
npm install vite-plugin-pwa -D
```

---

### P4.4 — Share Score Card

After completing a module, generate a shareable card (PNG via `html2canvas`).

```
┌─────────────────────────────────┐
│  🐍 PYTHONIA                    │
│  Yathin — List Paladin          │
│  Module 3 Complete ✅           │
│  1700 XP · 0 hints used         │
│  pythonia-two.vercel.app        │
└─────────────────────────────────┘
```

---

### P4.5 — README Overhaul

The current README has almost no content. Add:

1. A GIF/screenshot of the game in action (record with `gifcap.netlify.app`)
2. The module list
3. Tech stack badges
4. A "Built for VTU 1BPLCSL207" callout
5. Live link prominently at the top

This is what gets you GitHub stars and forks from classmates.

---

## BUG RISKS TO WATCH

These are common pitfalls when building exactly this kind of app:

| Risk | Prevention |
|---|---|
| `localStorage` corrupted state breaks game | Add a try/catch around `JSON.parse`. If it fails, reset to `INITIAL_STATE`. |
| `useReducer` state reset on re-render | Make sure `INITIAL_STATE` is defined outside the component, not inside. |
| Briefing typewriter leaks interval on unmount | Always return a cleanup function from the `useEffect`. |
| XP goes negative from too many wrong answers | Clamp: `Math.max(0, state.progress.xp - 5)` — already in the reducer above. |
| Module unlock check breaks on first load | Initialize `modulesCompleted` as `{}`, not `[]` — check with `=== true`, not truthiness. |
| `@xyflow/react` missing CSS import | Must import `'@xyflow/react/dist/style.css'` or nodes render invisible. |
| `react-syntax-highlighter` bundle size | Import from `dist/esm/styles/prism` not the CJS path. Use `Prism` not `Light`. |
| OrderSteps drag-drop broken on mobile | Use click-to-select, not HTML5 drag. HTML5 drag has no touch support. |
| `AnimatePresence` flickers on fast navigation | Use `mode="wait"` and make sure only one child renders at a time. |

---

## QUICK-WIN CHECKLIST

Things you can ship in under an hour each:

- [ ] Replace `index.css` with full design system (30 min)
- [ ] Add Google Fonts to `index.html` (2 min)
- [ ] Add `<meta>` description tag for SEO (5 min)
- [ ] Add `ErrorBoundary` wrapper in `App.jsx` (15 min)
- [ ] Add `favicon.svg` with a snake emoji (10 min)
- [ ] Wire `localStorage` persistence in `App.jsx` (20 min)
- [ ] Add `import antigravity` easter egg trigger (15 min)
- [ ] Update README with live link + one screenshot (20 min)

---

## IMPLEMENTATION ORDER (FINAL)

```
Week 1 (P0):
  1. index.css design system
  2. index.html fonts + meta
  3. gameState.js useReducer
  4. App.jsx with context + localStorage
  5. Onboarding screen

Week 2 (P1 — Shell):
  6. Navbar with XP bar
  7. Dashboard with module cards (locked/unlocked)
  8. MissionScreen state machine (phases)
  9. Briefing typewriter + CodeDisplay

Week 3 (P1 — Challenges):
  10. MCQ.jsx
  11. FillBlank.jsx
  12. TraceOutput.jsx
  13. Scenario.jsx
  14. FixBug.jsx
  15. OrderSteps.jsx

Week 4 (P2 — Content):
  16. gameData.js — Module 1 fully written
  17. Play-test Module 1 end-to-end
  18. gameData.js — Modules 2–5
  19. referenceData.js — 80 entries
  20. Reference.jsx (search + filter)

Week 5 (P3 — Polish):
  21. Framer Motion transitions
  22. Reward screen with XP counter animation
  23. TraceVisualizer (@xyflow/react)
  24. Profile.jsx (badges, stats, avatar)
  25. Mobile media queries
  26. ErrorBoundary

Week 6 (P4 — Ship):
  27. README overhaul with GIF
  28. Pyodide (optional, v2)
  29. PWA service worker
  30. Daily challenge
```

---

*Written against commit 2 of YathinTHEBUILDER/Pythonia. Update this doc as features ship.*
*— Claude, May 2026*
