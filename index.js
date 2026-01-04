/**
 * Remove all types of comments from JavaScript code
 * @param {string} code - The JavaScript code string
 * @returns {string} The code without comments
 */
export default function deleteComments(code) {
  if (typeof code !== 'string') {
    throw new TypeError('Input must be a string');
  }

  // Security: Limit input size to prevent DoS attacks (10MB limit)
  const MAX_INPUT_SIZE = 10 * 1024 * 1024;
  if (code.length > MAX_INPUT_SIZE) {
    throw new RangeError('Input size exceeds maximum allowed (' + MAX_INPUT_SIZE + ' characters)');
  }

  // Security: Use array for better memory performance
  const result = [];
  let i = 0;

  while (i < code.length) {
    const char = code[i];
    const nextChar = code[i + 1];

    // Preserve string literals
    if (char === '"' || char === "'" || char === '`') {
      const quote = char;
      result.push(char);
      i++;

      while (i < code.length) {
        if (code[i] === '\\' && i + 1 < code.length) {
          result.push(code[i], code[i + 1]);
          i += 2;
        } else if (code[i] === quote) {
          result.push(code[i]);
          i++;
          break;
        } else {
          result.push(code[i]);
          i++;
        }
      }
      continue;
    }

    // Remove multi-line comments
    if (char === '/' && nextChar === '*') {
      i += 2;
      // Security: Prevent infinite loop on unclosed comments
      while (i < code.length) {
        if (i < code.length - 1 && code[i] === '*' && code[i + 1] === '/') {
          i += 2;
          break;
        }
        i++;
      }
      continue;
    }

    // Remove single-line comments
    if (char === '/' && nextChar === '/') {
      i += 2;
      while (i < code.length && code[i] !== '\n' && code[i] !== '\r') {
        i++;
      }
      continue;
    }

    // Regular code
    result.push(char);
    i++;
  }

  return result.join('');
}
