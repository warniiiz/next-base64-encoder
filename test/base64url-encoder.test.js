import { Base64UrlEncoder as BrowserBase64UrlEncoder } from '../src/browser/index.js';
import { Base64UrlEncoder as NodeBase64UrlEncoder } from '../src/node/index.js';

[BrowserBase64UrlEncoder, NodeBase64UrlEncoder].forEach(Base64UrlEncoder => {

  const encoder = new Base64UrlEncoder();
    
  describe('Base64UrlEncoder encode', () => {

    it('should correctly convert a base64url string to a byte array', () => {
      const str = 'SGVsbG8sIHdvcmxkIQ'; // "Hello, world!" in base64url
      const result = encoder.encode(str);
      expect(result).toEqual(new Uint8Array([72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]));
    });

    it('should correctly convert a base64url string with all possible characters to a byte array', () => {
      const byteArray = Array(256).fill(0).map((_, i) => i);
      const str = 'AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0-P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn-AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq-wsbKztLW2t7i5uru8vb6_wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t_g4eLj5OXm5-jp6uvs7e7v8PHy8_T19vf4-fr7_P3-_w'; 
      const result = encoder.encode(str);
      expect(result).toEqual(new Uint8Array(byteArray));
    });

  });

});

