# Application Setup

The tools in this chapter cover the parts of a Nuxt app that sit outside components: environment values, route metadata, the
access token, and redirects.

## (1) `.furo-env` files and `NuxtFuroEnvLoader`

`NuxtFuroEnvLoader` reads a dotenv file whose name is chosen from `NODE_ENV`.

| `NODE_ENV` | file |
| :-- | :-- |
| `production` | `.furo-env` |
| anything else | `.furo-env.<NODE_ENV>` |
| unset | `.furo-env.development` |

The file is resolved against `process.cwd()`, and a missing or unreadable file yields `{}` rather than throwing.

Load it in `nuxt.config.js` and feed the result into `runtimeConfig`, so the same values are readable on both the server and
the client.

```js
// app/globals/furo-env.js
import {
  NuxtFuroEnvLoader,
} from '@openreachtech/furo-nuxt'

const furoEnv = NuxtFuroEnvLoader.create()
  .loadEnv()

export default furoEnv
```

```js
// nuxt.config.js
import {
  defineNuxtConfig,
} from 'nuxt/config'

import furoEnv from './app/globals/furo-env.js'

export default defineNuxtConfig({
  runtimeConfig: {
    // on server
    ...furoEnv,

    // on client
    public: {
      ...furoEnv,
    },
  },

  // Restart the dev server when the file changes.
  watch: [
    '.furo-env.development',
  ],
})
```

## (2) `useFuroSetup()`

`setupFuroEnv()` copies `runtimeConfig.public` into session storage under the `FURO_ENV` key, which makes the environment
readable from code that has no access to the Nuxt runtime config.

```js
// app/constants.js
export const STORAGE_KEY = {
  FURO_ENV: 'furoEnv',

  ACCESS_TOKEN: 'access_token',
}
```

```js
import {
  onMounted,
} from 'vue'

import {
  useRuntimeConfig,
} from '#app'

import {
  useFuroSetup,
} from '@openreachtech/furo-nuxt'

import {
  STORAGE_KEY,
} from '~/app/constants.js'

const {
  setupFuroEnv,
} = useFuroSetup({
  STORAGE_KEY,
})

/** @type {import('vue').ComponentOptions} */
export default {
  setup () {
    onMounted(() => {
      setupFuroEnv({
        runtimeConfig: useRuntimeConfig(),
      })
    })

    return {}
  },
}
```

Sharing those component options through [`buildDefineComponent()`](./component-context.md) runs the setup once per component
without repeating it.

## (3) `FuroMeta`

`FuroMeta` reads the `$furo` key out of a route's `meta`. Declare it per page with `definePageMeta()`.

```js
definePageMeta({
  $furo: {
    pageTitle: 'Sign Up',
    skipFilter: true,
  },
})
```

| member | falls back to |
| :-- | :-- |
| `pageTitle` | `null` |
| `skipFilter` | `false` |

```js
// middleware/010.pageTitle.global.js
import {
  defineNuxtRouteMiddleware,
  useSeoMeta,
} from '#imports'

import {
  FuroMeta,
} from '@openreachtech/furo-nuxt'

export default defineNuxtRouteMiddleware((to, from) => {
  const furoMeta = FuroMeta.create({
    routeTo: to,
  })

  useSeoMeta({
    title: furoMeta.pageTitle
      ?? 'Alpha',
  })
})
```

`skipFilter` marks the pages an authentication middleware should let through — a sign-in page, for instance.

## (4) `AccessTokenClerk`

`AccessTokenClerk` keeps the access token in local storage. It defaults to the `access_token` key; override
`.get:STORAGE_KEY` or pass `key` to `create()` to change it.

```js
import {
  AccessTokenClerk,
} from '@openreachtech/furo-nuxt'

const accessTokenClerk = AccessTokenClerk.create()

// Records the token, or clears it when the token is falsy.
accessTokenClerk.saveToken({
  token: capsuleRef.value.accessToken,
})

if (accessTokenClerk.existsToken()) {
  const token = accessTokenClerk.retrieveToken()
}
```

`saveToken()` returns `false` when it cleared the token instead of recording one, which makes it convenient as the single
entry point after a sign-in or a token renewal.

## (5) `useRedirect()`

`useRedirect()` navigates to the path in the `redirect` query parameter, and falls back to `defaultPath` when the query is
absent.

It imports from `nuxt/app`, so it is not re-exported from the package entry. Import it by its path.

```js
import useRedirect from '@openreachtech/furo-nuxt/lib/composables/useRedirect.js'

const {
  redirectTo,
} = useRedirect({
  defaultPath: '/dashboard',
})

// Goes to ?redirect=... when present, otherwise to /dashboard.
await redirectTo()

// Or override the destination outright.
await redirectTo({
  path: '/',
})
```

This pairs with an authentication middleware that appends `?redirect=<original path>` when it sends a visitor to the sign-in
page.

## (6) Type definitions

The package ships `types/furo-nuxt.d.ts`, which declares the `furo` global namespace used across the JSDoc annotations —
`furo.Share`, `furo.GraphqlShare`, `furo.GraphqlConfig`, `furo.GraphqlClient` and `furo.FormClerk`.

Reference it from your own type entry point to pick those up.

```ts
import '@openreachtech/furo-nuxt/types/furo-nuxt.d.ts'
```
