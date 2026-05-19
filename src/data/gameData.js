// 🐍 PYTHONIA Game Data
// Modules, Missions, Challenges, Badges, Ranks

export const RANKS = [
  { rank: 1, title: 'Snake Rookie', xpRequired: 0 },
  { rank: 2, title: 'Indentation Initiate', xpRequired: 150 },
  { rank: 3, title: 'Variable Scout', xpRequired: 400 },
  { rank: 4, title: 'Loop Apprentice', xpRequired: 750 },
  { rank: 5, title: 'Function Knight', xpRequired: 1200 },
  { rank: 6, title: 'List Paladin', xpRequired: 1700 },
  { rank: 7, title: 'Dict Ranger', xpRequired: 2200 },
  { rank: 8, title: 'Exception Slayer', xpRequired: 2700 },
  { rank: 9, title: 'File Warrior', xpRequired: 3300 },
  { rank: 10, title: 'OOP Master', xpRequired: 3900 },
  { rank: 11, title: 'Python Ninja', xpRequired: 4300 },
  { rank: 12, title: 'Python God', xpRequired: 4600 }
];

export const BADGES = [
  { id: 'temperature_wizard', title: '🌡️ Temperature Wizard', emoji: '🌡️', description: 'Complete A1 (Celsius/Fahrenheit)', trigger: 'Complete Mission m1_5' },
  { id: 'fibonacci_pilgrim', title: '🔢 Fibonacci Pilgrim', emoji: '🔢', description: 'Complete A2a (Fibonacci recursion)', trigger: 'Complete Mission m2_3' },
  { id: 'recursion_sage', title: '♾️ Recursion Sage', emoji: '♾️', description: 'Complete A2b (Factorial recursion)', trigger: 'Complete Mission m1_8' },
  { id: 'stats_sorcerer', title: '📊 Stats Sorcerer', emoji: '📊', description: 'Complete B2 (Mean/Variance/SD)', trigger: 'Complete Mission m3_3' },
  { id: 'dict_keeper', title: '📖 Dict Keeper', emoji: '📖', description: 'Complete B3 + B5', trigger: 'Complete Missions m3_5 + m3_6' },
  { id: 'file_whisperer', title: '📁 File Whisperer', emoji: '📁', description: 'Complete B4 + C1', trigger: 'Complete Missions m4_3 + m4_4' },
  { id: 'exception_hunter', title: '⚠️ Exception Hunter', emoji: '⚠️', description: 'Complete B6', trigger: 'Complete Mission m4_6' },
  { id: 'class_architect', title: '🏛️ Class Architect', emoji: '🏛️', description: 'Complete C2', trigger: 'Complete Mission m5_4' },
  { id: 'inheritance_heir', title: '🧬 Inheritance Heir', emoji: '🧬', description: 'Complete C3', trigger: 'Complete Mission m5_6' },
  { id: 'no_hints_hero', title: '💡 No Hints Hero', emoji: '💡', description: 'Complete any module with 0 hints used', trigger: 'Complete a module with 0 hints used' },
  { id: 'python_god', title: '🐍 Python God', emoji: '🐍', description: 'Complete all 5 modules!', trigger: 'Graduate from Pythonia' }
];

