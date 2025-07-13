// @ts-check
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import next from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
// @ts-ignore
export default [
  // Base JS/TS config
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': ts,
      import: importPlugin,
      react,
      'react-hooks': reactHooks
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs['recommended-type-checked'].rules,
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },

  // Next.js specific config
  {
    files: ['apps/next-app/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': next
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
      '@next/next/no-html-link-for-pages': 'off'
    }
  },

  // Monorepo import rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'import/no-extraneous-dependencies': [
        'warn',
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false
        }
      ]
    }
  },

  // Prettier compatibility (must be last)
  prettier
];