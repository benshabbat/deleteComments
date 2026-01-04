// ========================================
// File: example.js
// Author: Demo User
// Date: 2026-01-04
// ========================================

/**
 * This is a sample calculator class
 * It demonstrates various types of comments
 * that should be removed by our package
 */
class Calculator {
  // Constructor initializes the calculator
  constructor() {
    this.result = 0; // Store the current result
    this.history = []; /* Keep track of operations */
  }

  /**
   * Add two numbers together
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} The sum of a and b
   */
  add(a, b) {
    // Perform addition
    const sum = a + b;
    
    /* 
     * Update the result and history
     * This is important for tracking
     */
    this.result = sum;
    this.history.push(`${a} + ${b} = ${sum}`); // Add to history
    
    return sum; // Return the result
  }

  /**
   * Subtract b from a
   * @param {number} a - First number
   * @param {number} b - Number to subtract
   * @returns {number} The difference
   */
  subtract(a, b) {
    const diff = a - b; // Calculate difference
    this.result = diff;
    return diff;
  }

  // Multiply two numbers
  multiply(a, b) {
    /* 
       Multiplication operation
       Returns the product of two numbers
    */
    return a * b; // Simple multiplication
  }

  /**
   * Divide a by b
   * Handles division by zero
   */
  divide(a, b) {
    // Check for division by zero
    if (b === 0) {
      throw new Error("Cannot divide by zero"); // Throw error
    }
    
    /* Calculate and return the quotient */
    return a / b;
  }

  // Get the calculation history
  getHistory() {
    // Return a copy of the history array
    return [...this.history]; /* Spread operator */
  }

  /**
   * Clear all history and reset result
   * This method resets the calculator state
   */
  reset() {
    this.result = 0; // Reset result to zero
    this.history = []; // Clear history array
    // Calculator is now in initial state
  }
}

// Example usage of the calculator
const calc = new Calculator(); // Create new instance

// Perform some calculations
const sum = calc.add(5, 3); // 5 + 3 = 8
const product = calc.multiply(4, 7); // 4 * 7 = 28

/* 
   Test division operation
   Make sure it works correctly
*/
const quotient = calc.divide(10, 2); // 10 / 2 = 5

// Log results to console
console.log("Sum:", sum); // Should print 8
console.log("Product:", product); /* Should print 28 */
console.log("Quotient:", quotient); // Should print 5

/** 
 * Export the Calculator class
 * for use in other modules
 */
export default Calculator; // ES6 export
