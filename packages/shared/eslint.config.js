import { defineFlatConfig } from 'eslint-define-config';

export default defineFlatConfig([
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist/**'],
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false
        }
      ]
    }
  }
]);