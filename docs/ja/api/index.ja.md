# API

クラスメンバーは以下の表記に従って記述します。

| notation | members |
| :-- | :-- |
| `#instanceProperty` | instance property |
| `#instanceMethod()` | instance method |
| `#get:instanceGetter` | instance getter |
| `#set:instanceSetter` | instance setter |
| `.staticProperty` | static property |
| `.staticMethod()` | static method |
| `.get:staticGetter` | static getter |
| `.set:staticSetter` | static setter |

## コンポーザブル

[コンポーザブル](./Composables.ja.md) — `useGraphqlClient()`・`useFormClerk()`・`useFuroSetup()`・`useSubscriptionConnector()`・
`useSubscriptionGraphqlClient()`・`useRedirect()`・`buildDefineComponent()`。

## コンテキスト

- [BaseFuroContext](./BaseFuroContext.ja.md)
- [BaseFuroContextAccessor](./BaseFuroContextAccessor.ja.md)

同梱コンポーネントのコンテキストは 1.12.0 で非推奨になりました。コンポーネント本体とともに 2.0.0 で削除します。詳細は
[コンポーネント](../features/components.ja.md) を参照してください。

- [FuroAccessControlLayoutContext](./FuroAccessControlLayoutContext.ja.md)（非推奨）
- [FuroButtonDialogContext](./FuroButtonDialogContext.ja.md)（非推奨）
- [FuroDialogContext](./FuroDialogContext.ja.md)（非推奨）
- [FuroLoadingLayoutContext](./FuroLoadingLayoutContext.ja.md)（非推奨）
- [FuroOffCanvasMenuLayoutContext](./FuroOffCanvasMenuLayoutContext.ja.md)（非推奨）
- [FuroPageItemContext](./FuroPageItemContext.ja.md)（非推奨）
- [FuroPaginationContext](./FuroPaginationContext.ja.md)（非推奨）
- [FuroTabItemContext](./FuroTabItemContext.ja.md)（非推奨）
- [FuroTabLayoutContext](./FuroTabLayoutContext.ja.md)（非推奨）

## フォーム

- [BaseFormClerk](./BaseFormClerk.ja.md)

## クライアント

- [RestfulApiClient](./RestfulApiClient.ja.md)
- [BaseRestfulApiSubmitter](./BaseRestfulApiSubmitter.ja.md)

## シェア

- [FuroShare](./FuroShare.ja.md)
- [FuroGraphqlShare](./FuroGraphqlShare.ja.md)

## ツール

- [AccessTokenClerk](./AccessTokenClerk.ja.md)
- [FuroMeta](./FuroMeta.ja.md)
- [NuxtFuroEnvLoader](./NuxtFuroEnvLoader.ja.md)
