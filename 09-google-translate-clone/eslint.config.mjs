// Run this command to generate base config and vs code settings:
// pnpm dlx @antfu/eslint-config@latest

import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'app',
  react: true,
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: false,
    quotes: 'single',
  },
}, {
  rules: {
    'ts/no-redeclare': 'off',
    'ts/consistent-type-definitions': ['error', 'type'],
    'no-console': ['warn'],
    'antfu/no-top-level-await': ['off'],
    'node/prefer-global/process': ['off'],
    'node/no-process-env': ['error'],
    'react-hooks/exhaustive-deps': 'off',
    'vitest/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'test' }],
    'perfectionist/sort-imports': ['error', {
      tsconfigRootDir: '.',
    }],
  },
})
