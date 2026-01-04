import deleteComments from './index.js';

console.log('Testing delete-js-comments package...\n');

// Test 1: Single-line comments
const test1 = `
// This is a comment
const x = 5; // inline comment
let y = 10;
`;
console.log('Test 1 - Single-line comments:');
console.log('Input:', test1);
console.log('Output:', deleteComments(test1));
console.log('---\n');

// Test 2: Multi-line comments
const test2 = `
/* This is a 
   multi-line comment */
function hello() {
  return "world"; /* inline multi-line */
}
`;
console.log('Test 2 - Multi-line comments:');
console.log('Input:', test2);
console.log('Output:', deleteComments(test2));
console.log('---\n');

// Test 3: JSDoc comments
const test3 = `
/**
 * This is a JSDoc comment
 * @param {string} name
 * @returns {string}
 */
function greet(name) {
  return "Hello " + name;
}
`;
console.log('Test 3 - JSDoc comments:');
console.log('Input:', test3);
console.log('Output:', deleteComments(test3));
console.log('---\n');

// Test 4: Comments inside strings (should NOT be removed)
const test4 = `
const str1 = "This // is not a comment";
const str2 = 'This /* is also */ not a comment';
const str3 = \`This // stays\`;
`;
console.log('Test 4 - Comments inside strings:');
console.log('Input:', test4);
console.log('Output:', deleteComments(test4));
console.log('---\n');

// Test 5: Mixed
const test5 = `
// File header comment
/* Another comment */
const apiUrl = "https://api.example.com"; // API endpoint
/**
 * Process data
 */
function processData(data) {
  // Processing logic here
  return data.map(item => item * 2); /* multiply by 2 */
}
`;
console.log('Test 5 - Mixed comments:');
console.log('Input:', test5);
console.log('Output:', deleteComments(test5));
console.log('---\n');

console.log('All tests completed!');
