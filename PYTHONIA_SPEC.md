# 🐍 PYTHONIA — Learn Python Like a Game
### Product Specification & Builder's Bible
> *"import antigravity" — Inspired by Gitopia. Built for VTU 1BPLCSL207.*

---

## 0. ONE-LINE PITCH

**Pythonia** turns the VVCE Python Programming Lab syllabus into a hacker-themed mission game — no boring theory, no passive reading. Students write code, fix bugs, trace execution, and earn XP until they graduate from *Snake Rookie* to *Python God*.

---

## 1. PRODUCT VISION

### What Gitopia did for Git — Pythonia does for Python.

| Gitopia Pattern | Pythonia Adaptation |
|---|---|
| Git command terminal simulator | In-browser Python code editor (no backend, no exec) |
| Live commit graph (React Flow) | Live execution trace / memory diagram visualizer |
| 10 Git modules with XP | 5 VTU modules × sub-missions with XP |
| 3-phase mission flow | Same 3-phase: Briefing → Challenge → Reward |
| Neon green hacker aesthetic | Same palette, snake iconography |
| Rank system (Git Rookie → Git God) | Snake Rookie → Python God |

### Target User
Second-semester CSE student at VVCE Mysuru. Has lab exams coming up. Knows almost nothing about Python. Needs to pass CIE + SEE (100 marks total). Zero patience for textbooks.

### Core Promise
Complete all 5 modules → be fully prepared for the 1BPLCSL207 lab exam.

---

## 2. DESIGN SYSTEM

Copy Gitopia's aesthetic 1:1. Do not deviate. Every decision below is intentional.

### CSS Variables (`src/index.css`)

```css
:root {
  /* Backgrounds */
  --bg:          #0d1117;   /* GitHub dark — main background */
  --bg-card:     #161b22;   /* Card / panel background */
  --bg-glass:    rgba(22, 27, 34, 0.7);  /* Glassmorphism panels */

  /* Accent Colors */
  --neon:        #39ff14;   /* Neon green — primary accent (Gitopia identical) */
  --blue:        #58a6ff;   /* GitHub blue — secondary accent */
  --gold:        #f0c040;   /* XP / badge gold */
  --red:         #ff4d4d;   /* Error / wrong answer */
  --purple:      #bd93f9;   /* Hint / special action */
  --orange:      #ff9500;   /* Warning / streak */

  /* Text */
  --text:        #e6edf3;   /* Primary text */
  --text-muted:  #8b949e;   /* Secondary / disabled text */

  /* Typography */
  --font-pixel:  'Press Start 2P', monospace;   /* HUD headings, ranks */
  --font-code:   'Fira Code', monospace;         /* Everything else */

  /* Glows */
  --glow-neon:   0 0 8px rgba(57,255,20,0.6), 0 0 24px rgba(57,255,20,0.2);
  --glow-blue:   0 0 8px rgba(88,166,255,0.5), 0 0 20px rgba(88,166,255,0.15);
  --glow-gold:   0 0 8px rgba(240,192,64,0.6), 0 0 24px rgba(240,192,64,0.2);
  --glow-red:    0 0 8px rgba(255,77,77,0.7);

  /* Borders */
  --border:      rgba(255,255,255,0.08);
  --border-neon: rgba(57,255,20,0.3);

  /* Radius */
  --radius:      8px;
  --radius-lg:   16px;
}
```

