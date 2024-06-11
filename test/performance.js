// File to measure and compare performance between different base64 encoding librairies.

import { Base64Encoder as BrowserBase64Encoder, Base64Decoder as BrowserBase64Decoder } from '../src/browser/index.js';
import { Base64Encoder as NodeBase64Encoder, Base64Decoder as NodeBase64Decoder } from '../src/node/index.js';
import { Buffer as BrowserifyBuffer } from 'buffer/index.js';

// [length of string or array, quantity of conversions]
const tests = new Map([
  [16, 10000000],
  [64,  3000000],
  [256, 1000000],
  [4096, 100000],
  [1048576, 100],
])

const decodeTests = new Map([
  ["Browser env with pure JS", {test: new BrowserBase64Decoder().decode}],
  ["Node.js env with Buffer ", {test: new NodeBase64Decoder().decode}],
  // ["Buffer (direct)         ", {test: (buffer) => buffer.toString('base64'), prepare: (byteArray) => Buffer.from(byteArray)}],
  ["Buffer (direct)         ", {test: (byteArray) => Buffer.from(byteArray).toString('base64')}],
  ["Buffer (browserify)     ", {test: (byteArray) => BrowserifyBuffer.from(byteArray).toString('base64')}],
])
  
console.log("\nDECODING Byte-array to Base64 string")
tests.forEach((conversionQuantity, strLength) => {
  console.log("\n", conversionQuantity, "decodings of", strLength, "bytes length:");
  const generatedArray = new Array(strLength).fill(0).map((_, i) => i % 256);
  const typedArray = new Uint8Array(generatedArray); 
  decodeTests.forEach(async ({test, prepare=(byteArray) => byteArray}, name) => {
    const prepared = prepare(typedArray);
    console.time(name);
    for (let i=0; i < conversionQuantity; i++) { 
      test(prepared);
    }
    console.timeEnd(name);
  });
})

const encodeTests = new Map([
  ["Browser env with pure JS", {test: new BrowserBase64Encoder().encode}],
  ["Node.js env with Buffer ", {test: new NodeBase64Encoder().encode}],
  ["Buffer (direct)         ", {test: (base64String) => new Uint8Array(Buffer.from(base64String, 'base64'))}],
  ["Buffer (browserify)     ", {test: (base64String) => new Uint8Array(BrowserifyBuffer.from(base64String, 'base64'))}],
])

console.log("\nENCODING Base64 string to Byte-array")
tests.forEach((conversionQuantity, strLength) => {
  console.log("\n", conversionQuantity, "encodings of", strLength, "bytes length:");
  const generatedArray = new Array(strLength).fill(0).map((_, i) => i % 256);
  const typedArray = new Uint8Array(generatedArray); 
  const base64String = new BrowserBase64Decoder().decode(typedArray);
  encodeTests.forEach(async ({test, prepare=(base64String) => base64String}, name) => {
    const prepared = prepare(base64String);
    console.time(name);
    for (let i=0; i < conversionQuantity; i++) { 
      test(prepared);
    }
    console.timeEnd(name);
  });

})



