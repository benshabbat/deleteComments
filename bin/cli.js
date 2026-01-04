#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { resolve, normalize, isAbsolute } from 'path';
import deleteComments from '../index.js';

const args = process.argv.slice(2);

// Security: Validate file path to prevent path traversal attacks
function isPathSafe(filePath) {
  const normalizedPath = normalize(filePath);
  const resolvedPath = resolve(process.cwd(), normalizedPath);
  const cwd = process.cwd();
  
  // Prevent path traversal outside current working directory
  if (!resolvedPath.startsWith(cwd)) {
    return false;
  }
  
  // Block access to sensitive files
  const sensitivePatterns = [
    /\.env$/i,
    /\.git/i,
    /\.ssh/i,
    /password/i,
    /secret/i,
    /\.key$/i,
    /\.pem$/i
  ];
  
  return !sensitivePatterns.some(pattern => pattern.test(normalizedPath));
}

// Security: Validate file extension
function isJavaScriptFile(filePath) {
  return /\.m?js$/i.test(filePath);
}

function showHelp() {
  console.log(`
Usage: delete-js-comments [options] <input-file> [output-file]

Options:
  -h, --help              Show this help message
  -v, --version           Show version number
  -o, --output <file>     Specify output file (default: stdout)
  --overwrite             Overwrite the input file

Examples:
  # Output to stdout
  delete-js-comments input.js

  # Save to output file
  delete-js-comments input.js output.js
  delete-js-comments input.js -o output.js

  # Overwrite input file
  delete-js-comments input.js --overwrite

  # Use with pipes
  cat input.js | delete-js-comments
  `);
}

function showVersion() {
  const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
  console.log(packageJson.version);
}

// Handle help and version
if (args.includes('-h') || args.includes('--help')) {
  showHelp();
  process.exit(0);
}

if (args.includes('-v') || args.includes('--version')) {
  showVersion();
  process.exit(0);
}

// Parse arguments
let inputFile = null;
let outputFile = null;
let overwrite = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  
  if (arg === '-o' || arg === '--output') {
    outputFile = args[++i];
  } else if (arg === '--overwrite') {
    overwrite = true;
  } else if (!inputFile) {
    inputFile = arg;
  } else if (!outputFile) {
    outputFile = arg;
  }
}

// Read input
let code = '';

if (inputFile) {
  // Read from file
  try {
    // Security: Validate file path
    if (!isPathSafe(inputFile)) {
      console.error('Error: Access denied - potentially unsafe file path');
      process.exit(1);
    }
    
    // Security: Validate file extension
    if (!isJavaScriptFile(inputFile)) {
      console.error('Error: Only JavaScript files (.js, .mjs) are supported');
      process.exit(1);
    }
    
    const filePath = resolve(process.cwd(), inputFile);
    
    // Security: Check if file exists and is readable
    if (!existsSync(filePath)) {
      console.error(`Error: File not found: ${inputFile}`);
      process.exit(1);
    }
    
    // Security: Check if it's a file (not directory or special file)
    const stats = statSync(filePath);
    if (!stats.isFile()) {
      console.error('Error: Path must be a regular file');
      process.exit(1);
    }
    
    // Security: Check file size (max 10MB as per main module)
    const maxSize = 10 * 1024 * 1024;
    if (stats.size > maxSize) {
      console.error(`Error: File too large (max ${maxSize} bytes)`);
      process.exit(1);
    }
    
    code = readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    process.exit(1);
  }
} else {
  // Read from stdin
  if (process.stdin.isTTY) {
    console.error('Error: No input file specified and no data piped to stdin');
    console.error('Use --help for usage information');
    process.exit(1);
  }

  const chunks = [];
  process.stdin.setEncoding('utf-8');
  
  process.stdin.on('data', chunk => {
    chunks.push(chunk);
  });

  process.stdin.on('end', () => {
    code = chunks.join('');
    processCode(code);
  });

  // Exit early, processing will happen in stdin.on('end')
  function processCode(inputCode) {
    try {
      const cleanCode = deleteComments(inputCode);
      console.log(cleanCode);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
}

// Process file input
if (inputFile) {
  try {
    const cleanCode = deleteComments(code);

    if (overwrite) {
      // Security: Validate output path
      if (!isPathSafe(inputFile)) {
        console.error('Error: Access denied - cannot overwrite this file');
        process.exit(1);
      }
      
      // Overwrite input file
      const filePath = resolve(process.cwd(), inputFile);
      writeFileSync(filePath, cleanCode, 'utf-8');
      console.error(`✓ File updated: ${inputFile}`);
    } else if (outputFile) {
      // Security: Validate output path
      if (!isPathSafe(outputFile)) {
        console.error('Error: Access denied - unsafe output path');
        process.exit(1);
      }
      
      // Security: Validate output file extension
      if (!isJavaScriptFile(outputFile)) {
        console.error('Error: Output must be a JavaScript file (.js, .mjs)');
        process.exit(1);
      }
      
      // Security: Warn if overwriting existing file
      const outputPath = resolve(process.cwd(), outputFile);
      if (existsSync(outputPath)) {
        console.error(`Warning: Overwriting existing file: ${outputFile}`);
      }
      
      // Write to output file
      writeFileSync(outputPath, cleanCode, 'utf-8');
      console.error(`✓ Output written to: ${outputFile}`);
    } else {
      // Output to stdout
      console.log(cleanCode);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