### Google Fonts (add to `index.html`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet">
```

### Key UI Patterns (identical to Gitopia)

- **Glassmorphism cards**: `backdrop-filter: blur(10px)` + `background: var(--bg-glass)` + `border: 1px solid var(--border)`
- **Neon glow on active/hover**: `box-shadow: var(--glow-neon)`
- **Blinking cursor** in code areas: `@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`
- **XP bar fill**: `transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1)`
- **Red flash on wrong**: `animation: errorFlash 0.4s ease` (border turns red briefly)
- **Green glow on correct**: border turns neon + glow for 800ms
- **Framer Motion** page transitions: 150ms exit, 250ms enter, `y: 20 → 0`

---

## 3. TECH STACK

| Technology | Purpose | Same as Gitopia? |
|---|---|---|
| **React 18** | UI framework | ✅ Yes |
| **Vite** | Build tool | ✅ Yes |
| **Framer Motion** | Animations, page transitions | ✅ Yes |
| **CSS Variables** | Full design system | ✅ Yes |
| **localStorage** | Progress persistence | ✅ Yes |
| **Press Start 2P** | Pixel HUD font | ✅ Yes |
| **Fira Code** | Code/terminal font | ✅ Yes |
| **@xyflow/react** | Memory diagram / execution trace | ✅ Adapted |
| **React Syntax Highlighter** | Code display in briefings | 🆕 New |
| **Skulpt / Pyodide** | *(Optional v2)* Run Python in browser | 🆕 New |

> **Note on Python execution**: In v1, all challenges are static (no real code execution). The "code editor" validates string/pattern matching against expected output. Pyodide (real Python in WASM) can be dropped in for v2 with zero architecture changes — just swap the validator.

---

## 4. FEATURE SPECIFICATION

### 4.1 Mission Map (Skill Tree)

The main dashboard. A vertical or diagonal skill tree with 5 module nodes.

- Each module card shows: module icon, title, XP reward, difficulty dots, lock/unlock state
- Module 1 is always unlocked. Modules 2–5 unlock when the previous is completed (≥ 70% score)
- Clicking an unlocked module → enters that module's mission list
- Sub-missions within a module unlock sequentially

**Module Card anatomy:**
```
┌─────────────────────────────────┐
│  🐍  MODULE 1                   │
│  Python Basics & Functions      │
│  ██████████░░░░ 600 XP          │
│  ★★★☆☆  DIFFICULTY              │
│  [  ENTER MISSION  ]            │
└─────────────────────────────────┘
```

### 4.2 3-Phase Mission Flow (Identical to Gitopia)

Every mission (sub-topic) follows this exact flow:

#### Phase 1 — BRIEFING
- Animated line-by-line concept reveal (typewriter effect, 30ms per char)
- Code examples displayed with syntax highlighting
- Execution trace diagram (replaces Gitopia's commit graph) — shows how variables change
- ASCII art concept diagram where applicable
- "READY FOR CHALLENGE" button appears after full reveal

#### Phase 2 — CHALLENGES
- 3–5 challenges per mission (difficulty scales with module number)
- Progress indicator: `Challenge 2 of 4`
- Hint button (costs −10 XP, max 3 per mission)
- Wrong answer → red flash + "Try again" message, −5 XP per wrong attempt
- Correct answer → neon glow + XP increment animation

#### Phase 3 — REWARD
- Animated XP counter ticking up
- Level-up check (rank badge if threshold crossed)
- Badge unlock animation if mission-specific badge earned
- "NEXT MISSION" CTA

### 4.3 Challenge Types (6 Types)

| Type | ID | Description |
|---|---|---|
| **Code Completion** | `fill_blank` | Fill in the `___` in a Python snippet |
| **Multiple Choice** | `mcq` | Pick correct answer, wrong = −5 XP |
| **Fix the Bug** | `fix_bug` | Find and correct the error in a given program |
| **Trace the Output** | `trace` | What does this code print? Type the output |
| **Order the Steps** | `order` | Drag steps into correct sequence |
| **Scenario** | `scenario` | Real exam-style situation, choose correct approach |

> The `terminal` type from Gitopia becomes `trace` here — instead of typing a Git command, student types the expected output of a Python program. Same UX mechanic, different academic content.

### 4.4 Execution Trace Visualizer

Replaces Gitopia's React Flow commit graph. Powered by `@xyflow/react`.

- Displays a node for each variable in scope
- Nodes update step-by-step during briefing (like commit graph during briefing)
- Node anatomy: variable name (top) → current value (bottom), colored by type:
  - `int/float` → blue nodes
  - `str` → purple nodes  
  - `list` → orange nodes
  - `dict` → gold nodes
  - `None` → dimmed nodes
- Arrow edges show assignment flow
- Step-through with PREV / NEXT buttons

Example for `x = 5; y = x + 3; z = y * 2`:
```
[x: 5] ──assign──> [y: 8] ──assign──> [z: 16]
```

### 4.5 Python Concept Reference

Replaces Gitopia's "Git Command Database."

- Searchable catalog of all Python concepts from the syllabus
- Each entry: concept name, syntax, one-line description, minimal code example
- One-click copy to clipboard
- Filterable by module
- ~80 entries covering the full VTU syllabus

### 4.6 Progression System

#### Ranks (12 tiers, identical structure to Gitopia)

| Rank | Title | Required XP |
|---|---|---|
| 1 | Snake Rookie | 0 XP |
| 2 | Indentation Initiate | 150 XP |
| 3 | Variable Scout | 400 XP |
| 4 | Loop Apprentice | 750 XP |
| 5 | Function Knight | 1,200 XP |
| 6 | List Paladin | 1,700 XP |
| 7 | Dict Ranger | 2,200 XP |
| 8 | Exception Slayer | 2,700 XP |
| 9 | File Warrior | 3,300 XP |
| 10 | OOP Master | 3,900 XP |
| 11 | Python Ninja | 4,300 XP |
| 12 | Python God | 4,600 XP |

#### Badges (one per mission + special badges)

| Badge | Trigger |
|---|---|
| 🌡️ Temperature Wizard | Complete A1 (Celsius/Fahrenheit) |
| 🔢 Fibonacci Pilgrim | Complete A2a (Fibonacci) |
| ♾️ Recursion Sage | Complete A2b (Factorial) |
| 📊 Stats Sorcerer | Complete B2 (Mean/Variance/SD) |
| 📖 Dict Keeper | Complete B3 + B5 |
| 📁 File Whisperer | Complete B4 + C1 |
| ⚠️ Exception Hunter | Complete B6 |
| 🏛️ Class Architect | Complete C2 |
| 🧬 Inheritance Heir | Complete C3 |
| 💡 No Hints Hero | Complete any module with 0 hints used |
| 🐍 Python God | Complete all 5 modules |

#### Stats tracked
- Total XP earned
- Missions completed / total
- Challenges solved
- Hints used (total)
- Longest streak (days)
- Favourite challenge type (based on fastest solves)

### 4.7 Player Profile

- Custom username (editable)
- 12 avatar options (pixel art snake variants in different colors)
- Achievement gallery (locked badges shown as `???` silhouettes)
- Full stats breakdown
- Rank badge prominently displayed

### 4.8 Persistence

All state in `localStorage` under key `pythonia_v1`. Structure:

```js
{
  player: { name, avatar, createdAt },
  progress: {
    xp: Number,
    rank: Number,
    modulesCompleted: [Boolean × 5],
    missionsCompleted: { [missionId]: Boolean },
    badgesEarned: [String],
    streak: Number,
    lastPlayed: ISO string
  },
  stats: {
    totalHintsUsed: Number,
    totalChallengesSolved: Number,
    totalWrongAttempts: Number
  }
}
```

---

## 5. CONTENT: THE 5 MODULES

Each module = one card on the skill tree. Each module contains multiple **missions** (individual lab programs or concept clusters). Each mission = one full 3-phase flow.

---

### MODULE 1 — Python Basics & Functions
**XP Pool: 800 XP | Difficulty: ★★☆☆☆ | Unlocked by default**

| Mission ID | Mission Name | Maps to Syllabus | XP |
|---|---|---|---|
| `m1_1` | What is Python? | Program, running Python, print() | 80 |
| `m1_2` | Variables & Types | Variables, values, types, type() | 100 |
| `m1_3` | Arithmetic & Operators | Arithmetic ops, operator precedence | 80 |
| `m1_4` | Expressions & Statements | Expressions, statements, script mode | 80 |
| `m1_5` | Temperature Converter | **Exp A1** — Celsius/Fahrenheit | 120 |
| `m1_6` | Strings & Comments | String ops, comments | 80 |
| `m1_7` | Functions & Calls | def, call, parameters, arguments | 100 |
| `m1_8` | Factorial Function | **Exp A2b** — Recursive factorial | 160 |

**Key challenges in this module:**
- Fill in `fahrenheit = (c * ___ ) + ___`
- MCQ: "What does `type(3.14)` return?"
- Trace: "What does `print(2 ** 3)` output?"
- Fix bug: `def greet(name) print("Hello", name)` — missing colon
- Order: arrange steps to define and call a function

---

### MODULE 2 — Logic, Loops & Strings
**XP Pool: 1,000 XP | Difficulty: ★★★☆☆ | Requires Module 1 complete**

| Mission ID | Mission Name | Maps to Syllabus | XP |
|---|---|---|---|
| `m2_1` | Boolean & Logic | Boolean expressions, logical operators | 80 |
| `m2_2` | Conditionals | if/elif/else, nested conditionals | 100 |
| `m2_3` | Fibonacci Sequence | **Exp A2a** — Recursive Fibonacci | 160 |
| `m2_4` | While Loops & Break | while, break, iteration | 100 |
| `m2_5` | String Operations | Strings, traversal, slicing | 100 |
| `m2_6` | String Methods | upper/lower/find/replace etc. | 80 |
| `m2_7` | Digit Frequency | **Exp B1** — Frequency of digits | 160 |
| `m2_8` | Recursion Deep Dive | Recursion, base case, infinite recursion | 120 |

**Key challenges in this module:**
- Trace: Walk through `recur_fibo(4)` — what is returned?
- Fill blank: `if marks ___ 40: print("Fail")`
- Fix bug: `while True print("loop")` — missing colon + no break
- MCQ: "Which string method removes whitespace?" → `.strip()`
- Order: arrange the Fibonacci recursive call tree

---

### MODULE 3 — Lists & Dictionaries
**XP Pool: 900 XP | Difficulty: ★★★☆☆ | Requires Module 2 complete**

| Mission ID | Mission Name | Maps to Syllabus | XP |
|---|---|---|---|
| `m3_1` | Lists Fundamentals | Lists, traversal, mutability | 100 |
| `m3_2` | List Methods & Slicing | append/pop/sort/slice, map/filter | 100 |
| `m3_3` | Stats Calculator | **Exp B2** — Mean, variance, std dev | 160 |
| `m3_4` | Dictionary Basics | Key-value, traversal, .get() | 100 |
| `m3_5` | Sort Dictionary by Key | **Exp B3** — Sorted dict | 140 |
| `m3_6` | Word Length Grouper | **Exp B5** — Group words by length | 160 |
| `m3_7` | Aliasing & Mutability | Aliasing traps, copying lists | 80 |
| `m3_8` | Reverse Lookup & Memos | Reverse lookup, counter pattern | 60 |

**Key challenges in this module:**
- Trace: `lst = [1,2,3]; lst.append(4); print(lst[2])` → `3`
- Scenario: "You need to count word occurrences — list or dict?"
- Fill blank: `sorted_dict = dict(sorted(my_dict._____()))`
- Fix bug: `np.average` called without importing numpy
- MCQ: "What does `d.get('x', 0)` return if 'x' not in d?"

---

### MODULE 4 — Tuples, Files & Exceptions
**XP Pool: 900 XP | Difficulty: ★★★★☆ | Requires Module 3 complete**

| Mission ID | Mission Name | Maps to Syllabus | XP |
|---|---|---|---|
| `m4_1` | Tuples | Tuple assignment, immutability, uses | 80 |
| `m4_2` | File Handling Basics | open(), read, write, close, modes | 100 |
| `m4_3` | Even Numbers to File | **Exp B4** — Write evens to file | 140 |
| `m4_4` | Char Frequency in File | **Exp C1** — Count chars in file | 160 |
| `m4_5` | Exception Handling | try/except, ZeroDivisionError, assert | 120 |
| `m4_6` | DivExp Function | **Exp B6** — DivExp with assertion | 160 |
| `m4_7` | Modules & Random | import, random module, word histogram | 80 |
| `m4_8` | Pickling & Databases | pickle, shelve basics | 60 |

**Key challenges in this module:**
- Fix bug: `file = open("data.txt", "r"); file.write("hello")` — wrong mode
- Fill blank: `except ___________: print("Division by Zero!")`
- Trace: What does `assert a > 0` do when `a = -1`?
- Order: correct sequence to read, process, and close a file
- MCQ: "What does `open("f.txt", "a")` do?" → appends

---

### MODULE 5 — Object-Oriented Programming
**XP Pool: 1,000 XP | Difficulty: ★★★★★ | Requires Module 4 complete**

| Mission ID | Mission Name | Maps to Syllabus | XP |
|---|---|---|---|
| `m5_1` | Classes & Objects | class, object, attributes, instance | 100 |
| `m5_2` | Methods & `__init__` | self, constructors, __init__ | 120 |
| `m5_3` | `__str__` & Overloading | __str__, operator overloading | 100 |
| `m5_4` | Pass/Fail with Class | **Exp C2** — Student marks class | 160 |
| `m5_5` | Inheritance Basics | Base class, derived class, super() | 120 |
| `m5_6` | Triangle Inherits Polygon | **Exp C3** — Triangle(Polygon) | 160 |
| `m5_7` | Encapsulation | Private attrs, getters/setters | 100 |
| `m5_8` | Polymorphism | Method overriding, duck typing | 80 |
| `m5_9` | OOP Final Boss | Design a Bank Account class (open-ended) | 60 |

**Key challenges in this module:**
- Fill blank: `class Triangle(______): pass`
- Fix bug: `def __init__(name): self.name = name` — missing `self` param
- MCQ: "What is the output of `t.findArea(7,10)` given the Polygon class?"
- Trace: Walk through object instantiation step by step
- Scenario: "You want Dog and Cat to both have a `speak()` method. Use _____."

---

## 6. COMPONENT ARCHITECTURE

```
src/
├── main.jsx                    # React root, font load confirmation
├── App.jsx                     # Router (view state), localStorage R/W, layout shell
├── index.css                   # Full design system — CSS variables, keyframes, base resets
│
├── data/
│   ├── gameData.js             # All 5 modules, missions, challenges, badge defs, rank thresholds
│   └── referenceData.js        # Python concept reference (~80 entries)
│
├── state/
│   └── gameState.js            # useReducer: XP, rank, progress, badges, stats + all actions
│
└── components/
    ├── Dashboard.jsx           # Skill tree (module map) + profile sidebar
    ├── ModuleScreen.jsx        # Mission list within a module
    ├── MissionScreen.jsx       # 3-phase mission flow (Briefing → Challenge → Reward)
    ├── Navbar.jsx              # Sticky top nav: player name, rank badge, XP bar
    ├── Profile.jsx             # Player profile, avatar picker, badge gallery, stats
    ├── Reference.jsx           # Searchable Python concept database
    │
    └── shared/
        ├── CodeDisplay.jsx     # Syntax-highlighted code block (react-syntax-highlighter)
        ├── TraceVisualizer.jsx # @xyflow/react execution trace diagram
        ├── XPBar.jsx           # XP progress bar with rank badge
        ├── ChallengeRunner.jsx # Routes to correct challenge type component
        │
        └── challenges/
            ├── FillBlank.jsx   # fill_blank challenge type
            ├── MCQ.jsx         # mcq challenge type
            ├── FixBug.jsx      # fix_bug challenge type
            ├── TraceOutput.jsx # trace challenge type
            ├── OrderSteps.jsx  # order challenge type (drag-and-drop)
            └── Scenario.jsx    # scenario challenge type
