import { Base64GenericDecoder } from './base64-generic-decoder.js';
import { BASE64_MAP } from './constants.js';

export class Base64Decoder extends Base64GenericDecoder {
  
  /**
   * Get the encoding used for decoding, i.e. 'base64'.
   *
   * @returns {string} The encoding used for decoding, which is always 'base64'
   * for a Base64Decoder class instance.
   */
  get encoding() { 
    return 'base64';
  }

  /**
   * Takes a Uint8Array binary array and encodes it to a base64 string.
   * @param {Uint8Array} srcArray - Binary array to convert
   * @returns {string} - The base64 encoded string
   * 
   * @example
   * const base64String = Base64Decoder().decode(new Uint8Array([72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]));
   * console.log(base64String); // "SGVsbG8sIHdvcmxkIQ
   */
  decode = (srcArray) => super.decode(srcArray, BASE64_MAP, false);

}
