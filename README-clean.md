# delete-js-comments

[![npm version](https://img.shields.io/npm/v/delete-js-comments.svg?style=flat-square)](https://www.npmjs.com/package/delete-js-comments)
[![npm downloads](https://img.shields.io/npm/dm/delete-js-comments.svg?style=flat-square)](https://www.npmjs.com/package/delete-js-comments)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/delete-js-comments.svg?style=flat-square)](https://nodejs.org)

> A lightweight, fast, and secure package to remove all types of comments from JavaScript code

---

##  Features

-  **Fast & Efficient** - Optimized performance with array-based string building
-  **Secure** - Input validation and DoS protection built-in
-  **Zero Dependencies** - No external packages required
-  **Simple API** - Just one function, easy to use
-  **ES6 Modules** - Modern JavaScript support
-  **Safe** - Preserves comments inside string literals

### Removes All Comment Types

-  Single-line comments (`//`)
-  Multi-line comments (`/* */`)
-  JSDoc comments (`/** */`)
-  Inline comments

---

##  Installation

```bash
npm install delete-js-comments
```

Or install globally to use as a CLI tool:

```bash
npm install -g delete-js-comments
```

---

##  Quick Start

### As a Module

```javascript
import deleteComments from 'delete-js-comments';

const code = `
// This is a comment
const x = 5; // inline comment

/* Multi-line
   comment */
function hello() {
  return "world";
}
`;

const cleanCode = deleteComments(code);
console.log(cleanCode);
```

### As a CLI Tool

```bash
# Output to stdout
delete-js-comments input.js

# Save to output file
delete-js-comments input.js output.js

# Overwrite the input file
delete-js-comments input.js --overwrite

# Use with pipes
cat input.js | delete-js-comments > output.js
```

**Output:**
```javascript
const x = 5; 

function hello() {
  return "world";
}
```

##  API Reference

### Module API

### `deleteComments(code)`

Removes all comments from the provided JavaScript code string.

#### Parameters

| Parameter | Type   | Description                          |
|-----------|--------|--------------------------------------|
| `code`    | string | The JavaScript code containing comments |

#### Returns

| Type   | Description                |
|--------|----------------------------|
| string | The code without comments  |

#### Throws

| Error        | Condition                        |
|--------------|----------------------------------|
| `TypeError`  | If the input is not a string     |
| # CLI Usage

```bash
delete-js-comments [options] <input-file> [output-file]
```

#### Options

| Option              | Description                              |
|---------------------|------------------------------------------|
| `-h, --help`        | Show help message                        |
| `-v, --version`     | Show version number                      |
| `-o, --output <file>` | Specify output file (default: stdout) |
| `--overwrite`       | Overwrite the input file                 |

#### CLI Examples

```bash
# Remove comments and print to console
delete-js-comments app.js

# Save cleaned code to a new file
delete-js-comments app.js app.clean.js
delete-js-comments app.js -o app.clean.js

# Overwrite the original file
delete-js-comments app.js --overwrite

# Use with Unix pipes
cat app.js | delete-js-comments > cleaned.js
find . -name "*.js" -exec delete-js-comments {} {}.clean \;
```

---

##  Examples

### ModulengeError` | If input exceeds 10MB size limit |

##  Examples

### Example 1: Basic Usage

```javascript
import deleteComments from 'delete-js-comments';

const code = `
const x = 5; // This will be removed
const y = 10;
`;

console.log(deleteComments(code));
// Output:
// const x = 5; 
// const y = 10;
```

### Example 2: Preserve Strings

Comments inside string literals are preserved:

```javascript
const code = `
const url = "https://example.com"; // Real comment
const str = "This // is not a comment";
`;

console.log(deleteComments(code));
// Output:
// const url = "https://example.com"; 
// const str = "This // is not a comment";
```

### Example 3: Multiple Comment Types

```javascript
const code = `
/**
 * Function documentation
 * @param {number} x
 */
function calculate(x) {
  /* implementation */
  return x * 2; // multiply by 2
}
`;

console.log(deleteComments(code));
// Output:
// function calculate(x) {
//   return x * 2;
// }
---

```

##  Security

This package includes several security features:

-  **Input size limit** (10MB) to prevent DoS attacks
-  **Type validation** for all inputs
-  **Memory-safe** operations (no string concatenation in loops)
---

-  **Safe handling** of unclosed comments (prevents infinite loops)

For more details, see [SECURITY.md](SECURITY.md)

##  Testing

---

```bash
npm test
```

---

##  Performance

- **Memory efficient**: Uses array-based string building for O(n) complexity
- **Fast processing**: Optimized single-pass algorithm
- **No dependencies**: Minimal overhead

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
---

3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

MIT  [benshabbat](https://github.com/benshabbat)
---


##  Links

- [npm Package](https://www.npmjs.com/package/delete-js-comments)
- [GitHub Repository](https://github.com/benshabbat/deleteComments)
- [Report Issues](https://github.com/benshabbat/deleteComments/issues)
- [Changelog](CHANGELOG.md)

##  Show Your Support

Give a  if this project helped you!
