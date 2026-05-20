// 🐍 PYTHONIA Concept Reference Database
// Covers the entire VTU 1BPLCSL207 Python Programming Lab Syllabus
// Incredibly student-friendly, highly accurate, simplified, and clear.

export const REFERENCE_DATA = [
  // ================= MODULE 1: BASICS & FUNCTIONS =================
  {
    id: 'ref_001',
    module: 1,
    concept: 'print()',
    syntax: 'print(value1, value2, ..., sep=" ", end="\\n")',
    description: 'Prints text, numbers, or variables to the screen. You can customize how items are separated with "sep" and what is printed at the end with "end".',
    example: `print("Hello", "World")            # Prints: Hello World (separated by space)
print("A", "B", "C", sep="-")     # Prints: A-B-C (separated by dashes)
print("Keep on", end=" ")          # Prints: Keep on (no newline, ends with space)
print("same line")                 # Prints: same line (on the same line as above)`,
    tags: ['basics', 'output', 'print']
  },
  {
    id: 'ref_002',
    module: 1,
    concept: 'input()',
    syntax: 'variable = input(prompt)',
    description: 'Displays a message to the user, waits for them to type something, and returns their input as a string.',
    example: `name = input("Enter your name: ")
print("Hello", name)

# Note: input() always returns text! Convert it if you need numbers:
age = int(input("Enter age: "))`,
    tags: ['basics', 'input', 'user-interaction']
  },
  {
    id: 'ref_003',
    module: 1,
    concept: 'type()',
    syntax: 'type(value)',
    description: 'Checks and returns the data type of a variable or value (e.g., int, float, str, list, dict, etc.).',
    example: `print(type(42))       # Output: <class 'int'>
print(type(3.14))     # Output: <class 'float'>
print(type("Hello"))  # Output: <class 'str'>
print(type([1, 2]))   # Output: <class 'list'>`,
    tags: ['basics', 'types', 'checking']
  },
  {
    id: 'ref_004',
    module: 1,
    concept: 'int()',
    syntax: 'int(value)',
    description: 'Converts a decimal number or compatible text string into a whole number (integer). Decimals are truncated (cut off).',
    example: `num1 = int("123")  # Converts string "123" to integer 123
num2 = int(5.87)   # Converts float 5.87 to integer 5 (removes decimal part!)`,
    tags: ['basics', 'casting', 'integers']
  },
  {
    id: 'ref_005',
    module: 1,
    concept: 'float()',
    syntax: 'float(value)',
    description: 'Converts a whole number or compatible text string into a decimal number (floating-point).',
    example: `val1 = float("3.14") # Converts string "3.14" to float 3.14
val2 = float(15)     # Converts integer 15 to float 15.0`,
    tags: ['basics', 'casting', 'floats']
  },
  {
    id: 'ref_006',
    module: 1,
    concept: 'str()',
    syntax: 'str(value)',
    description: 'Converts a number or other variable into a string (text) so it can be printed or joined with other text.',
    example: `age = 19
message = "I am " + str(age) + " years old"
print(message)  # Output: I am 19 years old`,
    tags: ['basics', 'casting', 'strings']
  },
  {
    id: 'ref_007',
    module: 1,
    concept: 'def (Function)',
    syntax: `def function_name(parameter1, parameter2, ...):
    # function body
    return value`,
    description: 'Creates a reusable block of code called a function. It can take inputs (parameters) and return a result using the return keyword.',
    example: `# Defining a function that calculates total price
def get_total(price, tax):
    return price + tax

# Calling the function
result = get_total(100, 18)
print(result)  # Output: 118`,
    tags: ['functions', 'structure', 'def']
  },
  {
    id: 'ref_008',
    module: 1,
    concept: 'return',
    syntax: 'return value',
    description: 'Exits a function immediately and passes a value back to the place where the function was called. Any code after return is ignored!',
    example: `def add_numbers(a, b):
    return a + b
    print("This will never print!")  # Unreachable code!

val = add_numbers(10, 20)  # val gets the returned value 30`,
    tags: ['functions', 'structure', 'return']
  },
  {
    id: 'ref_009',
    module: 1,
    concept: '# (Comments)',
    syntax: '# Comment text',
    description: 'Used to write notes in your code. Single-line comments start with a #. Multi-line comments can be wrapped in triple quotes.',
    example: `# This is a single-line comment (ignored by Python)
x = 10  # You can also add comments at the end of a line

"""
This is a multi-line comment.
Python ignores everything inside
these triple quotes.
"""`,
    tags: ['basics', 'syntax', 'comments']
  },
  {
    id: 'ref_010',
    module: 1,
    concept: 'Arithmetic Operators',
    syntax: '+ , - , * , / , // , % , **',
    description: 'Performs basic math. Special operators: // for floor division (integer result), % for modulus (remainder), and ** for exponentiation (power).',
    example: `print(15 // 4)  # Output: 3 (integer division, cuts off decimal)
print(15 % 4)   # Output: 3 (remainder of 15 / 4)
print(2 ** 3)   # Output: 8 (2 raised to the power of 3)`,
    tags: ['basics', 'operators', 'math']
  },
  {
    id: 'ref_011',
    module: 1,
    concept: 'Variables',
    syntax: 'variable_name = value',
    description: 'Stores data in computer memory. Variable names are case-sensitive and must start with a letter or underscore, not a number.',
    example: `x = 5
name = "Yathin"
x = x + 1  # Updates x to 6
print(x, name)`,
    tags: ['basics', 'syntax', 'variables']
  },
  {
    id: 'ref_012',
    module: 1,
    concept: 'float() + input()',
    syntax: 'variable = float(input(prompt))',
    description: 'Combines input() and float() to read decimal numbers from standard input. Very commonly used in VTU Lab Experiment A1 (Temperature Converter).',
    example: `# Reads Celsius input from the user and casts it to a decimal float
celsius = float(input("Enter temperature in Celsius: "))
fahrenheit = (celsius * 1.8) + 32
print("Fahrenheit:", fahrenheit)`,
    tags: ['basics', 'casting', 'input']
  },
  {
    id: 'ref_013',
    module: 1,
    concept: 'bool()',
    syntax: 'bool(value)',
    description: 'Converts a value to True or False. In Python, empty values (like 0, "", [], and None) convert to False, while non-empty values convert to True.',
    example: `print(bool(0))      # Output: False
print(bool("Hi"))   # Output: True
print(bool([]))     # Output: False (empty list is False)`,
    tags: ['basics', 'casting', 'booleans']
  },
  {
    id: 'ref_014',
    module: 1,
    concept: 'abs()',
    syntax: 'abs(number)',
    description: 'Returns the absolute (positive) value of a number. Converts negative numbers to positive; leaves positive numbers unchanged.',
    example: `print(abs(-5))    # Output: 5
print(abs(3.14))  # Output: 3.14`,
    tags: ['basics', 'functions', 'math']
  },
  {
    id: 'ref_015',
    module: 1,
    concept: 'math module',
    syntax: `import math
math.sqrt(x)
math.pow(x, y)`,
    description: 'Imports standard advanced mathematical functions. Very useful in VTU Lab Experiment B2 (Statistics) and C3 (Triangle Area using math.sqrt()).',
    example: `import math

print(math.sqrt(16))     # Output: 4.0 (square root)
print(math.pi)           # Output: 3.141592653589793 (constant pi)`,
    tags: ['basics', 'modules', 'math']
  },

  // ================= MODULE 2: LOGIC, LOOPS & STRINGS =================
  {
    id: 'ref_016',
    module: 2,
    concept: 'if / elif / else',
    syntax: `if condition_1:
    # runs if condition_1 is True
elif condition_2:
    # runs if condition_1 is False and condition_2 is True
else:
    # runs if all conditions are False`,
    description: 'Branches execution of code based on conditions. Blocks of code are defined by indentation.',
    example: `score = 85
if score >= 90:
    print("Grade A")
elif score >= 75:
    print("Grade B")  # This runs!
else:
    print("Grade F")`,
    tags: ['logic', 'conditionals', 'control-flow']
  },
  {
    id: 'ref_017',
    module: 2,
    concept: 'while Loop',
    syntax: `while condition:
    # body runs repeatedly`,
    description: 'Repeats a block of code as long as a condition is True. Ensure the condition eventually becomes False to avoid an infinite loop.',
    example: `count = 1
while count <= 3:
    print("Count:", count)
    count += 1  # Updates variable to avoid infinite loop
# Output: Count: 1, Count: 2, Count: 3`,
    tags: ['loops', 'iteration', 'while']
  },
  {
    id: 'ref_018',
    module: 2,
    concept: 'for Loop',
    syntax: `for item in sequence:
    # runs for each item`,
    description: 'Iterates over a sequence (like a string, list, tuple, dictionary, or range) and runs the code block for each element.',
    example: `# Looping over a string
for char in "Py":
    print(char)

# Looping over a list
fruits = ["apple", "banana"]
for fruit in fruits:
    print("I love", fruit)`,
    tags: ['loops', 'iteration', 'for']
  },
  {
    id: 'ref_019',
    module: 2,
    concept: 'range()',
    syntax: 'range(stop)\nrange(start, stop)\nrange(start, stop, step)',
    description: 'Generates a sequence of integers. Starts at "start" (defaults to 0), goes up to but does NOT include "stop" (exclusive), jumping by "step" (defaults to 1).',
    example: `print(list(range(5)))         # Output: [0, 1, 2, 3, 4]
print(list(range(2, 8)))      # Output: [2, 3, 4, 5, 6, 7]
print(list(range(1, 10, 2)))  # Output: [1, 3, 5, 7, 9] (odd numbers)`,
    tags: ['loops', 'helpers', 'range']
  },
  {
    id: 'ref_020',
    module: 2,
    concept: 'break',
    syntax: 'break',
    description: 'Immediately stops and exits the current loop. The program continues executing lines after the loop.',
    example: `for i in range(1, 10):
    if i == 5:
        break  # Stops the loop when i is 5
    print(i)   # Prints: 1, 2, 3, 4`,
    tags: ['loops', 'control-flow', 'break']
  },
  {
    id: 'ref_021',
    module: 2,
    concept: 'continue',
    syntax: 'continue',
    description: 'Skips the rest of the code in the current loop iteration and moves directly to the next iteration (re-evaluates condition).',
    example: `for n in range(1, 6):
    if n == 3:
        continue  # Skips print when n is 3
    print(n)      # Prints: 1, 2, 4, 5`,
    tags: ['loops', 'control-flow', 'continue']
  },
  {
    id: 'ref_022',
    module: 2,
    concept: 'Comparison Operators',
    syntax: '== , != , < , > , <= , >=',
    description: 'Compares two values and returns True or False. Double equals (==) is for equality comparison, not assignment (=).',
    example: `x = 10
print(x == 10)  # Output: True
print(x != 5)   # Output: True
print(x <= 9)   # Output: False`,
    tags: ['logic', 'operators', 'comparison']
  },
  {
    id: 'ref_023',
    module: 2,
    concept: 'Logical Operators',
    syntax: 'and , or , not',
    description: 'Combines boolean conditions. "and" is True if BOTH are True. "or" is True if AT LEAST ONE is True. "not" reverses the boolean value.',
    example: `x = 5
print(x > 2 and x < 10)  # Output: True (both True)
print(x < 2 or x == 5)   # Output: True (second is True)
print(not (x == 5))      # Output: False (reverses True)`,
    tags: ['logic', 'operators', 'boolean-logic']
  },
  {
    id: 'ref_024',
    module: 2,
    concept: 'String Slicing',
    syntax: 'string[start:stop:step]',
    description: 'Extracts a piece (substring) of a string from "start" index up to (but not including) "stop" index, jumping by "step" size.',
    example: `s = "Python"
print(s[0:2])    # Output: "Py" (indices 0 and 1)
print(s[2:])     # Output: "thon" (index 2 to end)
print(s[::-1])   # Output: "nohtyP" (reverses the string!)`,
    tags: ['strings', 'slicing', 'extraction']
  },
  {
    id: 'ref_025',
    module: 2,
    concept: 'String Indexing',
    syntax: 'string[index]',
    description: 'Accesses a single character in a string. Positive indices start from 0 (left). Negative indices start from -1 (right).',
    example: `word = "Snake"
print(word[0])   # Output: "S" (first character)
print(word[-1])  # Output: "e" (last character)`,
    tags: ['strings', 'indexing', 'basics']
  },
  {
    id: 'ref_026',
    module: 2,
    concept: '.strip()',
    syntax: 'string.strip()\nstring.strip(chars)',
    description: 'Removes any whitespace characters (spaces, tabs, newlines) from the very beginning and very end of a string.',
    example: `dirty_str = "   clean me \\n  "
clean_str = dirty_str.strip()
print(clean_str)  # Output: "clean me"`,
    tags: ['strings', 'methods', 'whitespace']
  },
  {
    id: 'ref_027',
    module: 2,
    concept: '.split()',
    syntax: 'string.split()\nstring.split(separator)',
    description: 'Splits a string into a list of smaller strings based on a separator (defaults to any whitespace). Crucial for processing multiple inputs on one line.',
    example: `# Split space-separated string
words = "cat dog bird".split()
print(words)  # Output: ['cat', 'dog', 'bird']

# Split list numbers
nums = "10,20,30".split(",")
print(nums)   # Output: ['10', '20', '30']`,
    tags: ['strings', 'methods', 'split']
  },
  {
    id: 'ref_028',
    module: 2,
    concept: '.isdigit()',
    syntax: 'string.isdigit()',
    description: 'Returns True if all characters in the string are digits (0-9) and the string is not empty. Essential in VTU Lab Experiment B1 (Digit Frequency).',
    example: `print("12345".isdigit())  # Output: True
print("123a5".isdigit())  # Output: False`,
    tags: ['strings', 'methods', 'checking']
  },
  {
    id: 'ref_029',
    module: 2,
    concept: '.join()',
    syntax: 'separator.join(list_of_strings)',
    description: 'Joins elements of a list of strings together into a single string, separated by the specified separator string.',
    example: `words = ["Python", "is", "fun"]
sentence = " ".join(words)
print(sentence)  # Output: "Python is fun"`,
    tags: ['strings', 'methods', 'join']
  },
  {
    id: 'ref_030',
    module: 2,
    concept: 'Recursion (Recursive Function)',
    syntax: `def recursive_func(n):
    if base_case_condition:
        return base_case_value
    return recursive_expression(recursive_func(n-1))`,
    description: 'A function that calls itself to solve a smaller subproblem. Must have a base case (stopping condition) to prevent crashing with a RecursionError.',
    example: `# Recursive function for factorial
def fact(n):
    if n <= 1:
        return 1  # Base Case
    return n * fact(n - 1)  # Recursive Case

print(fact(4))  # Output: 24`,
    tags: ['recursion', 'functions', 'advanced']
  },

  // ================= MODULE 3: LISTS & DICTIONARIES =================
  {
    id: 'ref_031',
    module: 3,
    concept: 'list() / Lists',
    syntax: 'my_list = [item1, item2, ...]\nempty_list = []',
    description: 'Creates an ordered, changeable (mutable) list of items. Items can be of any data type (numbers, strings, even other lists).',
    example: `lst = [10, "apple", 3.14]
print(lst[0])    # Output: 10
lst[1] = "pear"  # Lists are changeable (mutable)
print(lst)       # Output: [10, "pear", 3.14]`,
    tags: ['lists', 'collections', 'basics']
  },
  {
    id: 'ref_032',
    module: 3,
    concept: 'list.append()',
    syntax: 'list_name.append(item)',
    description: 'Adds a single item to the very end of an existing list.',
    example: `fruits = ["apple", "banana"]
fruits.append("cherry")
print(fruits)  # Output: ["apple", "banana", "cherry"]`,
    tags: ['lists', 'methods', 'add']
  },
  {
    id: 'ref_033',
    module: 3,
    concept: 'list.pop()',
    syntax: 'list_name.pop()\nlist_name.pop(index)',
    description: 'Removes and returns an item from a list. By default, it removes the very last item. If an index is provided, it removes the item at that index.',
    example: `nums = [10, 20, 30]
last = nums.pop()  # Removes 30, last = 30
print(nums)        # Output: [10, 20]

first = nums.pop(0) # Removes 10 at index 0, first = 10
print(nums)        # Output: [20]`,
    tags: ['lists', 'methods', 'remove']
  },
  {
    id: 'ref_034',
    module: 3,
    concept: 'list.sort()',
    syntax: 'list_name.sort()\nlist_name.sort(reverse=True)',
    description: 'Sorts the elements of a list in-place. Directly modifies the original list. Sorts ascending by default, or descending if "reverse=True" is set.',
    example: `numbers = [5, 2, 8, 1]
numbers.sort()
print(numbers)  # Output: [1, 2, 5, 8] (Original list modified!)

numbers.sort(reverse=True)
print(numbers)  # Output: [8, 5, 2, 1]`,
    tags: ['lists', 'methods', 'sorting']
  },
  {
    id: 'ref_035',
    module: 3,
    concept: 'sorted()',
    syntax: 'new_list = sorted(iterable)\nnew_list = sorted(iterable, reverse=True)',
    description: 'Returns a new sorted list from the items in any iterable (list, tuple, dictionary keys) without modifying the original iterable.',
    example: `nums = [3, 1, 4]
sorted_nums = sorted(nums)
print(sorted_nums) # Output: [1, 3, 4] (New sorted list)
print(nums)        # Output: [3, 1, 4] (Original is unchanged!)`,
    tags: ['lists', 'sorting', 'built-in']
  },
  {
    id: 'ref_036',
    module: 3,
    concept: 'sum()',
    syntax: 'sum(iterable)',
    description: 'Adds all numerical elements in a list, tuple, or set together and returns the total. Crucial in VTU Lab Experiment B2 (Mean & Variance).',
    example: `prices = [10.5, 20.0, 5.5]
total = sum(prices)
print(total)  # Output: 36.0`,
    tags: ['lists', 'functions', 'math']
  },
  {
    id: 'ref_037',
    module: 3,
    concept: 'len()',
    syntax: 'len(sequence)',
    description: 'Returns the number of items in a list, string, dictionary, or tuple.',
    example: `print(len("Python"))       # Output: 6 (number of characters)
print(len([10, 20, 30]))   # Output: 3 (number of items)
print(len({"a": 1, "b": 2})) # Output: 2 (number of keys)`,
    tags: ['basics', 'collections', 'checking']
  },
  {
    id: 'ref_038',
    module: 3,
    concept: 'List Comprehension',
    syntax: 'new_list = [expression for item in iterable]\nnew_list = [expression for item in iterable if condition]',
    description: 'A compact and elegant way to create a new list by applying an operation or filter to every item in an existing sequence.',
    example: `# Convert space-separated input string into list of floats
input_str = "1.5 2.5 3.5"
num_list = [float(x) for x in input_str.split()]
print(num_list)  # Output: [1.5, 2.5, 3.5]`,
    tags: ['lists', 'shortcuts', 'syntax']
  },
  {
    id: 'ref_039',
    module: 3,
    concept: 'dict() / Dictionaries',
    syntax: 'my_dict = {key1: value1, key2: value2, ...}\nempty_dict = {}',
    description: 'Creates a mutable collection of key-value pairs. Keys must be unique and immutable (like strings or numbers), and are used to quickly access their matching values.',
    example: `student = {"name": "Yathin", "usn": "22CSE24"}
print(student["name"])    # Output: Yathin
student["marks"] = 95     # Insert a new key-value pair
student["name"] = "Preetham" # Update an existing value`,
    tags: ['dictionaries', 'collections', 'basics']
  },
  {
    id: 'ref_040',
    module: 3,
    concept: 'dict.get()',
    syntax: 'dictionary.get(key)\ndictionary.get(key, default_value)',
    description: 'Looks up a key in a dictionary. Returns its value if it exists, or returns the default value (or None) if the key does not exist. Crucial for avoiding KeyErrors.',
    example: `scores = {"Math": 90}
print(scores.get("Math"))        # Output: 90
print(scores.get("Physics"))     # Output: None (does not crash!)
print(scores.get("Physics", 0))  # Output: 0 (uses custom default)`,
    tags: ['dictionaries', 'methods', 'safeguards']
  },
  {
    id: 'ref_041',
    module: 3,
    concept: 'dict.items()',
    syntax: 'dictionary.items()',
    description: 'Returns a sequence of key-value pairs as (key, value) tuples. Perfect for iterating through a dictionary in a for loop.',
    example: `phonebook = {"Yathin": "9900", "Aditya": "8800"}
for name, phone in phonebook.items():
    print(name, "->", phone)
# Output:
# Yathin -> 9900
# Aditya -> 8800`,
    tags: ['dictionaries', 'methods', 'iteration']
  },
  {
    id: 'ref_042',
    module: 3,
    concept: 'dict.keys()',
    syntax: 'dictionary.keys()',
    description: 'Returns a view object of all the keys in the dictionary. Can be converted to a list or used in loops and sorting.',
    example: `grades = {"A": 10, "B": 8}
print(list(grades.keys()))  # Output: ['A', 'B']`,
    tags: ['dictionaries', 'methods', 'iteration']
  },
  {
    id: 'ref_043',
    module: 3,
    concept: 'dict.values()',
    syntax: 'dictionary.values()',
    description: 'Returns a view object containing all the values stored in the dictionary.',
    example: `inventory = {"apples": 50, "bananas": 30}
total_items = sum(inventory.values())
print(total_items)  # Output: 80`,
    tags: ['dictionaries', 'methods', 'iteration']
  },
  {
    id: 'ref_044',
    module: 3,
    concept: 'in (Membership Operator)',
    syntax: 'item in sequence\nkey in dictionary',
    description: 'Checks if an item exists in a list/tuple/string, or if a key exists in a dictionary. Returns True or False.',
    example: `fruits = ["apple", "mango"]
print("apple" in fruits)  # Output: True

student = {"name": "Yathin"}
print("age" in student)   # Output: False`,
    tags: ['basics', 'operators', 'checking']
  },
  {
    id: 'ref_045',
    module: 3,
    concept: 'Aliasing & Copying',
    syntax: 'new_list = old_list   # Aliasing\nnew_list = old_list.copy()   # True copy',
    description: 'Assigning a list variable to another creates an "alias" (both refer to the SAME list in memory). Modifying one changes both! Use ".copy()" to create a separate copy.',
    example: `# Aliasing trap:
a = [1, 2, 3]
b = a
b.append(4)
print(a)  # Output: [1, 2, 3, 4] (A changed too!)

# Proper Copy:
a = [1, 2, 3]
b = a.copy()
b.append(4)
print(a)  # Output: [1, 2, 3] (A is unaffected!)`,
    tags: ['lists', 'memory', 'aliasing']
  },

  // ================= MODULE 4: TUPLES, FILES & EXCEPTIONS =================
  {
    id: 'ref_046',
    module: 4,
    concept: 'Tuple Packing & Unpacking',
    syntax: 'my_tuple = val1, val2   # Packing\na, b = my_tuple   # Unpacking',
    description: 'Tuples are immutable (unchangeable) lists. Packing bundles values into a tuple. Unpacking binds tuple items to individual variables. Swapping variables leverages this.',
    example: `# Packing:
point = (10, 20)

# Unpacking:
x, y = point
print(x, y)  # Output: 10 20

# Swapping variables:
x, y = 5, 10
x, y = y, x  # Swaps x and y! Now x = 10, y = 5`,
    tags: ['tuples', 'collections', 'unpacking']
  },
  {
    id: 'ref_047',
    module: 4,
    concept: 'open()',
    syntax: 'file = open(filename, mode)',
    description: 'Opens a file for operations. Modes: "r" (Read only), "w" (Write, overwrites file), "a" (Append, writes to end of file). Remember to close files after use!',
    example: `# Open for writing:
f = open("hello.txt", "w")
f.write("Hello World!")
f.close()  # ALWAYS close files manually when using open()!`,
    tags: ['files', 'structure', 'open']
  },
  {
    id: 'ref_048',
    module: 4,
    concept: 'with open()',
    syntax: `with open(filename, mode) as file_variable:
    # read or write here`,
    description: 'The best-practice way to open files in Python. It automatically closes the file for you as soon as the indented code block finishes, even if an error occurs!',
    example: `# Safe and automatic closing:
with open("story.txt", "r") as f:
    content = f.read()
    print(content)
# File f is now automatically closed here!`,
    tags: ['files', 'structure', 'context-manager']
  },
  {
    id: 'ref_049',
    module: 4,
    concept: 'file.read()',
    syntax: 'content = file.read()',
    description: 'Reads the entire contents of an opened file into a single text string.',
    example: `with open("data.txt", "r") as f:
    all_text = f.read()
    print("File length:", len(all_text))`,
    tags: ['files', 'methods', 'read']
  },
  {
    id: 'ref_050',
    module: 4,
    concept: 'file.write()',
    syntax: 'file.write(string_data)',
    description: 'Writes a text string to a file. It only accepts strings, so numbers must be cast to string using str() first.',
    example: `with open("output.txt", "w") as f:
    f.write("Line 1\\n")
    f.write("Age is " + str(19) + "\\n")  # Must cast numbers!`,
    tags: ['files', 'methods', 'write']
  },
  {
    id: 'ref_051',
    module: 4,
    concept: 'file.readline()',
    syntax: 'line = file.readline()',
    description: 'Reads and returns a single line of text from a file, including the newline character "\\n" at the end.',
    example: `with open("data.txt", "r") as f:
    line1 = f.readline()  # Reads the first line
    line2 = f.readline()  # Reads the second line
    print("Line 1 is:", line1.strip())`,
    tags: ['files', 'methods', 'read']
  },
  {
    id: 'ref_052',
    module: 4,
    concept: 'try / except',
    syntax: `try:
    # code that might raise an error
except ExceptionType as err:
    # error fallback code
finally:
    # code that always runs`,
    description: 'Catches and handles runtime execution errors so your program does not crash. "try" block runs first; if it throws an error, execution immediately jumps to "except".',
    example: `try:
    num = int(input("Enter an integer: "))
    print("You typed:", num)
except ValueError:
    print("That was not a valid integer!")`,
    tags: ['exceptions', 'safety', 'try-except']
  },
  {
    id: 'ref_053',
    module: 4,
    concept: 'ZeroDivisionError',
    syntax: 'except ZeroDivisionError:',
    description: 'An exception raised when you attempt to divide a number by zero. Catching it prevents mathematical program crashes. Crucial for VTU Lab Experiment B6.',
    example: `try:
    result = 10 / 0
except ZeroDivisionError:
    print("Oops! division by zero is not mathematically defined.")`,
    tags: ['exceptions', 'errors', 'math']
  },
  {
    id: 'ref_054',
    module: 4,
    concept: 'ValueError',
    syntax: 'except ValueError:',
    description: 'An exception raised when a function receives an argument of the correct type but with an inappropriate value (e.g., trying to convert "abc" to an integer).',
    example: `try:
    num = int("hello_world")
except ValueError:
    print("Failed to convert text to integer!")`,
    tags: ['exceptions', 'errors', 'casting']
  },
  {
    id: 'ref_055',
    module: 4,
    concept: 'assert',
    syntax: 'assert condition\nassert condition, "Error Message"',
    description: 'Used for debugging. It tests a condition: if True, code continues. If False, the program stops immediately and raises an AssertionError with your message. Crucial for VTU Lab Experiment B6.',
    example: `def check_age(age):
    assert age >= 0, "Age cannot be negative!"
    return "Age verified"

print(check_age(19))   # Works fine!
print(check_age(-5))   # Crashes with AssertionError: Age cannot be negative!`,
    tags: ['exceptions', 'debugging', 'assertions']
  },
  {
    id: 'ref_056',
    module: 4,
    concept: 'AssertionError',
    syntax: 'except AssertionError:',
    description: 'An exception raised when an assert statement fails. Can be caught in a try-except block to handle failed assertions gracefully.',
    example: `try:
    assert 5 == 10, "Math is broken!"
except AssertionError as e:
    print("Caught assertion error:", e)`,
    tags: ['exceptions', 'errors', 'assertions']
  },
  {
    id: 'ref_057',
    module: 4,
    concept: 'random module',
    syntax: 'import random\nrandom.randint(start, end)\nrandom.choice(sequence)',
    description: 'A built-in module used to generate pseudo-random numbers or select random elements from a sequence.',
    example: `import random

print(random.randint(1, 10))  # Output: random integer between 1 and 10 (inclusive)
fruits = ["apple", "banana", "cherry"]
print(random.choice(fruits))  # Output: a random fruit from the list`,
    tags: ['basics', 'modules', 'random']
  },

  // ================= MODULE 5: OBJECT-ORIENTED PROGRAMMING =================
  {
    id: 'ref_058',
    module: 5,
    concept: 'class / Class Blueprint',
    syntax: `class ClassName:
    # attributes (variables) and methods (functions)`,
    description: 'A blueprint or template for creating objects. Standard practice dictates capitalizing class names using CamelCase.',
    example: `class Car:
    # A simple placeholder class
    pass

my_car = Car()  # Instantiates (creates) a new Car object
print(type(my_car))  # Output: <class '__main__.Car'>`,
    tags: ['oop', 'structure', 'class']
  },
  {
    id: 'ref_059',
    module: 5,
    concept: '__init__ Constructor',
    syntax: `def __init__(self, parameter1, parameter2, ...):
    self.attribute1 = parameter1
    self.attribute2 = parameter2`,
    description: 'A special constructor method that runs automatically whenever you create a new object from a class. It is used to initialize the starting properties of the object.',
    example: `class Robot:
    def __init__(self, name, model):
        self.name = name    # Object variable
        self.model = model  # Object variable

# __init__ runs automatically when we instantiate:
r = Robot("T-800", "Cyberdyne")
print(r.name)  # Output: T-800`,
    tags: ['oop', 'structure', 'constructor']
  },
  {
    id: 'ref_060',
    module: 5,
    concept: 'self Keyword',
    syntax: 'self',
    description: 'Refers to the specific object instance currently being created or used. Must be the first parameter in all class methods, allowing you to access attributes and other methods.',
    example: `class Counter:
    def __init__(self):
        self.count = 0
    
    def increment(self):
        self.count += 1  # self accesses this specific counter's count

c1 = Counter()
c1.increment()
print(c1.count)  # Output: 1`,
    tags: ['oop', 'helpers', 'self']
  },
  {
    id: 'ref_061',
    module: 5,
    concept: 'Inheritance Syntax',
    syntax: `class ParentClass:
    # general methods

class ChildClass(ParentClass):
    # inherited + specialized methods`,
    description: 'Allows a child class to inherit all variables and methods from a parent class. Extremely useful for code reuse. Crucial for VTU Lab Experiment C3.',
    example: `class Animal:
    def sleep(self):
        print("Zzz...")

class Dog(Animal):  # Dog inherits from Animal
    def bark(self):
        print("Woof!")

d = Dog()
d.sleep()  # Output: Zzz... (Inherited method!)
d.bark()   # Output: Woof!`,
    tags: ['oop', 'inheritance', 'structure']
  },
  {
    id: 'ref_062',
    module: 5,
    concept: 'super()',
    syntax: 'super().__init__(parameters)',
    description: 'A function used inside a child class to call methods from its parent class. Most commonly used inside the child\'s __init__ constructor to execute the parent class\'s constructor.',
    example: `class Person:
    def __init__(self, name):
        self.name = name

class Employee(Person):
    def __init__(self, name, salary):
        super().__init__(name)  # Executes Person's constructor to set name
        self.salary = salary

emp = Employee("Yathin", 50000)
print(emp.name, emp.salary)  # Output: Yathin 50000`,
    tags: ['oop', 'inheritance', 'super']
  },
  {
    id: 'ref_063',
    module: 5,
    concept: '__str__ method',
    syntax: `def __str__(self):
    return "String representation"`,
    description: 'A special method that defines a user-friendly string representation of an object. It is called automatically when you pass the object to print() or str().',
    example: `class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

    def __str__(self):
        return f"'{self.title}' by {self.author}"

b = Book("Pythonia Guide", "DeepMind Team")
print(b)  # Output: 'Pythonia Guide' by DeepMind Team`,
    tags: ['oop', 'representation', 'strings']
  },
  {
    id: 'ref_064',
    module: 5,
    concept: 'Method Overriding',
    syntax: `class Child(Parent):
    def parent_method(self):
        # new implementation`,
    description: 'Enables a child class to provide a specific implementation of a method that is already defined in its parent class. Overrides the parent\'s default behavior.',
    example: `class Bird:
    def fly(self):
        print("Flying high!")

class Penguin(Bird):
    def fly(self):
        print("Cannot fly! Swims instead.")  # Overrides parent fly()

p = Penguin()
p.fly()  # Output: Cannot fly! Swims instead.`,
    tags: ['oop', 'inheritance', 'polymorphism']
  },
  {
    id: 'ref_065',
    module: 5,
    concept: 'Encapsulation (Private Variables)',
    syntax: 'self.__private_variable = value',
    description: 'Hides an object\'s internal data from direct outside access. Private variables are prefixed with two underscores (__).',
    example: `class Account:
    def __init__(self):
        self.__balance = 1000  # Private attribute (cannot access directly)

a = Account()
# print(a.__balance)   # Crashes! AttributeError`,
    tags: ['oop', 'encapsulation', 'privacy']
  },
  {
    id: 'ref_066',
    module: 5,
    concept: 'Getters & Setters',
    syntax: `def get_var(self):
    return self.__var

def set_var(self, val):
    self.__var = val`,
    description: 'Methods used to safely inspect (get) or update (set) private attributes inside an object, often verifying value validity during updates.',
    example: `class Student:
    def __init__(self):
        self.__marks = 0

    def get_marks(self):
        return self.__marks

    def set_marks(self, value):
        if 0 <= value <= 100:
            self.__marks = value  # Only sets if within valid range

s = Student()
s.set_marks(95)
print(s.get_marks())  # Output: 95`,
    tags: ['oop', 'encapsulation', 'getters-setters']
  },
  {
    id: 'ref_067',
    module: 5,
    concept: 'pass Keyword',
    syntax: 'pass',
    description: 'A null statement that does nothing. Used as a syntactical placeholder where code is required, such as inside empty functions, classes, or loops.',
    example: `class Polygon:
    # Blueprint to be filled later
    pass

def empty_function():
    pass  # Prevents indentation errors in empty function definitions`,
    tags: ['basics', 'syntax', 'structure']
  },
  {
    id: 'ref_068',
    module: 5,
    concept: 'Polymorphism',
    syntax: `def make_sound(animal_obj):
    animal_obj.sound()`,
    description: 'Allows different classes to define methods with the same name. Lets you execute the same action on different object types in a unified way.',
    example: `class Cat:
    def sound(self): return "Meow"

class Dog:
    def sound(self): return "Woof"

# Unified function that can work with any object containing a sound() method:
def play_sound(animal_obj):
    print(animal_obj.sound())

play_sound(Cat())  # Output: Meow
play_sound(Dog())  # Output: Woof`,
    tags: ['oop', 'polymorphism', 'behavior']
  },
  {
    id: 'ref_069',
    module: 5,
    concept: 'hasattr() / getattr()',
    syntax: 'hasattr(obj, name)\ngetattr(obj, name)',
    description: 'Standard functions that check if an object possesses a specific attribute (hasattr) or safely fetch that attribute\'s value (getattr).',
    example: `class User:
    def __init__(self):
        self.name = "Yathin"

u = User()
print(hasattr(u, "name"))   # Output: True
print(hasattr(u, "salary")) # Output: False
print(getattr(u, "name"))   # Output: Yathin`,
    tags: ['oop', 'helpers', 'reflection']
  },
  {
    id: 'ref_070',
    module: 5,
    concept: 'isinstance()',
    syntax: 'isinstance(object, class)',
    description: 'Checks if an object is an instance of a specific class or a subclass of it. Returns True or False.',
    example: `class Polygon: pass
class Triangle(Polygon): pass

t = Triangle()
print(isinstance(t, Triangle))  # Output: True
print(isinstance(t, Polygon))   # Output: True (Subclass instance)
print(isinstance(t, str))       # Output: False`,
    tags: ['oop', 'helpers', 'checking']
  }
];
