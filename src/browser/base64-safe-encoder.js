import { Base64GenericEncoder } from './base64-generic-encoder.js';
import { Base64Format } from './base64-format.js';

export class Base64SafeEncoder extends Base64GenericEncoder {

  /**
   * Takes a base64 encoded string and converts it to a UInt8Array 
   * binary array.
   * @param {string} srcStr - base64 encoded string.
   * @returns a Uint8Array binary array
   * @throws {TypeError} - If the base64 string is invalid
   */
  encode(base64String) {
    if (!Base64Format.check(base64String))
      throw new TypeError(`Invalid base64 format: ${base64String}`);
    return super.encode(base64String);
  };
  
}
