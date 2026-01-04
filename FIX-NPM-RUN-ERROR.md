# Fix for "npm warn Unknown cli config" Error

## The Problem

When you run:
```bash
npm run delc exc.js --overwrite
```

You get:
```
npm warn Unknown cli config "--overwrite". This will stop working in the next major version of npm.
```

## Why This Happens

`npm run` is for running **npm scripts**, not CLI tools directly. The `--overwrite` flag is being passed to npm itself, not to the delete-js-comments tool.

---

## ✅ SOLUTION 1: Use npx (RECOMMENDED)

```bash
npx delete-js-comments exc.js --overwrite
```

**This is the best way!** No installation needed, always works.

---

## ✅ SOLUTION 2: Install Globally

```bash
# Install once
npm install -g delete-js-comments

# Then use directly
delete-js-comments exc.js --overwrite
```

---

## ✅ SOLUTION 3: Use npm run with -- 

If you MUST use npm run, add `--` before arguments:

```bash
npm run delc -- exc.js --overwrite
```

But first, add to your `package.json`:
```json
{
  "scripts": {
    "delc": "delete-js-comments"
  }
}
```

---

## Quick Test

Try this right now:

```bash
# This works immediately (no installation)
npx delete-js-comments exc.js --overwrite
```

---

## Summary

| ❌ WRONG | ✅ CORRECT |
|----------|------------|
| `npm run delc exc.js --overwrite` | `npx delete-js-comments exc.js --overwrite` |
| | `delete-js-comments exc.js --overwrite` (if installed globally) |
| | `npm run delc -- exc.js --overwrite` (if script exists) |

**Best practice: Use `npx`** - it's simple, always works, and no setup needed!
