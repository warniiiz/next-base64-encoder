/**
 * The `Base64` module provides 3 classes:
 * - `Base64Decoder` : for decoding binary array to "base64" string ;
 * - `Base64UrlDecoder` : for decoding binary array to "base64url" string ;
 * - `Base64Encoder` : for encoding "base64" or "base64url" strings to binary array.
 * 
 * `Base64Encoder` gets the same instance method than the built-in `TextEncoder` class, 
 * i.e. `encode()`, which takes a string and returns a binary array.
 * 
 * `Base64Decoder` and `Base64UrlDecoder` get the same instance method and property
 *  than the built-in `TextDecoder` class, i.e. `encoding` which returns a string containing 
 * the name of the decoder, and `decode()`, which takes a binary array and returns 
 * a "base64" or "base64url" string.
 * 
 * Encoding and decoding methods are pure JS functions, with no dependencies and 
 * have been fully optimized. 
 * 
 * They have best performances than built-in functions to convert small strings. 
 * For example, better or equivalent performance than Node.js encoder, 
 * for encoding or decoding 48 bytes-length strings. Performance decrease rapidly 
 * for larger strings.
 * 
 * @example
 * const phrase = "Hello, Mr warniiiz!";
 * // Get a binary array from a string
 * const phraseArray = new TextEncoder().encode(phrase);
 * // Encode the binary array to a base64 string
 * const base64EncodedPhrase = Base64Decoder().decode(phraseArray);
 * // SGVsbG8sIE1yIHdhcm5paWl6IQ==
 * 
 * @example
 * const decodedPhraseArray = Base64Encoder().encode(base64EncodedPhrase);
 * // Uint8Array(19) [ 72, 101, 108, 108, 111,  44, 32, 77, 114, 32, 119,  97, 114, 110, 105, 105, 105, 122, 33 ]
 * 
 * // Decode the binary array to a UTF-8 string
 * const phraseArray = new TextDecoder().decode(decodedPhraseArray);
 * // "Hello, Mr warniiiz!"
 * 
 * @author   Clément Warneys <https://github.com/warniiiz>
 * @license  ISC
 */

export { Base64Decoder } from './base64-decoder.js';
export { Base64UrlDecoder } from './base64url-decoder.js';
export { Base64GenericEncoder as Base64Encoder } from './base64-generic-encoder.js';
export { Base64GenericEncoder as Base64UrlEncoder } from './base64-generic-encoder.js';
export { Base64Format } from './base64-format.js';
export { Base64UrlFormat } from './base64url-format.js';

// Test purpose, to check correct webpack use of package.json instructions 
export const ENV = 'PURE-JS';
