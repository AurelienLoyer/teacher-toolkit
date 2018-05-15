module.exports = {
  env: {
    node: true,
    mocha: true
  },
  rules: {
    "arrow-parens": 0,
    "no-else-return": 2,
    strict: 0,
    "no-unused-expressions": 0,
    "no-sync": 0,
    "no-console": 0,
    "global-require": 0,
    "no-param-reassign": 0,
    "consistent-return": 0,
    "object-curly-spacing": [2, "always"],

    // specify the maximum cyclomatic complexity allowed in a program
    complexity: [2, 10],
    // specify the maximum depth that blocks can be nested
    "max-depth": [2, 3],
    // limits the number of parameters that can be used in the function declaration.
    "max-params": [2, 5],
    // specify the maximum depth callbacks can be nested
    "max-nested-callbacks": [2, 7],
    // specify the maximum number of statement allowed in a function
    "max-statements": [1, 30],
    // restrict the number of statements per line
    "max-statements-per-line": [2, { max: 1 }]
  },
  "parserOptions": {
    "ecmaVersion": 6
  }
};
