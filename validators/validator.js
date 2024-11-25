// Email regex pattern
const EMAIL_RX = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/

class Validator {
  /**
     * Creates a new Validator instance with an initialized Errors map
     */
  constructor() {
    this.errors = new Map()
  }

  /**
     * Returns true if there are no errors in the Errors map
     * @returns {boolean}
     */
  valid() {
    return this.errors.size === 0
  }

  /**
     * Adds an error message for a given field if it doesn't already exist
     * @param {string} key - The field name
     * @param {string} message - The error message
     */
  addError(key, message) {
    if (!this.errors.has(key)) {
      this.errors.set(key, message)
    }
  }

  /**
     * Adds an error message if the given condition is false
     * @param {boolean} ok - The condition to check
     * @param {string} key - The field name
     * @param {string} message - The error message
     */
  check(ok, key, message) {
    if (!ok) {
      this.addError(key, message)
    }
  }

  /**
     * Checks if a value is present in a list of strings
     * @param {string} value - The value to check
     * @param {...string} list - The list of valid values
     * @returns {boolean}
     */
  static in(value, ...list) {
    return list.includes(value)
  }

  /**
     * Checks if a value matches a regular expression
     * @param {string} value - The value to check
     * @param {RegExp} rx - The regular expression to match against
     * @returns {boolean}
     */
  static matches(value, rx) {
    return rx.test(value)
  }

  /**
     * Checks if all values in an array are unique
     * @param {string[]} values - The array of values to check
     * @returns {boolean}
     */
  static unique(values) {
    const uniqueValues = new Set(values)
    return values.length === uniqueValues.size
  }

  /**
     * Validates an email address
     * @param {string} email - The email address to validate
     * @returns {boolean}
     */
  static isValidEmail(email) {
    return EMAIL_RX.test(email)
  }

  /**
     * Gets all current validation errors
     * @returns {Object} An object containing all errors
     */
  getErrors() {
    return Object.fromEntries(this.errors)
  }
}

module.exports = { Validator, EMAIL_RX }