export const MODULES = [
  {
    id: 'm1',
    title: 'Python Basics & Functions',
    icon: '🐍',
    xpPool: 800,
    difficulty: 2,
    prerequisite: null,
    missions: [
      {
        id: 'm1_1',
        title: 'What is Python?',
        badge: null,
        xpReward: 80,
        briefing: {
          lines: [
            "Welcome to Pythonia, Snake Rookie!",
            "Python is a high-level, interpreted language designed by Guido van Rossum.",
            "It values readability and simplicity. No semicolons, no boilerplate code.",
            "Let's trace how the simplest program, print(), outputs messages to the console."
          ],
          codeExample: `print("Hello World")`,
          traceSteps: [
            {
              step: 1,
              code: 'print("Hello World")',
              variables: [
                { id: 'stdout', value: 'Hello World', type: 'str' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m1_1_1',
            type: 'mcq',
            question: 'Who created the Python programming language?',
            options: ['Dennis Ritchie', 'Guido van Rossum', 'Bjarne Stroustrup', 'James Gosling'],
            correct: 1,
            hint: 'He named the language after Monty Python\'s Flying Circus.',
            xpValue: 40,
            wrongPenalty: 5
          },
          {
            id: 'c_m1_1_2',
            type: 'trace',
            question: 'What is the output of the following statement?',
            code: 'print("Python" + "ia")',
            correctAnswer: 'Pythonia',
            hint: 'The + operator concatenates (joins) two strings together.',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm1_2',
        title: 'Variables & Types',
        badge: null,
        xpReward: 100,
        briefing: {
          lines: [
            "Variables are labels that refer to values stored in computer memory.",
            "In Python, variables are dynamically typed. You don't declare their types.",
            "Python has basic data types: int (integers), float (decimals), and str (strings).",
            "The type() function returns the category of a given value."
          ],
          codeExample: `x = 42\ny = "Python"\nprint(type(x))\nprint(type(y))`,
          traceSteps: [
            {
              step: 1,
              code: 'x = 42',
              variables: [
                { id: 'x', value: '42', type: 'int' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'y = "Python"',
              variables: [
                { id: 'x', value: '42', type: 'int' },
                { id: 'y', value: '"Python"', type: 'str' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m1_2_1',
            type: 'fill_blank',
            question: 'Fill in the blanks to find the type of variable val:',
            code: 'val = 99.9\nprint(_____(val))',
            blanks: ['type'],
            hint: 'Use the built-in function that determines data categories.',
            xpValue: 30,
            wrongPenalty: 5
          },
          {
            id: 'c_m1_2_2',
            type: 'mcq',
            question: 'What does type(3.14) return in Python?',
            options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'number'>"],
            correct: 1,
            hint: 'Decimals in Python belong to the float class.',
            xpValue: 35,
            wrongPenalty: 5
          },
          {
            id: 'c_m1_2_3',
            type: 'scenario',
            question: 'You want to store a student\'s Roll Number "CS045" without losing the leading characters. Which data type should you use?',
            options: ['int', 'float', 'str', 'boolean'],
            correct: 2,
            hint: 'Since CS045 contains letters, it must be represented as a series of characters.',
            xpValue: 35,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm1_3',
        title: 'Arithmetic & Operators',
        badge: null,
        xpReward: 80,
        briefing: {
          lines: [
            "Python supports standard mathematical operations: +, -, *, and /.",
            "Special operators include: // (floor division), % (modulus), and ** (exponentiation).",
            "Modulus (%) returns the remainder of a division.",
            "Exponentiation (**) raises a number to the power of another.",
            "Let's trace how mathematical equations are evaluated."
          ],
          codeExample: `a = 15\nb = 4\nq = a // b\nr = a % b\np = b ** 2`,
          traceSteps: [
            {
              step: 1,
              code: 'a = 15; b = 4',
              variables: [
                { id: 'a', value: '15', type: 'int' },
                { id: 'b', value: '4', type: 'int' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'q = a // b; r = a % b',
              variables: [
                { id: 'a', value: '15', type: 'int' },
                { id: 'b', value: '4', type: 'int' },
                { id: 'q', value: '3', type: 'int' },
                { id: 'r', value: '3', type: 'int' }
              ],
              edges: [
                { id: 'e1', source: 'a', target: 'q', label: 'computed' },
                { id: 'e2', source: 'a', target: 'r', label: 'computed' }
              ]
            },
            {
              step: 3,
              code: 'p = b ** 2',
              variables: [
                { id: 'a', value: '15', type: 'int' },
                { id: 'b', value: '4', type: 'int' },
                { id: 'q', value: '3', type: 'int' },
                { id: 'r', value: '3', type: 'int' },
                { id: 'p', value: '16', type: 'int' }
              ],
              edges: [
                { id: 'e3', source: 'b', target: 'p', label: 'computed' }
              ]
            }
          ]
        },
        challenges: [
          {
            id: 'c_m1_3_1',
            type: 'trace',
            question: 'What is the output of print(2 ** 3)?',
            code: 'print(2 ** 3)',
            correctAnswer: '8',
            hint: 'This computes 2 multiplied by itself 3 times (2 cubed).',
            xpValue: 40,
            wrongPenalty: 5
          },
          {
            id: 'c_m1_3_2',
            type: 'trace',
            question: 'What is the result of print(17 % 5)?',
            code: 'print(17 % 5)',
            correctAnswer: '2',
            hint: '17 divided by 5 is 3 with a remainder of 2. Modulus returns the remainder.',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm1_4',
        title: 'Expressions & Statements',
        badge: null,
        xpReward: 80,
        briefing: {
          lines: [
            "An expression is a combination of values, variables, and operators that evaluates to a value.",
            "A statement is a unit of code that has an effect, like creating a variable or printing.",
            "Python executes code line-by-line in sequential order.",
            "Let's trace how mathematical equations are resolved."
          ],
          codeExample: `x = 5\ny = x + 10\nprint(y)`,
          traceSteps: [
            {
              step: 1,
              code: 'x = 5',
              variables: [
                { id: 'x', value: '5', type: 'int' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'y = x + 10',
              variables: [
                { id: 'x', value: '5', type: 'int' },
                { id: 'y', value: '15', type: 'int' }
              ],
              edges: [
                { id: 'e1', source: 'x', target: 'y', label: 'computed' }
              ]
            }
          ]
        },
        challenges: [
          {
            id: 'c_m1_4_1',
            type: 'mcq',
            question: 'Which of the following is an expression (not a complete statement)?',
            options: ['print("Hello")', 'x = 5', 'x + 10', 'if x == 5:'],
            correct: 2,
            hint: 'Expressions only compute values but do not perform structural assignments.',
            xpValue: 40,
            wrongPenalty: 5
          },
          {
            id: 'c_m1_4_2',
            type: 'fill_blank',
            question: 'Fill in the blanks to assign a value of 10 to a and compute b as a squared:',
            code: 'a = _____\nb = a ** _____',
            blanks: ['10', '2'],
            hint: 'Assign 10 to a, then raise a to the power of 2.',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm1_5',
        title: 'Temperature Converter',
        badge: 'temperature_wizard',
        xpReward: 120,
        briefing: {
          lines: [
            "Let's write your first VTU Lab Experiment: A1 (Celsius to Fahrenheit).",
            "We receive Celsius input from the user using input() and convert it to float.",
            "The mathematical formula to convert Celsius (C) to Fahrenheit (F) is:",
            "F = (C × 1.8) + 32",
            "Let's trace this program converting a hot day of 40.0°C to Fahrenheit."
          ],
          codeExample: `celsius = float(input())\nfahrenheit = (celsius * 1.8) + 32\nprint(fahrenheit)`,
          traceSteps: [
            {
              step: 1,
              code: 'celsius = 40.0',
              variables: [
                { id: 'celsius', value: '40.0', type: 'float' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'fahrenheit = (celsius * 1.8) + 32',
              variables: [
                { id: 'celsius', value: '40.0', type: 'float' },
                { id: 'fahrenheit', value: '104.0', type: 'float' }
              ],
              edges: [
                { id: 'e1', source: 'celsius', target: 'fahrenheit', label: 'computed' }
              ]
            },
            {
              step: 3,
              code: 'print(fahrenheit)',
              variables: [
                { id: 'celsius', value: '40.0', type: 'float' },
                { id: 'fahrenheit', value: '104.0', type: 'float' },
                { id: 'stdout', value: '104.0', type: 'str' }
              ],
              edges: [
                { id: 'e2', source: 'fahrenheit', target: 'stdout', label: 'stdout' }
              ]
            }
          ]
        },
        challenges: [
          {
            id: 'c_m1_5_1',
            type: 'fill_blank',
            question: 'Complete the conversion formula in this Python program:',
            code: 'celsius = float(input("Enter Celsius: "))\nfahrenheit = (celsius * _____) + _____',
            blanks: ['1.8', '32'],
            hint: 'The conversion factor is 9/5 (which is 1.8) and you shift it by 32.',
            xpValue: 40,
            wrongPenalty: 5
          },
          {
            id: 'c_m1_5_2',
            type: 'fix_bug',
            question: 'Identify the bug in this input code that fails to convert values to mathematical floats:',
            code: 'celsius = input("Enter Celsius: ")\nfahrenheit = (celsius * 1.8) + 32\n# Hint: inputs are read as strings, you must cast them!',
            buggyLine: 'celsius = input("Enter Celsius: ")',
            correctLine: 'celsius = float(input("Enter Celsius: "))',
            hint: 'Wrap the input() function in a float() converter.',
            xpValue: 40,
            wrongPenalty: 5
          },
          {
            id: 'c_m1_5_3',
            type: 'order',
            question: 'Arrange the statements in correct order to implement the converter:',
            steps: [
              { id: 's1', text: 'celsius = float(input("Celsius: "))' },
              { id: 's2', text: 'fahrenheit = (celsius * 1.8) + 32' },
              { id: 's3', text: 'print("Fahrenheit is:", fahrenheit)' }
            ],
            correctOrder: ['s1', 's2', 's3'],
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm1_6',
        title: 'Strings & Comments',
        badge: null,
        xpReward: 80,
        briefing: {
          lines: [
            "Strings are sequences of characters wrapped in single or double quotes.",
            "In Python, comments start with a hash mark (#) and are ignored by the compiler.",
            "You can concatenate strings with +, and repeat them with *.",
            "Let's trace string concatenation and repetition."
          ],
          codeExample: `word = "Py"\nrepeat = word * 3\nfull = repeat + "thon"`,
          traceSteps: [
            {
              step: 1,
              code: 'word = "Py"',
              variables: [
                { id: 'word', value: '"Py"', type: 'str' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'repeat = word * 3',
              variables: [
                { id: 'word', value: '"Py"', type: 'str' },
                { id: 'repeat', value: '"PyPyPy"', type: 'str' }
              ],
              edges: [
                { id: 'e1', source: 'word', target: 'repeat', label: 'multiplied' }
              ]
            },
            {
              step: 3,
              code: 'full = repeat + "thon"',
              variables: [
                { id: 'word', value: '"Py"', type: 'str' },
                { id: 'repeat', value: '"PyPyPy"', type: 'str' },
                { id: 'full', value: '"PyPyPython"', type: 'str' }
              ],
              edges: [
                { id: 'e2', source: 'repeat', target: 'full', label: 'concatenated' }
              ]
            }
          ]
        },
        challenges: [
          {
            id: 'c_m1_6_1',
            type: 'trace',
            question: 'What is the output of print("Go" * 2 + "Lions")?',
            code: 'print("Go" * 2 + "Lions")',
            correctAnswer: 'GoGoLions',
            hint: 'Perform string repetition first, then concatenation.',
            xpValue: 40,
            wrongPenalty: 5
          },
          {
            id: 'c_m1_6_2',
            type: 'mcq',
            question: 'How do you write a single-line comment in Python?',
            options: ['// This is a comment', '/* This is a comment */', '# This is a comment', '<!-- This is a comment -->'],
            correct: 2,
            hint: 'Look for the hash / pound symbol.',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm1_7',
        title: 'Functions & Calls',
        badge: null,
        xpReward: 100,
        briefing: {
          lines: [
            "Functions are reusable blocks of code that run only when called.",
            "Define a function using the def keyword, followed by its name and parameters.",
            "Indent the function body! Use return to pass a value back to the caller.",
            "Let's trace defining and calling a function that computes square values."
          ],
          codeExample: `def square(n):\n    return n * n\n\nval = square(5)`,
          traceSteps: [
            {
              step: 1,
              code: 'def square(n)...',
              variables: [
                { id: 'square', value: '[function square]', type: 'func' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'val = square(5)',
              variables: [
                { id: 'square', value: '[function square]', type: 'func' },
                { id: 'n', value: '5', type: 'int' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 'return n * n',
              variables: [
                { id: 'square', value: '[function square]', type: 'func' },
                { id: 'val', value: '25', type: 'int' }
              ],
              edges: [
                { id: 'e1', source: 'square', target: 'val', label: 'return' }
              ]
            }
          ]
        },
        challenges: [
          {
            id: 'c_m1_7_1',
            type: 'fix_bug',
            question: 'Identify the structural bug (missing punctuation) in this function definition:',
            code: 'def greet(name)\n    print("Hello", name)',
            buggyLine: 'def greet(name)',
            correctLine: 'def greet(name):',
            hint: 'Function definitions in Python must end with a colon (:).',
            xpValue: 50,
            wrongPenalty: 5
          },
          {
            id: 'c_m1_7_2',
            type: 'fill_blank',
            question: 'Complete this function to return the average of two numbers:',
            code: 'def average(a, b):\n    _____ (a + b) / 2',
            blanks: ['return'],
            hint: 'Which keyword passes the computed value back to where the function was called?',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm1_8',
        title: 'Factorial Function',
        badge: 'recursion_sage',
        xpReward: 160,
        briefing: {
          lines: [
            "Let's implement VTU Lab Experiment A2b: Recursive Factorial.",
            "Factorial of n (denoted as n!) is the product of all positive integers less than or equal to n.",
            "Base Case: 0! = 1! = 1. Recursive Case: n! = n × (n - 1)!",
            "Let's trace how factorial(3) calls itself recursively to solve the equation."
          ],
          codeExample: `def fact(n):\n    if n == 0 or n == 1:\n        return 1\n    else:\n        return n * fact(n - 1)\n\nres = fact(3)`,
          traceSteps: [
            {
              step: 1,
              code: 'res = fact(3)',
              variables: [
                { id: 'fact', value: '[function fact]', type: 'func' },
                { id: 'call_1', value: 'fact(3)', type: 'func' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'fact(3) -> 3 * fact(2)',
              variables: [
                { id: 'fact', value: '[function fact]', type: 'func' },
                { id: 'call_1', value: 'fact(3)', type: 'func' },
                { id: 'call_2', value: 'fact(2)', type: 'func' }
              ],
              edges: [
                { id: 'e1', source: 'call_1', target: 'call_2', label: 'calls' }
              ]
            },
            {
              step: 3,
              code: 'fact(2) -> 2 * fact(1)',
              variables: [
                { id: 'fact', value: '[function fact]', type: 'func' },
                { id: 'call_1', value: 'fact(3)', type: 'func' },
                { id: 'call_2', value: 'fact(2)', type: 'func' },
                { id: 'call_3', value: 'fact(1)', type: 'func' }
              ],
              edges: [
                { id: 'e2', source: 'call_2', target: 'call_3', label: 'calls' }
              ]
            },
            {
              step: 4,
              code: 'fact(1) returns 1 (Base Case)',
              variables: [
                { id: 'fact', value: '[function fact]', type: 'func' },
                { id: 'call_1', value: 'fact(3)', type: 'func' },
                { id: 'call_2', value: 'fact(2)', type: 'func' },
                { id: 'val_3', value: '1', type: 'int' }
              ],
              edges: [
                { id: 'e3', source: 'val_3', target: 'call_2', label: 'return' }
              ]
            },
            {
              step: 5,
              code: 'fact(2) resolves to 2 * 1 = 2, fact(3) resolves to 3 * 2 = 6',
              variables: [
                { id: 'fact', value: '[function fact]', type: 'func' },
                { id: 'res', value: '6', type: 'int' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m1_8_1',
            type: 'fill_blank',
            question: 'Fill in the blanks to complete the recursive factorial program:',
            code: 'def fact(n):\n    if n == 0 or n == 1:\n        return _____\n    else:\n        return n * fact(_____)',
            blanks: ['1', 'n-1'],
            hint: 'The base case returns 1, and the recursive step reduces the argument by 1.',
            xpValue: 60,
            wrongPenalty: 10
          },
          {
            id: 'c_m1_8_2',
            type: 'trace',
            question: 'What is the output of print(fact(4)) using the recursive factorial function?',
            code: 'print(fact(4))',
            correctAnswer: '24',
            hint: 'Factorial of 4 is 4 * 3 * 2 * 1 = 24.',
            xpValue: 50,
            wrongPenalty: 5
          },
          {
            id: 'c_m1_8_3',
            type: 'order',
            question: 'Arrange these lines in order to build a factorial function:',
            steps: [
              { id: 's1', text: 'def fact(n):' },
              { id: 's2', text: '    if n <= 1:' },
              { id: 's3', text: '        return 1' },
              { id: 's4', text: '    return n * fact(n - 1)' }
            ],
            correctOrder: ['s1', 's2', 's3', 's4'],
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      }
    ]
  },
  {
    id: 'm2',
    title: 'Logic, Loops & Strings',
    icon: '🔁',
    xpPool: 1000,
    difficulty: 3,
    prerequisite: 'm1',
    missions: [
      {
        id: 'm2_1',
        title: 'Boolean & Logic',
        badge: null,
        xpReward: 80,
        briefing: {
          lines: [
            "Logic drives branching execution in code.",
            "Boolean data type has only two values: True and False (Capitalized!).",
            "Logical operators: and, or, not.",
            "Let's trace logical expressions."
          ],
          codeExample: `x = 5\na = (x > 2) and (x < 10)\nb = (x < 2) or (not (x == 5))`,
          traceSteps: [
            {
              step: 1,
              code: 'x = 5',
              variables: [
                { id: 'x', value: '5', type: 'int' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'a = (x > 2) and (x < 10)',
              variables: [
                { id: 'x', value: '5', type: 'int' },
                { id: 'a', value: 'True', type: 'bool' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 'b = (x < 2) or (not (x == 5))',
              variables: [
                { id: 'x', value: '5', type: 'int' },
                { id: 'a', value: 'True', type: 'bool' },
                { id: 'b', value: 'False', type: 'bool' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m2_1_1',
            type: 'mcq',
            question: 'What is the output of print(True and (not False))?',
            options: ['True', 'False', 'None', 'Error'],
            correct: 0,
            hint: 'not False is True. True and True yields True.',
            xpValue: 40,
            wrongPenalty: 5
          },
          {
            id: 'c_m2_1_2',
            type: 'fill_blank',
            question: 'Fill in the operator to make this evaluate to True:',
            code: 'val = (5 > 10) _____ (3 == 3)',
            blanks: ['or'],
            hint: 'Since the first part (5 > 10) is False, we need an operator that returns True if the second part is True.',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm2_2',
        title: 'Conditionals',
        badge: null,
        xpReward: 100,
        briefing: {
          lines: [
            "Conditionals allow decisions using if, elif, and else statements.",
            "Only the first branch that evaluates to True is executed.",
            "Indentation is syntactically enforced to mark block scopes.",
            "Let's trace standard conditional logic."
          ],
          codeExample: `marks = 75\nif marks >= 90:\n    grade = "A"\nelif marks >= 60:\n    grade = "B"\nelse:\n    grade = "F"`,
          traceSteps: [
            {
              step: 1,
              code: 'marks = 75',
              variables: [
                { id: 'marks', value: '75', type: 'int' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'if marks >= 90 (False) -> elif marks >= 60 (True)',
              variables: [
                { id: 'marks', value: '75', type: 'int' },
                { id: 'grade', value: '"B"', type: 'str' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m2_2_1',
            type: 'fill_blank',
            question: 'Complete the condition to print "Fail" if marks are less than 40:',
            code: 'marks = float(input())\nif marks _____ 40:\n    print("Fail")',
            blanks: ['<'],
            hint: 'Use the less-than operator.',
            xpValue: 50,
            wrongPenalty: 5
          },
          {
            id: 'c_m2_2_2',
            type: 'trace',
            question: 'What does this code print?',
            code: 'x = 10\nif x % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")',
            correctAnswer: 'Even',
            hint: '10 divided by 2 has a remainder of 0.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm2_3',
        title: 'Fibonacci Sequence',
        badge: 'fibonacci_pilgrim',
        xpReward: 160,
        briefing: {
          lines: [
            "Let's implement VTU Lab Experiment A2a: Recursive Fibonacci.",
            "Fibonacci series: 0, 1, 1, 2, 3, 5, 8, 13...",
            "Formula: fib(n) = fib(n - 1) + fib(n - 2).",
            "Base Case: fib(0) = 0, fib(1) = 1.",
            "Let's trace how recursion evaluates fib(4)."
          ],
          codeExample: `def fib(n):\n    if n <= 0:\n        return 0\n    elif n == 1:\n        return 1\n    return fib(n - 1) + fib(n - 2)\n\nres = fib(4)`,
          traceSteps: [
            {
              step: 1,
              code: 'res = fib(4)',
              variables: [
                { id: 'fib', value: '[function fib]', type: 'func' },
                { id: 'call_1', value: 'fib(4)', type: 'func' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'fib(4) calls fib(3) and fib(2)',
              variables: [
                { id: 'fib', value: '[function fib]', type: 'func' },
                { id: 'call_1', value: 'fib(4)', type: 'func' },
                { id: 'call_2', value: 'fib(3)', type: 'func' },
                { id: 'call_3', value: 'fib(2)', type: 'func' }
              ],
              edges: [
                { id: 'e1', source: 'call_1', target: 'call_2', label: 'calls' },
                { id: 'e2', source: 'call_1', target: 'call_3', label: 'calls' }
              ]
            },
            {
              step: 3,
              code: 'fib(3) calls fib(2) and fib(1)',
              variables: [
                { id: 'fib', value: '[function fib]', type: 'func' },
                { id: 'call_1', value: 'fib(4)', type: 'func' },
                { id: 'call_2', value: 'fib(3)', type: 'func' },
                { id: 'call_3', value: 'fib(2)', type: 'func' },
                { id: 'call_4', value: 'fib(1)', type: 'func' }
              ],
              edges: [
                { id: 'e3', source: 'call_2', target: 'call_4', label: 'calls' }
              ]
            },
            {
              step: 4,
              code: 'Resolving base cases and summing up',
              variables: [
                { id: 'fib', value: '[function fib]', type: 'func' },
                { id: 'res', value: '3', type: 'int' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m2_3_1',
            type: 'fill_blank',
            question: 'Fill in the blanks to complete the recursive Fibonacci function:',
            code: 'def fib(n):\n    if n <= 0:\n        return 0\n    elif n == 1:\n        return _____\n    else:\n        return fib(_____) + fib(n - 2)',
            blanks: ['1', 'n - 1'],
            hint: 'The second base case (n==1) returns 1, and the recursive call combines n-1 and n-2.',
            xpValue: 60,
            wrongPenalty: 10
          },
          {
            id: 'c_m2_3_2',
            type: 'trace',
            question: 'What is the return value of fib(5)?',
            code: 'print(fib(5))',
            correctAnswer: '5',
            hint: 'The sequence is: 0 (0th), 1 (1st), 1 (2nd), 2 (3rd), 3 (4th), 5 (5th).',
            xpValue: 50,
            wrongPenalty: 5
          },
          {
            id: 'c_m2_3_3',
            type: 'scenario',
            question: 'Why is recursive Fibonacci not recommended for large n?',
            options: ['It causes compiler errors', 'It does not support floating numbers', 'It repeats the same calculations multiple times, causing huge overhead', 'It is syntactically invalid in newer versions'],
            correct: 2,
            hint: 'Calculating fib(5) computes fib(3) twice, fib(2) multiple times. Time complexity grows exponentially.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm2_4',
        title: 'While Loops & Break',
        badge: null,
        xpReward: 100,
        briefing: {
          lines: [
            "A while loop repeats code as long as a condition is True.",
            "Use break to exit the loop immediately, bypassing conditions.",
            "Use continue to skip the rest of the current iteration and jump to the next loop check.",
            "Let's trace a while loop with a break condition."
          ],
          codeExample: `count = 1\nwhile True:\n    if count > 3:\n        break\n    print(count)\n    count += 1`,
          traceSteps: [
            {
              step: 1,
              code: 'count = 1',
              variables: [
                { id: 'count', value: '1', type: 'int' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'Iteration 1: prints 1, increments count',
              variables: [
                { id: 'count', value: '2', type: 'int' },
                { id: 'stdout', value: '1', type: 'str' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 'Iteration 2 & 3: prints 2, 3, increment count to 4',
              variables: [
                { id: 'count', value: '4', type: 'int' },
                { id: 'stdout', value: '3', type: 'str' }
              ],
              edges: []
            },
            {
              step: 4,
              code: 'count > 3 is True -> breaks out of loop',
              variables: [
                { id: 'count', value: '4', type: 'int' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m2_4_1',
            type: 'trace',
            question: 'How many times will this loop print "Python"?',
            code: 'i = 0\nwhile i < 3:\n    print("Python")\n    i += 1',
            correctAnswer: '3',
            hint: 'i starts at 0, goes to 1, 2, and stops when i becomes 3.',
            xpValue: 50,
            wrongPenalty: 5
          },
          {
            id: 'c_m2_4_2',
            type: 'fix_bug',
            question: 'Fix the infinite loop by adding a break condition when count reaches 5:',
            code: 'count = 0\nwhile True:\n    count += 1\n    # Insert break condition here\n    if count == 5:\n        continue',
            buggyLine: '        continue',
            correctLine: '        break',
            hint: 'Use the keyword that completely escapes the closest loop.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm2_5',
        title: 'String Operations',
        badge: null,
        xpReward: 100,
        briefing: {
          lines: [
            "Strings are indexable. Indices start at 0.",
            "Negative indices access characters from the end (-1 is the last character).",
            "Slicing fetches substrings with syntax: string[start:stop:step].",
            "Let's trace string index slicing."
          ],
          codeExample: `text = "Pythonia"\ns1 = text[0:3]\ns2 = text[-3:]`,
          traceSteps: [
            {
              step: 1,
              code: 'text = "Pythonia"',
              variables: [
                { id: 'text', value: '"Pythonia"', type: 'str' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 's1 = text[0:3] -> "Pyt"',
              variables: [
                { id: 'text', value: '"Pythonia"', type: 'str' },
                { id: 's1', value: '"Pyt"', type: 'str' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 's2 = text[-3:] -> "nia"',
              variables: [
                { id: 'text', value: '"Pythonia"', type: 'str' },
                { id: 's1', value: '"Pyt"', type: 'str' },
                { id: 's2', value: '"nia"', type: 'str' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m2_5_1',
            type: 'trace',
            question: 'What is the output of print("Python"[1:4])?',
            code: 'print("Python"[1:4])',
            correctAnswer: 'yth',
            hint: 'Index starts at 1 ("y") and ends before 4 ("y" is 1, "t" is 2, "h" is 3).',
            xpValue: 50,
            wrongPenalty: 5
          },
          {
            id: 'c_m2_5_2',
            type: 'fill_blank',
            question: 'Fill in the blanks to reverse the string s:',
            code: 's = "Hello"\nrev = s[_____:_____:_____]',
            blanks: ['', '', '-1'],
            hint: 'Use a step size of -1 to slice backwards from start to finish.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm2_6',
        title: 'String Methods',
        badge: null,
        xpReward: 80,
        briefing: {
          lines: [
            "Strings have built-in methods: upper(), lower(), strip(), find(), replace().",
            "Strings are immutable! String methods do not modify the original string; they return a new one.",
            "Let's trace these string transformations."
          ],
          codeExample: `raw = "  hello  "\nclean = raw.strip()\nbig = clean.upper()\nfinal = big.replace("H", "Y")`,
          traceSteps: [
            {
              step: 1,
              code: 'raw = "  hello  "',
              variables: [
                { id: 'raw', value: '"  hello  "', type: 'str' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'clean = raw.strip()',
              variables: [
                { id: 'raw', value: '"  hello  "', type: 'str' },
                { id: 'clean', value: '"hello"', type: 'str' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 'final = big.replace("H", "Y")',
              variables: [
                { id: 'clean', value: '"hello"', type: 'str' },
                { id: 'big', value: '"HELLO"', type: 'str' },
                { id: 'final', value: '"YELLO"', type: 'str' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m2_6_1',
            type: 'mcq',
            question: 'Which method removes leading and trailing whitespaces from a string?',
            options: ['.trim()', '.strip()', '.clean()', '.cut()'],
            correct: 1,
            hint: 'In Python, the method is named after scraping or stripping off edges.',
            xpValue: 40,
            wrongPenalty: 5
          },
          {
            id: 'c_m2_6_2',
            type: 'trace',
            question: 'What is the output of print("banana".count("a"))?',
            code: 'print("banana".count("a"))',
            correctAnswer: '3',
            hint: 'Count the occurrences of "a" in "banana".',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm2_7',
        title: 'Digit Frequency',
        badge: null,
        xpReward: 160,
        briefing: {
          lines: [
            "Let's implement VTU Lab Experiment B1: Frequency of digits in a number.",
            "We read a number as a string, then count occurrences of each digit (0-9).",
            "We can use a list or dictionary as a counter, iterating over the string.",
            "Let's trace counting digits for value 1221."
          ],
          codeExample: `num_str = "1221"\ncounts = {}\nfor char in num_str:\n    counts[char] = counts.get(char, 0) + 1`,
          traceSteps: [
            {
              step: 1,
              code: 'num_str = "1221"; counts = {}',
              variables: [
                { id: 'num_str', value: '"1221"', type: 'str' },
                { id: 'counts', value: '{}', type: 'dict' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'Processing index 0 ("1") and 1 ("2")',
              variables: [
                { id: 'counts', value: '{"1": 1, "2": 1}', type: 'dict' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 'Processing index 2 ("2") and 3 ("1")',
              variables: [
                { id: 'counts', value: '{"1": 2, "2": 2}', type: 'dict' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m2_7_1',
            type: 'fill_blank',
            question: 'Complete the dictionary counter increment loop:',
            code: 'val = "45544"\nfreq = {}\nfor digit in val:\n    freq[digit] = freq._____(digit, 0) + 1',
            blanks: ['get'],
            hint: 'Use the safe dictionary lookup method that returns a default value of 0 if the key is missing.',
            xpValue: 60,
            wrongPenalty: 10
          },
          {
            id: 'c_m2_7_2',
            type: 'order',
            question: 'Arrange the steps to check if a digit "5" appears in the string representation of a number:',
            steps: [
              { id: 's1', text: 'num = 15309' },
              { id: 's2', text: 'num_str = str(num)' },
              { id: 's3', text: 'if "5" in num_str:' },
              { id: 's4', text: '    print("Found!")' }
            ],
            correctOrder: ['s1', 's2', 's3', 's4'],
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm2_8',
        title: 'Recursion Deep Dive',
        badge: null,
        xpReward: 120,
        briefing: {
          lines: [
            "Recursion is when a function calls itself.",
            "Every recursive function MUST have a base case to terminate, or it crashes with a RecursionError.",
            "Let's trace what happens when we sum numbers from n down to 1 recursively."
          ],
          codeExample: `def rec_sum(n):\n    if n == 1:\n        return 1\n    return n + rec_sum(n - 1)\n\nres = rec_sum(3)`,
          traceSteps: [
            {
              step: 1,
              code: 'res = rec_sum(3)',
              variables: [
                { id: 'call_1', value: 'rec_sum(3)', type: 'func' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'rec_sum(3) calls rec_sum(2)',
              variables: [
                { id: 'call_1', value: 'rec_sum(3)', type: 'func' },
                { id: 'call_2', value: 'rec_sum(2)', type: 'func' }
              ],
              edges: [{ id: 'e1', source: 'call_1', target: 'call_2', label: 'calls' }]
            },
            {
              step: 3,
              code: 'rec_sum(2) calls rec_sum(1)',
              variables: [
                { id: 'call_1', value: 'rec_sum(3)', type: 'func' },
                { id: 'call_2', value: 'rec_sum(2)', type: 'func' },
                { id: 'call_3', value: 'rec_sum(1)', type: 'func' }
              ],
              edges: [{ id: 'e2', source: 'call_2', target: 'call_3', label: 'calls' }]
            },
            {
              step: 4,
              code: 'rec_sum(1) returns 1 -> resolves calls to return 6',
              variables: [
                { id: 'res', value: '6', type: 'int' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m2_8_1',
            type: 'mcq',
            question: 'What happens if a recursive function does not have a base case?',
            options: ['It runs forever in standard execution', 'It triggers a RecursionError (Maximum recursion depth exceeded)', 'It compiles successfully but returns None', 'Python automatically creates a base case'],
            correct: 1,
            hint: 'Python limits maximum recursive call stack size to protect against memory depletion.',
            xpValue: 40,
            wrongPenalty: 5
          },
          {
            id: 'c_m2_8_2',
            type: 'trace',
            question: 'What is the output of print(rec_sum(4))?',
            code: 'print(rec_sum(4))',
            correctAnswer: '10',
            hint: '4 + 3 + 2 + 1 = 10.',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      }
    ]
  },
  {
    id: 'm3',
    title: 'Lists & Dictionaries',
    icon: '📊',
    xpPool: 900,
    difficulty: 3,
    prerequisite: 'm2',
    missions: [
      {
        id: 'm3_1',
        title: 'Lists Fundamentals',
        badge: null,
        xpReward: 100,
        briefing: {
          lines: [
            "Lists are ordered, mutable sequences of items wrapped in square brackets.",
            "Items can be accessed by 0-based indices and can be of mixed data types.",
            "Lists are mutable, meaning their elements can be modified in place.",
            "Let's trace basic list creation and mutations."
          ],
          codeExample: `lst = [10, 20, 30]\nlst[1] = 99\nlst.append(40)`,
          traceSteps: [
            {
              step: 1,
              code: 'lst = [10, 20, 30]',
              variables: [
                { id: 'lst', value: '[10, 20, 30]', type: 'list' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'lst[1] = 99',
              variables: [
                { id: 'lst', value: '[10, 99, 30]', type: 'list' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 'lst.append(40)',
              variables: [
                { id: 'lst', value: '[10, 99, 30, 40]', type: 'list' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m3_1_1',
            type: 'trace',
            question: 'What is printed by this code?',
            code: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits[-1])',
            correctAnswer: 'cherry',
            hint: 'Negative index -1 references the last element in the sequence.',
            xpValue: 50,
            wrongPenalty: 5
          },
          {
            id: 'c_m3_1_2',
            type: 'fill_blank',
            question: 'Complete the statement to add the number 5 to the end of my_list:',
            code: 'my_list = [1, 2, 3, 4]\nmy_list._____(5)',
            blanks: ['append'],
            hint: 'Use the list method that appends an item.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm3_2',
        title: 'List Methods & Slicing',
        badge: null,
        xpReward: 100,
        briefing: {
          lines: [
            "Lists have rich methods: insert(), remove(), pop(), sort(), reverse().",
            "List slicing works like string slicing: list[start:stop:step].",
            "Let's trace some sorting and slicing operations."
          ],
          codeExample: `nums = [3, 1, 4, 1, 5]\nnums.sort()\nsub = nums[1:4]\nnums.pop()`,
          traceSteps: [
            {
              step: 1,
              code: 'nums = [3, 1, 4, 1, 5]',
              variables: [
                { id: 'nums', value: '[3, 1, 4, 1, 5]', type: 'list' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'nums.sort()',
              variables: [
                { id: 'nums', value: '[1, 1, 3, 4, 5]', type: 'list' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 'sub = nums[1:4] -> [1, 3, 4]',
              variables: [
                { id: 'nums', value: '[1, 1, 3, 4, 5]', type: 'list' },
                { id: 'sub', value: '[1, 3, 4]', type: 'list' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m3_2_1',
            type: 'trace',
            question: 'What is the output of print(lst) after running pop()?',
            code: 'lst = [10, 20, 30]\nlst.pop()\nprint(lst)',
            correctAnswer: '[10, 20]',
            hint: 'pop() removes and returns the last element in the list.',
            xpValue: 50,
            wrongPenalty: 5
          },
          {
            id: 'c_m3_2_2',
            type: 'mcq',
            question: 'What is the difference between list.sort() and sorted(list)?',
            options: ['They are exactly identical.', 'list.sort() sorts in place; sorted(list) returns a new sorted list.', 'sorted(list) sorts in place; list.sort() returns a new list.', 'list.sort() only works on numbers.'],
            correct: 1,
            hint: 'Methods modify the object directly. Functions return modified copies.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm3_3',
        title: 'Stats Calculator',
        badge: 'stats_sorcerer',
        xpReward: 160,
        briefing: {
          lines: [
            "Let's implement VTU Lab Experiment B2: Mean, Variance, and Standard Deviation of a list.",
            "Mean = sum(x) / N.",
            "Variance = sum((x - mean) ** 2) / N.",
            "Standard Deviation = square root of Variance.",
            "Let's trace computing the mean of [2, 4, 4, 4, 6] (which is 4)."
          ],
          codeExample: `nums = [2, 4, 4, 4, 6]\nmean = sum(nums) / len(nums)\nvar = sum((x - mean)**2 for x in nums) / len(nums)\nstd = var ** 0.5`,
          traceSteps: [
            {
              step: 1,
              code: 'nums = [2, 4, 4, 4, 6]',
              variables: [
                { id: 'nums', value: '[2, 4, 4, 4, 6]', type: 'list' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'mean = sum(nums) / len(nums) -> 20 / 5 = 4.0',
              variables: [
                { id: 'nums', value: '[2, 4, 4, 4, 6]', type: 'list' },
                { id: 'mean', value: '4.0', type: 'float' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 'var = sum((x-4.0)**2 for x in nums) / 5 -> 8.0 / 5 = 1.6',
              variables: [
                { id: 'nums', value: '[2, 4, 4, 4, 6]', type: 'list' },
                { id: 'mean', value: '4.0', type: 'float' },
                { id: 'var', value: '1.6', type: 'float' }
              ],
              edges: []
            },
            {
              step: 4,
              code: 'std = 1.6 ** 0.5 -> 1.26',
              variables: [
                { id: 'mean', value: '4.0', type: 'float' },
                { id: 'var', value: '1.6', type: 'float' },
                { id: 'std', value: '1.2649', type: 'float' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m3_3_1',
            type: 'fill_blank',
            question: 'Fill in the blanks to compute the mean and standard deviation:',
            code: 'my_list = [10, 20, 30]\nmean = sum(my_list) / _____(my_list)\nstd = (sum((x - mean) ** 2 for x in my_list) / len(my_list)) ** _____',
            blanks: ['len', '0.5'],
            hint: 'Divide by list length, and take the square root by raising to power 0.5.',
            xpValue: 60,
            wrongPenalty: 10
          },
          {
            id: 'c_m3_3_2',
            type: 'fix_bug',
            question: 'Fix the bug where variance calculation causes a division by zero if list is empty:',
            code: 'def variance(lst):\n    # Fix this line to return 0 if the list is empty\n    if len(lst) >= 0:\n        return 0\n    mean = sum(lst) / len(lst)\n    return sum((x - mean)**2 for x in lst) / len(lst)',
            buggyLine: '    if len(lst) >= 0:',
            correctLine: '    if len(lst) == 0:',
            hint: 'We must check if the list length is exactly zero to prevent division by zero.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm3_4',
        title: 'Dictionary Basics',
        badge: null,
        xpReward: 100,
        briefing: {
          lines: [
            "Dictionaries store data as key-value pairs wrapped in curly braces.",
            "Keys must be unique and immutable (like strings, numbers, or tuples).",
            "Values can be anything. Look up items with dict[key] or dict.get(key, default).",
            "Let's trace basic dictionary operations."
          ],
          codeExample: `student = {"name": "Yathin", "age": 19}\nstudent["age"] = 20\nstudent["city"] = "Mysuru"\nval = student.get("usn", "N/A")`,
          traceSteps: [
            {
              step: 1,
              code: 'student = {"name": "Yathin", "age": 19}',
              variables: [
                { id: 'student', value: '{"name": "Yathin", "age": 19}', type: 'dict' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'student["city"] = "Mysuru"',
              variables: [
                { id: 'student', value: '{"name": "Yathin", "age": 20, "city": "Mysuru"}', type: 'dict' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m3_4_1',
            type: 'mcq',
            question: 'What does student.get("USN", "000") return if "USN" is not in student?',
            options: ['None', 'Error', '"000"', 'False'],
            correct: 2,
            hint: 'The .get() method returns the specified second parameter if the key doesn\'t exist.',
            xpValue: 50,
            wrongPenalty: 5
          },
          {
            id: 'c_m3_4_2',
            type: 'trace',
            question: 'What is the output of print("a" in {"a": 1, "b": 2})?',
            code: 'print("a" in {"a": 1, "b": 2})',
            correctAnswer: 'True',
            hint: 'The "in" operator checks if a key exists in a dictionary.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm3_5',
        title: 'Sort Dictionary by Key',
        badge: 'dict_keeper',
        xpReward: 140,
        briefing: {
          lines: [
            "Let's implement VTU Lab Experiment B3: Sort a dictionary by keys.",
            "Although standard dicts are ordered by insertion, we often need to sort them.",
            "We extract keys using my_dict.keys(), sort them, and reconstruct the dictionary.",
            "Let's trace dictionary sorting by keys."
          ],
          codeExample: `d = {"z": 10, "a": 5}\nsorted_keys = sorted(d.keys())\nsorted_d = {k: d[k] for k in sorted_keys}`,
          traceSteps: [
            {
              step: 1,
              code: 'd = {"z": 10, "a": 5}',
              variables: [
                { id: 'd', value: '{"z": 10, "a": 5}', type: 'dict' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'sorted_keys = sorted(d.keys()) -> ["a", "z"]',
              variables: [
                { id: 'd', value: '{"z": 10, "a": 5}', type: 'dict' },
                { id: 'sorted_keys', value: '["a", "z"]', type: 'list' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 'sorted_d = {...}',
              variables: [
                { id: 'sorted_d', value: '{"a": 5, "z": 10}', type: 'dict' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m3_5_1',
            type: 'fill_blank',
            question: 'Complete the statement to sort the keys of a dictionary d:',
            code: 'd = {"c": 3, "a": 1, "b": 2}\nfor key in _____(d.keys()):\n    print(key, d[key])',
            blanks: ['sorted'],
            hint: 'Use the built-in function that returns a new sorted list.',
            xpValue: 50,
            wrongPenalty: 5
          },
          {
            id: 'c_m3_5_2',
            type: 'mcq',
            question: 'How do you extract all key-value tuples from a dictionary?',
            options: ['d.keys()', 'd.values()', 'd.items()', 'd.tuples()'],
            correct: 2,
            hint: 'This method yields (key, value) pairs.',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm3_6',
        title: 'Word Length Grouper',
        badge: 'dict_keeper',
        xpReward: 160,
        briefing: {
          lines: [
            "Let's implement VTU Lab Experiment B5: Group list words by length.",
            "Given words, group them in a dictionary where key = length, value = list of words.",
            "Example: ['apple', 'cat', 'dog'] -> {3: ['cat', 'dog'], 5: ['apple']}.",
            "Let's trace grouping ['go', 'hi', 'run'] by length."
          ],
          codeExample: `words = ["go", "hi", "run"]\ngroups = {}\nfor w in words:\n    L = len(w)\n    if L not in groups:\n        groups[L] = []\n    groups[L].append(w)`,
          traceSteps: [
            {
              step: 1,
              code: 'words = ["go", "hi", "run"]; groups = {}',
              variables: [
                { id: 'words', value: '["go", "hi", "run"]', type: 'list' },
                { id: 'groups', value: '{}', type: 'dict' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'Processing "go" (L=2) and "hi" (L=2)',
              variables: [
                { id: 'groups', value: '{2: ["go", "hi"]}', type: 'dict' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 'Processing "run" (L=3)',
              variables: [
                { id: 'groups', value: '{2: ["go", "hi"], 3: ["run"]}', type: 'dict' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m3_6_1',
            type: 'fill_blank',
            question: 'Complete the grouping logic below:',
            code: 'words = ["hello", "world"]\ngroup = {}\nfor w in words:\n    length = len(w)\n    if length not in group:\n        group[length] = _____\n    group[length].append(w)',
            blanks: ['[]'],
            hint: 'Initialize the value of a newly discovered key to an empty list.',
            xpValue: 60,
            wrongPenalty: 10
          },
          {
            id: 'c_m3_6_2',
            type: 'scenario',
            question: 'Which dictionary pattern is best suited for word groupings by length?',
            options: ['Key = word, Value = length', 'Key = length, Value = list of words', 'Key = index, Value = word', 'Lists cannot be stored inside dictionaries'],
            correct: 1,
            hint: 'We want to group multiple words together under a single integer length key.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm3_7',
        title: 'Aliasing & Mutability',
        badge: null,
        xpReward: 80,
        briefing: {
          lines: [
            "When two variables refer to the same mutable object (like a list), they are aliases.",
            "Modifying the object through one alias changes it for the other too!",
            "To prevent this, make a copy of the list instead of copying the reference.",
            "Let's trace this aliasing bug."
          ],
          codeExample: `a = [1, 2, 3]\nb = a\nc = a.copy()\nb.append(4)`,
          traceSteps: [
            {
              step: 1,
              code: 'a = [1, 2, 3]',
              variables: [
                { id: 'a', value: '[1, 2, 3]', type: 'list' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'b = a; c = a.copy()',
              variables: [
                { id: 'a', value: '[1, 2, 3]', type: 'list' },
                { id: 'b', value: '[1, 2, 3]', type: 'list' },
                { id: 'c', value: '[1, 2, 3]', type: 'list' }
              ],
              edges: [
                { id: 'e1', source: 'a', target: 'b', label: 'alias' }
              ]
            },
            {
              step: 3,
              code: 'b.append(4)',
              variables: [
                { id: 'a', value: '[1, 2, 3, 4]', type: 'list' },
                { id: 'b', value: '[1, 2, 3, 4]', type: 'list' },
                { id: 'c', value: '[1, 2, 3]', type: 'list' }
              ],
              edges: [
                { id: 'e2', source: 'a', target: 'b', label: 'alias' }
              ]
            }
          ]
        },
        challenges: [
          {
            id: 'c_m3_7_1',
            type: 'trace',
            question: 'What is the value of list "a" after this code runs?',
            code: 'a = [1, 2]\nb = a\nb.append(3)\nprint(a)',
            correctAnswer: '[1, 2, 3]',
            hint: 'Since b is an alias of a, appending to b directly alters a.',
            xpValue: 40,
            wrongPenalty: 5
          },
          {
            id: 'c_m3_7_2',
            type: 'mcq',
            question: 'How do you create a shallow copy of list "lst" to prevent aliasing?',
            options: ['new_lst = lst', 'new_lst = lst.copy()', 'new_lst = duplicate(lst)', 'new_lst = lst[:]'],
            correct: 1,
            hint: 'Use the built-in list method designed to copy objects, or slice with [:]. Both are correct, but option 1 (lst.copy()) is the official method.',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm3_8',
        title: 'Reverse Lookup & Memos',
        badge: null,
        xpReward: 60,
        briefing: {
          lines: [
            "Given a value, finding the corresponding key is a reverse lookup.",
            "Unlike forward lookup (constant time), reverse lookup requires scanning the entire dictionary.",
            "Let's trace a reverse lookup function."
          ],
          codeExample: `def rev_lookup(d, v):\n    for k in d:\n        if d[k] == v:\n            return k\n    return None\n\nres = rev_lookup({"x": 10, "y": 20}, 20)`,
          traceSteps: [
            {
              step: 1,
              code: 'res = rev_lookup(...)',
              variables: [
                { id: 'd', value: '{"x": 10, "y": 20}', type: 'dict' },
                { id: 'v', value: '20', type: 'int' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'Check k="x" (d["x"]=10 != 20) -> Check k="y" (d["y"]=20 == 20)',
              variables: [
                { id: 'k', value: '"y"', type: 'str' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 'returns "y"',
              variables: [
                { id: 'res', value: '"y"', type: 'str' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m3_8_1',
            type: 'fill_blank',
            question: 'Complete the lookup condition:',
            code: 'def find_key(d, val):\n    for k, v in d._____():\n        if v == val:\n            return k',
            blanks: ['items'],
            hint: 'We must unpack both key and value, so we use items().',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      }
    ]
  },
  {
    id: 'm4',
    title: 'Tuples, Files & Exceptions',
    icon: '📁',
    xpPool: 900,
    difficulty: 4,
    prerequisite: 'm3',
    missions: [
      {
        id: 'm4_1',
        title: 'Tuples',
        badge: null,
        xpReward: 80,
        briefing: {
          lines: [
            "Tuples are ordered, immutable sequences of values wrapped in parentheses.",
            "Once created, you cannot modify, add, or remove their elements.",
            "They support tuple assignment: unpacking variables in a single line.",
            "Let's trace tuple variable packing and unpacking."
          ],
          codeExample: `point = (10, 20)\nx, y = point\n# Swapping variables using tuples\nx, y = y, x`,
          traceSteps: [
            {
              step: 1,
              code: 'point = (10, 20)',
              variables: [
                { id: 'point', value: '(10, 20)', type: 'tuple' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'x, y = point',
              variables: [
                { id: 'x', value: '10', type: 'int' },
                { id: 'y', value: '20', type: 'int' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 'x, y = y, x',
              variables: [
                { id: 'x', value: '20', type: 'int' },
                { id: 'y', value: '10', type: 'int' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m4_1_1',
            type: 'mcq',
            question: 'Which of the following is correct about tuples?',
            options: ['Tuples are mutable and created with square brackets []', 'Tuples are immutable and created with parentheses ()', 'Tuples do not support indexing', 'Tuples are identical to sets'],
            correct: 1,
            hint: 'Tuples cannot be altered after creation.',
            xpValue: 40,
            wrongPenalty: 5
          },
          {
            id: 'c_m4_1_2',
            type: 'trace',
            question: 'What is the output of print(len((1, 2, (3, 4))))?',
            code: 'print(len((1, 2, (3, 4))))',
            correctAnswer: '3',
            hint: 'The elements are 1, 2, and the nested tuple (3, 4).',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm4_2',
        title: 'File Handling Basics',
        badge: null,
        xpReward: 100,
        briefing: {
          lines: [
            "We handle files using the open() function.",
            "Modes: 'r' (read), 'w' (write - overwrites file), 'a' (append).",
            "Always close files using file.close() or use the with statement to close automatically.",
            "Let's trace basic file writing and reading."
          ],
          codeExample: `with open("out.txt", "w") as f:\n    f.write("Line 1\\n")\n    f.write("Line 2\\n")`,
          traceSteps: [
            {
              step: 1,
              code: 'open("out.txt", "w")',
              variables: [
                { id: 'f', value: '[File: out.txt, mode w]', type: 'file' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'f.write("Line 1\\n")',
              variables: [
                { id: 'f', value: '[File: out.txt, mode w]', type: 'file' },
                { id: 'filesystem', value: '"Line 1\\n"', type: 'str' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m4_2_1',
            type: 'fix_bug',
            question: 'Fix the bug where writing is attempted on a file opened in read mode:',
            code: 'f = open("data.txt", "r")\nf.write("New data")\nf.close()',
            buggyLine: 'f = open("data.txt", "r")',
            correctLine: 'f = open("data.txt", "w")',
            hint: 'To write data, open the file in write ("w") or append ("a") mode.',
            xpValue: 50,
            wrongPenalty: 5
          },
          {
            id: 'c_m4_2_2',
            type: 'mcq',
            question: 'What is the primary benefit of using the "with" statement for files?',
            options: ['It speeds up execution', 'It automatically closes the file, even if exceptions occur', 'It encrypts the file', 'It creates files on Vercel'],
            correct: 1,
            hint: 'with creates a context manager that ensures resource cleanup.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm4_3',
        title: 'Even Numbers to File',
        badge: 'file_whisperer',
        xpReward: 140,
        briefing: {
          lines: [
            "Let's implement VTU Lab Experiment B4: Write even numbers to a file.",
            "We read integer inputs from the user, filter the even ones, and write them to a file.",
            "Then, we read the file back to verify the contents.",
            "Let's trace writing [2, 4] to a file."
          ],
          codeExample: `nums = [1, 2, 3, 4]\nwith open("evens.txt", "w") as f:\n    for n in nums:\n        if n % 2 == 0:\n            f.write(str(n) + "\\n")`,
          traceSteps: [
            {
              step: 1,
              code: 'nums = [1, 2, 3, 4]',
              variables: [
                { id: 'nums', value: '[1, 2, 3, 4]', type: 'list' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'Loop checks 1 (odd) -> 2 (even) -> writes "2\\n"',
              variables: [
                { id: 'n', value: '2', type: 'int' },
                { id: 'filesystem', value: '"2\\n"', type: 'str' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 'Loop checks 3 (odd) -> 4 (even) -> writes "4\\n"',
              variables: [
                { id: 'n', value: '4', type: 'int' },
                { id: 'filesystem', value: '"2\\n4\\n"', type: 'str' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m4_3_1',
            type: 'fill_blank',
            question: 'Complete the loop to write even numbers to the file f:',
            code: 'for val in [10, 15, 20]:\n    if val % 2 _____ 0:\n        f.write(_____(val) + "\\n")',
            blanks: ['==', 'str'],
            hint: 'Check remainder is zero, and cast the integer to a string before writing.',
            xpValue: 50,
            wrongPenalty: 5
          },
          {
            id: 'c_m4_3_2',
            type: 'order',
            question: 'Arrange the statements in correct order to write evens to a file:',
            steps: [
              { id: 's1', text: 'f = open("even.txt", "w")' },
              { id: 's2', text: 'for x in [2, 5, 8]:' },
              { id: 's3', text: '    if x % 2 == 0: f.write(str(x) + "\\n")' },
              { id: 's4', text: 'f.close()' }
            ],
            correctOrder: ['s1', 's2', 's3', 's4'],
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm4_4',
        title: 'Char Frequency in File',
        badge: 'file_whisperer',
        xpReward: 160,
        briefing: {
          lines: [
            "Let's implement VTU Lab Experiment C1: Count character frequencies in a text file.",
            "We open a file in read mode, read all characters, and count them in a dictionary.",
            "Let's trace counting characters in a file containing 'abb'."
          ],
          codeExample: `with open("txt.txt", "r") as f:\n    text = f.read()\ncounts = {}\nfor char in text:\n    counts[char] = counts.get(char, 0) + 1`,
          traceSteps: [
            {
              step: 1,
              code: 'text = f.read() -> "abb"',
              variables: [
                { id: 'text', value: '"abb"', type: 'str' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'Processing char frequencies',
              variables: [
                { id: 'counts', value: '{"a": 1, "b": 2}', type: 'dict' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m4_4_1',
            type: 'fill_blank',
            question: 'Complete the statement to read the entire content of file f:',
            code: 'with open("data.txt", "r") as f:\n    content = f._____()',
            blanks: ['read'],
            hint: 'Use the file object method that returns the complete content as a single string.',
            xpValue: 60,
            wrongPenalty: 10
          },
          {
            id: 'c_m4_4_2',
            type: 'scenario',
            question: 'You want to check how many lines (not characters) are in a file. What is the best method?',
            options: ['Use f.read() and count characters', 'Use f.readlines() which returns a list of lines, and take its len()', 'Open in append mode', 'Files do not support line calculations'],
            correct: 1,
            hint: 'readlines() splits the file by newline characters.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm4_5',
        title: 'Exception Handling',
        badge: null,
        xpReward: 120,
        briefing: {
          lines: [
            "Exceptions are runtime errors that halt program execution.",
            "Wrap risky code in try blocks, and handle exceptions in except blocks.",
            "An optional finally block executes no matter what.",
            "Let's trace handling a division-by-zero error."
          ],
          codeExample: `try:\n    res = 10 / 0\nexcept ZeroDivisionError:\n    res = None\nfinally:\n    print("Done")`,
          traceSteps: [
            {
              step: 1,
              code: '10 / 0 triggers ZeroDivisionError',
              variables: []
            },
            {
              step: 2,
              code: 'Switched to except ZeroDivisionError block',
              variables: [
                { id: 'res', value: 'None', type: 'none' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 'finally block prints "Done"',
              variables: [
                { id: 'res', value: 'None', type: 'none' },
                { id: 'stdout', value: 'Done', type: 'str' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m4_5_1',
            type: 'fill_blank',
            question: 'Complete the block to catch specific division issues:',
            code: 'try:\n    val = 5 / x\n_____ ZeroDivisionError:\n    print("Cannot divide by zero!")',
            blanks: ['except'],
            hint: 'Which keyword defines the block that handles active exceptions?',
            xpValue: 40,
            wrongPenalty: 5
          },
          {
            id: 'c_m4_5_2',
            type: 'mcq',
            question: 'Which of the following triggers a ValueError in Python?',
            options: ['int("abc")', '10 / 0', 'my_list[999]', 'x = undefined_variable'],
            correct: 0,
            hint: 'ValueError is raised when a function receives an argument of correct type but inappropriate value (like trying to convert alphabets to integer).',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm4_6',
        title: 'DivExp Function',
        badge: 'exception_hunter',
        xpReward: 160,
        briefing: {
          lines: [
            "Let's implement VTU Lab Experiment B6: DivExp function.",
            "Write a function that divides two numbers and uses an assertion or try-except.",
            "Assertions test if conditions are true. If false, an AssertionError is raised.",
            "Let's trace DivExp checking constraints."
          ],
          codeExample: `def div_exp(a, b):\n    assert b != 0, "Divisor is zero!"\n    return a / b\n\nres = div_exp(10, 2)`,
          traceSteps: [
            {
              step: 1,
              code: 'div_exp(10, 2)',
              variables: [
                { id: 'a', value: '10', type: 'int' },
                { id: 'b', value: '2', type: 'int' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'assert b != 0 -> 2 != 0 is True -> returns 5.0',
              variables: [
                { id: 'res', value: '5.0', type: 'float' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m4_6_1',
            type: 'fill_blank',
            question: 'Fill in the blanks to raise a specific assertion if denominator is zero:',
            code: 'def div_exp(a, b):\n    _____ b != 0, "Denominator cannot be zero!"\n    return a / b',
            blanks: ['assert'],
            hint: 'Use the debugging statement keyword that enforces runtime checks.',
            xpValue: 60,
            wrongPenalty: 10
          },
          {
            id: 'c_m4_6_2',
            type: 'trace',
            question: 'What is printed if div_exp(5, 0) is called using the try-except wrapper?',
            code: 'try:\n    div_exp(5, 0)\nexcept AssertionError as e:\n    print(e)',
            correctAnswer: 'Denominator cannot be zero!',
            hint: 'The error message passed to the assertion is printed.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm4_7',
        title: 'Modules & Random',
        badge: null,
        xpReward: 80,
        briefing: {
          lines: [
            "A module is a file containing Python definitions and statements.",
            "Import modules using the import keyword.",
            "Python's standard library includes modules like math, random, and sys.",
            "Let's trace basic module functions."
          ],
          codeExample: `import random\nval = random.randint(1, 10)`,
          traceSteps: [
            {
              step: 1,
              code: 'import random',
              variables: [
                { id: 'random', value: '[Module random]', type: 'none' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m4_7_1',
            type: 'mcq',
            question: 'How do you import only the sqrt function from the math module?',
            options: ['import sqrt from math', 'from math import sqrt', 'import math.sqrt', 'load sqrt from math'],
            correct: 1,
            hint: 'Use the "from [module] import [entity]" syntax.',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm4_8',
        title: 'Pickling & Databases',
        badge: null,
        xpReward: 60,
        briefing: {
          lines: [
            "Pickling is the process of converting a Python object hierarchy into a byte stream.",
            "Unpickling is the inverse operation, converting a byte stream back into objects.",
            "This is useful for persisting data objects to files.",
            "Let's trace object pickling."
          ],
          codeExample: `import pickle\ndata = {"a": 100}\nbytes_data = pickle.dumps(data)`,
          traceSteps: [
            {
              step: 1,
              code: 'data = {"a": 100}',
              variables: [
                { id: 'data', value: '{"a": 100}', type: 'dict' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'bytes_data = pickle.dumps(data)',
              variables: [
                { id: 'data', value: '{"a": 100}', type: 'dict' },
                { id: 'bytes_data', value: 'b"\\x80\\x04..."', type: 'str' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m4_8_1',
            type: 'fill_blank',
            question: 'Complete the module import statement:',
            code: 'import _____\nlst = [1, 2, 3]\nserialized = pickle.dumps(lst)',
            blanks: ['pickle'],
            hint: 'Name the standard serialization module in Python.',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      }
    ]
  },
  {
    id: 'm5',
    title: 'Object-Oriented Programming',
    icon: '🏛️',
    xpPool: 1000,
    difficulty: 5,
    prerequisite: 'm4',
    missions: [
      {
        id: 'm5_1',
        title: 'Classes & Objects',
        badge: null,
        xpReward: 100,
        briefing: {
          lines: [
            "Object-Oriented Programming models real-world entities.",
            "A Class is a blueprint; an Object is an instance of that blueprint.",
            "Classes are defined using the class keyword.",
            "Let's trace instantiating an object of an empty Class."
          ],
          codeExample: `class Student:\n    pass\n\ns1 = Student()\ns1.name = "Yathin"`,
          traceSteps: [
            {
              step: 1,
              code: 'class Student...',
              variables: [
                { id: 'Student', value: '[Class Student]', type: 'func' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 's1 = Student()',
              variables: [
                { id: 'Student', value: '[Class Student]', type: 'func' },
                { id: 's1', value: '<Student object>', type: 'dict' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 's1.name = "Yathin"',
              variables: [
                { id: 'Student', value: '[Class Student]', type: 'func' },
                { id: 's1', value: '{name: "Yathin"}', type: 'dict' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m5_1_1',
            type: 'mcq',
            question: 'Which keyword is used to define a blueprint class in Python?',
            options: ['object', 'struct', 'def', 'class'],
            correct: 3,
            hint: 'It is a 5-letter keyword that denotes a category / structure.',
            xpValue: 40,
            wrongPenalty: 5
          },
          {
            id: 'c_m5_1_2',
            type: 'fill_blank',
            question: 'Complete the statement to instantiate an object "my_car" of class "Car":',
            code: 'class Car:\n    pass\n\nmy_car = _____()',
            blanks: ['Car'],
            hint: 'Call the class name like a function to create an instance.',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm5_2',
        title: 'Methods & __init__',
        badge: null,
        xpReward: 120,
        briefing: {
          lines: [
            "__init__ is Python's constructor method, which initializes object attributes.",
            "Methods are functions defined inside classes.",
            "All instance methods must accept self as their first parameter, representing the specific object instance.",
            "Let's trace object creation with initial state arguments."
          ],
          codeExample: `class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\np = Point(3, 4)`,
          traceSteps: [
            {
              step: 1,
              code: 'p = Point(3, 4)',
              variables: [
                { id: 'Point', value: '[Class Point]', type: 'func' }
              ],
              edges: []
            },
            {
              step: 2,
              code: '__init__ binds self.x = 3, self.y = 4',
              variables: [
                { id: 'p', value: '{x: 3, y: 4}', type: 'dict' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m5_2_1',
            type: 'fix_bug',
            question: 'Fix the constructor definition that is missing the essential "self" parameter:',
            code: 'class Student:\n    def __init__(name, age):\n        self.name = name\n        self.age = age',
            buggyLine: '    def __init__(name, age):',
            correctLine: '    def __init__(self, name, age):',
            hint: 'The first parameter of an instance method in a class is always named after the instance itself.',
            xpValue: 50,
            wrongPenalty: 5
          },
          {
            id: 'c_m5_2_2',
            type: 'fill_blank',
            question: 'Complete the constructor to set the class attributes:',
            code: 'class Dog:\n    def __init__(self, name):\n        _____.name = name',
            blanks: ['self'],
            hint: 'Use the self keyword to reference instance attributes.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm5_3',
        title: '__str__ & Overloading',
        badge: null,
        xpReward: 100,
        briefing: {
          lines: [
            "__str__ is a special method that returns a readable string representation of an object.",
            "Operator overloading lets custom objects define standard mathematical operations like + (using __add__).",
            "Let's trace __str__ representation formatting."
          ],
          codeExample: `class Point:\n    def __init__(self, x):\n        self.x = x\n    def __str__(self):\n        return f"P({self.x})"\n\np = Point(5)\nprint(p)`,
          traceSteps: [
            {
              step: 1,
              code: 'p = Point(5)',
              variables: [
                { id: 'p', value: '{x: 5}', type: 'dict' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'print(p) calls __str__ returning "P(5)"',
              variables: [
                { id: 'p', value: '{x: 5}', type: 'dict' },
                { id: 'stdout', value: 'P(5)', type: 'str' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m5_3_1',
            type: 'fill_blank',
            question: 'Complete the special method to represent an object as a string:',
            code: 'class Student:\n    def __init__(self, name):\n        self.name = name\n    def _____(self):\n        return self.name',
            blanks: ['__str__'],
            hint: 'Use double underscores before and after str.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm5_4',
        title: 'Pass/Fail with Class',
        badge: 'class_architect',
        xpReward: 160,
        briefing: {
          lines: [
            "Let's implement VTU Lab Experiment C2: Student marks evaluator.",
            "We define a Student class holding marks of 3 subjects.",
            "We provide methods to compute total, percentage, and check if passed (>40 in all).",
            "Let's trace instantiating and evaluating a student with marks [50, 60, 45]."
          ],
          codeExample: `class Student:\n    def __init__(self, marks):\n        self.marks = marks\n    def is_passed(self):\n        return all(m >= 40 for m in self.marks)\n\ns = Student([50, 60, 45])\nres = s.is_passed()`,
          traceSteps: [
            {
              step: 1,
              code: 's = Student([50, 60, 45])',
              variables: [
                { id: 's', value: '{marks: [50, 60, 45]}', type: 'dict' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 's.is_passed() checks 50>=40, 60>=40, 45>=40 -> True',
              variables: [
                { id: 's', value: '{marks: [50, 60, 45]}', type: 'dict' },
                { id: 'res', value: 'True', type: 'bool' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m5_4_1',
            type: 'fill_blank',
            question: 'Complete the passing criteria checking function:',
            code: 'class Student:\n    def __init__(self, marks):\n        self.marks = marks\n    def check_pass(self):\n        for m in self.marks:\n            if m < 40:\n                return _____\n        return _____',
            blanks: ['False', 'True'],
            hint: 'Return False if any mark is below 40; otherwise, return True.',
            xpValue: 60,
            wrongPenalty: 10
          },
          {
            id: 'c_m5_4_2',
            type: 'order',
            question: 'Arrange code in correct order to create and check a Student:',
            steps: [
              { id: 's1', text: 'class Student:' },
              { id: 's2', text: '    def __init__(self, m): self.marks = m' },
              { id: 's3', text: 's = Student([35, 90, 85])' },
              { id: 's4', text: 'print(s.marks[0] >= 40)' }
            ],
            correctOrder: ['s1', 's2', 's3', 's4'],
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm5_5',
        title: 'Inheritance Basics',
        badge: null,
        xpReward: 120,
        briefing: {
          lines: [
            "Inheritance allows a new class (child) to adopt attributes/methods of another class (parent).",
            "This models 'is-a' relationships and promotes massive code reuse.",
            "Use the super() function to access parent attributes in child constructors.",
            "Let's trace a child class constructor calling its parent."
          ],
          codeExample: `class Person:\n    def __init__(self, name):\n        self.name = name\n\nclass Student(Person):\n    def __init__(self, name, usn):\n        super().__init__(name)\n        self.usn = usn`,
          traceSteps: [
            {
              step: 1,
              code: 'class Person... class Student(Person)...',
              variables: []
            },
            {
              step: 2,
              code: 's = Student("Yathin", "CS001")',
              variables: [
                { id: 's', value: '{name: "Yathin", usn: "CS001"}', type: 'dict' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m5_5_1',
            type: 'fill_blank',
            question: 'Fill in the blanks to make Student inherit from Person:',
            code: 'class Person:\n    pass\n\nclass Student(_____):\n    def __init__(self):\n        _____().__init__()',
            blanks: ['Person', 'super'],
            hint: 'Pass parent class in parentheses, and use super() to invoke parent constructor.',
            xpValue: 50,
            wrongPenalty: 5
          },
          {
            id: 'c_m5_5_2',
            type: 'mcq',
            question: 'What is the output of isinstance(s, Person) where Student inherits from Person?',
            options: ['True', 'False', 'Error', 'None'],
            correct: 0,
            hint: 'Since Student is a subclass of Person, a Student instance is also a Person instance.',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm5_6',
        title: 'Triangle Inherits Polygon',
        badge: 'inheritance_heir',
        xpReward: 160,
        briefing: {
          lines: [
            "Let's implement VTU Lab Experiment C3: Triangle inherits Polygon.",
            "We define a Polygon class that stores side lengths.",
            "A Triangle class inherits from Polygon and provides a findArea() method.",
            "Using Heron's Formula, Area = √(s(s-a)(s-b)(s-c)) where s = semi-perimeter.",
            "Let's trace evaluating a Triangle with sides [3, 4, 5]."
          ],
          codeExample: `class Polygon:\n    def __init__(self, sides):\n        self.sides = sides\n\nclass Triangle(Polygon):\n    def findArea(self):\n        a, b, c = self.sides\n        s = (a + b + c) / 2\n        return (s*(s-a)*(s-b)*(s-c)) ** 0.5`,
          traceSteps: [
            {
              step: 1,
              code: 't = Triangle([3, 4, 5])',
              variables: [
                { id: 't', value: '{sides: [3, 4, 5]}', type: 'dict' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 's = (3+4+5)/2 -> 6.0',
              variables: [
                { id: 't', value: '{sides: [3, 4, 5]}', type: 'dict' },
                { id: 's', value: '6.0', type: 'float' }
              ],
              edges: []
            },
            {
              step: 3,
              code: 'Area = (6*3*2*1)**0.5 -> 6.0',
              variables: [
                { id: 'area', value: '6.0', type: 'float' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m5_6_1',
            type: 'fill_blank',
            question: 'Fill in the blanks to calculate Triangle area details:',
            code: 'class Triangle(Polygon):\n    def area(self):\n        a, b, c = self.sides\n        s = (a + b + c) / _____\n        return (s * (s - a) * (s - b) * (s - c)) ** _____',
            blanks: ['2', '0.5'],
            hint: 'The semiperimeter is half of perimeter, and square root is power 0.5.',
            xpValue: 60,
            wrongPenalty: 10
          },
          {
            id: 'c_m5_6_2',
            type: 'mcq',
            question: 'What is the base class in this laboratory experiment?',
            options: ['Triangle', 'Polygon', 'Heron', 'Area'],
            correct: 1,
            hint: 'The base class is the general polygon class from which Triangle is derived.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm5_7',
        title: 'Encapsulation',
        badge: null,
        xpReward: 100,
        briefing: {
          lines: [
            "Encapsulation hides an object's internal state and restricts direct access.",
            "In Python, prefix attributes with a double underscore (__) to make them private.",
            "Private attributes cannot be accessed directly; use getter and setter methods.",
            "Let's trace private attribute access restrictions."
          ],
          codeExample: `class Account:\n    def __init__(self):\n        self.__balance = 1000\n    def get_bal(self):\n        return self.__balance\n\na = Account()`,
          traceSteps: [
            {
              step: 1,
              code: 'a = Account()',
              variables: [
                { id: 'a', value: '{_Account__balance: 1000}', type: 'dict' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'a.__balance -> AttributeError! (Name mangled)',
              variables: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m5_7_1',
            type: 'mcq',
            question: 'How do you declare a private instance variable "salary" in Python?',
            options: ['private salary', 'self.private_salary', 'self.__salary', 'self._salary_private'],
            correct: 2,
            hint: 'Use double underscores in front of the attribute name.',
            xpValue: 50,
            wrongPenalty: 5
          },
          {
            id: 'c_m5_7_2',
            type: 'fill_blank',
            question: 'Complete the private property getter method:',
            code: 'class User:\n    def __init__(self, key):\n        self.__key = key\n    def get_key(self):\n        return self._____',
            blanks: ['__key'],
            hint: 'Return the private variable self.__key.',
            xpValue: 50,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm5_8',
        title: 'Polymorphism',
        badge: null,
        xpReward: 80,
        briefing: {
          lines: [
            "Polymorphism allows different classes to have methods with the same name.",
            "This enables uniform processing of diverse objects.",
            "Let's trace a polymorphic execution flow."
          ],
          codeExample: `class Dog:\n    def speak(self): return "Woof"\nclass Cat:\n    def speak(self): return "Meow"\n\nfor animal in [Dog(), Cat()]:\n    print(animal.speak())`,
          traceSteps: [
            {
              step: 1,
              code: 'Looping over instances',
              variables: []
            },
            {
              step: 2,
              code: 'animal.speak() returns "Woof" then "Meow"',
              variables: [
                { id: 'stdout', value: '"Woof\\nMeow"', type: 'str' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m5_8_1',
            type: 'scenario',
            question: 'You want Dog and Cat classes to both have a speak() method so they can be treated interchangeably. What concept facilitates this?',
            options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Composition'],
            correct: 2,
            hint: 'This concept allows many ("poly") forms ("morphs") of the same interface.',
            xpValue: 40,
            wrongPenalty: 5
          }
        ]
      },
      {
        id: 'm5_9',
        title: 'OOP Final Boss',
        badge: 'python_god',
        xpReward: 60,
        briefing: {
          lines: [
            "Welcome, Snake Rookie... to the final challenge of Pythonia!",
            "To graduate as a Python God, you must complete the Bank Account design.",
            "This final boss tests everything: classes, methods, private states, and logical constraints.",
            "Let's trace completing the banking system."
          ],
          codeExample: `class Bank:\n    def __init__(self, holder):\n        self.holder = holder\n        self.__balance = 0\n    def deposit(self, amt):\n        if amt > 0:\n            self.__balance += amt\n            return True\n        return False`,
          traceSteps: [
            {
              step: 1,
              code: 'b = Bank("Yathin")',
              variables: [
                { id: 'b', value: '{holder: "Yathin", __balance: 0}', type: 'dict' }
              ],
              edges: []
            },
            {
              step: 2,
              code: 'b.deposit(500) -> returns True',
              variables: [
                { id: 'b', value: '{holder: "Yathin", __balance: 500}', type: 'dict' }
              ],
              edges: []
            }
          ]
        },
        challenges: [
          {
            id: 'c_m5_9_1',
            type: 'fill_blank',
            question: 'Complete the deposit and withdrawal checks for safety:',
            code: 'class BankAccount:\n    def __init__(self):\n        self.__bal = 0\n    def withdraw(self, amt):\n        if amt > 0 and self.__bal _____ amt:\n            self.__bal -= amt\n            return True\n        return False',
            blanks: ['>='],
            hint: 'The account balance must be greater than or equal to the withdrawal amount.',
            xpValue: 60,
            wrongPenalty: 10
          }
        ]
      }
    ]
  }
];
