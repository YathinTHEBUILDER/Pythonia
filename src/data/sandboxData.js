// 💻 PYTHONIA HackerRank-Style Sandbox Data (VTU 1BPLCSL207 Syllabus)

export const SANDBOX_PROBLEMS = [
  {
    id: 'a1',
    title: 'A1: Celsius to Fahrenheit Converter',
    vtuId: 'A1',
    description: 'Write a Python program to read a temperature in Celsius from the user, convert it to Fahrenheit using the formula, and display the result.',
    formula: 'Fahrenheit = (Celsius * 1.8) + 32',
    inputFormat: 'A single floating-point number representing Celsius.',
    outputFormat: 'A single floating-point number representing Fahrenheit.',
    constraints: 'Celsius >= -273.15 (Absolute Zero)',
    sampleInput: '40.0',
    sampleOutput: '104.0',
    templateCode: `# A1: Temperature Converter (Celsius to Fahrenheit)
# Task: Read Celsius value from standard input, convert it to Fahrenheit, and print the result.
# Formula: Fahrenheit = (Celsius * 1.8) + 32

# Write your complete program here:
`,
    solutionCode: `def convert_to_fahrenheit(celsius):
    fahrenheit = (celsius * 1.8) + 32
    return fahrenheit

if __name__ == '__main__':
    c = float(input())
    print(convert_to_fahrenheit(c))`,
    testCases: [
      { input: '40.0', expected: '104.0' },
      { input: '0.0', expected: '32.0' },
      { input: '-40.0', expected: '-40.0' }
    ]
  },
  {
    id: 'a2a',
    title: 'A2a: Recursive Fibonacci Generator',
    vtuId: 'A2a',
    description: 'Write a recursive function to find the Nth Fibonacci number. The Fibonacci sequence starts with fib(0) = 0 and fib(1) = 1, where fib(n) = fib(n-1) + fib(n-2).',
    inputFormat: 'A single positive integer N representing the Fibonacci index.',
    outputFormat: 'A single integer representing the Nth Fibonacci number.',
    constraints: '0 <= N <= 25',
    sampleInput: '6',
    sampleOutput: '8',
    templateCode: `# A2a: Recursive Fibonacci Generator
# Task: Write a recursive function 'fibonacci(n)' that returns the Nth Fibonacci number.
# Read integer N from standard input, invoke the function, and print the result.

# Write your complete program here:
`,
    solutionCode: `def fibonacci(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)

if __name__ == '__main__':
    n = int(input())
    print(fibonacci(n))`,
    testCases: [
      { input: '6', expected: '8' },
      { input: '0', expected: '0' },
      { input: '10', expected: '55' }
    ]
  },
  {
    id: 'a2b',
    title: 'A2b: Recursive Factorial Calculator',
    vtuId: 'A2b',
    description: 'Implement a recursive function to find the factorial of a positive integer N. If N is 0 or 1, return 1; otherwise return N * factorial(N-1).',
    inputFormat: 'A single positive integer N.',
    outputFormat: 'A single integer representing N! (N factorial).',
    constraints: '0 <= N <= 12',
    sampleInput: '5',
    sampleOutput: '120',
    templateCode: `# A2b: Recursive Factorial Calculator
# Task: Write a recursive function 'factorial(n)' that returns the factorial of N.
# Read integer N from standard input, invoke the function, and print the result.

# Write your complete program here:
`,
    solutionCode: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

if __name__ == '__main__':
    n = int(input())
    print(factorial(n))`,
    testCases: [
      { input: '5', expected: '120' },
      { input: '0', expected: '1' },
      { input: '7', expected: '5040' }
    ]
  },
  {
    id: 'b1',
    title: 'B1: Digits Frequency Counter',
    vtuId: 'B1',
    description: 'Read an integer from the user and count the frequency of each individual digit (0-9) occurring in it. Display only the digits that occur at least once in ascending order.',
    inputFormat: 'A single positive integer (e.g. 11223).',
    outputFormat: 'Multiple lines, each in the format: Digit : Frequency (e.g. "1 : 2").',
    constraints: 'Integer up to 18 digits long.',
    sampleInput: '122333',
    sampleOutput: '1 : 1\n2 : 2\n3 : 3',
    templateCode: `# B1: Digits Frequency Counter
# Task: Read an integer as a string from standard input. Count and print the 
# frequency of each individual digit (0-9) that occurs in it.
# Output format: "Digit : Frequency" (e.g. "1 : 2") in ascending digit order.

# Write your complete program here:
`,
    solutionCode: `def count_digits(num_str):
    freq = {}
    for digit in num_str:
        if digit.isdigit():
            freq[digit] = freq.get(digit, 0) + 1
    for digit in sorted(freq.keys()):
        print(f"{digit} : {freq[digit]}")

if __name__ == '__main__':
    num = input()
    count_digits(num)`,
    testCases: [
      { input: '122333', expected: '1 : 1\n2 : 2\n3 : 3' },
      { input: '9900', expected: '0 : 2\n9 : 2' }
    ]
  },
  {
    id: 'b2',
    title: 'B2: List Statistics Processor',
    vtuId: 'B2',
    description: 'Given a space-separated string of numbers, parse it into a Python list. Write a program to compute the Mean (Average), Variance, and Standard Deviation of these list elements without using imported stat modules.',
    formulas: 'Mean = Sum / N\nVariance = Sum((x - Mean)**2) / N\nStdDev = Math.sqrt(Variance)',
    inputFormat: 'A single line of space-separated floating-point numbers.',
    outputFormat: 'Three lines: Mean, Variance, and Standard Deviation (rounded to 4 decimal places).',
    constraints: '2 <= List Length <= 100',
    sampleInput: '10 20 30 40 50',
    sampleOutput: 'Mean: 30.0000\nVariance: 200.0000\nStdDev: 14.1421',
    templateCode: `# B2: List Statistics Processor
# Task: Read a single space-separated line of numbers from standard input, convert to a list, 
# and print Mean, Variance, and StdDev rounded to 4 decimal places without using standard stat modules.

# Write your complete program here:
`,
    solutionCode: `import math

def calculate_stats(numbers):
    n = len(numbers)
    mean_val = sum(numbers) / n
    variance_val = sum((x - mean_val) ** 2 for x in numbers) / n
    std_dev = math.sqrt(variance_val)
    
    print(f"Mean: {mean_val:.4f}")
    print(f"Variance: {variance_val:.4f}")
    print(f"StdDev: {std_dev:.4f}")

if __name__ == '__main__':
    num_list = [float(x) for x in input().split()]
    calculate_stats(num_list)`,
    testCases: [
      { input: '10 20 30 40 50', expected: 'Mean: 30.0000\nVariance: 200.0000\nStdDev: 14.1421' },
      { input: '2.5 3.5 4.5', expected: 'Mean: 3.5000\nVariance: 0.6667\nStdDev: 0.8165' }
    ]
  },
  {
    id: 'b3',
    title: 'B3: Sorting Dictionary Keys',
    vtuId: 'B3',
    description: 'Read key-value pairs representing student roll numbers and names. Insert them into a dictionary and sort the dictionary keys in alphabetical order, then display the sorted records.',
    inputFormat: 'Pairs of space-separated strings (RollNo Name) on consecutive lines. Stop reading when input is "STOP".',
    outputFormat: 'Roll numbers sorted alphabetically with their names.',
    sampleInput: '2 Yathin\n1 Preetham\nSTOP',
    sampleOutput: '1 : Preetham\n2 : Yathin',
    templateCode: `# B3: Sorting Dictionary Keys
# Task: Read student entries ("RollNo Name") on separate lines until "STOP" is input.
# Save in a dictionary, sort by RollNo alphabetically, and print "RollNo : Name".

# Write your complete program here:
`,
    solutionCode: `def process_dict():
    students = {}
    while True:
        line = input()
        if line.strip().upper() == 'STOP':
            break
        parts = line.split(maxsplit=1)
        if len(parts) == 2:
            roll, name = parts
            students[roll] = name
            
    for k in sorted(students.keys()):
        print(f"{k} : {students[k]}")

if __name__ == '__main__':
    process_dict()`,
    testCases: [
      { input: '2 Yathin\n1 Preetham\nSTOP', expected: '1 : Preetham\n2 : Yathin' }
    ]
  },
  {
    id: 'b5',
    title: 'B5: Group Words by Length',
    vtuId: 'B5',
    description: 'Write a Python program that reads a list of words from the user and groups them based on their character length in a dictionary. The key is the word length, and the value is a list of words of that length.',
    inputFormat: 'A space-separated list of words.',
    outputFormat: 'Dictionary display or dictionary representation showing lengths grouped.',
    sampleInput: 'cat dog bird frog fish',
    sampleOutput: '3 : [\'cat\', \'dog\']\n4 : [\'frog\', \'fish\']\n5 : [\'bird\']',
    templateCode: `# B5: Group Words by Length
# Task: Read a space-separated list of words from standard input. Group words by character length
# in a dictionary (key: length, value: sorted list of words) and print results in format "Length : List".

# Write your complete program here:
`,
    solutionCode: `def group_words(words):
    groups = {}
    for word in sorted(words):
        w_len = len(word)
        if w_len not in groups:
            groups[w_len] = []
        groups[w_len].append(word)
        
    for length in sorted(groups.keys()):
        print(f"{length} : {groups[length]}")

if __name__ == '__main__':
    word_list = input().split()
    group_words(word_list)`,
    testCases: [
      { input: 'cat dog bird frog fish', expected: '3 : [\'cat\', \'dog\']\n4 : [\'fish\', \'frog\']\n5 : [\'bird\']' }
    ]
  },
  {
    id: 'b6',
    title: 'B6: DivExp Exception Handler',
    vtuId: 'B6',
    description: 'Implement a function DivExp(a, b) that performs division a / b. Use try-except blocks to catch ZeroDivisionError, ValueError, or general exceptions and print custom error alerts.',
    inputFormat: 'Two inputs on separate lines: number a and number b.',
    outputFormat: 'Result of division or custom error strings.',
    sampleInput: '10\n2',
    sampleOutput: '5.0',
    templateCode: `# B6: DivExp Exception Handler
# Task: Read two values from standard input, perform division a / b inside a div_exp function.
# Use try-except blocks to catch ZeroDivisionError, ValueError, or other Exceptions.

# Write your complete program here:
`,
    solutionCode: `def div_exp(a_str, b_str):
    try:
        a = float(a_str)
        b = float(b_str)
        result = a / b
        print(result)
    except ZeroDivisionError:
        print("ERROR: Division by zero is mathematically undefined!")
    except ValueError:
        print("ERROR: Incompatible data type inputted!")
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == '__main__':
    a = input()
    b = input()
    div_exp(a, b)`,
    testCases: [
      { input: '10\n2', expected: '5.0' },
      { input: '10\n0', expected: 'ERROR: Division by zero is mathematically undefined!' },
      { input: 'abc\n2', expected: 'ERROR: Incompatible data type inputted!' }
    ]
  },
  {
    id: 'c2',
    title: 'C2: Class OOP Marks Evaluator',
    vtuId: 'C2',
    description: 'Build a complete Python Class "Student" that encapsulates standard variables (RollNo, Name, Marks of 3 subjects). Implement methods: display() to print details and compute_average() to evaluate test averages.',
    inputFormat: 'RollNo, Name, and space-separated marks for 3 subjects.',
    outputFormat: 'Details printed and test average displayed.',
    sampleInput: '22CSE24 Yathin\n80 90 100',
    sampleOutput: 'Student: Yathin (22CSE24)\nMarks: [80.0, 90.0, 100.0]\nAverage Marks: 90.00',
    templateCode: `# C2: Class OOP Marks Evaluator
# Task: Design a class "Student" encapsulating RollNo, Name, and Marks (3 subjects).
# Implement methods compute_average() and display() to show stats.

# Write your complete program here:
`,
    solutionCode: `class Student:
    def __init__(self, roll, name, marks):
        self.roll = roll
        self.name = name
        self.marks = [float(x) for x in marks]
        
    def compute_average(self):
        return sum(self.marks) / len(self.marks)
        
    def display(self):
        print(f"Student: {self.name} ({self.roll})")
        print(f"Marks: {self.marks}")
        print(f"Average Marks: {self.compute_average():.2f}")

if __name__ == '__main__':
    info = input().split(maxsplit=1)
    roll = info[0]
    name = info[1] if len(info) > 1 else "Unknown"
    marks = input().split()
    s = Student(roll, name, marks)
    s.display()`,
    testCases: [
      { input: '22CSE24 Yathin\n80 90 100', expected: 'Student: Yathin (22CSE24)\nMarks: [80.0, 90.0, 100.0]\nAverage Marks: 90.00' }
    ]
  },
  {
    id: 'c3',
    title: 'C3: Shapes Inheritance Hierarchy',
    vtuId: 'C3',
    description: 'Create a base class "Polygon" that has a method input_sides() and display_sides(). Derive a subclass "Triangle" that implements find_area() using Heron\'s formula and overrides display_sides() to invoke triangle-specific properties.',
    inputFormat: 'Three side lengths of a triangle on a single space-separated line.',
    outputFormat: 'Sides listed and area calculated.',
    sampleInput: '3 4 5',
    sampleOutput: 'Triangle sides: [3.0, 4.0, 5.0]\nTriangle Area: 6.00',
    templateCode: `# C3: Shapes Inheritance Hierarchy
# Task: Design a base class "Polygon" and derived class "Triangle".
# Triangle must implement find_area() using Heron's formula and display sides & area.

# Write your complete program here:
`,
    solutionCode: `import math

class Polygon:
    def __init__(self, sides):
        self.sides = [float(x) for x in sides]

class Triangle(Polygon):
    def find_area(self):
        a, b, c = self.sides
        s = (a + b + c) / 2
        area = math.sqrt(s * (s - a) * (s - b) * (s - c))
        return area
        
    def display(self):
        print(f"Triangle sides: {self.sides}")
        print(f"Triangle Area: {self.find_area():.2f}")

if __name__ == '__main__':
    sides = input().split()
    t = Triangle(sides)
    t.display()`,
    testCases: [
      { input: '3 4 5', expected: 'Triangle sides: [3.0, 4.0, 5.0]\nTriangle Area: 6.00' }
    ]
  }
];
