export default class CustomError {
  constructor() {
    // console.log(process);
  }

  duplicate() {
    console.error('duplicate');
    process.exit('1');
  }

  missing(option = null) {
    console.error(option || 'missing');
    process.exit('1');
  }
}