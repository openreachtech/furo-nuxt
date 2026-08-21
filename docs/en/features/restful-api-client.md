# RESTful API Client

`RestfulApiClient` is the RESTful counterpart of [`useGraphqlClient()`](./graphql-client.md). It wraps a `furo` RESTful API
Launcher and keeps the capsule in a Vue ref.

`BaseRestfulApiSubmitter` goes one step further: it bundles a [form clerk](./form-clerk.md) with a client, so a form and the
request it drives live in a single class.

## (1) `RestfulApiClient`

```js
import {
  defineComponent,
} from 'vue'

import {
  RestfulApiClient,
} from '@openreachtech/furo-nuxt'

import AlphaGetRestfulApiLauncher from '~/app/restfulapi/get/alpha/AlphaGetRestfulApiLauncher.js'

export default defineComponent({
  setup () {
    const restfulApiClient = RestfulApiClient.create({
      Launcher: AlphaGetRestfulApiLauncher,
    })

    restfulApiClient.invokeRequestOnMounted({
      query: {
        limit: 20,
      },
    })

    return {
      capsuleRef: restfulApiClient.capsuleRef,
    }
  },
})
```

Every request method accepts the same shape — `query`, `body`, `pathParameterHash`, `options` and `hooks` — and all of them
are optional.

| method | when it fires |
| :-- | :-- |
| `invokeRequestOnMounted()` | inside `onMounted()` |
| `invokeRequestOnEvent()` | immediately, e.g. from a DOM event handler |
| `invokeRequest()` | immediately, the method the two above delegate to |

`invokeRequestWithFormValueHash()` replaces `query` / `body` with a `<form>` value hash, which is how the submitter below
fires its request.

## (2) `BaseRestfulApiSubmitter`

Extend it and declare which form clerk and which launcher to use.

```js
import {
  BaseRestfulApiSubmitter,
} from '@openreachtech/furo-nuxt'

import AlphaFormClerk from './AlphaFormClerk.js'
import AlphaPostRestfulApiLauncher from '~/app/restfulapi/post/alpha/AlphaPostRestfulApiLauncher.js'

/**
 * @extends {BaseRestfulApiSubmitter<AlphaFormValueHash>}
 */
export default class AlphaSubmitter extends BaseRestfulApiSubmitter {
  /** @override */
  static get FormClerkCtor () {
    return AlphaFormClerk
  }

  /** @override */
  static get RestfulApiLauncherCtor () {
    return AlphaPostRestfulApiLauncher
  }
}
```

Both getters are abstract; leaving one out throws
`Error: .get:FormClerkCtor must be inherited` or `Error: .get:RestfulApiLauncherCtor must be inherited`.

The submitter then exposes everything the template needs.

```js
import {
  defineComponent,
} from 'vue'

import AlphaSubmitter from './AlphaSubmitter.js'

export default defineComponent({
  setup () {
    const submitter = AlphaSubmitter.create()

    return {
      submitter,
    }
  },
})
```

```vue
<template>
  <form
    :ref="submitter.formElementShallowRef"
    @submit.prevent="submitter.submitForm({})"
  >
    <label>
      <input
        name="first"
        type="text"
      >
      <span>{{ submitter.validationRef.message.first }}</span>
    </label>

    <button type="submit">
      Send
    </button>
  </form>

  <div>{{ submitter.capsuleRef.content }}</div>
</template>
```

`submitForm()` validates the form, skips the request and resolves to `false` when a rule fails, and resolves to `true` once
the request has been sent. Pass `extraValueHash`, `hooks` or `options` to reach the launcher.
