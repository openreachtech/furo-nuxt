# API

Class members are written with the following notation.

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

## Composables

[Composables](./Composables.md) — `useGraphqlClient()`, `useFormClerk()`, `useFuroSetup()`, `useSubscriptionConnector()`,
`useSubscriptionGraphqlClient()`, `useRedirect()` and `buildDefineComponent()`.

## Contexts

- [BaseFuroContext](./BaseFuroContext.md)
- [BaseFuroContextAccessor](./BaseFuroContextAccessor.md)

The context of each shipped component is deprecated since 1.12.0 and leaves the package in 2.0.0, together with the
component itself.
See [Components](../features/components.md).

- [FuroAccessControlLayoutContext](./FuroAccessControlLayoutContext.md) (deprecated)
- [FuroButtonDialogContext](./FuroButtonDialogContext.md) (deprecated)
- [FuroDialogContext](./FuroDialogContext.md) (deprecated)
- [FuroLoadingLayoutContext](./FuroLoadingLayoutContext.md) (deprecated)
- [FuroOffCanvasMenuLayoutContext](./FuroOffCanvasMenuLayoutContext.md) (deprecated)
- [FuroPageItemContext](./FuroPageItemContext.md) (deprecated)
- [FuroPaginationContext](./FuroPaginationContext.md) (deprecated)
- [FuroTabItemContext](./FuroTabItemContext.md) (deprecated)
- [FuroTabLayoutContext](./FuroTabLayoutContext.md) (deprecated)

## Forms

- [BaseFormClerk](./BaseFormClerk.md)

## Clients

- [RestfulApiClient](./RestfulApiClient.md)
- [BaseRestfulApiSubmitter](./BaseRestfulApiSubmitter.md)

## Shares

- [FuroShare](./FuroShare.md)
- [FuroGraphqlShare](./FuroGraphqlShare.md)

## Tools

- [AccessTokenClerk](./AccessTokenClerk.md)
- [FuroMeta](./FuroMeta.md)
- [NuxtFuroEnvLoader](./NuxtFuroEnvLoader.md)
