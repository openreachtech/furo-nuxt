# RESTful API クライアント

`RestfulApiClient` は [`useGraphqlClient()`](./graphql-client.ja.md) の RESTful 版です。`furo` の RESTful API Launcher をラップし、カプセルを Vue の ref に保持します。

`BaseRestfulApiSubmitter` はさらに一歩進み、[フォームクラーク](./form-clerk.ja.md) とクライアントをまとめます。これにより、フォームとそれが発行するリクエストを 1 つのクラスに収められます。

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

いずれのリクエストメソッドも同じ形（`query`・`body`・`pathParameterHash`・`options`・`hooks`）を受け取り、すべて省略可能です。

| メソッド | 発行タイミング |
| :-- | :-- |
| `invokeRequestOnMounted()` | `onMounted()` の中 |
| `invokeRequestOnEvent()` | 即時（DOM イベントハンドラーなどから） |
| `invokeRequest()` | 即時。上記 2 つが委譲する先のメソッド |

`invokeRequestWithFormValueHash()` は `query` / `body` の代わりに `<form>` の値ハッシュを受け取ります。後述のサブミッターはこれを使ってリクエストを発行します。

## (2) `BaseRestfulApiSubmitter`

継承して、使用するフォームクラークと Launcher を宣言します。

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

どちらのゲッターも抽象メソッドです。片方でも省略すると
`Error: .get:FormClerkCtor must be inherited` または `Error: .get:RestfulApiLauncherCtor must be inherited` が投げられます。

サブミッターは、テンプレートが必要とするものをすべて公開します。

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

`submitForm()` はフォームを検証し、ルールに違反した場合はリクエストを送らず `false` を返します。リクエストを送信した場合は `true` を返します。`extraValueHash`・`hooks`・`options` を渡すと Launcher まで届きます。
