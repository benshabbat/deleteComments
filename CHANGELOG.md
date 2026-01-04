# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
