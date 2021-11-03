module.exports = {
  'parserOptions': {
    'ecmaVersion': 2017,
    'sourceType': 'module'
  },
  'extends': 'eslint:recommended',
  'env': {
    'es6': true,
    'browser': true,
    'amd': true,
    'node': true
  },
  'rules': {
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'indent': ['error', 2],
    'no-multi-spaces': ['error']
  }
};
