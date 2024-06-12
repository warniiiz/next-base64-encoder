/**
 * @author   Clément Warneys <https://github.com/warniiiz>
 * @license  ISC
**/

/**
 * Same than `Base64` but for Node environnements
 */
import { Base64Format, Base64UrlFormat } from '../browser/index.js';


export class Base64Decoder {

  decode = (srcArray) => Buffer.from(srcArray).toString('base64');

  /**
   * Get the encoding used for decoding, i.e. 'base64'.
   *
   * @returns {string} The encoding used for decoding, which is always 'base64'
   * for a Base64Decoder class instance.
   */
  get encoding() { 
    return 'base64';
  }

}

export class Base64UrlDecoder {

  decode = (srcArray) => Buffer.from(srcArray).toString('base64url');

  /**
   * Get the encoding used for decoding, i.e. 'base64url'.
   *
   * @returns {string} The encoding used for decoding, which is always 'base64url'
   * for a Base64UrlDecoder class instance.
   */
  get encoding() { 
    return 'base64url';
  }

}

export class Base64Encoder {
  
  /**
   * Takes a base64 encoded string and converts it to a UInt8Array 
   * binary array.
   * @param {string} srcStr - base64 encoded string.
   * @returns a Uint8Array binary array
   */
  encode(base64String) {
    return new Uint8Array(Buffer.from(base64String, 'base64'));
  }

}


export class Base64UrlEncoder {
  
  /**
   * Takes a base64url encoded string and converts it to a UInt8Array 
   * binary array.
   * @param {string} srcStr - base64url encoded string.
   * @returns a Uint8Array binary array
   */
  encode(base64UrlString) {
    return new Uint8Array(Buffer.from(base64UrlString, 'base64url'));
  }

}


export class Base64SafeEncoder extends Base64Encoder {

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
  }
  
}

export class Base64UrlSafeEncoder extends Base64UrlEncoder {

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

export { Base64Format, Base64UrlFormat } 

// Test purpose, to check correct webpack use of package.json instructions 
export const ENV = 'NODE|WORKER';

