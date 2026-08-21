# AccessTokenClerk

アクセストークンをローカルストレージに保持します。

使い方は [アプリケーションのセットアップ](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/features/app-setup.ja.md) を参照してください。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。任意の `{ storage, key }` を受け取り、既定ではローカルストレージと `.get:STORAGE_KEY` を使います。 |
| `.createStorageClerk()` | クラークが書き込むストレージ。別の場所に保存する場合はオーバーライドしてください。 |
| `.get:STORAGE_KEY` | 保存先のキー名。`'access_token'` を返します。 |
| `#saveToken()` | トークンを記録します。トークンが falsy の場合は削除し、`false` を返します。`{ token }` を受け取ります。 |
| `#recordToken()` | トークンを書き込みます。`this` を返します。`{ token }` を受け取ります。 |
| `#clearToken()` | トークンを削除します。`this` を返します。 |
| `#retrieveToken()` | 保存されているトークン。無い場合は `null`。 |
| `#existsToken()` | トークンが保存されている間は `true`。 |
