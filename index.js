#!/usr/bin/env node

'use strict';

import { parse } from './parse.js';
import { validator } from './validator.js';
import CustomError from './CustomError.js';
import * as fs from 'fs';
import { Transform } from 'stream';

const error = new CustomError();
const options = parse(process.argv.slice(2));
const isConfigValid = validator(options.config);

const readerStream = options.input ? fs.createReadStream(options.input) : process.stdin;
const writerStream = options.output ? fs.createWriteStream(options.output, {flags: 'a'}) : process.stdout;
const TransformStream = new Transform();

readerStream.on('error', (err) => error.missing(`test`));
writerStream.on('error', (err) => error.missing(`test: ${err}`));

readerStream.setEncoding('UTF8');

TransformStream._transform = (chunk, encoding, callback) => {
  TransformStream.push(chunk.toString().toUpperCase());
  callback();
};

if (!isConfigValid) {
  error.missing();
}

readerStream.pipe(TransformStream).pipe(writerStream);
