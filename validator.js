export function validator(config) {
  if (!config) {
    return false;
  }

  const ciphers = ['C', 'A', 'R'];

  const configArr = config.split('-');

  configArr.forEach((el) => {
    if (!ciphers.includes(el.charAt(0))) {
      return false;
    }
    if (el.charAt(0) === 'A' && el.length !== 1) {
      return false;
    } else if (el.length !== 2 && el.charAt(0) !== 'A') {
      return false;
    }
    if (el.charAt(0) !== 'A' && (el.charAt(1) !== '1' || el.charAt(1) !== '0')) {
      return false;
    }
  });

  return configArr;
}
