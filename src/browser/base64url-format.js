export class Base64UrlFormat {

  /**
   * Regular expression pattern for validating base64url format.
   * @private
   */
  static #FORMAT_RE = /^[a-zA-Z0-9_-]{2,}$/;

  /**
   * Checks if the given string is in valid Base64Url format.
   *
   * @param {string} base64urlString - The string to be checked.
   * @returns {boolean} - Returns true if the string is in valid Base64Url format, otherwise returns false.
   */
  check = (base64String) => Base64UrlFormat.#FORMAT_RE.test(base64String) && base64String.length % 4 !== 1;
  
  
}
