# Publishing Guide

## Before Publishing to npm

### 1. Pre-publish Checklist

- [ ] All tests pass (`npm test`)
- [ ] README.md is up to date
- [ ] CHANGELOG.md is updated
- [ ] Version number is correct in package.json
- [ ] No sensitive data in code
- [ ] LICENSE file exists
- [ ] .npmignore configured correctly

### 2. Verify Package Contents

Run the following command to see what will be published:

```bash
npm pack --dry-run
```

Only these files should be included:
- index.js
- README.md
- LICENSE
- package.json

### 3. Test Locally

```bash
npm pack
npm install -g delete-js-comments-1.0.0.tgz
```

### 4. Publish to npm

**First time:**
```bash
npm login
npm publish
```

**Updates:**
```bash
# Patch version (bug fixes): 1.0.0 -> 1.0.1
npm version patch

# Minor version (new features): 1.0.0 -> 1.1.0
npm version minor

# Major version (breaking changes): 1.0.0 -> 2.0.0
npm version major

# Then publish
npm publish
```

### 5. After Publishing

- [ ] Verify on npmjs.com
- [ ] Test installation: `npm install delete-js-comments`
- [ ] Update GitHub repository
- [ ] Create a GitHub release/tag

## Security Considerations

✅ **This package is secure for npm publication:**

1. ✅ No sensitive data (API keys, passwords, etc.)
2. ✅ No personal information exposed
3. ✅ Input validation implemented
4. ✅ DoS protection enabled
5. ✅ Memory-safe operations
6. ✅ No external dependencies
7. ✅ Only essential files published
8. ✅ All code in English
9. ✅ MIT License included
10. ✅ Security policy documented

## npm Security Best Practices Applied

- 🔒 Input size limits (10MB max)
- 🔒 Type validation
- 🔒 Memory-efficient algorithms
- 🔒 No eval() or dynamic code execution
- 🔒 No file system access
- 🔒 No network requests
- 🔒 Pure function (no side effects)
- 🔒 Clear error messages

## Package Quality

- ✅ ES6 modules support
- ✅ Node.js >= 14.0.0
- ✅ Zero dependencies
- ✅ TypeScript-ready (JSDoc annotations)
- ✅ Well documented
- ✅ Comprehensive tests
- ✅ MIT Licensed

Your package is **ready for npm publication**! 🚀
