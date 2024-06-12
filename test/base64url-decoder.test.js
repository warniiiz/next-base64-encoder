import { Base64UrlDecoder as BrowserBase64UrlDecoder } from '../src/browser/index.js';
import { Base64UrlDecoder as NodeBase64UrlDecoder } from '../src/node/index.js';

[BrowserBase64UrlDecoder, NodeBase64UrlDecoder].forEach(Base64UrlDecoder => {

  describe('Base64UrlDecoder decode', () => {

  const decoder = new Base64UrlDecoder();

    it('should correctly convert a base64url string to a byte array', () => {
      const str = 'SGVsbG8sIHdvcmxkIQ'; // "Hello, world!" in base64url
      const byteArray = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]);
      const result = decoder.decode(byteArray);
      expect(result).toEqual(str);
    });

    it('should correctly convert a base64url string with all possible characters to a byte array', () => {
      const byteArray = Array(256).fill(0).map((_, i) => i);
      const str = 'AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0-P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn-AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq-wsbKztLW2t7i5uru8vb6_wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t_g4eLj5OXm5-jp6uvs7e7v8PHy8_T19vf4-fr7_P3-_w'; 
      const result = decoder.decode(byteArray);
      expect(result).toEqual(str);
    });
    
  });
  
});

