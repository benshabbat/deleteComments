# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.1.4+  | :white_check_mark: |
| 1.1.x   | :white_check_mark: |
| 1.0.x   | :x:                |

## Security Features

### Core Module Security

- **Input Size Limit**: Maximum 10MB input to prevent DoS attacks
- **Type Validation**: Strict type checking for input parameters
- **Memory Safety**: Uses array-based string building to prevent memory exhaustion
- **Infinite Loop Prevention**: Safe handling of unclosed comments

### CLI Security (v1.1.4+)

#### Path Traversal Protection
- **Absolute Path Blocking**: Rejects all absolute paths (C:\, /etc, etc.)
- **UNC Path Blocking**: Prevents access to network shares (\\server\share)
- **Directory Traversal**: Blocks `../` attempts to access parent directories
- **Case-Insensitive Checks**: Platform-agnostic path validation for Windows/Unix
- **Path Normalization**: Validates resolved paths stay within working directory

#### File Type Validation
- **JavaScript Only**: Processes only `.js`, `.mjs`, `.cjs`, `.jsx` files
- **Extension Validation**: Validates both input and output file extensions
- **Binary File Blocking**: Rejects executable and binary files (`.exe`, `.dll`, `.so`)

#### Sensitive File Blocking
Automatically blocks access to:
- **Credentials**: `.env`, `.key`, `.pem`, `.p12`, `.pfx`, `.cer`, `.crt`
- **Configuration**: `config.json`, `.npmrc`, `.yarnrc`
- **Lock Files**: `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`
- **Version Control**: `.git`, `.gitignore`, `.ssh`
- **Keywords**: Files containing `password`, `secret`, `credential`
- **System Files**: `node_modules`, binary executables

#### Input Validation
- **File Size Limits**: Maximum 10MB per file (both file input and stdin)
- **File Type Checks**: Ensures input is a regular file (not directory or special file)
- **Existence Validation**: Verifies file exists before processing
- **Argument Validation**: Checks all required arguments are provided
- **STDIN Protection**: Size limit enforced on piped input to prevent memory exhaustion

#### Additional Safety Features
- **Overwrite Protection**: Validates paths before allowing file overwrites
- **Warning Messages**: Alerts when overwriting existing files
- **Safe Error Messages**: No sensitive information leaked in error messages

### What We Block

```bash
# Path Traversal Attacks
delete-js-comments ../../../etc/passwd                    # ✗ Blocked
delete-js-comments C:\Windows\System32\config.sys         # ✗ Blocked
delete-js-comments \\server\share\file.js                 # ✗ Blocked

# Sensitive Files
delete-js-comments .env                                   # ✗ Blocked
delete-js-comments secrets/api.key                        # ✗ Blocked
delete-js-comments package-lock.json                      # ✗ Blocked
delete-js-comments password-manager.js                    # ✗ Blocked
delete-js-comments config.json                            # ✗ Blocked

# Non-JavaScript Files
delete-js-comments README.md                              # ✗ Blocked
delete-js-comments script.py                              # ✗ Blocked
delete-js-comments app.exe                                # ✗ Blocked

# Size Limits
delete-js-comments huge-bundle.js                         # ✗ Blocked if > 10MB
cat 20mb-file.js | delete-js-comments                     # ✗ Blocked

# Invalid Arguments
delete-js-comments file.js -o                             # ✗ Blocked (missing output path)
```

### What We Allow

```bash
# Valid JavaScript files in current directory or subdirectories
delete-js-comments app.js                                 # ✓ Allowed
delete-js-comments src/components/Button.jsx              # ✓ Allowed
delete-js-comments lib/utils.mjs                          # ✓ Allowed
delete-js-comments server.cjs                             # ✓ Allowed

# With output
delete-js-comments input.js output.js                     # ✓ Allowed
delete-js-comments app.js -o build/app.js                 # ✓ Allowed

# Overwrite mode
delete-js-comments src/app.js --overwrite                 # ✓ Allowed

# STDIN piping
cat app.js | delete-js-comments                           # ✓ Allowed
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
