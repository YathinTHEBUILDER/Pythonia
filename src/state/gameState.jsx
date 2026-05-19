import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { RANKS, MODULES, BADGES } from '../data/gameData';

const LOCAL_STORAGE_KEY = 'pythonia_v1';

const initialState = {
  player: {
    name: 'Snake Rookie',
    avatar: '🐍',
    createdAt: new Date().toISOString()
  },
  progress: {
    xp: 0,
    rank: 1,
    modulesCompleted: [false, false, false, false, false],
    missionsCompleted: {}, // { [missionId]: true }
    badgesEarned: [],
    streak: 1,
    lastPlayed: null
  },
  stats: {
    totalHintsUsed: 0,
    totalChallengesSolved: 0,
    totalWrongAttempts: 0
  }
};

function calculateRank(xp) {
  let activeRank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.xpRequired) {
      activeRank = r;
    } else {
      break;
    }
  }
  return activeRank.rank;
}

function updateStreak(lastPlayedStr) {
  if (!lastPlayedStr) return 1;
  const lastPlayed = new Date(lastPlayedStr);
  const today = new Date();
  
  // Strip hours
  lastPlayed.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = Math.abs(today - lastPlayed);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return 'increment';
  } else if (diffDays > 1) {
    return 'reset';
  }
  return 'same';
}

function gameReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'INIT_PLAYER':
      newState = {
        ...state,
        player: {
          ...state.player,
          name: action.payload.name || state.player.name,
          avatar: action.payload.avatar || state.player.avatar
        }
      };
      break;
      
    case 'UPDATE_USERNAME':
      newState = {
        ...state,
        player: {
          ...state.player,
          name: action.payload.name
        }
      };
      break;
      
    case 'SELECT_AVATAR':
      newState = {
        ...state,
        player: {
          ...state.player,
          avatar: action.payload.avatar
        }
      };
      break;
      
    case 'COMPLETE_MISSION': {
      const { missionId, moduleId, xpEarned, badgeAwarded } = action.payload;
      
      // 1. Mark mission complete if not already
      const alreadyCompleted = state.progress.missionsCompleted[missionId];
      const newMissionsCompleted = {
        ...state.progress.missionsCompleted,
        [missionId]: true
      };
      
      // 2. Add XP (only if not already completed)
      const additionalXp = alreadyCompleted ? 0 : xpEarned;
      const newXp = state.progress.xp + additionalXp;
      
      // 3. Re-calculate Rank
      const newRank = calculateRank(newXp);
      
      // 4. Check if all missions in current module are complete
      const module = MODULES.find(m => m.id === moduleId);
      let newModulesCompleted = [...state.progress.modulesCompleted];
      if (module) {
        const allCompleted = module.missions.every(m => newMissionsCompleted[m.id]);
        const moduleIndex = MODULES.findIndex(m => m.id === moduleId);
        if (moduleIndex !== -1) {
          newModulesCompleted[moduleIndex] = allCompleted;
        }
      }
      
      // 5. Award badge if mission has one and not already earned
      let newBadgesEarned = [...state.progress.badgesEarned];
      if (badgeAwarded && !newBadgesEarned.includes(badgeAwarded)) {
        newBadgesEarned.push(badgeAwarded);
      }
      
      // Check special badges
      // Dict Keeper: m3_5 + m3_6 completed
      if (newMissionsCompleted['m3_5'] && newMissionsCompleted['m3_6'] && !newBadgesEarned.includes('dict_keeper')) {
        newBadgesEarned.push('dict_keeper');
      }
      // File Whisperer: m4_3 + m4_4 completed
      if (newMissionsCompleted['m4_3'] && newMissionsCompleted['m4_4'] && !newBadgesEarned.includes('file_whisperer')) {
        newBadgesEarned.push('file_whisperer');
      }
      // Python God: all modules completed
      const allModulesDone = newModulesCompleted.every(m => m === true);
      if (allModulesDone && !newBadgesEarned.includes('python_god')) {
        newBadgesEarned.push('python_god');
      }
      
      // 6. Update Streak
      const streakStatus = updateStreak(state.progress.lastPlayed);
      let newStreak = state.progress.streak;
      if (streakStatus === 'increment') {
        newStreak += 1;
      } else if (streakStatus === 'reset') {
        newStreak = 1;
      }
      
      newState = {
        ...state,
        progress: {
          ...state.progress,
          xp: newXp,
          rank: newRank,
          modulesCompleted: newModulesCompleted,
          missionsCompleted: newMissionsCompleted,
          badgesEarned: newBadgesEarned,
          streak: newStreak,
          lastPlayed: new Date().toISOString()
        },
        stats: {
          ...state.stats,
          totalChallengesSolved: state.stats.totalChallengesSolved + (alreadyCompleted ? 0 : 1)
        }
      };
      break;
    }
    
    case 'SPEND_HINT':
      newState = {
        ...state,
        progress: {
          ...state.progress,
          // Deduct 10 XP as per spec, floor at 0
          xp: Math.max(0, state.progress.xp - 10)
        },
        stats: {
          ...state.stats,
          totalHintsUsed: state.stats.totalHintsUsed + 1
        }
      };
      // Recalculate rank on XP loss
      newState.progress.rank = calculateRank(newState.progress.xp);
      break;
      
    case 'WRONG_ATTEMPT':
      newState = {
        ...state,
        progress: {
          ...state.progress,
          // Deduct 5 XP as per spec, floor at 0
          xp: Math.max(0, state.progress.xp - 5)
        },
        stats: {
          ...state.stats,
          totalWrongAttempts: state.stats.totalWrongAttempts + 1
        }
      };
      // Recalculate rank on XP loss
      newState.progress.rank = calculateRank(newState.progress.xp);
      break;

    case 'SECURITY_VIOLATION':
      newState = {
        ...state,
        progress: {
          ...state.progress,
          // Deduct 15 XP for tab change or overlay attempts, floor at 0
          xp: Math.max(0, state.progress.xp - 15)
        },
        stats: {
          ...state.stats,
          totalWrongAttempts: state.stats.totalWrongAttempts + 1
        }
      };
      // Recalculate rank on XP loss
      newState.progress.rank = calculateRank(newState.progress.xp);
      break;

    case 'AWARD_SANDBOX_XP':
      newState = {
        ...state,
        progress: {
          ...state.progress,
          xp: state.progress.xp + action.payload.xp
        }
      };
      newState.progress.rank = calculateRank(newState.progress.xp);
      break;

    case 'AWARD_EASTER_EGG':
      if (state.progress.badgesEarned.includes('antigravity_easter_egg')) {
        newState = state;
      } else {
        const newBadges = [...state.progress.badgesEarned, 'antigravity_easter_egg'];
        newState = {
          ...state,
          progress: {
            ...state.progress,
            xp: state.progress.xp + 50,
            badgesEarned: newBadges
          }
        };
        newState.progress.rank = calculateRank(newState.progress.xp);
      }
      break;

    case 'LOAD_FROM_STORAGE':
      newState = {
        ...state,
        ...action.payload
      };
      break;
      
    case 'RESET_PROGRESS':
      newState = {
        ...initialState,
        player: {
          ...state.player, // Keep profile details but reset progress
          createdAt: new Date().toISOString()
        }
      };
      break;
      
    default:
      newState = state;
  }
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
  return newState;
}

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Sync with localStorage on load
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsed });
      } catch (e) {
        console.error('Failed to load Pythonia progress from storage', e);
      }
    }
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
};
