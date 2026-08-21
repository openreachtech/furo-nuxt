# RestfulApiClient

`furo` の RESTful API Launcher をラップし、カプセルを Vue の ref に保持する RESTful API クライアントです。

使い方は [RESTful API クライアント](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/features/restful-api-client.ja.md) を参照してください。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。`{ Launcher }` を受け取り、カプセルの ref を保留状態で生成します。 |
| `#Launcher` | リクエストの Launcher クラス。 |
| `#capsuleRef` | 最新レスポンスのカプセル。 |
| `#invokeRequestOnEvent()` | リクエストを即時に発行します。 |
| `#invokeRequestOnMounted()` | `onMounted()` の中でリクエストを発行します。 |
| `#invokeRequest()` | リクエストを即時に発行します。上記 2 つが委譲する先のメソッド。 |
| `#invokeRequestWithFormValueHash()` | `<form>` の値ハッシュから組み立てたリクエストを発行します。`{ valueHash, extraValueHash, options, hooks }` を受け取ります。 |

通常の 3 つのリクエストメソッドは同じ任意引数（`{ query, body, pathParameterHash, options, hooks }`）を受け取ります。
