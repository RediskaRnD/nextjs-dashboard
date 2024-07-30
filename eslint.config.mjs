import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';
// import pluginImport from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'next.config.mjs'
    ],
  },
  {
    languageOptions: {
      globals: {
        React: true,
        google: true,
        mount: true,
        mountWithRouter: true,
        shallow: true,
        shallowWithRouter: true,
        context: true,
        expect: true,
        jsdom: true,
        JSX: true,
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // pluginImport.configs.recommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      // 'import': pluginImport,
      react: pluginReact,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      // 'import/first': 'error',
      // 'import/newline-after-import': 'error',
      // 'import/no-duplicates': 'error',

      // 'no-console': 'warn', // Warns on console.log usage
      'semi': ['error', 'always'], // Enforces semicolons at the end of statements
      'quotes': ['error', 'single'], // Enforces the use of single quotes for strings
      'indent': ['warn', 2, {'SwitchCase': 1}], // Enforces 2-space indentation
      'no-undef': 'error', // Disallow the use of undeclared variables unless mentioned in /*global */ comments
      'no-implicit-globals': 'error', // Disallow declarations in the global scope
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/adjacent-overload-signatures': 'error', // Requires that member overloads be consecutive.
      // '@typescript-eslint/ban-ts-comment': 'error', // Bans @ts-<directive> comments from being used or requires descriptions after directive.
      '@typescript-eslint/ban-types': 'error', // Bans specific types from being used.
      '@typescript-eslint/consistent-type-assertions': 'error', // Enforces consistent usage of type assertions.
      // '@typescript-eslint/explicit-module-boundary-types': 'error', // Requires explicit return types on functions and class methods.
      '@typescript-eslint/no-array-constructor': 'error', // Disallows generic Array constructors.
      '@typescript-eslint/no-empty-function': 'error', // Disallows empty functions.
      '@typescript-eslint/no-empty-interface': 'error', // Disallows empty interfaces.
      '@typescript-eslint/no-explicit-any': 'warn', // Disallows usage of any type.
      '@typescript-eslint/no-inferrable-types': 'error', // Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean.
      '@typescript-eslint/no-misused-new': 'error', // Avoid using new for side effects.
      '@typescript-eslint/no-namespace': 'error', // Disallows custom TypeScript modules and namespaces.
      '@typescript-eslint/no-non-null-assertion': 'error', // Disallows non-null assertions.
      '@typescript-eslint/no-this-alias': 'error', // Disallows aliasing this.
      '@typescript-eslint/no-unused-vars': 'warn', // Warns on variables that are declared but not used
      '@typescript-eslint/no-use-before-define': 'error', // Disallows usage of variables before they are defined.
      '@typescript-eslint/no-var-requires': 'error', // Disallows usage of require statements except in import statements.
      '@typescript-eslint/prefer-namespace-keyword': 'error', // Requires the use of the namespace keyword instead of the module keyword to declare custom TypeScript modules.
      '@typescript-eslint/triple-slash-reference': 'error', // Disallows triple-slash references.
      '@typescript-eslint/type-annotation-spacing': 'error', // Enforces consistent spacing around type annotations.
    },
  },
];
