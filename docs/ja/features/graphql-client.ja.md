# GraphQL クライアント

`furo-nuxt` は `furo` の GraphQL クライアントを Vue の ref に結び付けます。これにより、追加の状態管理なしにリクエスト結果がリアクティブになります。

リクエストは `furo` の Launcher / Payload / Capsule という 3 つのクラスで表現します。`furo-nuxt` は Launcher を受け取り、カプセルを ref として返します。

## (1) GraphQL 設定の共有

共有オブジェクトを Nuxt プラグインで一度だけ生成し、`$furo` として提供します。

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

  // コネクターはサブスクリプションを使う場合にのみ必要です。
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

## (2) クエリとミューテーション

`useGraphqlClient()` はカプセルを ref として返し、あわせてリクエストを発行する 3 つの手段を返します。

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

    // onMounted() の中でリクエストを発行します。
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

最初のレスポンスが届くまで、`capsuleRef` は `Launcher.createCapsuleAsPending()` が生成した保留状態のカプセルを保持します。

`furo` の Launcher は自分自身を返す静的な `Launcher` ゲッターを持つため、クラスを直接渡す `useGraphqlClient(AlphaQueryGraphqlLauncher)` も上記のオブジェクト形式と同じ結果になります。

`invokeRequestWithFormValueHash()` は `variables` の代わりに `<form>` から抽出した値ハッシュを受け取ります。これが
[フォーム要素クラーク](./form-clerk.ja.md) が接続するためのフックです。

## (3) サブスクリプション

`useSubscriptionConnector()` が WebSocket コネクターを開き、`useSubscriptionGraphqlClient()` がそれを通じて購読します。

`useSubscriptionGraphqlClient` は `nuxt/app` からインポートしているため、パッケージのエントリーポイントからは再エクスポートされていません。パスを指定してインポートしてください。

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
          // capsuleRef が更新された後に実行されます。
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

コネクターは `$furo.websocketConnector` から読み込まれるため、(1) のプラグインが必要です。`invokeUnsubscribe()` は
`capsuleRef` を保留状態のカプセルに戻します。
