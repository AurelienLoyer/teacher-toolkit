module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': [2, 150, 4, {'ignoreUrls': true}],
    'vue/no-use-v-if-with-v-for': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
