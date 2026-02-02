module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true
  },
  extends: [
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'import/extensions': ['error', 'always', { ignorePackages: true }],
    'no-underscore-dangle': ['error', { allow: ['__testExports'] }],
    'max-len': ['error', {
      code: 140,
      ignoreComments: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true
    }],
    'no-plusplus': 'off',
    'func-names': 'off',
    'space-before-function-paren': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'default-case': 'off',
    'no-restricted-syntax': 'off',
    'no-alert': 'off',
    'no-restricted-globals': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-promise-executor-return': 'off',
    'global-require': 'off',
    'no-mixed-operators': 'off',
    'no-use-before-define': 'off',
    'no-extend-native': 'off',
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'no-trailing-spaces': ['error', { skipBlankLines: false }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'prefer-template': 'off',
    'import/no-unresolved': 'off'
  }
};
