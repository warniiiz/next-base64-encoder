import { Base64Format as BrowserBase64Format } from '../src/browser/index.js';
import { Base64Format as NodeBase64Format } from '../src/node/index.js';

[BrowserBase64Format, NodeBase64Format].forEach(Base64Format => {

  describe('Base64 format', () => {

    it('should detect a valid base64 string with padding', () => {
      const str = 'SGVsbG8sIHdvcmxkIQ=='; // "Hello, world!" in base64
      const isValidBase64Format = Base64Format.check(str);
      expect(isValidBase64Format).toEqual(true);
    });
    
    it('should detect an invalid base64 string', () => {
      const str = 'This is not a valid base64 string';
      const isValidBase64Format = Base64Format.check(str);
      expect(isValidBase64Format).toEqual(false);
    });

    it('should detect an invalid base64 string with padding', () => {
      const str = 'This is not a valid base64 string==';
      const isValidBase64Format = Base64Format.check(str);
      expect(isValidBase64Format).toEqual(false);
    });

    it('should detect an invalid base64 string with incorrect padding', () => {
      const str = 'SGVsbG8sIHdvcmxkIQ='; // "Hello, world!" in base64 with incorrect padding
      const isValidBase64Format = Base64Format.check(str);
      expect(isValidBase64Format).toEqual(false);
    });

  });

});
