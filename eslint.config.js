import path from 'path'
import { fileURLToPath } from 'url'
import globals from 'globals'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  {
    ignores: ['eslint.config.js', 'vite.config.ts', 'postcss.config.js', 'tailwind.config.js'],
  },
  js.configs.recommended,
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ),
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          modules: true,
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'no-console': 1,
      'no-unused-vars': 0,
      'no-useless-return': 1,
      'newline-before-return': 1,
      'prefer-const': 1,
      'react/display-name': 0,
      'react/prop-types': 0,
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
