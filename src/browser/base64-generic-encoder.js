import { BASE64_MAP, BASE64URL_MAP } from './constants.js';

export class Base64GenericEncoder {

  /**
   * A unique decoding map the Base64 values of all possible characters for "base64" and "base64url" encoding.
   * @private
   */
  static #BASE64_DECODE_MAP = Array(256).fill(0).map((_, i) => 
    Math.max(
      0, 
      BASE64_MAP.indexOf(i), 
      BASE64URL_MAP.indexOf(i),
    ) & 0xFF
  )

  /**
   * Takes a base64 encoded string ("base64" or "base64url") 
   * and converts it to a UInt8Array binary array.
   * @param {string} srcStr - base64 or base64url encoded string.
   * @returns a Uint8Array binary array
   */
  encode(base64String) {

    const base64DecodeMap = Base64GenericEncoder.#BASE64_DECODE_MAP;

    const firstEqualPosition = base64String.indexOf('=');
    const srcLength = firstEqualPosition === -1 
      ? base64String.length
      : firstEqualPosition;

    const remainingChars = srcLength % 4;
    const bytesLength = Math.floor((srcLength / 4) * 3);
    const bytesArray = new Uint8Array(bytesLength);

    let strIdx = 0;
    let bytesIdx = 0;
    const stopLength = srcLength - remainingChars;
    for (; strIdx < stopLength; strIdx += 4) {
      const byte1 = base64DecodeMap[base64String.charCodeAt(strIdx)];
      const byte2 = base64DecodeMap[base64String.charCodeAt(strIdx+1)];
      const byte3 = base64DecodeMap[base64String.charCodeAt(strIdx+2)];
      const byte4 = base64DecodeMap[base64String.charCodeAt(strIdx+3)];
      const bytes = ( byte1 << 18 ) | ( byte2 << 12 ) | ( byte3 << 6 ) | byte4;
      bytesArray[bytesIdx++] = ( bytes >> 16 ) & 0xFF; 
      bytesArray[bytesIdx++] = ( bytes >> 8 ) & 0xFF;
      bytesArray[bytesIdx++] = bytes & 0xFF;
    }

    // 2 ending "="
    if ( remainingChars === 2 ) { 

      const byte1 = base64DecodeMap[base64String.charCodeAt(strIdx++)];
      const byte2 = base64DecodeMap[base64String.charCodeAt(strIdx++)];
      const bytes = ( byte1 << 18 ) | ( byte2 << 12 );
      bytesArray[bytesIdx++] = ( bytes >> 16 ) & 0xFF;
      bytesArray[bytesIdx++] = ( bytes >> 8 ) & 0xFF;

    // 1 ending "="
    } else if ( remainingChars === 3 ) { 

      const byte1 = base64DecodeMap[base64String.charCodeAt(strIdx++)];
      const byte2 = base64DecodeMap[base64String.charCodeAt(strIdx++)];
      const byte3 = base64DecodeMap[base64String.charCodeAt(strIdx++)];
      const bytes = ( byte1 << 18 ) | ( byte2 << 12 ) | ( byte3 << 6 );
      bytesArray[bytesIdx++] = ( bytes >> 16 ) & 0xFF;
      bytesArray[bytesIdx++] = ( bytes >> 8 ) & 0xFF;
      bytesArray[bytesIdx++] = bytes & 0xFF;

    }

    return bytesArray;

  };
  
}
