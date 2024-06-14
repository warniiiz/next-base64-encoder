/**
 * @author   Clément Warneys <https://github.com/warniiiz>
 * @license  ISC
**/

/**
 * _Above legal information shall remain separate in order webpack to be able to
 * remove it._
 * 
 * Constants are declared in a separate file for Tree shaking and optimization purposes.
 * Especially as they are generated, inducing uncertainty from webpack... 
 * 
 * Coding map containing the ASCII values of all possible characters for "base64url" encoding.
 */
export const BASE64URL_MAP = 
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  .split ('')
  .map(char => char.charCodeAt(0));
