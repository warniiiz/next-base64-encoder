export class Base64GenericDecoder {

  /**
   * A TextDecoder instance used for decoding binary data to UTF-8.
   * @private
   */
  static #DECODER = new TextDecoder();

  decode(srcArray, base64Map, url) {

    const srcLength = srcArray.length;
    const base64Length = url ? Math.ceil( srcLength / 3 * 4 ) : Math.ceil( srcLength / 3 ) * 4;
    const remainingBytes = ( srcLength % 3 );
    const base64Array = new Uint8Array(base64Length);
  
    let srcIdx = 0;
    let base64Idx = 0;
    const stopLength = srcLength - remainingBytes;
    for (; srcIdx < stopLength; srcIdx += 3) {
      const byte1 = srcArray[srcIdx];
      const byte2 = srcArray[srcIdx+1];
      const byte3 = srcArray[srcIdx+2];
      const bytes = ( byte1 << 16 ) | ( byte2 << 8 ) | byte3;
      base64Array[base64Idx++] = base64Map[( bytes & 0b11111100_00000000_00000000 ) >> 18];
      base64Array[base64Idx++] = base64Map[( bytes & 0b00000011_11110000_00000000 ) >> 12];
      base64Array[base64Idx++] = base64Map[( bytes & 0b00000000_00001111_11000000 ) >> 6];
      base64Array[base64Idx++] = base64Map[( bytes & 0b00000000_00000000_00111111 )];
    }
  
    // 1 remaining byte, 2 padding characters
    if ( remainingBytes === 1 ) { 
  
      const byte1 = srcArray[srcIdx++];
      const bytes = byte1 << 16;
      base64Array[base64Idx++] = base64Map[( bytes & 0b11111100_00000000_00000000 ) >> 18];
      base64Array[base64Idx++] = base64Map[( bytes & 0b00000011_11110000_00000000 ) >> 12];
      if (!url) {
        // ASCII code for '='
        base64Array[base64Idx++] = base64Array[base64Idx++] = 61; 
      }
  
    // 2 remaining bytes, 1 padding character
    } else if ( remainingBytes === 2 ) { 
  
      const byte1 = srcArray[srcIdx++];
      const byte2 = srcArray[srcIdx++];
      const bytes = ( byte1 << 16 ) | ( byte2 << 8 );
      base64Array[base64Idx++] = base64Map[( bytes & 0b11111100_00000000_00000000 ) >> 18];
      base64Array[base64Idx++] = base64Map[( bytes & 0b00000011_11110000_00000000 ) >> 12];
      base64Array[base64Idx++] = base64Map[( bytes & 0b00000000_00001111_11000000 ) >> 6];
      if (!url) {
        // ASCII code for '='
        base64Array[base64Idx++] = 61; 
      }
  
    }
  
    return Base64GenericDecoder.#DECODER.decode(base64Array);
  
  };

}