module.exports = {
    root: true,
    plugins: ['lodash', 'vue'],
    extends: [
        'plazza/node',
        'plugin:lodash/recommended',
        'plugin:vue/recommended',
    ],
    env: {
        browser: true,
    },
    parserOptions: {
        'parser':'babel-eslint',
    },
    rules: {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

        'arrow-parens': 0,
        'no-else-return': 2,
        'strict': 0,
        'no-unused-expressions': 0,
        'global-require': 0,
        'no-param-reassign': 0,
        'consistent-return': 0,
        'valid-jsdoc': 0,
        'semi': [2, 'never'],
        'eol-last' : 2,
        'no-multiple-empty-lines': 2,
        'space-before-function-paren': ['error', {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'never',
        }],

        // Lodash Rules
        'lodash/chaining': 0,
        'lodash/prefer-lodash-method': 0,
        'lodash/no-single-chain': 0,
        'lodash/prefer-constant': 0,
        'lodash/prefer-noop': 0,
        'lodash/no-double-unwrap': 0,
        'lodash/import-scope': 0,

        // Vue Rules
        // 'vue/no-template-key': true,
        "vue/require-v-for-key": 2,
        "vue/order-in-components": ["error", {
            order: [
                "el",
                "name",
                "parent",
                "functional",
                ["delimiters", "comments"],
                ["components", "directives", "filters"],
                "extends",
                "mixins",
                "inheritAttrs",
                "model",
                ["props", "propsData"],
                "data",
                "computed",
                "watch",
                "LIFECYCLE_HOOKS",
                "methods",
                ["template", "render"],
                "renderError",
            ],
        }],
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "closeBracket": 0,
            "ignores": [],
        }],
        // We would like indent <script> start at 4 spaces but it seems not possible so we disabled it for the moment
        // default value is 0 space :(
        "indent": 0,

        // Custom Project Complexity

        // specify the maximum cyclomatic complexity allowed in a program
        'complexity': [2, 12],
        // specify the maximum depth that blocks can be nested
        'max-depth': [2, 3],
        // limits the number of parameters that can be used in the function declaration.
        'max-params': [2, 4],
        // specify the maximum depth callbacks can be nested
        'max-nested-callbacks': [2, 7],
        // specify the maximum number of statement allowed in a function
        'max-statements': [2, 20],
        // restrict the number of statements per line
        'max-statements-per-line': [2, { 'max': 1 }],
    },
    globals: {
        module: true,
        _: true,
        // Mocha functions as globals
        'describe': true,
        'before': true,
        'beforeEach': true,
        'after': true,
        'afterEach': true,
        'it': true,
        'browser': true,
        '$': true,
        '$$': true,
        'expect': true,
    }
}
