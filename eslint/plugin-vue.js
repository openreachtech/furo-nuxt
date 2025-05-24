import vuePluginConfig from 'eslint-plugin-vue'

export default [
  ...vuePluginConfig.configs['flat/base'],

  {
    rules: {
      'vue/attribute-hyphenation': [
        'error',
        'always',
        {
          ignore: [],
        },
      ],
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            [
              'UNIQUE',
              'SLOT',
            ],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            [ // 'OTHER_ATTR'
              'ATTR_DYNAMIC',
              'ATTR_STATIC',
              'ATTR_SHORTHAND_BOOL',
            ],
            'EVENTS',
            'CONTENT',
          ],
          alphabetical: false,
        },
      ],
      'vue/block-lang': [
        'error',
        {
          script: {
            allowNoLang: true,
          },
          style: {
            allowNoLang: true,
          },
        },
      ],
      'vue/block-order': [
        'error',
        {
          order: [ // [['script', 'template'], 'style']
            'script',
            'template',
            'style',
          ],
        },
      ],
      'vue/component-api-style': [
        'error',
        [ // ['script-setup', 'composition']
          'composition',
        ],
      ],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
      ],
      'vue/component-options-name-casing': [
        'error',
        'PascalCase',
      ],
      'vue/custom-event-name-casing': [
        'error',
        'camelCase',
        {
          ignores: [],
        },
      ],
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'ignore',
          multiline: 'below',
        },
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'always',
          selfClosingTag: {
            singleline: 'never',
            multiline: 'always',
          },
        },
      ],
      'vue/html-closing-bracket-spacing': [
        'error',
        {
          startTag: 'never',
          endTag: 'never',
          selfClosingTag: 'always',
        },
      ],
      'vue/html-comment-content-spacing': [
        'error',
        'always',
        {
          exceptions: [],
        },
      ],
      'vue/html-end-tags': [
        'error',
      ],
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: false, // true
          ignores: [],
        },
      ],
      'vue/html-quotes': [
        'error',
        'double',
        {
          avoidEscape: true, // false
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'never',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/match-component-import-name': [
        'error',
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 1,
          multiline: 1,
        },
      ],
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: [],
        },
      ],
      'vue/multiline-html-element-content-newline': [
        'error',
        {
          ignoreWhenEmpty: true,
          ignores: [
            'a',
            'abbr',
            'audio',
            'b',
            'bdi',
            'bdo',
            'canvas',
            'cite',
            'code',
            'data',
            'del',
            'dfn',
            'em',
            'i',
            'iframe',
            'ins',
            'kbd',
            'label',
            'map',
            'mark',
            'noscript',
            'object',
            'output',
            'picture',
            'pre',
            'q',
            'ruby',
            's',
            'samp',
            'small',
            'span',
            'strong',
            'sub',
            'sup',
            'svg',
            'time',
            'textarea',
            'u',
            'var',
            'video',
          ],
        },
      ],
      'vue/no-async-in-computed-properties': [
        'error',
      ],
      'vue/no-child-content': [
        'error',
        {
          // additionalDirectives is an empty array by default. However, if it's explicitly
          // specified, linter won't run. I used an empty string to circumvent this, please
          // remove it if you add additional directives.
          additionalDirectives: [ // []
            '',
          ],
        },
      ],
      'vue/no-deprecated-html-element-is': [
        'error',
      ],
      'vue/no-dupe-v-else-if': [
        'error',
      ],
      'vue/no-duplicate-attr-inheritance': [
        'error',
      ],
      'vue/no-duplicate-attributes': [
        'error',
        {
          allowCoexistClass: true,
          allowCoexistStyle: true,
        },
      ],
      'vue/no-expose-after-await': [
        'error',
      ],
      'vue/no-lifecycle-after-await': [
        'error',
      ],
      'vue/no-multi-spaces': [
        'error',
        {
          ignoreProperties: false,
        },
      ],
      'vue/no-multiple-objects-in-class': [
        'error',
      ],
      'vue/mustache-interpolation-spacing': [
        'error',
        'always',
      ],
      'vue/no-mutating-props': [
        'error',
        {
          shallowOnly: false,
        },
      ],
      'vue/no-required-prop-with-default': [
        'error',
        {
          autofix: false,
        },
      ],
      'vue/no-potential-component-option-typo': [
        'error',
        {
          presets: [ // ['vue']
            'vue',
            'nuxt',
          ],
          custom: [],
          threshold: 1,
        },
      ],
      'vue/no-ref-as-operand': [
        'error',
      ],
      'vue/no-setup-props-reactivity-loss': [
        'error',
      ],
      'vue/no-side-effects-in-computed-properties': [
        'error',
      ],
      'vue/no-spaces-around-equal-signs-in-attribute': [
        'error',
      ],
      'vue/no-template-key': [
        'error',
      ],
      'vue/no-template-shadow': [
        'error',
        {
          allow: [],
        },
      ],
      'vue/no-template-target-blank': [
        'error',
        {
          allowReferrer: false,
          enforceDynamicLinks: 'always',
        },
      ],
      'vue/no-textarea-mustache': [
        'error',
      ],
      'vue/no-undef-components': [
        'error',
        {
          ignorePatterns: [],
        },
      ],
      'vue/no-undef-properties': [
        'error',
        {
          ignores: [
            // Some Vue APIs prefixed with `$` are always available in <template>.
            '/^\\$/',
          ],
        },
      ],
      'vue/no-unused-components': [
        'error',
        {
          ignoreWhenBindingPresent: true,
        },
      ],
      'vue/no-useless-v-bind': [
        'error',
        {
          ignoreIncludesComment: false,
          ignoreStringEscape: false,
        },
      ],
      'vue/no-use-v-else-with-v-for': [
        'error',
      ],
      'vue/no-use-v-if-with-v-for': [
        'error',
        {
          allowUsingIterationVar: false,
        },
      ],
      'vue/no-v-text-v-html-on-component': [
        'error',
        {
          allow: [
            'router-link',
            'nuxt-link',
          ],
        },
      ],
      'vue/no-watch-after-await': [
        'error',
      ],
      'vue/order-in-components': [
        'error',
        {
          order: [
            'el',
            'name',
            'key',
            'parent',
            'functional',
            [
              'delimiters',
              'comments',
            ],
            [
              'components',
              'directives',
              'filters',
            ],
            'extends',
            'mixins',
            [
              'provide',
              'inject',
            ],
            'ROUTER_GUARDS',
            'layout',
            'middleware',
            'validate',
            'scrollToTop',
            'transition',
            'loading',
            'inheritAttrs',
            'model',
            [
              'props',
              'propsData',
            ],
            'emits',
            'setup',
            'asyncData',
            'data',
            'fetch',
            'head',
            'computed',
            'watch',
            'watchQuery',
            'LIFECYCLE_HOOKS',
            'methods',
            [
              'template',
              'render',
            ],
            'renderError',
          ],
        },
      ],
      'vue/padding-line-between-blocks': [
        'error',
        'always',
      ],
      'vue/padding-lines-in-component-definition': [
        'error',
        {
          betweenOptions: 'always',
          withinOption: {
            props: 'never', // 'always'
            emits: 'never', // 'always'
          },
          groupSingleLineProperties: true,
        },
      ],
      'vue/prop-name-casing': [
        'error',
        'camelCase',
      ],
      'vue/require-default-prop': [
        'error',
      ],
      'vue/require-explicit-emits': [
        'error',
        {
          allowProps: false,
        },
      ],
      'vue/require-prop-type-constructor': [
        'error',
      ],
      'vue/require-prop-types': [
        'error',
      ],
      'vue/require-valid-default-prop': [
        'error',
      ],
      'vue/return-in-computed-property': [
        'error',
        {
          treatUndefinedAsUnspecified: true,
        },
      ],
      'vue/singleline-html-element-content-newline': [
        'error',
        {
          ignoreWhenNoAttributes: true,
          ignoreWhenEmpty: true,
          ignores: [
            'a',
            'abbr',
            'audio',
            'b',
            'bdi',
            'bdo',
            'canvas',
            'cite',
            'code',
            'data',
            'del',
            'dfn',
            'em',
            'i',
            'iframe',
            'ins',
            'kbd',
            'label',
            'map',
            'mark',
            'noscript',
            'object',
            'output',
            'picture',
            'pre',
            'q',
            'ruby',
            's',
            'samp',
            'small',
            'span',
            'strong',
            'sub',
            'sup',
            'svg',
            'textarea',
            'time',
            'u',
            'var',
            'video',
          ],
        },
      ],
      'vue/v-bind-style': [
        'error',
        'shorthand',
        {
          sameNameShorthand: 'ignore',
        },
      ],
      'vue/v-on-event-hyphenation': [
        'error',
        'always',
        {
          autofix: true, // false - NOTE: If using Vue 2, autofix will have problem.
          ignore: [],
        },
      ],
      'vue/v-on-style': [
        'error',
        'shorthand',
      ],
      'vue/valid-attribute-name': [
        'error',
      ],
      'vue/valid-next-tick': [
        'error',
      ],

      // These are extension rules of eslint-plugin-vue. They wrap around core or stylistic rules and mostly share the same options.
      'vue/array-bracket-newline': [
        'error',
        'consistent', // { multiline: true, minItems: null }
      ],
      'vue/array-bracket-spacing': [
        'error',
      ],
      'vue/array-element-newline': [
        'error',
        'consistent', // 'always'
        {
          multiline: true, // false
          minItems: null,
        },
      ],
      'vue/arrow-spacing': [
        'error',
      ],
      'vue/block-spacing': [
        'error',
      ],
      'vue/brace-style': [
        'error',
        '1tbs', // = One True Brace Style
        {
          allowSingleLine: false,
        },
      ],
      'vue/camelcase': [
        'error',
      ],
      'vue/comma-dangle': [
        'error',
        {
          arrays: 'always-multiline', // 'never'
          objects: 'always-multiline', // 'never'
          imports: 'always-multiline', // 'never'
          exports: 'always-multiline', // 'never'
          functions: 'never',
        },
      ],
      'vue/comma-spacing': [
        'error',
      ],
      'vue/comma-style': [
        'error',
      ],
      'vue/dot-location': [
        'error',
        'property', // 'object'
      ],
      'vue/dot-notation': [
        'off', // 'error'
        {
          allowKeywords: true,
          allowPattern: '',
        },
      ],
      'vue/eqeqeq': [
        'error',
      ],
      'vue/func-call-spacing': [
        'error',
      ],
      'vue/key-spacing': [
        'error',
      ],
      'vue/keyword-spacing': [
        'error',
      ],
      'vue/max-len': [
        'off', // 'error'
        {
          code: 80,
          tabWidth: 4,
        },
      ],
      'vue/multiline-ternary': [
        'error',
      ],
      'vue/no-console': [
        'error',
        {
          allow: undefined, // When disable `allow` field, give undefined instead of empty array
        },
      ],
      'vue/no-constant-condition': [
        'error',
      ],
      'vue/no-empty-pattern': [
        'error',
      ],
      'vue/no-extra-parens': [
        'off', // 'error'
        'all',
        {
          conditionalAssign: false,
          returnAssign: false,
          nestedBinaryExpressions: false,
          ignoreJSX: 'none',
          enforceForArrowConditionals: false,
          enforceForSequenceExpressions: false,
          enforceForNewInMemberExpressions: false,
          enforceForFunctionPrototypeMethods: false,
          allowParensAfterCommentPattern: '',
        },
      ],
      'vue/no-irregular-whitespace': [
        'error',
        {
          skipComments: false,
          skipHTMLAttributeValues: false,
          skipHTMLTextContents: false,
          // skipJSXText: false, // NOTE: This option exists in core rule but not in eslint-plugin-vue.
          skipRegExps: false,
          skipStrings: false, // true
          skipTemplates: false,
        },
      ],
      'vue/no-loss-of-precision': [
        'error',
      ],
      'vue/no-restricted-syntax': [
        'error',
        // There are 0 or more rest parameters in the array
        // string | { selector: string, message: string }
        // NOTE: It's ok to use Array#forEach if there's only one statement in the callback function.
        // {
        //   selector: 'CallExpression[callee.property.name=forEach]',
        //   message: 'Never use forEach method',
        // },
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
      'vue/no-sparse-arrays': [
        'error',
      ],
      'vue/no-useless-concat': [
        'error',
      ],
      'vue/object-curly-newline': [
        'error',
      ],
      'vue/object-curly-spacing': [
        'error',
        'always', // 'never'
        {
          arraysInObjects: true, // false
          objectsInObjects: true, // false
        },
      ],
      'vue/object-property-newline': [
        'error',
        {
          allowAllPropertiesOnSameLine: true, // false
        },
      ],
      'vue/object-shorthand': [
        'error',
      ],
      'vue/operator-linebreak': [
        'error',
        'before', // 'after'
        {
          overrides: { // {}
            '=': 'after',
            '+=': 'after',
            '-=': 'after',
            '*=': 'after',
            '/=': 'after',
            '%=': 'after',
            '**=': 'after',
            '<<=': 'after',
            '>>=': 'after',
            '>>>=': 'after',
            '&=': 'after',
            '|=': 'after',
            '^=': 'after',
          },
        },
      ],
      'vue/prefer-template': [
        'error',
      ],
      'vue/quote-props': [
        'error',
        'as-needed', // 'always'
        {
          keywords: false,
          unnecessary: true,
          numbers: false,
        },
      ],
      'vue/space-in-parens': [
        'error',
      ],
      'vue/space-infix-ops': [
        'error',
      ],
      'vue/space-unary-ops': [
        'error',
      ],
      'vue/template-curly-spacing': [
        'error',
      ],
    },
  },

  {
    files: [
      'pages/**/*.vue',
      'layouts/**/*.vue',
    ],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
