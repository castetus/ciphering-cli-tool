'use strict';

import { parse } from './parse.js';
import { validator } from './validator.js';
import CustomError from './CustomError.js';
import Cipher from './Cipher.js';
import * as fs from 'fs';
import { pipeline, Transform } from 'stream';

const error = new CustomError();
console.log(process.argv.slice(2))
const options = parse(process.argv.slice(2));
const config = validator(options.config);

if (!config) {
  error.missing();
}

if (config === 'invalid') {
  error.incorrect();
}

function checkFileAccess(path) {
  try {
    if (fs.statSync(path)) {
      return true;
    }
  } catch(err) {
    error.notAccess(path)
  }
}

let readerStream, writerStream;

if (options.input) {
  checkFileAccess(options.input);
  readerStream = fs.createReadStream(options.input);
} else {
  readerStream = process.stdin;
}

if (options.output) {
  checkFileAccess(options.output);
  writerStream = fs.createWriteStream(options.output, {flags: 'a'});
} else {
  writerStream = process.stdout;
}

readerStream.setEncoding('UTF8');

const transformStreams = config.map((item) => {
  const cipher = new Cipher(item);
  const transformStream = new Transform();
  transformStream._transform = (chunk, encoding, callback) => {
    transformStream.push(`${cipher.transform(chunk.toString())}\n`);
    callback();
  };
  return transformStream;
});

pipeline(
  readerStream,
  ...transformStreams,
  writerStream,
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    }
  }
);
