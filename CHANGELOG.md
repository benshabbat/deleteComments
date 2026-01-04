# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
