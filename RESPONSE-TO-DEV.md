Response to Developer Error
===========================

Hi! The error you received happens because you're using `npm run` incorrectly.

❌ What doesn't work:
```bash
npm run delc exc.js --overwrite
# npm warn Unknown cli config "--overwrite"
```

✅ Simplest solution - Use npx:
```bash
npx delete-js-comments exc.js --overwrite
```

This will work **immediately** without any installation!

--------------------------------

Alternative Options:
====================

1. Global installation (one-time):
   ```bash
   npm install -g delete-js-comments
   delete-js-comments exc.js --overwrite
   ```

2. If you really want to use npm run:
   Add to package.json:
   ```json
   {
     "scripts": {
       "clean": "delete-js-comments"
     }
   }
   ```
   
   Then run with -- before arguments:
   ```bash
   npm run clean -- exc.js --overwrite
   ```

--------------------------------

Why did this happen?
====================

When `npm run` sees `--overwrite`, it thinks it's a flag for npm itself,
not for the tool you want to run.

`npx` is designed exactly for this - to run CLI tools.

--------------------------------

Usage Examples:
===============

# Display cleaned code
npx delete-js-comments app.js

# Save to new file
npx delete-js-comments app.js app.clean.js

# Overwrite original file
npx delete-js-comments app.js --overwrite

# With pipes
cat app.js | npx delete-js-comments > clean.js

--------------------------------

Need More Help?
===============

The package has been updated (v1.1.5) with complete documentation.
Check out:
- USAGE-GUIDE.md - Complete guide
- FIX-NPM-RUN-ERROR.md - Explanation of this error
- README.md - Usage examples

npm: https://www.npmjs.com/package/delete-js-comments
