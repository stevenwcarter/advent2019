module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  env: {
    browser: true,
    jasmine: true,
    jest: true
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, printWidth: 100 }],
    'node/no-unsupported-features/es-syntax': 0,
    'node/no-missing-require': 0,
    'node/no-unpublished-require': 0,
    'no-unused-vars': 0,
    'no-console': 0,
    'eslint-comments/no-unused-disable': 0
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  }
};
