// Measure and compare performance between different base64 encoding librairies.

import { Base64Encoder as BrowserBase64Encoder, Base64Decoder as BrowserBase64Decoder } from '../src/browser/index.js';
import { Base64Encoder as NodeBase64Encoder, Base64Decoder as NodeBase64Decoder } from '../src/node/index.js';
import { Buffer as BrowserifyBuffer } from 'buffer/index.js';

function evaluate({name, input, testsQty, testsFct, }) {

  const results = {};

  console.log("\n" + name)
  testsQty.forEach((conversionQuantity, strLength) => {
    console.log("\n", conversionQuantity, "iterations of", strLength, "bytes length:");
    const groupName = `${conversionQuantity} iterations of ${strLength} bytes length`
    results[groupName] = {}
    const commonInput = typeof input === "function" ? input({strLength, conversionQuantity}) : input;
    testsFct.forEach(({test, prepare=(byteArray) => byteArray}, name) => {
      const prepared = prepare(commonInput);
      const start = Date.now();
      console.time(name);
      for (let i=0; i < conversionQuantity; i++) { 
        test(prepared);
      }
      console.timeEnd(name);
      const end = Date.now();
      results[groupName][name] = (end - start) / 1000;
    });
  })

  return results;

}

// [length of string or array, quantity of conversions]
const testsQty = new Map([
  [16, 10000000],
  [64,  3000000],
  [256, 1000000],
  [4096, 100000],
  [1048576, 100],
])

const decodeTestsFct = new Map([
  ["Browser env with pure JS", {test: new BrowserBase64Decoder().decode}],
  ["Node.js env with Buffer ", {test: new NodeBase64Decoder().decode}],
  ["Buffer (direct)         ", {test: (byteArray) => Buffer.from(byteArray).toString('base64')}],
  ["Buffer (browserify)     ", {test: (byteArray) => BrowserifyBuffer.from(byteArray).toString('base64')}],
])


const encodeTestsFct = new Map([
  ["Browser env with pure JS", {test: new BrowserBase64Encoder().encode}],
  ["Node.js env with Buffer ", {test: new NodeBase64Encoder().encode}],
  ["Buffer (direct)         ", {test: (base64String) => new Uint8Array(Buffer.from(base64String, 'base64'))}],
  ["Buffer (browserify)     ", {test: (base64String) => new Uint8Array(BrowserifyBuffer.from(base64String, 'base64'))}],
])

export default function evaluateAll(lightEval=1) {

  const quantities = new Map (
    Array.from(testsQty).map(([key, value]) => [key, Math.max(1, Math.floor(value / lightEval))]),
  );

  const results = {};

  results["decoding"] = evaluate({
    name: "DECODING byte-array to Base64 string",
    testsQty: quantities,
    testsFct: decodeTestsFct,
    input: ({strLength}) => {
      const generatedArray = new Array(strLength).fill(0).map((_, i) => i % 256);
      const typedArray = new Uint8Array(generatedArray); 
      return typedArray;
    },
  })


  results["encoding"] = evaluate({
    name: "ENCODING byte-array to Base64 string",
    testsQty: quantities,
    testsFct: encodeTestsFct,
    input: ({strLength}) => {
      const generatedArray = new Array(strLength).fill(0).map((_, i) => i % 256);
      const typedArray = new Uint8Array(generatedArray); 
      const base64String = new BrowserBase64Decoder().decode(typedArray);
      return base64String;
    },
  })

  return results;

}



