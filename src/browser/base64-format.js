export class Base64Format {

  /**
   * Regular expression pattern for validating base64 format.
   * @private
   */
  static #FORMAT_RE = /^(?:([a-zA-Z0-9+/]{2,})(={0,2})|)$/;

  /**
   * Checks if the given string is in valid Base64 format.
   * Check if characters are in the base64 set and if the length is a multiple of 4.
   *
   * @param {string} base64String - The string to be checked.
   * @returns {boolean} - Returns true if the string is in valid Base64 format, otherwise returns false.
   */
  check = (base64String) => Base64Format.#FORMAT_RE.test(base64String) && base64String.length % 4 === 0;

}
