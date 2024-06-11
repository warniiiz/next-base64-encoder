import { Base64Decoder as BrowserBase64Decoder } from '../src/browser/index.js';
import { Base64Decoder as NodeBase64Decoder } from '../src/node/index.js';

[BrowserBase64Decoder, NodeBase64Decoder].forEach(Base64Decoder => {

  const decoder = new Base64Decoder();
  
  describe('Base64Decoder decode', () => {

    it('should correctly convert a byte array to a base64 string', () => {
      const str = 'SGVsbG8sIHdvcmxkIQ=='; // "Hello, world!" in base64
      const byteArray = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]);
      const result = decoder.decode(byteArray);
      expect(result).toEqual(str);
    });
    
    it('should return an empty string for an empty byte array', () => {
      const str = '';
      const byteArray = new Uint8Array([]);
      const result = decoder.decode(byteArray);
      expect(result).toEqual(str);
    });

    it('should correctly convert a base64 string with all possible characters to a byte array', () => {
      const byteArray = Array(256).fill(0).map((_, i) => i);
      const str = 'AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w=='; 
      const result = decoder.decode(byteArray);
      expect(result).toEqual(str);
    });

  });

});

