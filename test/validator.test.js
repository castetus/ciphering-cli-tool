import { validator } from '../validator'

test('no config', () => {
  expect(validator(false)).toBe(false);
});
