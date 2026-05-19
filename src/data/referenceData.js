// 🐍 PYTHONIA Concept Reference Database
// Covers the entire VTU 1BPLCSL207 Python Programming Lab Syllabus

export const REFERENCE_DATA = [
  // --- MODULE 1: BASICS & FUNCTIONS ---
  {
    id: 'ref_001',
    module: 1,
    concept: 'print()',
    syntax: 'print(value, ..., sep=" ", end="\\n", file=sys.stdout, flush=False)',
    description: 'Outputs a textual representation of values to the standard console output.',
    example: 'print("Hello", "World", sep="-")  # Hello-World\nprint("No newline", end="")',
    tags: ['basics', 'output']
  },
  {
    id: 'ref_002',
    module: 1,
    concept: 'input()',
    syntax: 'input(prompt="")',
    description: 'Prompts the user for console input and returns it strictly as a string string.',
    example: 'name = input("Enter name: ")\nage = int(input("Enter age: "))  # Must cast to numeric!',
    tags: ['basics', 'input']
  },
  {
    id: 'ref_003',
    module: 1,
    concept: 'type()',
    syntax: 'type(object)',
    description: 'Returns the exact class/data type of any given object.',
    example: 'print(type(42))      # <class \'int\'>\nprint(type(3.14))    # <class \'float\'>',
    tags: ['basics', 'types']
  },
  {
    id: 'ref_004',
    module: 1,
    concept: 'int()',
    syntax: 'int(x=0, base=10)',
    description: 'Converts a number or compatible string representation into an integer.',
    example: 'val1 = int("123")  # 123\nval2 = int(4.85)    # 4 (truncates decimal!)',
    tags: ['basics', 'types', 'casting']
  },
  {
    id: 'ref_005',
    module: 1,
    concept: 'float()',
    syntax: 'float(x=0)',
    description: 'Converts a number or compatible string representation into a floating-point decimal.',
    example: 'val1 = float("3.14") # 3.14\nval2 = float(15)     # 15.0',
    tags: ['basics', 'types', 'casting']
  },
  {
    id: 'ref_006',
    module: 1,
    concept: 'str()',
    syntax: 'str(object="")',
    description: 'Converts any object into its string representation.',
    example: 'text = str(45.6)  # "45.6"\nempty = str()     # ""',
    tags: ['basics', 'types', 'casting']
  },
  {
    id: 'ref_007',
    module: 1,
    concept: 'def (Function)',
    syntax: 'def function_name(parameter1, parameter2, ...):\n    # body\n    return value',
    description: 'Defines a reusable, callable block of code with optional inputs and output.',
    example: 'def add(a, b):\n    return a + b\n\nresult = add(10, 5)  # 15',
    tags: ['functions', 'structure']
  },
  {
    id: 'ref_008',
    module: 1,
    concept: 'return',
    syntax: 'return [expression]',
    description: 'Exits a function immediately and passes an optional value back to the caller.',
    example: 'def get_message():\n    return "Welcome!"\n    print("Unreachable!") # Will never run',
    tags: ['functions', 'structure']
  },

  // --- MODULE 2: LOGIC, LOOPS & STRINGS ---
  {
    id: 'ref_009',
    module: 2,
    concept: 'if / elif / else',
    syntax: 'if condition_1:\n    # body 1\nelif condition_2:\n    # body 2\nelse:\n    # default body',
    description: 'Facilitates conditional execution based on boolean expressions.',
    example: 'x = 15\nif x > 20:\n    print("Big")\nelif x > 10:\n    print("Medium")  # Executed\nelse:\n    print("Small")',
    tags: ['logic', 'conditionals']
  },
  {
    id: 'ref_010',
    module: 2,
    concept: 'while Loop',
    syntax: 'while condition:\n    # loop body',
    description: 'Repeats a block of code continuously as long as a conditional expression evaluates to True.',
    example: 'i = 1\nwhile i <= 3:\n    print(i)\n    i += 1  # Increments to avoid infinite loops',
    tags: ['loops', 'iteration']
  },
  {
    id: 'ref_011',
    module: 2,
    concept: 'for Loop',
    syntax: 'for item in iterable:\n    # loop body',
    description: 'Iterates over a sequence (list, tuple, string, dictionary) or range of values.',
    example: 'for char in "Py":\n    print(char.upper())  # Prints P, then Y',
    tags: ['loops', 'iteration']
  },
  {
    id: 'ref_012',
    module: 2,
    concept: 'range()',
    syntax: 'range(stop)\nrange(start, stop[, step])',
    description: 'Generates a sequence of integers from start (inclusive) to stop (exclusive) by step.',
    example: 'list(range(5))       # [0, 1, 2, 3, 4]\nlist(range(2, 10, 2)) # [2, 4, 6, 8]',
    tags: ['loops', 'helpers']
  },
  {
    id: 'ref_013',
    module: 2,
    concept: 'break',
    syntax: 'break',
    description: 'Terminates the nearest enclosing loop immediately, skipping any else block.',
    example: 'while True:\n    cmd = input()\n    if cmd == "exit":\n        break',
    tags: ['loops', 'flow-control']
  },
  {
    id: 'ref_014',
    module: 2,
    concept: 'continue',
    syntax: 'continue',
    description: 'Skips the remainder of the current loop iteration and moves directly to the next check.',
    example: 'for n in range(5):\n    if n % 2 == 0:\n        continue\n    print(n) # Prints only odd numbers: 1, 3',
    tags: ['loops', 'flow-control']
  },
  {
    id: 'ref_015',
    module: 2,
    concept: 'String Slicing',
    syntax: 'string[start:stop:step]',
    description: 'Extracts a substring from start index up to but excluding stop index, by step size.',
    example: 's = "Python"\nprint(s[0:2])   # "Py"\nprint(s[-3:])   # "hon"\nprint(s[::-1])  # "nohtyP" (reverses!)',
    tags: ['strings', 'slicing']
  },
  {
    id: 'ref_016',
    module: 2,
    concept: '.strip()',
    syntax: 'str.strip([chars])',
    description: 'Removes leading and trailing whitespaces (or specific characters) from a string.',
    example: 's = "  clean me  "\nprint(s.strip()) # "clean me"',
    tags: ['strings', 'methods']
  },

  // --- MODULE 3: LISTS & DICTIONARIES ---
  {
    id: 'ref_017',
    module: 3,
    concept: 'list() / Lists',
    syntax: 'lst = [item1, item2, ...]\nlst = list(iterable)',
    description: 'Creates an ordered, mutable sequence of arbitrary objects.',
    example: 'empty = []\nmy_list = [10, "hello", 3.14]\nfirst = my_list[0] # 10',
    tags: ['lists', 'collections']
  },
  {
    id: 'ref_018',
    module: 3,
    concept: 'list.append()',
    syntax: 'list.append(x)',
    description: 'Appends a single item to the end of the list.',
    example: 'fruits = ["apple"]\nfruits.append("banana")  # ["apple", "banana"]',
    tags: ['lists', 'methods']
  },
  {
    id: 'ref_019',
    module: 3,
    concept: 'list.pop()',
    syntax: 'list.pop([i])',
    description: 'Removes and returns the item at the given index (defaults to last item).',
    example: 'lst = [10, 20, 30]\nlast = lst.pop()  # removes 30, lst is [10, 20]\nfirst = lst.pop(0) # removes 10, lst is [20]',
    tags: ['lists', 'methods']
  },
  {
    id: 'ref_020',
    module: 3,
    concept: 'list.sort()',
    syntax: 'list.sort(key=None, reverse=False)',
    description: 'Sorts the elements of a list in-place (mutates the original list directly).',
    example: 'nums = [3, 1, 4]\nnums.sort()  # nums is now [1, 3, 4]',
    tags: ['lists', 'methods']
  },
  {
    id: 'ref_021',
    module: 3,
    concept: 'dict() / Dictionaries',
    syntax: 'd = {key1: val1, key2: val2, ...}\nd = dict(iterable)',
    description: 'An unordered, mutable collection of unique key-value pairs.',
    example: 'scores = {"Yathin": 95, "Aditya": 89}\nscores["Yathin"] = 98  # update value\nscores["Rohan"] = 90   # insert pair',
    tags: ['dictionaries', 'collections']
  },
  {
    id: 'ref_022',
    module: 3,
    concept: 'dict.get()',
    syntax: 'dict.get(key, default=None)',
    description: 'Safely looks up a key in a dictionary, returning default value if the key does not exist.',
    example: 'grades = {"Math": "A"}\nprint(grades.get("Math"))    # "A"\nprint(grades.get("Sci", "F")) # "F" (no error!)',
    tags: ['dictionaries', 'methods']
  },
  {
    id: 'ref_023',
    module: 3,
    concept: 'dict.items()',
    syntax: 'dict.items()',
    description: 'Returns a dynamic view object of the dictionary\'s key-value tuple pairs.',
    example: 'd = {"x": 1, "y": 2}\nfor k, v in d.items():\n    print(k, "is", v)',
    tags: ['dictionaries', 'methods']
  },

  // --- MODULE 4: TUPLES, FILES & EXCEPTIONS ---
  {
    id: 'ref_024',
    module: 4,
    concept: 'Tuple Packing & Unpacking',
    syntax: 'tup = val1, val2\nvar1, var2 = tup',
    description: 'Creates an immutable sequence (packing) and binds individual variables to elements (unpacking).',
    example: 'point = (10, 20)\nx, y = point\n# Swap variable trick:\nx, y = y, x',
    tags: ['tuples', 'collections']
  },
  {
    id: 'ref_025',
    module: 4,
    concept: 'open()',
    syntax: 'open(file, mode="r", encoding=None)',
    description: 'Opens a file path and returns a corresponding file stream object for reading/writing.',
    example: 'file = open("data.txt", "w")\nfile.write("Hello")\nfile.close()',
    tags: ['files', 'structure']
  },
  {
    id: 'ref_026',
    module: 4,
    concept: 'file.read()',
    syntax: 'file.read(size=-1)',
    description: 'Reads and returns the complete file contents as a single string (or up to size bytes).',
    example: 'with open("story.txt", "r") as f:\n    full_text = f.read()',
    tags: ['files', 'methods']
  },
  {
    id: 'ref_027',
    module: 4,
    concept: 'try / except',
    syntax: 'try:\n    # dangerous code\nexcept ExceptionType as err:\n    # error fallback\nfinally:\n    # runs always',
    description: 'Catches and handles runtime execution errors or exceptions gracefully.',
    example: 'try:\n    n = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")\nfinally:\n    print("Always executed")',
    tags: ['exceptions', 'safety']
  },
  {
    id: 'ref_028',
    module: 4,
    concept: 'assert',
    syntax: 'assert expression[, assertion_message]',
    description: 'A debugging statement that tests a condition; raises an AssertionError if it is False.',
    example: 'def check_age(age):\n    assert age >= 18, "Must be an adult!"\n    return True',
    tags: ['exceptions', 'assertions']
  },

  // --- MODULE 5: OBJECT-ORIENTED PROGRAMMING ---
  {
    id: 'ref_029',
    module: 5,
    concept: 'class / Class Blueprint',
    syntax: 'class ClassName:\n    # attributes and methods',
    description: 'Defines a custom object type combining state properties and executable behaviors.',
    example: 'class Dog:\n    pass\n\nmy_dog = Dog()  # Instantiates a Dog object',
    tags: ['oop', 'structure']
  },
  {
    id: 'ref_030',
    module: 5,
    concept: '__init__ Constructor',
    syntax: 'def __init__(self, parameters):\n    self.attribute = value',
    description: 'The standard initializer method invoked automatically when a new class instance is created.',
    example: 'class Robot:\n    def __init__(self, model):\n        self.model = model  # Instance attribute\n\nr = Robot("T-800")',
    tags: ['oop', 'structure']
  },
  {
    id: 'ref_031',
    module: 5,
    concept: 'self Keyword',
    syntax: 'self',
    description: 'Represents the specific instance of the class currently being manipulated.',
    example: 'class Counter:\n    def __init__(self):\n        self.count = 0\n    def inc(self):\n        self.count += 1  # References the counter itself',
    tags: ['oop', 'helpers']
  },
  {
    id: 'ref_032',
    module: 5,
    concept: 'Inheritance Syntax',
    syntax: 'class ChildClass(ParentClass):\n    # child body',
    description: 'Creates a specialized class subclass derived from a general base class.',
    example: 'class Animal:\n    def breathe(self): return True\n\nclass Cat(Animal):\n    def meow(self): return "Meow"\n\nc = Cat()\nprint(c.breathe())  # True (Inherited method!)',
    tags: ['oop', 'inheritance']
  },
  {
    id: 'ref_033',
    module: 5,
    concept: 'super()',
    syntax: 'super()',
    description: 'Returns a proxy object that delegates method calls to a parent or sibling class.',
    example: 'class Bird:\n    def __init__(self, species):\n        self.species = species\n\nclass Eagle(Bird):\n    def __init__(self, speed):\n        super().__init__("Eagle")  # Call parent constructor\n        self.speed = speed',
    tags: ['oop', 'inheritance']
  },
  {
    id: 'ref_034',
    module: 5,
    concept: '__str__ method',
    syntax: 'def __str__(self): return string',
    description: 'Defines the human-friendly string representation of an object returned by str(obj) or print(obj).',
    example: 'class Book:\n    def __init__(self, title):\n        self.title = title\n    def __str__(self):\n        return f"Book: {self.title}"\n\nb = Book("Pythonia Spec")\nprint(b)  # prints "Book: Pythonia Spec"',
    tags: ['oop', 'representation']
  }
];
