import deleteComments from './index.js';
import { readFileSync, writeFileSync } from 'fs';

console.log('='.repeat(60));
console.log('Demo: Removing Comments from example.js');
console.log('='.repeat(60));

// Read the example file
const originalCode = readFileSync('./example.js', 'utf-8');

console.log('\n📄 ORIGINAL FILE (with comments):');
console.log('-'.repeat(60));
console.log(originalCode);

// Remove comments
const cleanCode = deleteComments(originalCode);

// Save the cleaned version
writeFileSync('./example.clean.js', cleanCode, 'utf-8');

console.log('\n✨ CLEANED FILE (comments removed):');
console.log('-'.repeat(60));
console.log(cleanCode);

console.log('\n📊 STATISTICS:');
console.log('-'.repeat(60));
console.log(`Original size: ${originalCode.length} characters`);
console.log(`Cleaned size: ${cleanCode.length} characters`);
console.log(`Removed: ${originalCode.length - cleanCode.length} characters`);
console.log(`Reduction: ${((1 - cleanCode.length / originalCode.length) * 100).toFixed(2)}%`);

console.log('\n✅ Cleaned file saved as: example.clean.js');
console.log('='.repeat(60));
