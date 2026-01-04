# Usage Guide - delete-js-comments

## Installation & Usage Methods

### Method 1: Using npx (RECOMMENDED - No Installation Required)

```bash
# Process file and output to stdout
npx delete-js-comments input.js

# Overwrite the original file
npx delete-js-comments input.js --overwrite

# Save to different file
npx delete-js-comments input.js output.js
```

**Advantages:**
- No installation needed
- Always uses latest version
- Works immediately

---

### Method 2: Global Installation

```bash
# Install globally
npm install -g delete-js-comments

# Use directly from anywhere
delete-js-comments input.js --overwrite
delete-js-comments src/app.js dist/app.js
```

**Advantages:**
- Faster execution (no download)
- Available everywhere
- Simple command

---

### Method 3: Local Installation

```bash
# Install in project
npm install delete-js-comments

# Use with npx
npx delete-js-comments input.js --overwrite

# Or use in package.json scripts
```

---

### Method 4: Package.json Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "clean": "delete-js-comments",
    "clean-src": "delete-js-comments src/**/*.js --overwrite"
  }
}
```

Then run:

```bash
# Pass arguments after --
npm run clean -- input.js --overwrite

# Or use predefined scripts
npm run clean-src
```

**Note:** When using `npm run`, you MUST use `--` before the arguments to pass them to the script.

---

## Common Mistakes & Solutions

### ❌ WRONG: Using npm run without --

```bash
npm run delete-js-comments exc.js --overwrite
# Error: npm warn Unknown cli config "--overwrite"
```

### ✅ CORRECT: Add -- before arguments

```bash
npm run delete-js-comments -- exc.js --overwrite
```

### ✅ BETTER: Use npx instead

```bash
npx delete-js-comments exc.js --overwrite
```

---

## All CLI Options

```bash
# Show help
delete-js-comments --help
npx delete-js-comments --help

# Show version
delete-js-comments --version
npx delete-js-comments --version

# Output to stdout (default)
delete-js-comments input.js

# Save to specific file
delete-js-comments input.js output.js
delete-js-comments input.js -o output.js

# Overwrite original file
delete-js-comments input.js --overwrite

# Use with pipes
cat input.js | delete-js-comments > output.js
```

---

## Examples for Different Scenarios

### Single File Processing

```bash
# View cleaned code
npx delete-js-comments app.js

# Save to new file
npx delete-js-comments app.js app.clean.js

# Overwrite original
npx delete-js-comments app.js --overwrite
```

### Multiple Files (PowerShell)

```powershell
# Process all JS files in directory
Get-ChildItem -Path src -Filter *.js -Recurse | ForEach-Object {
    npx delete-js-comments $_.FullName --overwrite
}
```

### Multiple Files (Bash/Linux)

```bash
# Process all JS files
find src -name "*.js" -exec npx delete-js-comments {} --overwrite \;
```

### In Build Process

```json
{
  "scripts": {
    "prebuild": "npx delete-js-comments src/app.js --overwrite",
    "build": "webpack",
    "clean:comments": "npx delete-js-comments src/**/*.js --overwrite"
  }
}
```

---

## Module Usage (Programmatic)

```javascript
import deleteComments from 'delete-js-comments';

const code = `
// This is a comment
const x = 5; // inline comment
`;

const cleanCode = deleteComments(code);
console.log(cleanCode);
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Quick test | `npx delete-js-comments file.js` |
| Overwrite file | `npx delete-js-comments file.js --overwrite` |
| Save to new file | `npx delete-js-comments input.js output.js` |
| Global install | `npm install -g delete-js-comments` |
| Use globally | `delete-js-comments file.js --overwrite` |
| In npm script | `npm run clean -- file.js --overwrite` |
| Show help | `npx delete-js-comments --help` |

---

## Troubleshooting

### Issue: "Unknown cli config" error

**Problem:**
```bash
npm run script exc.js --overwrite
# npm warn Unknown cli config "--overwrite"
```

**Solution:**
Don't use `npm run` for CLI tools. Use `npx` instead:
```bash
npx delete-js-comments exc.js --overwrite
```

### Issue: "command not found"

**Solution:**
```bash
# Either install globally
npm install -g delete-js-comments

# Or use npx
npx delete-js-comments file.js
```

### Issue: "Access denied" error

**Cause:** Trying to access files outside working directory or sensitive files

**Solution:** Only process JavaScript files in your current directory or subdirectories

---

## Security Notes

The CLI includes security features that may block certain operations:

- ✗ Cannot access files outside current directory (`../../../etc/passwd`)
- ✗ Cannot process sensitive files (`.env`, `.key`, `password.js`)
- ✗ Cannot process non-JavaScript files (`.txt`, `.json`)
- ✗ Files larger than 10MB are rejected

See [SECURITY.md](SECURITY.md) for full details.
