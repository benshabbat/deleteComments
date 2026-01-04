# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Features

This package includes the following security measures:

- **Input Size Limit**: Maximum 10MB input to prevent DoS attacks
- **Type Validation**: Strict type checking for input parameters
- **Memory Safety**: Uses array-based string building to prevent memory exhaustion
- **Infinite Loop Prevention**: Safe handling of unclosed comments

## Reporting a Vulnerability

If you discover a security vulnerability, please email the maintainer or open a security advisory on GitHub.

Please do NOT open a public issue for security vulnerabilities.

### What to include in your report:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We take all security reports seriously and will respond within 48 hours.
