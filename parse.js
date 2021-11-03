import CustomError from "./CustomError.js";

export function parse(args) {
  const options = {};

  const error = new CustomError();

  const optionList = {
    config: ['-c', '--config'],
    input: ['-i', '--input'],
    output: ['-o', '--output'],
  };

  args.forEach((el, index) => {
    for (let key in optionList) {
      if (optionList[key].includes(el)) {
        if (key in options) {
          error.duplicate(key);
        }
        options[key] = args[index + 1];
      }
    }
  });

  return options;
}
