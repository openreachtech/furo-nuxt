# BaseRestfulApiSubmitter

[フォームクラーク](./BaseFormClerk.ja.md) と [RESTful API クライアント](./RestfulApiClient.ja.md) をまとめ、フォームとそれが発行するリクエストを 1 つのクラスに収めるサブミッターです。

使い方は [RESTful API クライアント](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/features/restful-api-client.ja.md) を参照してください。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。任意の `{ formClerk, restfulApiClient }` を受け取ります。いずれも既定では下記 2 つのゲッターから生成されます。 |
| `.get:FormClerkCtor` | 抽象メソッド。このフォームのフォームクラーククラス。`Error: .get:FormClerkCtor must be inherited` を投げます。 |
| `.get:RestfulApiLauncherCtor` | 抽象メソッド。リクエストの Launcher クラス。`Error: .get:RestfulApiLauncherCtor must be inherited` を投げます。 |
| `#formClerk` | フォームクラークのインスタンス。 |
| `#restfulApiClient` | RESTful API クライアントのインスタンス。 |
| `#get:formElementShallowRef` | クラークが持つ `<form>` 要素の ref。`:ref` で結び付けます。 |
| `#get:validationRef` | クラークが持つ検証用の ref。 |
| `#get:capsuleRef` | クライアントが持つカプセルの ref。 |
| `#submitForm()` | フォームを検証してからリクエストを発行します。検証に失敗した場合は `false`、送信した場合は `true` を返します。`{ extraValueHash, hooks, options, submitEvent }` を受け取ります。 |
