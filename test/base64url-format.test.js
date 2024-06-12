import { Base64UrlFormat as BrowserBase64UrlFormat } from '../src/browser/index.js';
import { Base64UrlFormat as NodeBase64UrlFormat } from '../src/node/index.js';

[BrowserBase64UrlFormat, NodeBase64UrlFormat].forEach(Base64UrlFormat => {

  describe('Base64Url format', () => {

    it('should detect a valid base64url string', () => {
      const str = 'SGVsbG8sIHdvcmxkIQ'; // "Hello, world!" in base64url
      const isValidBase64Format = Base64UrlFormat.check(str);
      expect(isValidBase64Format).toEqual(true);
    });

    it('should detect an invalid base64 string', () => {
      const str = 'This is not a valid base64 string';
      const isValidBase64Format = Base64UrlFormat.check(str);
      expect(isValidBase64Format).toEqual(false);
    });

  });

});
