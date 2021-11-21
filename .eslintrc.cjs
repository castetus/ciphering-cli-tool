module.exports = {
  env: {
    browser: true,
    es2017: true,
    node: true,
    "test": {
      "plugins": ["@babel/plugin-transform-modules-commonjs"]
    },
    "jest/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended"
  ],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  rules: {
    'no-process-exit': 'off'
  }
}
