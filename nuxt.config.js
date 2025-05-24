import {
  defineNuxtConfig,
} from 'nuxt/config'

import furoEnv from './app/globals/furo-env.js'

// Reference: https://nuxt.com/docs/api/nuxt-config.
export default defineNuxtConfig({
  // Nuxt App configuration: https://nuxt.com/docs/api/nuxt-config#app.
  app: {
    head: {
      bodyAttrs: {
        class: 'unit-body',
      },
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      title: '⋯', // Loading title, can not be empty.
    },
  },

  // Global CSS: https://nuxt.com/docs/api/nuxt-config#css.
  css: [
    '~/lib/assets/css/0000.furo.css',
    '~/lib/assets/css/0010.variables-palette-color-scale.css',
    '~/lib/assets/css/0020.variables-z-index.css',
    '~/lib/assets/css/0100.reset.css',
    '~/lib/assets/css/0200.base.css',
    '~/lib/assets/css/0300.gimmick.css',
    '~/assets/css/variables-component-default.css',
    '~/assets/css/variables.css',
  ],

  // Plugins to run before rendering page: https://nuxt.com/docs/api/nuxt-config#plugins-1.
  // NOTE: Plugins at the top level of `~/plugins/` directory are auto-registered. You will only need
  // to use this if you have nested files. E.g. `~/plugins/bar/foo.ts` <- This won't be auto-registered.
  plugins: [
  ],

  // Configure Nuxt component auto-registration: https://nuxt.com/docs/api/nuxt-config#components.
  components: {
    dirs: [],
  },

  // Disable auto-import: https://nuxt.com/docs/guide/concepts/auto-imports#disabling-auto-imports.
  imports: {
    autoImport: false,
  },

  // Modules: https://nuxt.com/docs/api/nuxt-config#modules-1.
  modules: [
  ],

  // Shared build configuration: https://nuxt.com/docs/api/nuxt-config#build.
  build: {
    transpile: [
    ],
  },

  // Runtime configuration: https://nuxt.com/docs/api/nuxt-config#runtimeconfig
  runtimeConfig: {
    // on server
    ...furoEnv,

    // on client
    public: {
      ...furoEnv,
    },
  },

  // To enable Server-Side Rendering or not: https://nuxt.com/docs/api/nuxt-config#ssr
  ssr: false,

  // Vite: https://nuxt.com/docs/api/nuxt-config#vite
  vite: {
    build: {
      // 'esnext' is chosen as the build target to leverage the latest JavaScript features
      // and ensure compatibility with modern browsers. This helps optimize performance
      // and reduce polyfill usage in the final build.
      target: 'esnext',
    },
  },

  // Restart dev server when changed: https://nuxt.com/docs/api/nuxt-config#watch
  watch: [
    '.furo-env.development',
  ],
})
