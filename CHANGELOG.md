# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.4] - 2026-01-04

### Security (Critical Updates)
- **Enhanced Path Traversal Protection**:
  - Added absolute path blocking (Windows and Unix)
  - Added UNC path blocking for Windows network shares
  - Implemented case-insensitive path validation for cross-platform security
  - Enhanced directory traversal prevention with normalized path comparison
- **Extended Sensitive File Blocking**:
  - Added certificate files (.p12, .pfx, .cer, .crt)
  - Added lock files (package-lock.json, yarn.lock, pnpm-lock.yaml)
  - Added config files (.npmrc, .yarnrc, config.json)
  - Added credential pattern matching
  - Added binary file blocking (.exe, .dll, .so, .dylib)
  - Added node_modules protection
- **STDIN Security**: Added 10MB size limit for piped input to prevent memory exhaustion attacks
- **Argument Validation**: Added validation for missing required arguments (e.g., -o flag)
- **Extended File Type Support**: Added .cjs and .jsx to supported extensions

### Fixed
- Fixed emoji encoding issues in CLI output messages (replaced with plain ASCII)
- Fixed potential argument injection vulnerability with -o flag

### Changed
- Updated security documentation with comprehensive examples and test cases
- Improved error messages for better clarity without exposing sensitive information

## [1.1.3] - 2026-01-04

### Fixed
- Removed emoji characters from README for better npm website display compatibility
- Fixed README rendering issues on npmjs.com

### Changed
- Converted all documentation to ASCII-only for maximum compatibility

## [1.1.2] - 2026-01-04

### Security
- Added path traversal protection to prevent accessing files outside working directory
- Added file type validation (only .js and .mjs files allowed)
- Added sensitive file blocking (.env, .git, .ssh, password, secret, key, pem files)
- Added file size validation in CLI (10MB limit)
- Added file existence and type checks (prevents processing directories)
- Added overwrite warnings for existing files

### Changed
- Enhanced CLI security with comprehensive input validation
- Improved error messages for security-related rejections

## [1.1.1] - 2026-01-04

### Changed
- Improved README.md formatting with horizontal dividers for better visual separation
- Added download badge to README
- Enhanced visual hierarchy with separators between sections

## [1.1.0] - 2026-01-04

### Added
- CLI tool for command-line usage
- Support for reading from files or stdin
- Output to stdout, file, or overwrite original file
- CLI options: --help, --version, --output, --overwrite
- Comprehensive CLI documentation in README

### Changed
- Enhanced README with CLI usage examples
- Updated package.json with bin field

## [1.0.1] - 2026-01-04

### Changed
- Improved README.md with better formatting and visual structure
- Added badges for npm version, license, and Node.js version
- Enhanced documentation with emojis and better organization
- Added tables for API reference
- Improved examples section with more use cases

## [1.0.0] - 2026-01-04

### Added
- Initial release
- Remove single-line comments (`//`)
- Remove multi-line comments (`/* */`)
- Remove JSDoc comments (`/** */`)
- Preserve comments inside string literals
- Input size validation (10MB limit) for DoS protection
- Memory-efficient array-based string building
- Type checking for input parameters
- Safe handling of unclosed comments

### Security
- DoS attack prevention with input size limits
- Memory exhaustion prevention with optimized string handling
- Infinite loop prevention for malformed comments
- Type validation for all inputs
