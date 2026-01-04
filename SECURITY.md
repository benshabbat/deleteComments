# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | :white_check_mark: |
| 1.0.x   | :white_check_mark: |

## Security Features

### Core Module Security

- **Input Size Limit**: Maximum 10MB input to prevent DoS attacks
- **Type Validation**: Strict type checking for input parameters
- **Memory Safety**: Uses array-based string building to prevent memory exhaustion
- **Infinite Loop Prevention**: Safe handling of unclosed comments

### CLI Security (v1.1.2+)

- **Path Traversal Protection**: Prevents access outside current working directory
- **File Type Validation**: Only processes JavaScript files (.js, .mjs)
- **Sensitive File Blocking**: Blocks access to:
  - `.env` files
  - `.git` directories
  - `.ssh` directories
  - Files containing `password`, `secret`, `key`, `pem` in their path
- **File Size Limits**: Maximum 10MB per file
- **File Type Validation**: Ensures input/output are regular files (not directories or special files)
- **Existence Checks**: Validates file exists before processing
- **Overwrite Warnings**: Alerts when overwriting existing files

### What We Block

```bash
# ✗ Path traversal attempts
delete-js-comments ../../../etc/passwd

# ✗ Sensitive files
delete-js-comments .env
delete-js-comments secrets/api.key

# ✗ Non-JavaScript files
delete-js-comments README.md
delete-js-comments script.py

# ✗ Files over 10MB
delete-js-comments huge-bundle.js  # if > 10MB
```

## Reporting a Vulnerability

If you discover a security vulnerability, please email the maintainer or open a security advisory on GitHub.

Please do NOT open a public issue for security vulnerabilities.

### What to include in your report:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We take all security reports seriously and will respond within 48 hours.
