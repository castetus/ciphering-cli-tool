'use strict';

import { parse } from './parse.js';
import { validator } from './validator.js';
import CustomError from './CustomError.js';
import Cipher from './Cipher.js';
import * as fs from 'fs';
import { Transform } from 'stream';

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

const cipherMachine = new Cipher(config);

TransformStream._transform = (chunk, encoding, callback) => {
  TransformStream.push(`${cipherMachine.transform(chunk.toString())}\n`);
  callback();
};

readerStream.pipe(TransformStream).pipe(writerStream);
