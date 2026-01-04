/**
 * Remove all types of comments from JavaScript code
 * @param {string} code - The JavaScript code string
 * @returns {string} The code without comments
 */
export default function deleteComments(code) {
  if (typeof code !== 'string') {
    throw new TypeError('Input must be a string');
  }

  let result = '';
  let i = 0;

  while (i < code.length) {
    const char = code[i];
    const nextChar = code[i + 1];

    // Preserve string literals
    if (char === '"' || char === "'" || char === '`') {
      const quote = char;
      result += char;
      i++;

      while (i < code.length) {
        if (code[i] === '\\' && i + 1 < code.length) {
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
      continue;
    }

    // Remove multi-line comments
    if (char === '/' && nextChar === '*') {
      i += 2;
      while (i < code.length - 1) {
        if (code[i] === '*' && code[i + 1] === '/') {
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
    result += char;
    i++;
  }

  return result;
}
