/**
 * Constants are in a separate file for Tree shaking and optimization purposes.
 */

/**
 * Coding map containing the ASCII values of all possible characters for "base64" encoding.
 */
export const BASE64_MAP = 
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  .split ('')
  .map(char => char.charCodeAt(0));

/**
 * Coding map containing the ASCII values of all possible characters for "base64url" encoding.
 */
export const BASE64URL_MAP = 
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  .split ('')
  .map(char => char.charCodeAt(0));
