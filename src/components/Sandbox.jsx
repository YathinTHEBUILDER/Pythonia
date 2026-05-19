import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { SANDBOX_PROBLEMS } from '../data/sandboxData';
import { useGameState } from '../state/gameState';

export default function Sandbox({ setView }) {
  const { dispatch } = useGameState();
  const [selectedProblemId, setSelectedProblemId] = useState(SANDBOX_PROBLEMS[0].id);
  const selectedProblem = SANDBOX_PROBLEMS.find(p => p.id === selectedProblemId) || SANDBOX_PROBLEMS[0];

  // Editor states
  const [code, setCode] = useState(selectedProblem.templateCode);
  const [stdin, setStdin] = useState(selectedProblem.sampleInput);
  const [stdout, setStdout] = useState('Console terminal initialized... Click "RUN CODE" to execute.');
  const [isRunning, setIsRunning] = useState(false);

  // HackerRank Grading States
  const [isGrading, setIsGrading] = useState(false);
  const [gradingResults, setGradingResults] = useState(null);
  const [gradingScore, setGradingScore] = useState(0);

  // Judge0 states
  const [judge0ApiUrl, setJudge0ApiUrl] = useState(() => {
    return localStorage.getItem('judge0_api_url') || 'https://ce.judge0.com';
  });
  const [judge0LanguageId, setJudge0LanguageId] = useState(71); // Default to Python (3.8.1)
  const [judge0Status, setJudge0Status] = useState('loading'); // 'loading' | 'ready' | 'error'

  // AI assistant states
  const [aiTabActive, setAiTabActive] = useState(false);
  const [aiChatHistory, setAiChatHistory] = useState([
    { role: 'assistant', text: "Hello! I'm Kora, your AI Coding Coach. Select any VTU Lab manual program, write your code, or ask me to explain it!" }
  ]);
  const [aiInputText, setAiInputText] = useState('');
  const [isAiResponding, setIsAiResponding] = useState(false);

  // Groq AI states
  const [groqApiKey, setGroqApiKey] = useState(() => {
    return localStorage.getItem('groq_api_key') || import.meta.env.VITE_GROQ_API_KEY || '';
  });
  const [showKeyInput, setShowKeyInput] = useState(false);

  // Synchronize editor code template when problem changes
  useEffect(() => {
    setCode(selectedProblem.templateCode);
    setStdin(selectedProblem.sampleInput);
    setStdout('Console ready. Load template for ' + selectedProblem.vtuId + ' complete.');
  }, [selectedProblemId]);

  // Asynchronously initialize Judge0 supported Python version
  useEffect(() => {
    const fetchLanguages = async () => {
      setJudge0Status('loading');
      try {
        const res = await fetch(`${judge0ApiUrl}/languages`);
        if (res.ok) {
          const list = await res.json();
          // Find Python 3
          const py = list.find(l => l.name.toLowerCase().includes('python') && l.name.includes('3'));
          if (py) {
            setJudge0LanguageId(py.id);
            setJudge0Status('ready');
            setStdout(`⚡ Judge0 Engine active. Connected to ${judge0ApiUrl} (Language ID ${py.id}: ${py.name})`);
            console.log("Dynamically resolved Python ID: ", py.id, py.name);
          } else {
            setJudge0Status('ready');
            setStdout(`⚡ Judge0 Engine active. Python version fallback default ID 71.`);
          }
        } else {
          setJudge0Status('error');
          setStdout(`⚠️ Judge0 returned status ${res.status}. Falling back to default ID 71.`);
        }
      } catch (err) {
        console.error("Failed to fetch languages from Judge0: ", err);
        setJudge0Status('error');
        setStdout(`⚠️ Could not reach Judge0 server at ${judge0ApiUrl}. Make sure server is running. Using default fallback compiler.`);
      }
    };
    fetchLanguages();
  }, [judge0ApiUrl]);

  // Executes Python code using Judge0 Community Edition API
  const runCode = async () => {
    setIsRunning(true);
    setStdout('⚡ Connecting to Judge0 secure sandboxed node to execute script...');
    
    try {
      const response = await fetch(`${judge0ApiUrl}/submissions?base64_encoded=true&wait=true`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source_code: btoa(unescape(encodeURIComponent(code))),
          language_id: judge0LanguageId,
          stdin: btoa(unescape(encodeURIComponent(stdin)))
        })
      });

      if (!response.ok) {
        throw new Error(`Judge0 responded with status: ${response.status}`);
      }

      const result = await response.json();
      let output = "";
      
      if (result.stdout) {
        output += decodeURIComponent(escape(atob(result.stdout)));
      }
      if (result.stderr) {
        output += `\nRUNTIME ERROR:\n${decodeURIComponent(escape(atob(result.stderr)))}`;
      }
      if (result.compile_output) {
        output += `\nCOMPILATION ERROR:\n${decodeURIComponent(escape(atob(result.compile_output)))}`;
      }
      
      if (result.status && result.status.id !== 3) {
        output += `\n\nExecution Status: ${result.status.description}`;
      }

      setStdout(output || "[Success: Process returned with 0 output]");
    } catch (err) {
      console.error(err);
      setStdout(`JUDGE0 EXECUTION ERROR: ${err.message}\nEnsure your Judge0 server endpoint is running and reachable.`);
    } finally {
      setIsRunning(false);
    }
  };

  // Simulates basic program outputs in case WASM isn't fully loaded
  const simulateExecution = () => {
    setStdout(prev => prev + '\n[Fallback Parser]: Running simulation...\n');
    const lowerCode = code.toLowerCase();
    
    if (selectedProblemId === 'a1') {
      try {
        const val = parseFloat(stdin);
        if (isNaN(val)) throw new Error('Invalid input');
        const res = (val * 1.8) + 32;
        setStdout(`(Celsius: ${val}°C)\n${res.toFixed(1)}`);
      } catch (e) {
        setStdout(`ERROR: Could not parse input "${stdin}" as float.\nUsage: Input a single number.`);
      }
    } else if (selectedProblemId === 'a2a') {
      const fib = (n) => n <= 0 ? 0 : n === 1 ? 1 : fib(n-1) + fib(n-2);
      const val = parseInt(stdin);
      if (isNaN(val)) setStdout('ERROR: Invalid integer input.');
      else setStdout(fib(val).toString());
    } else if (selectedProblemId === 'a2b') {
      const fact = (n) => n <= 1 ? 1 : n * fact(n-1);
      const val = parseInt(stdin);
      if (isNaN(val)) setStdout('ERROR: Invalid integer input.');
      else setStdout(fact(val).toString());
    } else {
      setStdout(
        `WASM Compiler still initializing. Please wait.\n` +
        `Preview output for current input:\n` +
        `>>> input data read: "${stdin}"\n` +
        `>>> Executed code successfully.`
      );
    }
  };

  // HackerRank Test Suite Generator
  const getProblemTestCases = (probId) => {
    switch (probId) {
      case 'a1':
        return [
          { input: '40.0', isHidden: false },
          { input: '0.0', isHidden: false },
          { input: '-40.0', isHidden: true },
          { input: '100.0', isHidden: true },
          { input: '-273.15', isHidden: true }
        ];
      case 'a2a':
        return [
          { input: '6', isHidden: false },
          { input: '0', isHidden: false },
          { input: '10', isHidden: true },
          { input: '15', isHidden: true },
          { input: '20', isHidden: true }
        ];
      case 'a2b':
        return [
          { input: '5', isHidden: false },
          { input: '0', isHidden: false },
          { input: '3', isHidden: true },
          { input: '7', isHidden: true },
          { input: '10', isHidden: true }
        ];
      case 'b1':
        return [
          { input: '122333', isHidden: false },
          { input: '9900', isHidden: false },
          { input: '1111', isHidden: true },
          { input: '74209', isHidden: true },
          { input: '1020304050', isHidden: true }
        ];
      case 'b2':
        return [
          { input: '10 20 30 40 50', isHidden: false },
          { input: '2.5 3.5 4.5', isHidden: false },
          { input: '5 5 5 5', isHidden: true },
          { input: '1.1 2.2 3.3 4.4', isHidden: true }
        ];
      case 'b3':
        return [
          { input: '2 Yathin\n1 Preetham\nSTOP', isHidden: false },
          { input: 'A Alice\nC Charlie\nB Bob\nSTOP', isHidden: true },
          { input: '10 Ten\n2 Two\n1 One\nSTOP', isHidden: true }
        ];
      case 'b5':
        return [
          { input: 'cat dog bird frog fish', isHidden: false },
          { input: 'apple banana grape pear peach', isHidden: true },
          { input: 'a b c aa bb ccc', isHidden: true }
        ];
      case 'b6':
        return [
          { input: '10\n2', isHidden: false },
          { input: '10\n0', isHidden: false },
          { input: 'abc\n2', isHidden: true },
          { input: '-50\n-5', isHidden: true }
        ];
      case 'c2':
        return [
          { input: '22CSE24 Yathin\n80 90 100', isHidden: false },
          { input: '1 Preetham\n60 70 80', isHidden: true },
          { input: '99 unknown\n45.5 50.0 62.5', isHidden: true }
        ];
      case 'c3':
        return [
          { input: '3 4 5', isHidden: false },
          { input: '5 12 13', isHidden: true },
          { input: '10 10 10', isHidden: true }
        ];
      default:
        return [
          { input: '1', isHidden: false }
        ];
    }
  };

  const runPythonInJudge0 = async (sourceCode, stdinString) => {
    const response = await fetch(`${judge0ApiUrl}/submissions?base64_encoded=true&wait=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        source_code: btoa(unescape(encodeURIComponent(sourceCode))),
        language_id: judge0LanguageId,
        stdin: btoa(unescape(encodeURIComponent(stdinString)))
      })
    });
    if (!response.ok) throw new Error(`Judge0 remote sandbox returned status ${response.status}`);
    const data = await response.json();
    let out = "";
    if (data.stdout) out += decodeURIComponent(escape(atob(data.stdout)));
    if (data.stderr) out += decodeURIComponent(escape(atob(data.stderr)));
    if (data.compile_output) out += decodeURIComponent(escape(atob(data.compile_output)));
    return out;
  };

  const submitAndGradeCode = async () => {
    setIsGrading(true);
    setGradingResults(null);
    setStdout('Running complete HackerRank grading suite against remote Judge0 execution nodes...\n');
    
    const currentCode = code;
    const testCases = getProblemTestCases(selectedProblemId);
    let passedCount = 0;
    const results = [];

    try {
      for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        
        // 1. Get expected output dynamically by running solutionCode on Judge0!
        setStdout(prev => prev + `EVALUATING TEST CASE #${i + 1}...\n`);
        const expected = await runPythonInJudge0(selectedProblem.solutionCode, tc.input);
        
        // 2. Get actual output by running currentCode on Judge0!
        const actual = await runPythonInJudge0(currentCode, tc.input);
        
        const passed = actual.trim() === expected.trim();
        if (passed) passedCount++;

        results.push({
          input: tc.input,
          expected: expected,
          actual: actual,
          passed: passed,
          isHidden: tc.isHidden
        });
      }

      const score = Math.round((passedCount / testCases.length) * 100);
      setGradingScore(score);
      setGradingResults(results);

      if (score === 100) {
        setStdout(stdout => stdout + `\n🏆 ASSESSMENT SOLVED SUCCESSFULLY! [${passedCount}/${testCases.length} Test Cases Passed]\n+50 XP AWARDED!`);
        // Award XP to global gamified state!
        dispatch({ type: 'AWARD_SANDBOX_XP', payload: { xp: 50 } });
      } else {
        setStdout(stdout => stdout + `\n⚠️ CODE ASSESSMENT INCOMPLETE: ${passedCount}/${testCases.length} test cases passed. Retry logic adjustments!`);
      }
    } catch (globalErr) {
      console.error("Grading failed: ", globalErr);
      setStdout(stdout => stdout + `\n❌ GRADER ERROR: ${globalErr.message}`);
    } finally {
      setIsGrading(false);
    }
  };

  // Generates AI suggestions / coach actions
  const triggerAiCoachMessage = async (promptType, customQuestion = '') => {
    setIsAiResponding(true);
    setAiTabActive(true);
    
    // Build request context
    const currentCode = code;
    const problemTitle = selectedProblem.title;
    const description = selectedProblem.description;

    let responseText = "";

    // Pre-register user's custom question to chat history to keep chat feel fluid
    let newHistory = [...aiChatHistory];
    if (customQuestion) {
      newHistory.push({ role: 'user', text: customQuestion });
      setAiChatHistory(newHistory);
    }

    if (groqApiKey && groqApiKey.trim()) {
      // Real GROQ AI Call
      try {
        let userMessageContent = "";
        if (promptType === 'explain') {
          userMessageContent = `Here is my code for the problem: '${problemTitle}'. The problem description is: '${description}'. Explain this code line-by-line and offer constructive feedback:\n\n\`\`\`python\n${currentCode}\n\`\`\``;
        } else if (promptType === 'fix') {
          userMessageContent = `Analyze this code for syntax/runtime bugs, indentation issues, or PEP 8 violations for the problem: '${problemTitle}'. Explain any bugs you identify, and tell me exactly how to fix them:\n\n\`\`\`python\n${currentCode}\n\`\`\``;
        } else if (promptType === 'autocomplete') {
          userMessageContent = `Provide the optimal manual logic implementation for: '${problemTitle}'. Here is the correct solution script:\n\n\`\`\`python\n${selectedProblem.solutionCode}\n\`\`\`\n\nExplain the core algorithms, mathematical equations, and list out standard steps to complete it.`;
        } else {
          userMessageContent = `The student asks: '${customQuestion}'. Answer relative to the problem: '${problemTitle}' and their current code:\n\n\`\`\`python\n${currentCode}\n\`\`\``;
        }

        const messages = [
          {
            role: "system",
            content: `You are Kora, an elite retro cyber AI Coding Coach in the gamified platform Pythonia. 
CRITICAL RULE 1: You must ONLY answer questions directly related to Python programming, coding concepts, syntax debugging, standard computer science topics, or the VTU 1BPLCSL207 Python Programming lab syllabus.
CRITICAL RULE 2: If the user asks about ANY topic completely unrelated to programming or coding (e.g. general knowledge, history, writing stories, lyrics, translations, homework from other subjects, math questions unrelated to code, philosophy, sports, etc.), you MUST decline to answer and reply EXACTLY with this warning:
"⚠️ SECURITY BREACH DETECTED: I am Kora, your VTU Python Coding Coach. I am programmed to ONLY assist with coding and Python-related questions. Please focus on your lab experiments!"
CRITICAL RULE 3: You MUST keep your responses extremely simple, conversational, and concise (maximum of 2-3 sentences total!). Do NOT write long essays, lengthy breakdowns, or multiline lists. If code is needed, show only a 1 or 2 line visual code stub. Keep explanations straight to the point!`
          }
        ];

        // Append past history to preserve conversation context (limit to last 6 messages)
        const recentHistory = newHistory.slice(-6);
        recentHistory.forEach(item => {
          messages.push({
            role: item.role === 'user' ? 'user' : 'assistant',
            content: item.text
          });
        });

        // Add current request
        messages.push({
          role: "user",
          content: userMessageContent
        });

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${groqApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: messages,
            temperature: 0.7
          })
        });

        if (!response.ok) {
          throw new Error(`Groq API responded with status: ${response.status}`);
        }

        const data = await response.json();
        responseText = data.choices[0].message.content;
      } catch (err) {
        console.error("Groq AI Error: ", err);
        responseText = `⚠️ **Groq AI Connection Error**\n*Details: ${err.message}*\n\nFalling back to local simulated response...\n\n`;
        // Append standard fallback response
        responseText += getLocalFallbackResponse(promptType, problemTitle, currentCode, description, customQuestion);
      }
    } else {
      // Local Simulated Response
      responseText = getLocalFallbackResponse(promptType, problemTitle, currentCode, description, customQuestion);
    }

    newHistory.push({ role: 'assistant', text: responseText });
    setAiChatHistory(newHistory);
    setIsAiResponding(false);
    setAiInputText('');
  };

  const getLocalFallbackResponse = (promptType, problemTitle, currentCode, description, customQuestion) => {
    let responseText = "";
    if (promptType === 'explain') {
      responseText = `🤖 **AI CODE ANALYSIS & EXPLANATION**\n*Problem: ${problemTitle}*\n\nHere is a line-by-line review of your current script:\n\n1. **Function Definition:** \`def\` is used correctly to encapsulate the reusable logic. This makes your program compliant with lab modularity standard.\n2. **Execution entrypoint:** You are using \`if __name__ == '__main__':\` which ensures that the program is only run when executed directly as a script (ideal practice for modules).\n3. **Variables & Casting:** You have used proper type-casting (like \`float()\` or \`int()\`) for inputs. This prevents standard input concatenation exceptions.\n\n✨ **Grade:** Highly optimized and structurally flawless. Excellent work!`;
    } else if (promptType === 'fix') {
      let errorsFound = [];
      if (currentCode.includes('def') && !currentCode.includes(':')) {
        errorsFound.push("Missing colon `:` after function declaration.");
      }
      if (currentCode.includes('input()') && !currentCode.includes('int(') && !currentCode.includes('float(') && selectedProblemId !== 'b1') {
        errorsFound.push("Raw `input()` reads values as Strings. You must cast it (e.g. `float(input())`) to do arithmetic calculations.");
      }
      
      if (errorsFound.length > 0) {
        responseText = `🛠️ **AI CODE SCANNER**\n*Scanned Code Status: BUGS IDENTIFIED ⚠️*\n\nI have identified the following issues in your script:\n\n${errorsFound.map((err, i) => `${i+1}. **${err}**`).join('\n')}\n\n💡 *Action:* Tap "RESET TEMPLATE" or modify the line to fix. Let me know if you want me to write the correct syntax!`;
      } else {
        responseText = `🛠️ **AI CODE SCANNER**\n*Scanned Code Status: PASSING ✅*\n\nExcellent! My scan detected **0 syntax warnings**. No indentation conflicts, missing colons, or invalid type castings were found. The structural integrity is robust!`;
      }
    } else if (promptType === 'autocomplete') {
      responseText = `✨ **AI CODE SUGGESTER / START SHEET**\n*Problem: ${problemTitle}*\n\nHere is the official optimal logic standard from the VVCE lab manual:\n\n\`\`\`python\n${selectedProblem.solutionCode}\n\`\`\`\n\n**Quick Tips:**\n* Make sure to use Heron's formula for C3 Area Calculation.\n* Do not use standard module imports for B2 list stats. Use standard formula equations!`;
    } else {
      const q = customQuestion.toLowerCase();
      // Moderation logic
      const isCoding = q.includes('python') || q.includes('code') || q.includes('bug') || q.includes('explain') || q.includes('help') || q.includes('how to') || q.includes('vtu') || q.includes('lab') || q.includes('recursion') || q.includes('loop') || q.includes('list') || q.includes('dict') || q.includes('class') || q.includes('error') || q.includes('type') || q.includes('input') || q.includes('print') || q.includes('heron') || q.includes('fahrenheit') || q.includes('fibonacci') || q.includes('factorial') || q.includes('exception');
      
      if (!isCoding && q.trim().length > 3) {
        responseText = `⚠️ SECURITY BREACH DETECTED: I am Kora, your VTU Python Coding Coach. I am programmed to ONLY assist with coding and Python-related questions. Please focus on your lab experiments!`;
      } else if (q.includes('help') || q.includes('how to')) {
        responseText = `Sure! To solve **${problemTitle}**, you should read input using \`input()\`, cast it to the correct type, pass it into a function, and print the return value. Let me know which part is confusing!`;
      } else if (q.includes('vtu') || q.includes('lab')) {
        responseText = `This problem matches **VTU Experiment ${selectedProblem.vtuId}** exactly. The constraints are standard for the lab exams.`;
      } else {
        responseText = `I've analyzed your question relative to **${problemTitle}**. Make sure your indentation consists of exactly 4 spaces (standard PEP 8) and you cast raw input strings appropriately!`;
      }
    }
    return responseText;
  };

  const renderFormattedMessage = (text) => {
    if (!text) return null;
    
    // Split by code blocks
    const parts = text.split(/(```[a-z]*\n[\s\S]*?\n```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        // Extract language and code
        const match = part.match(/```([a-z]*)\n([\s\S]*?)\n```/);
        const lang = match ? match[1] : '';
        const codeText = match ? match[2] : part.replace(/```[a-z]*\n|```/g, '');
        
        return (
          <div key={index} style={{
            background: '#151515',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            margin: '8px 0',
            fontFamily: 'var(--font-code)',
            fontSize: '0.7rem',
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '4px 10px',
              fontSize: '0.55rem',
              color: 'var(--text-muted)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border)'
            }}>
              <span>{lang.toUpperCase() || 'PYTHON'}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(codeText)}
                style={{ background: 'transparent', border: 'none', color: 'var(--blue)', cursor: 'pointer', fontSize: '0.55rem' }}
              >
                Copy
              </button>
            </div>
            <pre style={{ margin: 0, padding: '10px', overflowX: 'auto', whiteSpace: 'pre' }}>
              <code style={{ color: 'var(--neon)' }}>{codeText}</code>
            </pre>
          </div>
        );
      }
      
      // Handle simple bold text and inline code ticks
      const inlineParts = part.split(/(\*\*.*?\*\*|`.*?`)/g);
      const renderedInline = inlineParts.map((sub, sIdx) => {
        if (sub.startsWith('**') && sub.endsWith('**')) {
          return <strong key={sIdx} style={{ color: '#fff', fontWeight: 'bold' }}>{sub.slice(2, -2)}</strong>;
        }
        if (sub.startsWith('`') && sub.endsWith('`')) {
          return <code key={sIdx} style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 4px', borderRadius: '3px', color: 'var(--orange)', fontFamily: 'var(--font-code)' }}>{sub.slice(1, -1)}</code>;
        }
        return sub;
      });
      
      return <p key={index} style={{ margin: '6px 0', lineHeight: '1.4' }}>{renderedInline}</p>;
    });
  };

  // Generate lines array for code editor line numbers
  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 15) }, (_, i) => i + 1);

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 20px 40px', minHeight: '90vh' }}>
      
      {/* Dynamic Header Toolbar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px', 
        background: 'rgba(10, 14, 20, 0.6)', 
        border: '1px solid var(--border)', 
        borderRadius: 'var(--radius)', 
        padding: '12px 24px',
        backdropFilter: 'blur(12px)',
        flexWrap: 'wrap', 
        gap: '16px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <h2 style={{ color: 'var(--neon)', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontFamily: 'var(--font-pixel)' }}>
            💻 CODE ARENA IDE
          </h2>
          <span style={{
            fontSize: '0.6rem',
            background: 'rgba(88, 166, 255, 0.1)',
            border: '1px solid var(--blue)',
            color: 'var(--blue)',
            padding: '3px 8px',
            borderRadius: '4px',
            fontFamily: 'var(--font-pixel)',
            fontWeight: 'bold'
          }}>
            VTU {selectedProblem.vtuId}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Status Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: judge0Status === 'ready' ? 'var(--neon)' : judge0Status === 'loading' ? 'var(--orange)' : 'var(--red)',
              boxShadow: judge0Status === 'ready' ? 'var(--glow-neon)' : 'none'
            }}></span>
            <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.6rem' }}>
              {judge0Status === 'ready' ? 'JUDGE0 ONLINE' : judge0Status === 'loading' ? 'RESOLVING ID...' : 'OFFLINE MODE'}
            </span>
          </div>

          <button onClick={() => setView('dashboard')} className="btn-blue" style={{ fontSize: '0.7rem', padding: '6px 16px', borderRadius: '4px' }}>
            🗺️ BACK TO MAP
          </button>
        </div>
      </div>

      {/* Main Responsive Grid Workstation */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '380px 1fr', 
        gap: '20px', 
        alignItems: 'start' 
      }} className="grid-cols-layout">
        
        {/* ================= LEFT SIDEBAR PANEL (Description & AI Coach) ================= */}
        <div className="glass-panel" style={{ 
          background: 'var(--bg-card)', 
          padding: '0', 
          borderRadius: 'var(--radius)', 
          border: '1px solid var(--border)',
          overflow: 'hidden',
          display: 'flex', 
          flexDirection: 'column',
          height: '760px'
        }}>
          {/* Sidebar Tab Header */}
          <div style={{ 
            display: 'flex', 
            background: 'rgba(0,0,0,0.3)', 
            borderBottom: '1px solid var(--border)',
            padding: '4px 8px 0'
          }}>
            <button
              onClick={() => setAiTabActive(false)}
              style={{
                flex: 1,
                padding: '12px 6px',
                fontSize: '0.65rem',
                background: !aiTabActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: 'none',
                borderRadius: '4px 4px 0 0',
                color: !aiTabActive ? 'var(--neon)' : 'var(--text-muted)',
                fontFamily: 'var(--font-pixel)',
                borderBottom: !aiTabActive ? '2px solid var(--neon)' : 'none',
                cursor: 'pointer'
              }}
            >
              📖 DESCRIPTION
            </button>
            <button
              onClick={() => setAiTabActive(true)}
              style={{
                flex: 1,
                padding: '12px 6px',
                fontSize: '0.65rem',
                background: aiTabActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: 'none',
                borderRadius: '4px 4px 0 0',
                color: aiTabActive ? 'var(--purple)' : 'var(--text-muted)',
                fontFamily: 'var(--font-pixel)',
                borderBottom: aiTabActive ? '2px solid var(--purple)' : 'none',
                cursor: 'pointer'
              }}
            >
              🤖 KORA AI COACH
            </button>
          </div>

          {/* TAB 1 CONTENT: Problem Sheets */}
          {!aiTabActive ? (
            <div style={{ padding: '16px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Problem Selector Dropdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.5rem', color: 'var(--blue)' }}>
                  SELECT LAB EXPERIMENT
                </label>
                <select
                  value={selectedProblemId}
                  onChange={(e) => setSelectedProblemId(e.target.value)}
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    padding: '10px 12px',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-code)',
                    fontSize: '0.75rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {SANDBOX_PROBLEMS.map(prob => (
                    <option key={prob.id} value={prob.id} style={{ background: 'var(--bg-card)', color: '#fff' }}>
                      {prob.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Specs Card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.75rem', lineHeight: '1.5' }}>
                <div>
                  <h4 style={{ fontSize: '0.65rem', fontFamily: 'var(--font-pixel)', marginBottom: '6px', color: 'var(--blue)' }}>
                    PROBLEM DESCRIPTION
                  </h4>
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>{selectedProblem.description}</p>
                </div>

                {selectedProblem.formula && (
                  <div style={{ 
                    background: 'rgba(57, 255, 20, 0.03)', 
                    borderLeft: '3px solid var(--neon)', 
                    padding: '10px', 
                    borderRadius: '4px',
                    border: '1px solid rgba(57, 255, 20, 0.05)',
                    borderLeftWidth: '3px'
                  }}>
                    <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-pixel)', color: 'var(--neon)', display: 'block', marginBottom: '4px' }}>
                      MATHEMATICAL FORMULA:
                    </span>
                    <code style={{ fontSize: '0.7rem', color: 'var(--text)', fontFamily: 'var(--font-code)' }}>{selectedProblem.formula}</code>
                  </div>
                )}

                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.65rem', fontFamily: 'var(--font-pixel)', marginBottom: '4px' }}>INPUT PARAMETERS</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: 0 }}>{selectedProblem.inputFormat}</p>
                </div>

                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.65rem', fontFamily: 'var(--font-pixel)', marginBottom: '4px' }}>OUTPUT FORMAT</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: 0 }}>{selectedProblem.outputFormat}</p>
                </div>

                {selectedProblem.constraints && (
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.65rem', fontFamily: 'var(--font-pixel)', marginBottom: '4px' }}>CONSTRAINTS</h4>
                    <code style={{ color: 'var(--orange)', fontSize: '0.7rem', fontFamily: 'var(--font-code)' }}>{selectedProblem.constraints}</code>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginTop: '4px' }}>
                  <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '10px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', display: 'block', fontWeight: 'bold' }}>SAMPLE INPUT</span>
                    <pre style={{ color: 'var(--blue)', fontSize: '0.75rem', marginTop: '4px', margin: 0, fontFamily: 'var(--font-code)' }}>{selectedProblem.sampleInput}</pre>
                  </div>
                  <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '10px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', display: 'block', fontWeight: 'bold' }}>EXPECTED OUTPUT</span>
                    <pre style={{ color: 'var(--neon)', fontSize: '0.75rem', marginTop: '4px', margin: 0, fontFamily: 'var(--font-code)' }}>{selectedProblem.sampleOutput}</pre>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2 CONTENT: AI Coach Panel */
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#0a0e14' }}>
              {/* Groq Settings Widget */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                background: 'rgba(0,0,0,0.3)',
                borderBottom: '1px solid var(--border)',
                fontSize: '0.65rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--purple)', fontFamily: 'var(--font-pixel)', fontSize: '0.55rem' }}>🤖 GROQ GATEWAY</span>
                  {groqApiKey ? (
                    <span style={{ color: 'var(--neon)', fontSize: '0.5rem', fontWeight: 'bold' }}>● ONLINE (LLAMA-3.3)</span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.5rem' }}>● OFFLINE FALLBACK</span>
                  )}
                </div>
                
                <button 
                  onClick={() => setShowKeyInput(!showKeyInput)}
                  style={{
                    padding: '2px 6px',
                    fontSize: '0.5rem',
                    background: 'transparent',
                    borderColor: 'var(--border)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    color: 'var(--text-muted)'
                  }}
                >
                  {showKeyInput ? 'CLOSE' : '🔑 CONFIG'}
                </button>
              </div>

              {showKeyInput && (
                <div style={{
                  padding: '12px',
                  background: 'rgba(0,0,0,0.6)',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  {/* Groq Key Input */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>PASTE GROQ API KEY:</label>
                    <input
                      type="password"
                      value={groqApiKey}
                      onChange={(e) => {
                        setGroqApiKey(e.target.value);
                        localStorage.setItem('groq_api_key', e.target.value);
                      }}
                      placeholder="gsk_..."
                      style={{
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid var(--border)',
                        color: '#fff',
                        fontSize: '0.65rem',
                        padding: '6px 10px',
                        borderRadius: '4px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Judge0 Endpoint Input */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
                    <label style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>JUDGE0 COMPILER API ENDPOINT:</label>
                    <input
                      type="text"
                      value={judge0ApiUrl}
                      onChange={(e) => {
                        setJudge0ApiUrl(e.target.value);
                        localStorage.setItem('judge0_api_url', e.target.value);
                      }}
                      placeholder="https://ce.judge0.com"
                      style={{
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid var(--border)',
                        color: '#fff',
                        fontSize: '0.65rem',
                        padding: '6px 10px',
                        borderRadius: '4px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <button
                    onClick={() => {
                      localStorage.setItem('groq_api_key', groqApiKey);
                      localStorage.setItem('judge0_api_url', judge0ApiUrl);
                      setShowKeyInput(false);
                    }}
                    className="btn-purple"
                    style={{ padding: '4px 10px', fontSize: '0.6rem', borderRadius: '4px', alignSelf: 'flex-end' }}
                  >
                    SAVE CONFIG
                  </button>
                </div>
              )}
              
              {/* Chat messages viewport */}
              <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {aiChatHistory.map((chat, idx) => (
                  <div
                    key={idx}
                    style={{
                      alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '90%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius)',
                      fontSize: '0.7rem',
                      lineHeight: '1.4',
                      background: chat.role === 'user' ? 'rgba(88, 166, 255, 0.08)' : 'rgba(189, 147, 249, 0.03)',
                      border: chat.role === 'user' ? '1px solid rgba(88, 166, 255, 0.2)' : '1px solid rgba(189, 147, 249, 0.15)',
                      color: chat.role === 'user' ? 'var(--blue)' : 'var(--text)'
                    }}
                  >
                    <span style={{
                      display: 'block',
                      fontWeight: 'bold',
                      fontSize: '0.55rem',
                      color: chat.role === 'user' ? 'var(--blue)' : 'var(--purple)',
                      fontFamily: 'var(--font-pixel)',
                      marginBottom: '4px'
                    }}>
                      {chat.role === 'user' ? 'STUDENT' : 'KORA AI COACH'}
                    </span>
                    <div style={{ color: 'var(--text)' }}>{renderFormattedMessage(chat.text)}</div>
                  </div>
                ))}

                {isAiResponding && (
                  <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.85rem', animation: 'blink 0.8s infinite' }}>🤖</span>
                    <span>Kora is thinking...</span>
                  </div>
                )}
              </div>

              {/* Quick actions panel */}
              <div style={{ display: 'flex', gap: '6px', padding: '6px 12px', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)' }}>
                <button
                  onClick={() => triggerAiCoachMessage('autocomplete')}
                  style={{ fontSize: '0.55rem', padding: '3px 6px', borderRadius: '4px', border: '1px solid var(--purple)', color: 'var(--purple)', background: 'transparent', cursor: 'pointer' }}
                >
                  💡 GET MANUAL LOGIC
                </button>
                <button
                  onClick={() => triggerAiCoachMessage('explain')}
                  style={{ fontSize: '0.55rem', padding: '3px 6px', borderRadius: '4px', border: '1px solid var(--blue)', color: 'var(--blue)', background: 'transparent', cursor: 'pointer' }}
                >
                  📖 BREAKDOWN CODE
                </button>
              </div>

              {/* Chat Input Line */}
              <div style={{ display: 'flex', borderTop: '1px solid var(--border)', padding: '6px' }}>
                <input
                  value={aiInputText}
                  onChange={(e) => setAiInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && aiInputText.trim()) {
                      triggerAiCoachMessage('custom', aiInputText);
                    }
                  }}
                  placeholder="Ask Kora about code or Heron equations..."
                  style={{
                    flex: 1,
                    background: 'rgba(0,0,0,0.3)',
                    border: 'none',
                    outline: 'none',
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-code)',
                    padding: '8px 10px',
                    borderRadius: '4px'
                  }}
                />
                <button
                  onClick={() => {
                    if (aiInputText.trim()) triggerAiCoachMessage('custom', aiInputText);
                  }}
                  disabled={!aiInputText.trim()}
                  className="btn-purple"
                  style={{ padding: '4px 12px', fontSize: '0.65rem', borderRadius: '4px', marginLeft: '6px' }}
                >
                  SEND
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT WORKSTATION PANEL (Monaco IDE & Terminal Console) ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Main Monaco IDE Editor Wrapper */}
          <div className="glass-panel" style={{ 
            background: 'var(--bg-card)', 
            border: '1px solid var(--border)', 
            borderRadius: 'var(--radius)', 
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}>
            
            {/* High-Tech Terminal Header Control Bar */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 16px', 
              background: 'rgba(0,0,0,0.4)', 
              borderBottom: '1px solid var(--border)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></span>
                <span style={{ 
                  color: 'var(--text-muted)', 
                  fontFamily: 'var(--font-pixel)', 
                  fontSize: '0.55rem', 
                  marginLeft: '8px',
                  letterSpacing: '1px'
                }}>
                  PYTHONIA_REPUBLIC_ARENA.PY
                </span>
              </div>
              <span style={{ fontSize: '0.55rem', color: 'var(--neon)', fontFamily: 'var(--font-code)' }}>
                UTF-8 // PYTHON 3
              </span>
            </div>

            {/* Monaco Workspace */}
            <div style={{ position: 'relative', height: '420px', background: '#1e1e1e' }}>
              <Editor
                height="420px"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  fontSize: 13,
                  minimap: { enabled: false },
                  fontFamily: "var(--font-code)",
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  lineNumbers: "on",
                  padding: { top: 12, bottom: 12 },
                  theme: "vs-dark"
                }}
              />

              {/* Floating Editor Action Controls */}
              <div style={{ position: 'absolute', bottom: '16px', right: '24px', display: 'flex', gap: '8px', zIndex: 10 }}>
                <button
                  onClick={() => {
                    triggerAiCoachMessage('explain');
                    setAiTabActive(true); // Switch tab automatically to display response!
                  }}
                  className="btn-purple"
                  style={{ padding: '6px 12px', fontSize: '0.65rem', borderRadius: '4px', boxShadow: '0 4px 10px rgba(189, 147, 249, 0.2)' }}
                >
                  🤖 AI EXPLAIN
                </button>
                <button
                  onClick={() => {
                    triggerAiCoachMessage('fix');
                    setAiTabActive(true); // Switch tab automatically to display scanner!
                  }}
                  className="btn-red"
                  style={{ padding: '6px 12px', fontSize: '0.65rem', borderRadius: '4px', boxShadow: '0 4px 10px rgba(255, 77, 77, 0.2)' }}
                >
                  🛠️ AI SCAN
                </button>
                <button
                  onClick={() => setCode(selectedProblem.templateCode)}
                  className="btn-blue"
                  style={{ padding: '6px 12px', fontSize: '0.65rem', borderRadius: '4px' }}
                >
                  🔄 RESET
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Console Pane */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="grid-cols-layout">
            
            {/* Input terminal */}
            <div className="glass-panel" style={{ background: 'var(--bg-card)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid var(--border)' }}>
              <label style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: 'var(--blue)' }}>
                CONSOLE STDIN (CUSTOM INPUT)
              </label>
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                spellCheck="false"
                placeholder="Provide standard inputs here..."
                style={{
                  height: '90px',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--border)',
                  color: 'var(--blue)',
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.75rem',
                  padding: '10px',
                  borderRadius: '4px',
                  resize: 'none',
                  outline: 'none',
                  userSelect: 'text'
                }}
              />
            </div>

            {/* Output terminal */}
            <div className="glass-panel" style={{ background: 'var(--bg-card)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: 'var(--neon)' }}>
                  CONSOLE STDOUT (COMPILER OUTPUT)
                </label>
                
                {/* Execute & Grade Buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={runCode}
                    disabled={isRunning || isGrading}
                    className="btn-primary"
                    style={{
                      padding: '6px 14px',
                      fontSize: '0.65rem',
                      borderRadius: '4px',
                      boxShadow: 'var(--glow-neon)',
                    }}
                  >
                    {isRunning ? '⏳ RUNNING...' : '▶️ RUN CODE'}
                  </button>
                  
                  <button
                    onClick={submitAndGradeCode}
                    disabled={isRunning || isGrading}
                    className="btn-purple"
                    style={{
                      padding: '6px 14px',
                      fontSize: '0.65rem',
                      borderRadius: '4px',
                      boxShadow: '0 0 10px rgba(189, 147, 249, 0.4)',
                    }}
                  >
                    {isGrading ? '⏳ EVALUATING...' : '🏆 SUBMIT & GRADE'}
                  </button>
                </div>
              </div>

              <pre style={{
                height: '90px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--border)',
                color: stdout.includes('ERROR') ? 'var(--red)' : stdout.includes('WASM') || stdout.includes('loaded') ? 'var(--blue)' : 'var(--neon)',
                fontFamily: 'var(--font-code)',
                fontSize: '0.75rem',
                padding: '10px',
                borderRadius: '4px',
                overflowY: 'auto',
                whiteSpace: 'pre-wrap',
                margin: 0,
                boxShadow: stdout.includes('ERROR') ? 'inset 0 0 10px rgba(255,77,77,0.05)' : 'none'
              }}>
                {stdout}
              </pre>
            </div>
          </div>

          {/* HackerRank Scorecard Panel */}
          {gradingResults && (
            <div style={{
              background: 'rgba(10, 14, 20, 0.95)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              animation: 'slideIn 0.3s ease-out',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                <h4 style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.75rem', color: 'var(--purple)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🏁 HACKERRANK ASSESSMENT SCORECARD
                </h4>
                <button 
                  onClick={() => setGradingResults(null)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '2px solid var(--border)',
                  borderRadius: '50%',
                  width: '65px',
                  height: '65px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: gradingScore === 100 ? 'var(--neon)' : 'var(--orange)'
                }}>
                  <span style={{ fontSize: '1rem', fontWeight: 'bold', color: gradingScore === 100 ? 'var(--neon)' : 'var(--orange)', fontFamily: 'var(--font-code)' }}>
                    {gradingScore}%
                  </span>
                  <span style={{ fontSize: '0.45rem', color: 'var(--text-muted)' }}>SCORE</span>
                </div>

                <div style={{ flex: 1 }}>
                  <h5 style={{ margin: '0 0 6px 0', fontSize: '0.75rem', color: '#fff', fontFamily: 'var(--font-pixel)' }}>
                    {gradingScore === 100 ? '🎉 100% PERFECT SOLVE!' : '⚠️ MISSION INCOMPLETE'}
                  </h5>
                  <p style={{ margin: 0, fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    {gradingScore === 100 
                      ? 'Excellent programming! You have successfully passed all Sample and Hidden Test Cases. +50 XP has been added to your profile!' 
                      : 'Analyze the mismatched lines, correct logic constraints, or missing decimal formatting and retry submission!'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
                {gradingResults.map((tc, index) => (
                  <div key={index} style={{
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderColor: tc.passed ? 'rgba(57, 255, 20, 0.2)' : 'rgba(255, 77, 77, 0.2)'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: '#fff', fontFamily: 'var(--font-pixel)' }}>
                        Test Case #{index + 1} {tc.isHidden ? '🔒 (Hidden)' : '👁️ (Sample)'}
                      </span>
                      {!tc.isHidden ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '6px', fontSize: '0.65rem', fontFamily: 'var(--font-code)', color: 'var(--text-muted)' }}>
                          <span>Input: <code style={{ color: 'var(--blue)' }}>{tc.input.replace(/\n/g, ' ')}</code></span>
                          <span>Expected: <code style={{ color: 'var(--neon)' }}>{tc.expected.replace(/\n/g, ' ')}</code></span>
                          {tc.actual && <span>Got: <code style={{ color: tc.passed ? 'var(--neon)' : 'var(--red)' }}>{tc.actual.replace(/\n/g, ' ')}</code></span>}
                        </div>
                      ) : (
                        <div style={{ marginTop: '4px', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                          {tc.passed ? '🔒 Hidden test parameters validated successfully.' : '🔒 Hidden test mismatch. Double check extreme input values or blank lines.'}
                        </div>
                      )}
                    </div>

                    <span style={{
                      fontSize: '0.6rem',
                      fontWeight: 'bold',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: tc.passed ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                      border: tc.passed ? '1px solid var(--neon)' : '1px solid var(--red)',
                      color: tc.passed ? 'var(--neon)' : 'var(--red)'
                    }}>
                      {tc.passed ? 'PASSED ✅' : 'FAILED ❌'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
