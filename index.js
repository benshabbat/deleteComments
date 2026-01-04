/**
 * Remove all types of comments from JavaScript code
 * Supports:
 * - Single-line comments (//)
 * - Multi-line comments
 * - JSDoc comments
 * 
 * @param {string} code - The JavaScript code string
 * @returns {string} - The code without comments
 */
function deleteComments(code) {
  if (typeof code !== 'string') {
    throw new TypeError('Input must be a string');
  }

  let result = '';
  let i = 0;
  
  while (i < code.length) {
    // Check for string literals (preserve comments inside strings)
    if (code[i] === '"' || code[i] === "'" || code[i] === '`') {
      const quote = code[i];
      result += code[i];
      i++;
      
      // Handle string content
      while (i < code.length) {
        if (code[i] === '\\' && i + 1 < code.length) {
          // Escaped character
          result += code[i] + code[i + 1];
          i += 2;
        } else if (code[i] === quote) {
          result += code[i];
          i++;
          break;
        } else {
          result += code[i];
          i++;
        }
      }
    }
    // Check for multi-line comment
    else if (code[i] === '/' && i + 1 < code.length && code[i + 1] === '*') {
      i += 2;
      // Skip until end of comment
      while (i < code.length - 1) {
        if (code[i] === '*' && code[i + 1] === '/') {
          i += 2;
          break;
        }
        i++;
      }
    }
    // Check for single-line comment
    else if (code[i] === '/' && i + 1 < code.length && code[i + 1] === '/') {
      i += 2;
      // Skip until end of line
      while (i < code.length && code[i] !== '\n' && code[i] !== '\r') {
        i++;
      }
    }
    // Regular code
    else {
      result += code[i];
      i++;
    }
  }
  
  return result;
}

module.exports = deleteComments;
