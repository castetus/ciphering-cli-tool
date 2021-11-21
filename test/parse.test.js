import { parse } from '../parse';
import CustomError from '../CustomError';

jest.mock('../CustomError');

test('correct args', () => {
  const testCase = {
    input: ['-c', 'C1-C1-R0-A', '-i', './input.txt', '-o', './output.txt'],
    output: {config: 'C1-C1-R0-A', input: './input.txt', output: './output.txt'}
  };
  expect(parse(testCase.input)).toEqual(testCase.output);
});

test('duplicate keys', () => {
  const testCase = ['-c', 'C1-C1-R0-A', '-i', './input.txt', '-o', './output.txt', '-i', './input.txt'];
  parse(testCase);
  expect(CustomError).toHaveBeenCalled();
});


