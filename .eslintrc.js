module.exports = {
  env: {
    jest: true,
    es2020: true,
    node: true,
    browser: true
  },
  extends: ['prettier', 'airbnb-base', 'eslint:recommended'],
  // required to lint *.vue files
  plugins: ['prettier'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-console': ['off'],
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    indent: 'off',
    camelcase: 'off',
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'import/named': 'off',
    'operator-linebreak': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'linebreak-style': 'off',
    'import/no-unresolved': 'off',
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true,
        allowLiteral: false,
        allowObject: true
      }
    ]
  }
};
