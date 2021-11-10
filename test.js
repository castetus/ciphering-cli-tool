'use strict';

import * as fs from 'fs';
import { Transform } from 'stream';

const readerStream = fs.createReadStream('input.txt');
const writerStream = fs.createWriteStream('output.txt', {flags: 'a'});
const TransformStream = new Transform();

TransformStream._transform = (chunk, encoding, callback) => {
  TransformStream.push(chunk.toString().toUpperCase());
  callback();
};

const input = process.stdin;
const output = writerStream;

readerStream.setEncoding('UTF8');

input.pipe(TransformStream).pipe(output);
