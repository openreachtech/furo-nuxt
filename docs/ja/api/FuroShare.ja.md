# FuroShare

`$furo` として提供されるオブジェクトです。GraphQL シェアを保持し、そこから設定と WebSocket コネクターを読み出します。

使い方は [GraphQL クライアント](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/features/graphql-client.ja.md) を参照してください。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。`{ graphqlShare }` を受け取ります。 |
| `#graphqlShare` | [GraphQL シェア](./FuroGraphqlShare.ja.md)。 |
| `#get:graphqlConfig` | GraphQL シェアが保持する GraphQL 設定。 |
| `#get:websocketConnector` | GraphQL シェアが保持する WebSocket コネクター。 |

GraphQL 以外にも共有したいものがある場合は継承し、そのサブクラスを Nuxt プラグインから `$furo` として提供してください。
