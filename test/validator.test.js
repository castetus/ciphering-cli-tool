import { validator } from '../validator';

const incorrectConfigs = [
  'E1-A-C0',
  'A1-C0',
  'C-A',
  'A-C2',
];

const correctConfigs = [
  {input: 'C1-A-R0', output: ['C1', 'A', 'R0']},
];

test('config is truthy', () => {
  expect(validator(false)).toBe(false);
});

for (let config of incorrectConfigs) {
  test('config is incorrect', () => {
    expect(validator(config)).toBe('invalid');
  });
}

for (let config of correctConfigs) {
  test('config is correct', () => {
    expect(validator(config.input)).toStrictEqual(config.output);
  });
}


