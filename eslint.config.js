import globals from 'globals'

import eslintPluginComments from 'eslint-plugin-eslint-comments'

import openreachtechConfig from '@openreachtech/eslint-config'
import vuePluginConfig from './eslint/plugin-vue.js'

/**
 * ESLint Config
 *
 * @type {Array<import('eslint').Linter.Config>}
 */
export default [
  ...openreachtechConfig,

  {
    ignores: [
      '**/.nuxt/**',
      '**/dist/**',
      '**/node_modules/**',
    ],
  },

  // Override rules after extending the Openreach Tech config
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: 'module',
    },
  },

  {
    rules: {
      'jest/require-top-level-describe': 'off',

      'jsdoc/check-tag-names': 'off',
      'jsdoc/no-undefined-types': 'off',
      'jsdoc/valid-types': 'off',

      'sort-imports': 'off',
    },
  },

  {
    plugins: {
      'eslint-comments': eslintPluginComments,
    },
    rules: {
      'eslint-comments/no-restricted-disable': [
        'error',
        '*',
      ],
    },
  },

  {
    rules: {
      'no-restricted-syntax': [
        'error',
        // There are 0 or more rest parameters in the array
        // string | { selector: string, message: string }
        {
          selector: 'CallExpression[callee.property.name=forEach]',
          message: 'Never use forEach method',
        },
        {
          selector: 'CallExpression[callee.type=MemberExpression][callee.property.name=/^(every|filter|find|findIndex|findLast|findLastIndex|flatMap|forEach|group|groupToMap|map|reduce|reduceRight|some)$/] IfStatement',
          message: 'Never use if in higher-order function',
        },
        {
          selector: 'DoWhileStatement',
          message: 'Never use do-while',
        },
        {
          selector: 'ForInStatement',
          message: 'Never use for-in',
        },
        {
          selector: 'ForOfStatement',
          message: 'Never use for-of',
        },
        {
          selector: 'ForStatement',
          message: 'Never use for',
        },
        {
          selector: 'Identifier[name=/.+((?<!Form)Data|(?<!Request)Info|(?<![gs]et|named|remove)Item|(?<!class|RadioNode)List|Manager)$/]', // 'Identifier[name=/.+(Data|Info|Item|List|Manager)$/]'
          message: 'Not allowed to use "Data", "Info", "Item", "List", and "Manager" as suffix of identifier.',
        },
        {
          selector: 'IfStatement IfStatement',
          message: 'Never use nested-if including else-if',
        },
        {
          selector: 'SwitchStatement',
          message: 'Never use switch',
        },
        // FIXME: below is not required by other rules
        {
          selector: 'VariableDeclaration[kind=let]',
          message: 'Never use let',
        },
        {
          selector: 'WhileStatement',
          message: 'Never use while',
        },
      ],
      'id-length': [
        'error',
        {
          min: 2,
          max: Infinity,
          properties: 'always',
          exceptions: [
            '_',
            '$',
            'x', // added here
            'y', // added here
          ], // []
          exceptionPatterns: [],
        },
      ],
    },
  },

  ...vuePluginConfig,
]