```

---

## 7. DATA SCHEMA

### Module Object

```js
{
  id: 'm1',
  title: 'Python Basics & Functions',
  icon: '🐍',
  xpPool: 800,
  difficulty: 2,                    // 1–5 stars
  prerequisite: null,               // module id or null
  missions: [Mission]
}
```

### Mission Object

```js
{
  id: 'm1_5',
  title: 'Temperature Converter',
  badge: 'temperature_wizard',      // null if no badge
  xpReward: 120,
  briefing: {
    lines: [String],                // typewriter lines, one per paragraph
    codeExample: String,            // full Python code as string
    traceSteps: [TraceStep]         // for TraceVisualizer
  },
  challenges: [Challenge]
}
```

### TraceStep Object

```js
{
  step: 1,
  code: 'c = 88.0',
  variables: [
    { id: 'c', value: '88.0', type: 'float' }
  ],
  edges: []
}
```

### Challenge Object

```js
{
  id: 'c_m1_5_1',
  type: 'fill_blank',              // fill_blank | mcq | fix_bug | trace | order | scenario
  question: 'Complete the formula:',
  code: 'fahrenheit = (c * ___) + ___',
  blanks: ['1.8', '32'],           // correct values in order
  hint: 'The formula is F = (C × 1.8) + 32',
  xpValue: 30,
  wrongPenalty: 5
}
```

### MCQ Challenge

```js
{
  type: 'mcq',
  question: 'What does type(3.14) return?',
  options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'number'>"],
  correct: 1,                      // index
  hint: 'Decimal numbers are float type in Python',
  xpValue: 25,
  wrongPenalty: 5
}
```

### Order Challenge

```js
{
  type: 'order',
  question: 'Arrange these steps to define and call a function:',
  steps: [
    { id: 's1', text: 'def greet(name):' },
    { id: 's2', text: '    print("Hello", name)' },
    { id: 's3', text: 'greet("Yathin")' }
  ],
  correctOrder: ['s1', 's2', 's3'],
  xpValue: 40
}
```

---

## 8. STATE MANAGEMENT

Use `useReducer` (exact same pattern as Gitopia's `gameState.js`).

### Actions

```js
// Player
INIT_PLAYER          // { name, avatar }
UPDATE_USERNAME      // { name }
SELECT_AVATAR        // { avatar }

