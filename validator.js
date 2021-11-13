export function validator(config) {
  if (!config) {
    return false;
  }

  const ciphers = ['C', 'A', 'R'];
  const flags = ['1', '0'];

  let result;

  const configArr = config.split('-');

  configArr.forEach((el) => {
    if (!ciphers.includes(el.charAt(0))) {
      result = 'invalid';
    }
    if (el.charAt(0) === 'A' && el.length !== 1) {
      result = 'invalid';
    } else if (el.length !== 2 && el.charAt(0) !== 'A') {
      result = 'invalid';
    }
    if (el.charAt(0) !== 'A' && !flags.includes(el.charAt(1))) {
      result = 'invalid';
    }
  });

  if (result !== 'invalid') {
    result = configArr;
  }

  return result;
}
