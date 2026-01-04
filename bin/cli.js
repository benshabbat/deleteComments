#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import deleteComments from '../index.js';

const args = process.argv.slice(2);

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
    const filePath = resolve(process.cwd(), inputFile);
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
      // Overwrite input file
      const filePath = resolve(process.cwd(), inputFile);
      writeFileSync(filePath, cleanCode, 'utf-8');
      console.error(`✓ File updated: ${inputFile}`);
    } else if (outputFile) {
      // Write to output file
      const filePath = resolve(process.cwd(), outputFile);
      writeFileSync(filePath, cleanCode, 'utf-8');
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
