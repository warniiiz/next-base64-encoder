import { Base64GenericEncoder } from './base64-generic-encoder.js';
import { Base64UrlFormat } from './base64url-format.js';

export class Base64UrlSafeEncoder extends Base64GenericEncoder {

  /**
   * Takes a base64url encoded string and converts it to a UInt8Array 
   * binary array.
   * @param {string} srcStr - base64url encoded string.
   * @returns a Uint8Array binary array
   * @throws {TypeError} - If the base64url string is invalid
   */
  encode(base64UrlString) {
    if (!Base64UrlFormat.check(base64UrlString))
      throw new TypeError(`Invalid base64url format: ${base64UrlString}`);
    return super.encode(base64UrlString);
  };
  
}
