# Base64 Encoder & Decoder, for Next.js

![License](https://img.shields.io/npm/l/next-base64-encoder)
![NPM Downloads](https://img.shields.io/npm/dw/next-base64-encoder)
![NPM Version](https://img.shields.io/npm/v/next-base64-encoder)
 
Base64 Encoder & Decoder module, optimized for Next.js. Usable server-side, client-side and in Edge Runtime (for middleware).

Pure-JS, tree-shaking ready, with optimized performances:  
- [2x to 8x faster](#performances) than browserify Buffer (used when using Buffer in client-side Next.js)
- 20x lighter, only 1kB once webpacked by Next.js, saving more than 20kB of bundle size (compared to browserify Buffer when webpacked by Next.js)

_From acorns grow oak trees..._

No dependencies to install:
- only `TextDecoder`, already available in all browsers built-in API)
- or `Buffer` when used in Next.js or Edge Runtime (already available in built-in API)

Fallback to Buffer in 'Node' and 'Worker' environments, for fastest execution (especially when encoding long string) in Next.js and Edge Runtime middlewares.


## Installation

Install with npm:

```bash
npm install next-base64-encoder
```

## Usages

Import only the class you need, in order tree-shaking to be effective.

### Decoding from binary array to base64 or base64url string

First, get a binary array (UInt8Array) from a utf-8 string (for example):

```javascript
const phrase = 'Hello Mr Warniiiz 👋';
const byteArrayPhrase = new TextEncoder().encode(phrase);
```

Then use `Base64Decoder` to decode this binary array to a `base64` string:

```javascript
import { Base64Decoder } from 'next-base64-encoder';

const base64Decoder = new Base64Decoder();
const base64Phrase = base64Decoder.decode(byteArrayPhrase);

console.log(base64Phrase);
// Expected: SGVsbG8gTXIgV2FybmlpaXog8J+Riw==
```

Or respectively to a `base64url` string:

```javascript
import { Base64UrlDecoder } from 'next-base64-encoder';

const base64UrlDecoder = new Base64UrlDecoder();
const base64UrlPhrase = base64UrlDecoder.decode(byteArrayPhrase);

console.log(base64UrlPhrase);
// Expected: SGVsbG8gTXIgV2FybmlpaXog8J-Riw
```

`Base64Decoder` and `Base64UrlDecoder` can be instanciated once and then reused for multiple decodings.


### Encoding from base64 or base64url string to binary array

```javascript
import { Base64Encoder } from 'next-base64-encoder';

// Encoding to binary array
const base64Encoder = new Base64Encoder();
const byteArrayPhrase = base64Encoder.encode(base64Phrase);
```

Respectively in `base64url` encoding:

```javascript
import { Base64UrlEncoder } from 'next-base64-encoder';

// Encoding to binary array
const base64UrlEncoder = new Base64UrlEncoder();
const byteArrayPhrase = base64UrlEncoder.encode(base64UrlPhrase);
```

Then if you need a readable utf-8 string:

```javascript
// Decoding to utf-8 string
const decodedPhrase = new TextDecoder().decode(byteArrayPhrase)

console.log(decodedPhrase);
// Expected: Hello Mr Warniiiz 👋
```


`Base64Encoder` and `Base64UrlEncoder` can be instanciated once and then reused for multiple encodings.

Note that above encoders do not check if the provided base64 strings have a valid format. It would be possible to add a `Base64SafeEncoder` and a `Base64UrlSafeEncoder` which would throw a `TypeError` in case of unexpected format. Feel free to ask for it or to send a pull-request.


### Check correct base64 and base64url formats

If you want to check if strings have valid `base64` or `base64url` formats, you can use the dedicated classes `Base64Format` or `Base64UrlFormat`:

```javascript
import { Base64Format, Base64UrlFormat } from 'next-base64-encoder';

const base64UrlFormat = new Base64UrlFormat();
const helloMrWarniiiz = "SGVsbG8gTXIgV2FybmlpaXog8J+Riw==";

const isValidBase64Format = base64UrlFormat.check(helloMrWarniiiz);
const isValidBase64UrlFormat = base64UrlFormat.check(helloMrWarniiiz);

console.log(isValidBase64Format, isValidBase64UrlFormat)
// Expected: true false 
```

## Tests

To launch the tests (using jest):

```javascript
npm run test
```

## Performances

You can check performance encoding / decoding performances, on different string lengths, running the following command:

```javascript
npm run perf
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

Next Base64 Encoder module is [ISC licensed](./LICENSE).