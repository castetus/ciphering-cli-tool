export default class CustomError {

  duplicate(key) {
    process.stderr.write(`Duplicate argument ${key}`);
    process.exit('1');
  }

  missing() {
    process.stderr.write(`Missing argument 'config'`);
    process.exit('1');
  }

  incorrect() {
    process.stderr.write('Config is incorrect');
    process.exit('1');
  }

  notAccess(file) {
    process.stderr.write(`Cannot access to file ${file}`);
    process.exit('1');
  }
}