module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  plugins: ['@typescript-eslint'],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    'max-classes-per-file': 'off',
    'no-new': 'off',
    'no-shadow': 'off',
    'no-bitwise': 'off',
    'func-names': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'default-case': 'off',
    'prefer-template': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-restricted-globals': 'off',
    'no-use-before-define': 'off',
    'no-await-in-loop': 'off',
    'class-methods-use-this': 'off',
    'global-require': 'off',
    'no-constant-condition': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'import/order': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-dynamic-require': 'off',
    'vue/comment-directive': 'off',
    'vue/no-v-html': 'off',
    'vue/attributes-order': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/valid-next-tick': 'off',
    'vue/one-component-per-file': 'off',
    'vue/require-toggle-inside-transition': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
  },
}
