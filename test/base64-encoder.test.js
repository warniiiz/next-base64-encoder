import { Base64Encoder as BrowserBase64Encoder } from '../src/browser/index.js';
import { Base64Encoder as NodeBase64Encoder } from '../src/node/index.js';

[BrowserBase64Encoder, NodeBase64Encoder].forEach(Base64Encoder => {

  const encoder = new Base64Encoder();

  describe('Base64Encoder encode', () => {

    it('should correctly convert a base64 string to a byte array', () => {
      const str = 'SGVsbG8sIHdvcmxkIQ=='; // "Hello, world!" in base64
      const result = encoder.encode(str);
      expect(result).toEqual(new Uint8Array([72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]));
    });
    
    it('should return an empty byte array for an empty string', () => {
      const str = '';
      const result = encoder.encode(str);
      expect(result).toEqual(new Uint8Array([]));
    });

    it('should correctly convert a base64 string with all possible characters to a byte array', () => {
      const byteArray = Array(256).fill(0).map((_, i) => i);
      const str = 'AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w=='; 
      const result = encoder.encode(str);
      expect(result).toEqual(new Uint8Array(byteArray));
    });

  });

});
