import { alphabetLength, lowerCase, upperCase, shifts } from './constants.js';

export default class Cipher {
  range = {};
  config = [];

  constructor(config) {
    this.config = config;
  }

  transform(string) {
    const result = string.split('').map((char) => {
      const charCode = char.charCodeAt(0);
      if (this.between(charCode, lowerCase)) {
        this.range = Object.assign({}, lowerCase);
      } else if (this.between(charCode, upperCase)) {
        this.range = Object.assign({}, upperCase);
      } else {
        return char;
      }
      const newCharCode = this.setCipherConditions(charCode);
      return String.fromCharCode(newCharCode);
    }).join('');
    return result;
  }

  setCipherConditions(charCode) {
    let newCharCode = charCode;
    this.config.forEach((converting) => {
      switch (converting.charAt(0)) {
        case 'C':
          newCharCode = this.caesar(newCharCode, converting, shifts.caesar);
          break;
        case 'A':
          newCharCode = this.atbash(newCharCode);
          break;
        case 'R':
          newCharCode = this.caesar(newCharCode, converting, shifts.rot);
          break;
        default:
          newCharCode;
          break;
      }
    });
    return newCharCode;
  }

  caesar(charCode, converting, shift) {
    converting.charAt(1) === '0' ? shift = -shift : shift;
    let newCharCode = charCode + shift;
    if (newCharCode > this.range.max) {
      newCharCode = newCharCode - alphabetLength;
    }
    if (newCharCode < this.range.min) {
      newCharCode = newCharCode + alphabetLength;
    }
    return newCharCode;
  }

  atbash(charCode) {
    return this.range.max - (charCode - this.range.min);
  }

  between(n, range) {
    return range.min <= n && n <= range.max;
  }
}