// Progress
COMPLETE_MISSION     // { missionId, moduleId, xpEarned }
SPEND_HINT           // { missionId }
WRONG_ATTEMPT        // { challengeId }

// System
LOAD_FROM_STORAGE    // { savedState }
RESET_PROGRESS       // {}
```

### Reducer logic for COMPLETE_MISSION

```
1. Add xpEarned to state.progress.xp
2. Mark mission as completed
3. Check if all missions in module done → mark module complete
4. Check XP against rank thresholds → update rank
5. Award badge if mission has one
6. Update streak (compare lastPlayed with today)
7. Increment stats.totalChallengesSolved
```

---

## 9. EXECUTION TRACE VISUALIZER (TraceVisualizer.jsx)

Replaces Gitopia's CommitGraph.jsx. Uses `@xyflow/react`.

### Node Types

| Node Type | Color | Used For |
|---|---|---|
| `int_node` | `--blue` | Integer variables |
| `float_node` | `--blue` opacity 70% | Float variables |
| `str_node` | `--purple` | String variables |
| `list_node` | `--orange` | List variables |
| `dict_node` | `--gold` | Dictionary variables |
| `none_node` | `--text-muted` | None / deleted |
| `func_node` | `--neon` | Function call frame |

### Edge Types

| Edge | Meaning |
|---|---|
| `assign` | Direct assignment → |
| `computed` | Result of expression → |
| `return` | Return value from function |

### Step-through controls

```
[ ← PREV ]  Step 2 / 5  [ NEXT → ]
```
Controls in briefing phase only. In challenges, the trace is static (shows end state).

---

## 10. NAVBAR DESIGN

```
┌─────────────────────────────────────────────────────────────────────┐
│  🐍 PYTHONIA     [====XP BAR====] 1200/1700 XP    ⚔️ Function Knight │
│                              Yathin                      [Profile]  │
└─────────────────────────────────────────────────────────────────────┘
```

- Left: Logo (`--font-pixel`, neon green glow)
- Center: XP bar + numeric display
- Right: Rank badge + player name + profile button
- Sticky, `backdrop-filter: blur(20px)`, `border-bottom: 1px solid var(--border)`

---

## 11. DASHBOARD LAYOUT

```
┌──────────────────────────────────────────────────────────┐
│  MISSION MAP                         PLAYER PROFILE       │
│  ─────────                           ────────────────     │
│  [M1: Basics] ✅ 800 XP              Avatar | Rank        │
│       │                              Username             │
│  [M2: Logic]  ✅ 1000 XP             XP: 2200 / 2700      │
│       │                                                   │
│  [M3: Lists]  🔓 900 XP              BADGES               │
│       │                              🌡️ ✅  🔢 ✅  ⚠️ 🔒    │
│  [M4: Files]  🔒 locked                                   │
│       │                              STATS                │
│  [M5: OOP]    🔒 locked              Missions: 14/33      │
│                                      Hints used: 7        │
└──────────────────────────────────────────────────────────┘
```

---

## 12. MISSION SCREEN STATES

### State 1: Briefing

```
┌──────────────────────────────────────────────────────────┐
│  MISSION: Temperature Converter          [ M1 › Mission 5]│
│  ────────────────────────────────────────────────────     │
│  BRIEFING                    │  EXECUTION TRACE           │
│                              │                            │
│  > Python uses float()...    │  [c: 88.0]──▶[fahr: 190.4]│
│  > The formula is:           │                            │
│  > F = (C × 1.8) + 32        │  Step 2 / 3   [←] [→]     │
│                              │                            │
│  ┌──────────────────────┐    │                            │
│  │ c = float(input())   │    │                            │
│  │ f = (c * 1.8) + 32   │    │                            │
│  │ print(f)             │    │                            │
│  └──────────────────────┘    │                            │
│                                                           │
│               [ READY FOR CHALLENGE → ]                   │
└──────────────────────────────────────────────────────────┘
```

### State 2: Challenge

```
┌──────────────────────────────────────────────────────────┐
│  Challenge 1 of 4                        💡 Hint (−10 XP) │
│  ────────────────────────────────────────────────────     │
│  Fill in the blanks:                                      │
│                                                           │
│  fahrenheit = (c * [_____]) + [_____]                     │
│                                                           │
│  Answer: [   1.8    ] [   32    ]                         │
│                                                           │
│  ┌─────────────────┐     ┌─────────────────────────┐     │
│  │   CHECK ANSWER  │     │  XP THIS MISSION: +30   │     │
│  └─────────────────┘     └─────────────────────────┘     │
└──────────────────────────────────────────────────────────┘
```

### State 3: Reward

```
┌──────────────────────────────────────────────────────────┐
│                    MISSION COMPLETE!                      │
│                                                           │
│                    🌡️ BADGE UNLOCKED                      │
│               Temperature Wizard                          │
│                                                           │
│             +120 XP  ████████░░░░  800 / 1200             │
│                                                           │
│  [ ← BACK TO MODULE ]    [ NEXT MISSION → ]               │
└──────────────────────────────────────────────────────────┘
```

---

## 13. PYTHON REFERENCE DATABASE (referenceData.js)

80 entries covering full syllabus. Schema:

```js
{
  id: 'ref_001',
  module: 1,
  concept: 'print()',
  syntax: 'print(value, ..., sep=" ", end="\\n")',
  description: 'Outputs values to the console.',
  example: 'print("Hello", "World")  # Hello World',
  tags: ['output', 'basics', 'functions']
}
```

Sample entries:
- `float()`, `int()`, `str()`, `type()`
- `if`, `elif`, `else`
- `while`, `for`, `break`, `continue`
- `def`, `return`, `lambda`
- `list()`, `append()`, `pop()`, `sort()`, `sorted()`
- `dict()`, `.get()`, `.items()`, `.keys()`, `.values()`
- `open()`, `.read()`, `.write()`, `.close()`
- `try`, `except`, `finally`, `raise`, `assert`
- `class`, `__init__`, `self`, `__str__`
- `super()`, inheritance syntax
- `import`, `from ... import`, `numpy`, `random`

---

## 14. PROJECT STRUCTURE

```
pythonia/
├── index.html                    # Entry HTML, Google Fonts preconnect
├── vite.config.js                # Vite config (same as Gitopia)
├── package.json                  # Dependencies
├── eslint.config.js
├── .gitignore
│
├── docs/
│   └── dashboard.png             # Screenshot for README
│
├── public/
│   └── snake-favicon.svg
│
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css                 # ← DESIGN SYSTEM LIVES HERE
    │
    ├── data/
    │   ├── gameData.js           # All modules, missions, challenges
    │   └── referenceData.js      # Python concept reference
    │
    ├── state/
    │   └── gameState.js          # useReducer + all actions
    │
    └── components/
        ├── Dashboard.jsx
        ├── ModuleScreen.jsx
        ├── MissionScreen.jsx
        ├── Navbar.jsx
        ├── Profile.jsx
        ├── Reference.jsx
        └── shared/
            ├── CodeDisplay.jsx
            ├── TraceVisualizer.jsx
            ├── XPBar.jsx
            ├── ChallengeRunner.jsx
            └── challenges/
                ├── FillBlank.jsx
                ├── MCQ.jsx
                ├── FixBug.jsx
                ├── TraceOutput.jsx
                ├── OrderSteps.jsx
                └── Scenario.jsx
