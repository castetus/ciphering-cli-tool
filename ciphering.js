'use strict';

import { parse } from './parse.js';
import { validator } from './validator.js';
import CustomError from './CustomError.js';
import Cipher from './Cipher.js';
import * as fs from 'fs';
import { pipeline, Transform } from 'stream';

const error = new CustomError();
const options = parse(process.argv.slice(2));
const config = validator(options.config);

if (!config) {
  error.missing();
}

if (config === 'invalid') {
  error.incorrect();
}

const readerStream = options.input ? fs.createReadStream(options.input) : process.stdin;
const writerStream = options.output ? fs.createWriteStream(options.output, {flags: 'a'}) : process.stdout;
const TransformStream = new Transform();

readerStream.on('error', () => error.notAccess(options.input));
writerStream.on('error', () => error.notAccess(options.output));

readerStream.setEncoding('UTF8');

const transformStreams = config.map((item) => {
  const cipher = new Cipher(item);
  const transformStream = new Transform();
  transformStream._transform = (chunk, encoding, callback) => {
    TransformStream.push(`${cipher.transform(chunk.toString())}\n`);
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
