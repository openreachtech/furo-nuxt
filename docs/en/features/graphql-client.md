# GraphQL Client

`furo-nuxt` binds the `furo` GraphQL client to Vue refs, so a request result is reactive without any extra state management.

Requests are described by the `furo` trio of Launcher / Payload / Capsule classes. `furo-nuxt` takes a Launcher and hands back the capsule as a ref.

## (1) Sharing the GraphQL config

Create the shared object once in a Nuxt plugin, and provide it as `$furo`.

```js
// plugins/000.furo.js
import {
  defineNuxtPlugin,
  useRuntimeConfig,
} from 'nuxt/app'

import {
  FuroShare,
  FuroGraphqlShare,
  useSubscriptionConnector,
} from '@openreachtech/furo-nuxt'

import graphqlConfig from '~/app/graphql/graphql.config.js'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  graphqlConfig.ENDPOINT_URL = runtimeConfig.public.ENDPOINT_URL
  graphqlConfig.WEBSOCKET_URL = runtimeConfig.public.WEBSOCKET_URL

  // The connector is only required when the app uses subscriptions.
  const {
    subscriptionConnector,
  } = useSubscriptionConnector({
    graphqlConfig,
  })

  const graphqlShare = FuroGraphqlShare.create({
    config: graphqlConfig,
    websocketConnector: subscriptionConnector,
  })

  return {
    provide: {
      furo: FuroShare.create({
        graphqlShare,
      }),
    },
  }
})
```

## (2) Queries and mutations

`useGraphqlClient()` returns the capsule as a ref, plus three ways to fire the request.

```js
import {
  defineComponent,
} from 'vue'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import AlphaQueryGraphqlLauncher from '~/app/graphql/client/queries/alpha/AlphaQueryGraphqlLauncher.js'

export default defineComponent({
  setup () {
    const {
      capsuleRef,
      invokeRequestOnEvent,
      invokeRequestOnMounted,
    } = useGraphqlClient({
      Launcher: AlphaQueryGraphqlLauncher,
    })

    // Fires inside onMounted().
    invokeRequestOnMounted({
      variables: {
        input: {
          limit: 20,
        },
      },
    })

    return {
      capsuleRef,
      invokeRequestOnEvent,
    }
  },
})
```

```vue
<template>
  <button
    @click="invokeRequestOnEvent({
      variables: {
        input: {
          limit: 20,
        },
      },
    })"
  >
    Reload
  </button>

  <ul>
    <li
      v-for="alpha of capsuleRef.alphas"
      :key="alpha.id"
    >
      {{ alpha.name }}
    </li>
  </ul>
</template>
```

Until the first response arrives, `capsuleRef` holds the pending capsule created by `Launcher.createCapsuleAsPending()`.

A `furo` Launcher exposes a static `Launcher` getter that returns itself, so passing the class directly — `useGraphqlClient(AlphaQueryGraphqlLauncher)` — resolves to the same thing as the object form above.

`invokeRequestWithFormValueHash()` takes the value hash extracted from a `<form>` instead of `variables`. It is the hook that
[Form Element Clerk](./form-clerk.md) plugs into.

## (3) Subscriptions

`useSubscriptionConnector()` opens the WebSocket connector, and `useSubscriptionGraphqlClient()` subscribes through it.

`useSubscriptionGraphqlClient` imports from `nuxt/app`, so it is not re-exported from the package entry. Import it by its path.

```js
import {
  defineComponent,
  onUnmounted,
} from 'vue'

import useSubscriptionGraphqlClient from '@openreachtech/furo-nuxt/lib/composables/useSubscriptionGraphqlClient.js'

import OnAlphaGraphqlSubscriber from '~/app/graphql/client/subscriptions/onAlpha/OnAlphaGraphqlSubscriber.js'
import OnAlphaSubscriptionGraphqlCapsule from '~/app/graphql/client/subscriptions/onAlpha/OnAlphaSubscriptionGraphqlCapsule.js'

export default defineComponent({
  setup () {
    const {
      capsuleRef,
      invokeSubscribe,
      invokeUnsubscribe,
    } = useSubscriptionGraphqlClient({
      Subscriber: OnAlphaGraphqlSubscriber,
      Capsule: OnAlphaSubscriptionGraphqlCapsule,
    })

    invokeSubscribe({
      valueHash: {
        roomId: 1,
      },
      hooks: {
        onPublish: capsule => {
          // Runs after capsuleRef has been updated.
        },
      },
    })

    onUnmounted(() => {
      invokeUnsubscribe()
    })

    return {
      capsuleRef,
    }
  },
})
```

The connector is read from `$furo.websocketConnector`, so the plugin in (1) must be in place. `invokeUnsubscribe()` also resets
`capsuleRef` back to the pending capsule.