```

---

## 15. package.json

```json
{
  "name": "pythonia",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.0.0",
    "@xyflow/react": "^12.0.0",
    "react-syntax-highlighter": "^15.5.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^5.4.0",
    "eslint": "^9.0.0"
  }
}
```

---

## 16. BUILD ORDER (Recommended Sequence)

Follow this order to avoid blocking yourself:

### Week 1 — Foundation

```
Day 1:  Setup Vite + React project, copy Gitopia's index.css CSS variables as-is
Day 2:  Build Navbar.jsx (static, hardcoded values first)
Day 3:  Build XPBar.jsx + gameState.js (useReducer, localStorage R/W)
Day 4:  Build Dashboard.jsx (module cards, locked/unlocked states)
Day 5:  Build Profile.jsx (avatar picker, stats display)
```

### Week 2 — Mission Flow

```
Day 6:  Build MissionScreen.jsx shell (3 phases as state machine)
Day 7:  Build CodeDisplay.jsx (react-syntax-highlighter wrapper)
Day 8:  Build MCQ.jsx + FillBlank.jsx (two easiest challenge types)
Day 9:  Build TraceOutput.jsx + FixBug.jsx
Day 10: Build OrderSteps.jsx (drag-and-drop — hardest challenge UI)
```

### Week 3 — Content + Polish

```
Day 11: Populate gameData.js for Module 1 (all 8 missions, full challenge content)
Day 12: Populate gameData.js for Modules 2–5
Day 13: Build TraceVisualizer.jsx (@xyflow/react integration)
Day 14: Build Reference.jsx + populate referenceData.js
Day 15: Framer Motion page transitions, reward screen animation, badge unlocks
```

### Week 4 — QA + Deploy

```
Day 16: Test all 5 modules end-to-end, fix bugs
Day 17: Mobile responsiveness (media queries, card reflow)
Day 18: Deploy to Vercel (same as Gitopia)
```

---

## 17. ANTIPATTERNS TO AVOID

| ❌ Don't | ✅ Do instead |
|---|---|
| Use Tailwind | Pure CSS variables, exactly like Gitopia |
| Add a backend | Everything in localStorage, no server |
| Try to execute real Python in v1 | Static string/pattern validation |
| Add animations before content | Content first, Motion last |
| Make all 5 modules simultaneously | Module 1 fully playable → then scale |
| Use `useState` for global game state | `useReducer` + context, like Gitopia |

---

## 18. NAMING CONVENTION

| Thing | Convention |
|---|---|
| Component files | `PascalCase.jsx` |
| CSS class names | `kebab-case` |
| Challenge IDs | `c_m{module}_{mission}_{number}` e.g. `c_m1_5_2` |
| Mission IDs | `m{module}_{mission}` e.g. `m1_5` |
| Module IDs | `m{number}` e.g. `m3` |
| Badge IDs | `snake_case` e.g. `temperature_wizard` |
| localStorage key | `pythonia_v1` |

---

## 19. EASTER EGG — `import antigravity`

Add this hidden interaction: if a user types `import antigravity` into any fill-blank challenge, award them **+50 bonus XP** and display:

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│    You discovered the Easter Egg!                   │
│    import antigravity → You can fly.                │
│                                                     │
│    "The antigravity module is Python's first joke." │
│    + 50 BONUS XP                                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

This is your `import antigravity` — the soul of the project name.

---

## 20. README TEMPLATE

Use this for your GitHub repo:

```markdown
# 🐍 PYTHONIA — Learn Python Like a Game

> Gamified Python learning for VTU 1BPLCSL207. 
> Missions. XP. Badges. No boring theory.

Built by Yathin, 2nd sem CSE @ VVCE Mysuru
Inspired by Gitopia (github.com/sathwikshetty0/Gitopia)

## Tech Stack
React 18 + Vite + Framer Motion + @xyflow/react + CSS Variables

## Getting Started
npm install && npm run dev

## Modules
- Module 1: Python Basics & Functions
- Module 2: Logic, Loops & Strings
- Module 3: Lists & Dictionaries
- Module 4: Tuples, Files & Exceptions
- Module 5: Object-Oriented Programming

## License
MIT © 2026
```

---

*This document is the complete builder's bible for Pythonia. Start with `npm create vite@latest pythonia -- --template react`, paste the CSS variables, and follow the build order. Good luck, Python God.*
