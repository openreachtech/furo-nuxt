import openreachtechConfig from '@openreachtech/eslint-config'
import vuePluginConfig from './eslint/plugin-vue.js'

export default [
  ...openreachtechConfig,

  {
    ignores: [
      '**/.nuxt/**',
      '**/.output/**',
      '**/dist/**',
      '**/node_modules/**',
    ],
  },

  ...vuePluginConfig,
]
