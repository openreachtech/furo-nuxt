# コンポーザブル

いずれのコンポーザブルも 1 つのオブジェクト引数を受け取り、オブジェクトを返します。

`useSubscriptionGraphqlClient()` と `useRedirect()` は `nuxt/app` からインポートしており、パッケージのエントリーポイントからは再エクスポートされていません。`@openreachtech/furo-nuxt/lib/composables/<name>.js` からインポートしてください。

## `useGraphqlClient()`

`furo` の GraphQL Launcher を Vue の ref に結び付けます。

| 引数 | 型 | 説明 |
| :-- | :-- | :-- |
| `Launcher` | `GraphqlType.LauncherCtor` | リクエストの Launcher クラス。 |

| 戻り値 | 型 | 説明 |
| :-- | :-- | :-- |
| `capsuleRef` | `Ref<Capsule>` | 最新レスポンスのカプセル。初期値は保留状態のカプセル。 |
| `invokeRequestOnEvent()` | `(args?) => Promise<void>` | リクエストを即時に発行します。 |
| `invokeRequestOnMounted()` | `(args?) => void` | `onMounted()` の中でリクエストを発行します。 |
| `invokeRequestWithFormValueHash()` | `(args) => Promise<void>` | `<form>` の値ハッシュから組み立てたリクエストを発行します。 |

`invokeRequestOnEvent()` と `invokeRequestOnMounted()` は `{ variables, options, hooks }` を受け取り、すべて省略可能です。
`invokeRequestWithFormValueHash()` は `{ valueHash, extraValueHash, options, hooks }` を受け取り、必須は `valueHash` のみです。

## `useFormClerk()`

`<form>` を検証し、すべてのルールを満たしたときにのみリクエストを発行します。

| 引数 | 型 | 説明 |
| :-- | :-- | :-- |
| `FormElementClerk` | `typeof BaseFormElementClerk` | ルールを持つ `furo` のフォーム要素クラーククラス。 |
| `invokeRequestWithFormValueHash` | `(args) => Promise<void>` | 発行するリクエスト。通常は `useGraphqlClient()` のもの。 |

| 戻り値 | 型 | 説明 |
| :-- | :-- | :-- |
| `validationRef` | `Ref<furo.ValidatorHashType>` | 検証ハッシュ: `valid`・`invalid`・`messages`・`message`。 |
| `submitForm()` | `(params) => Promise<boolean>` | リクエストを発行した場合は `true`、検証に失敗した場合は `false`。 |

`submitForm()` は `{ formElement, extraValueHash, hooks, options }` を受け取り、必須は `formElement` のみです。

## `useFuroSetup()`

Nuxt のランタイム設定をセッションストレージへ公開します。

| 引数 | 型 | 説明 |
| :-- | :-- | :-- |
| `STORAGE_KEY` | `Record<string, string>` | キーのハッシュ。`FURO_ENV` が保存先のキー名になります。 |

| 戻り値 | 型 | 説明 |
| :-- | :-- | :-- |
| `setupFuroEnv()` | `(params) => void` | `runtimeConfig.public` を JSON としてセッションストレージに書き込みます。 |

`setupFuroEnv()` は `{ runtimeConfig }` を受け取ります。

## `useSubscriptionConnector()`

サブスクリプションが利用する `furo` の WebSocket コネクターを生成します。

| 引数 | 型 | 説明 |
| :-- | :-- | :-- |
| `graphqlConfig` | `furo.GraphqlConfig` | `ENDPOINT_URL` と `WEBSOCKET_URL` を持つ設定。 |

| 戻り値 | 型 | 説明 |
| :-- | :-- | :-- |
| `subscriptionConnector` | `furo.Connector` | `FuroGraphqlShare.create()` に渡すコネクター。 |

## `useSubscriptionGraphqlClient()`

`$furo` が保持するコネクターを通じて購読します。

| 引数 | 型 | 説明 |
| :-- | :-- | :-- |
| `Subscriber` | `GraphqlType.SubscriberCtor` | サブスクリプションの Subscriber クラス。 |
| `Capsule` | `GraphqlType.SubscriptionCapsuleCtor` | 配信されるペイロードのカプセルクラス。 |

| 戻り値 | 型 | 説明 |
| :-- | :-- | :-- |
| `capsuleRef` | `Ref<Capsule>` | 最新の配信内容のカプセル。 |
| `invokeSubscribe()` | `(args) => Promise<void>` | 購読を開始します。 |
| `invokeUnsubscribe()` | `() => void` | 購読を終了し、`capsuleRef` を保留状態のカプセルに戻します。 |

`invokeSubscribe()` は `{ hooks, valueHash, operationName, extensions, context }` を受け取り、必須は `hooks` のみです。
`capsuleRef` は `hooks.onPublish` の実行前に更新されます。

## `useRedirect()`

`redirect` クエリパラメーターのパスへ遷移します。

| 引数 | 型 | 既定値 |
| :-- | :-- | :-- |
| `defaultPath` | `string` | `'/'` |

| 戻り値 | 型 | 説明 |
| :-- | :-- | :-- |
| `redirectTo()` | `(params?) => Promise<void>` | `?redirect=…`、無ければ `defaultPath` へ遷移します。 |

`redirectTo()` は遷移先を上書きするための `{ path }` を受け取ります。

## `buildDefineComponent()`

共有の `setup()` 関数を先に実行する `defineComponent()` の代替を組み立てます。

| 引数 | 型 | 説明 |
| :-- | :-- | :-- |
| `options` | `Array<ComponentOptions>` | `setup()` をコンポーネント自身より先に実行するオプションオブジェクト。 |

| 戻り値 | 型 | 説明 |
| :-- | :-- | :-- |
| （戻り値） | `typeof defineComponent` | すべての `setup()` の戻り値をマージしてコンポーネントを定義します。 |
