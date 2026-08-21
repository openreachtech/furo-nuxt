# FuroGraphqlShare

共有オブジェクトの GraphQL 部分です。エンドポイントの設定と、サブスクリプションが利用する WebSocket コネクターを保持します。

使い方は [GraphQL クライアント](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/features/graphql-client.ja.md) を参照してください。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。`{ config, websocketConnector }` を受け取ります。 |
| `#config` | `ENDPOINT_URL` と `WEBSOCKET_URL` を保持する GraphQL 設定。 |
| `#websocketConnector` | `useSubscriptionConnector()` が生成したコネクター。 |
