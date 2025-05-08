// @ts-check
import withNuxt from './app/.nuxt/eslint.config.mjs'

export default withNuxt({
  files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
  rules: {
    'no-console': 'off',
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': 'off',

    '@stylistic/brace-style': 'off',
    '@stylistic/arrow-parens': 'off',
    '@stylistic/comma-dangle': 'off',
    '@stylistic/operator-linebreak': 'off',

    'vue/singleline-html-element-content-newline': 'off',
  },
})
