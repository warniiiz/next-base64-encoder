/**
 * Same than `Base64` but for Node environnements
 */

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
   * Takes a base64 encoded string ("base64" or "base64url") 
   * and converts it to a UInt8Array binary array.
   * @param {string} srcStr - base64 or base64url encoded string.
   * @returns a Uint8Array binary array
   */
  encode = (srcStr) => new Uint8Array(Buffer.from(srcStr, 'base64'));

}


export class Base64UrlEncoder {
  
  /**
   * Takes a base64 encoded string ("base64" or "base64url") 
   * and converts it to a UInt8Array binary array.
   * @param {string} srcStr - base64 or base64url encoded string.
   * @returns a Uint8Array binary array
   */
  encode = (srcStr) => new Uint8Array(Buffer.from(srcStr, 'base64url'));

}

export { Base64Format, Base64UrlFormat } from '../browser/index.js';

// Test purpose, to check correct webpack use of package.json instructions 
export const ENV = 'NODE|WORKER';
