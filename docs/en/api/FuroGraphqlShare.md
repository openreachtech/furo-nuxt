# FuroGraphqlShare

The GraphQL half of the shared object: the endpoint config, and the WebSocket connector that subscriptions run through.

See [GraphQL Client](https://github.com/openreachtech/furo-nuxt/blob/main/docs/en/features/graphql-client.md) for usage.

## Members

| member | description |
| :-- | :-- |
| `.create()` | Factory method. Takes `{ config, websocketConnector }`. |
| `#config` | The GraphQL config, holding `ENDPOINT_URL` and `WEBSOCKET_URL`. |
| `#websocketConnector` | The connector created by `useSubscriptionConnector()`. |
