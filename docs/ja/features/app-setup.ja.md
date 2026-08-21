# アプリケーションのセットアップ

この章のツールは、コンポーネントの外側にある部分 — 環境変数、ルートのメタデータ、アクセストークン、リダイレクト — を扱います。

## (1) `.furo-env` ファイルと `NuxtFuroEnvLoader`

`NuxtFuroEnvLoader` は `NODE_ENV` から決まる名前の dotenv ファイルを読み込みます。

| `NODE_ENV` | ファイル |
| :-- | :-- |
| `production` | `.furo-env` |
| それ以外 | `.furo-env.<NODE_ENV>` |
| 未設定 | `.furo-env.development` |

ファイルパスは `process.cwd()` を基準に解決され、ファイルが無い場合や読み取れない場合は例外ではなく `{}` を返します。

`nuxt.config.js` で読み込んで結果を `runtimeConfig` に流し込むと、サーバー側とクライアント側の両方から同じ値を読めます。

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
    // サーバー側
    ...furoEnv,

    // クライアント側
    public: {
      ...furoEnv,
    },
  },

  // ファイルが変更されたら開発サーバーを再起動します。
  watch: [
    '.furo-env.development',
  ],
})
```

## (2) `useFuroSetup()`

`setupFuroEnv()` は `runtimeConfig.public` をセッションストレージの `FURO_ENV` キーにコピーします。これにより、Nuxt のランタイム設定にアクセスできないコードからも環境変数を読めるようになります。

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

このコンポーネントオプションを [`buildDefineComponent()`](./component-context.ja.md) 経由で共有すると、同じ記述を繰り返さずに各コンポーネントでセットアップを実行できます。

## (3) `FuroMeta`

`FuroMeta` はルートの `meta` から `$furo` キーを読み取ります。ページごとに `definePageMeta()` で宣言してください。

```js
definePageMeta({
  $furo: {
    pageTitle: 'Sign Up',
    skipFilter: true,
  },
})
```

| メンバー | 未設定時の値 |
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

`skipFilter` は、認証ミドルウェアが通過させるべきページ（サインインページなど）を示します。

## (4) `AccessTokenClerk`

`AccessTokenClerk` はアクセストークンをローカルストレージに保持します。既定のキーは `access_token` です。変更する場合は `.get:STORAGE_KEY` をオーバーライドするか、`create()` に `key` を渡してください。

```js
import {
  AccessTokenClerk,
} from '@openreachtech/furo-nuxt'

const accessTokenClerk = AccessTokenClerk.create()

// トークンを記録します。トークンが falsy の場合は削除します。
accessTokenClerk.saveToken({
  token: capsuleRef.value.accessToken,
})

if (accessTokenClerk.existsToken()) {
  const token = accessTokenClerk.retrieveToken()
}
```

`saveToken()` は、記録ではなく削除を行った場合に `false` を返します。そのため、サインイン後やトークン更新後の唯一の入口として扱えます。

## (5) `useRedirect()`

`useRedirect()` は `redirect` クエリパラメーターのパスへ遷移し、そのクエリが無い場合は `defaultPath` にフォールバックします。

`nuxt/app` からインポートしているため、パッケージのエントリーポイントからは再エクスポートされていません。パスを指定してインポートしてください。

```js
import useRedirect from '@openreachtech/furo-nuxt/lib/composables/useRedirect.js'

const {
  redirectTo,
} = useRedirect({
  defaultPath: '/dashboard',
})

// ?redirect=... があればそこへ、無ければ /dashboard へ遷移します。
await redirectTo()

// 遷移先を直接指定することもできます。
await redirectTo({
  path: '/',
})
```

これは、サインインページへ送るときに `?redirect=<元のパス>` を付与する認証ミドルウェアと組み合わせて使います。

## (6) 型定義

パッケージには `types/furo-nuxt.d.ts` が同梱されており、JSDoc アノテーション全体で使われる `furo` グローバル名前空間 —
`furo.Share`・`furo.GraphqlShare`・`furo.GraphqlConfig`・`furo.GraphqlClient`・`furo.FormClerk` — を宣言しています。

これらを取り込むには、自分の型エントリーポイントから参照してください。

```ts
import '@openreachtech/furo-nuxt/types/furo-nuxt.d.ts'
```
