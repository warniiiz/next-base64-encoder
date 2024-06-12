import { Base64GenericDecoder } from './base64-generic-decoder.js';
import { BASE64URL_MAP } from './constants.js';

export class Base64UrlDecoder extends Base64GenericDecoder {

  /**
   * Get the encoding used for decoding, i.e. 'base64url'.
   *
   * @returns {string} The encoding used for decoding, which is always 'base64url'
   * for a Base64UrlDecoder class instance.
   */
  get encoding() { 
    return 'base64url';
  }

  /**
   * Takes a Uint8Array binary array and encodes it to a base64url string.
   * @param {Uint8Array} srcArray - Binary array to convert
   * @returns {string} - The base64url encoded string
   * 
   * @example
   * const base64String = Base64UrlDecoder().decode(new Uint8Array([72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]));
   * console.log(base64String); // "SGVsbG8sIHdvcmxkIQ
   */
  decode(srcArray) {
    return super.decode(srcArray, BASE64URL_MAP, true);
  }

}
