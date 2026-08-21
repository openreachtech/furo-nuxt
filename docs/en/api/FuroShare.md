# FuroShare

The object provided as `$furo`. It holds the GraphQL share, and reads the config and the WebSocket connector back out of it.

See [GraphQL Client](https://github.com/openreachtech/furo-nuxt/blob/main/docs/en/features/graphql-client.md) for usage.

## Members

| member | description |
| :-- | :-- |
| `.create()` | Factory method. Takes `{ graphqlShare }`. |
| `#graphqlShare` | The [GraphQL share](./FuroGraphqlShare.md). |
| `#get:graphqlConfig` | The GraphQL config held by the GraphQL share. |
| `#get:websocketConnector` | The WebSocket connector held by the GraphQL share. |

Extend it when the app needs to share more than GraphQL, and provide the subclass as `$furo` from the Nuxt plugin.
