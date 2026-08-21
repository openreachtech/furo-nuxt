# Composables

Every composable takes a single object parameter and returns an object.

`useSubscriptionGraphqlClient()` and `useRedirect()` import from `nuxt/app` and are not re-exported from the package entry;
import them from `@openreachtech/furo-nuxt/lib/composables/<name>.js`.

## `useGraphqlClient()`

Binds a `furo` GraphQL launcher to a Vue ref.

| parameter | type | description |
| :-- | :-- | :-- |
| `Launcher` | `GraphqlType.LauncherCtor` | Launcher class of the request. |

| returns | type | description |
| :-- | :-- | :-- |
| `capsuleRef` | `Ref<Capsule>` | The capsule of the latest response. Starts as the pending capsule. |
| `invokeRequestOnEvent()` | `(args?) => Promise<void>` | Fires the request immediately. |
| `invokeRequestOnMounted()` | `(args?) => void` | Fires the request inside `onMounted()`. |
| `invokeRequestWithFormValueHash()` | `(args) => Promise<void>` | Fires the request built from a `<form>` value hash. |

`invokeRequestOnEvent()` and `invokeRequestOnMounted()` accept `{ variables, options, hooks }`, all optional.
`invokeRequestWithFormValueHash()` accepts `{ valueHash, extraValueHash, options, hooks }`, of which only `valueHash` is
required.

## `useFormClerk()`

Validates a `<form>` and fires a request only when every rule passes.

| parameter | type | description |
| :-- | :-- | :-- |
| `FormElementClerk` | `typeof BaseFormElementClerk` | `furo` form element clerk class holding the rules. |
| `invokeRequestWithFormValueHash` | `(args) => Promise<void>` | The request to fire, typically from `useGraphqlClient()`. |

| returns | type | description |
| :-- | :-- | :-- |
| `validationRef` | `Ref<furo.ValidatorHashType>` | Validation hash: `valid`, `invalid`, `messages`, `message`. |
| `submitForm()` | `(params) => Promise<boolean>` | `true` when the request was invoked, `false` when validation failed. |

`submitForm()` accepts `{ formElement, extraValueHash, hooks, options }`, of which only `formElement` is required.

## `useFuroSetup()`

Publishes the Nuxt runtime config to session storage.

| parameter | type | description |
| :-- | :-- | :-- |
| `STORAGE_KEY` | `Record<string, string>` | Key hash; `FURO_ENV` names the storage entry. |

| returns | type | description |
| :-- | :-- | :-- |
| `setupFuroEnv()` | `(params) => void` | Writes `runtimeConfig.public` as JSON into session storage. |

`setupFuroEnv()` accepts `{ runtimeConfig }`.

## `useSubscriptionConnector()`

Creates the `furo` WebSocket connector that subscriptions run through.

| parameter | type | description |
| :-- | :-- | :-- |
| `graphqlConfig` | `furo.GraphqlConfig` | Config carrying `ENDPOINT_URL` and `WEBSOCKET_URL`. |

| returns | type | description |
| :-- | :-- | :-- |
| `subscriptionConnector` | `furo.Connector` | Connector to hand to `FuroGraphqlShare.create()`. |

## `useSubscriptionGraphqlClient()`

Subscribes through the connector held by `$furo`.

| parameter | type | description |
| :-- | :-- | :-- |
| `Subscriber` | `GraphqlType.SubscriberCtor` | Subscriber class of the subscription. |
| `Capsule` | `GraphqlType.SubscriptionCapsuleCtor` | Capsule class of the published payload. |

| returns | type | description |
| :-- | :-- | :-- |
| `capsuleRef` | `Ref<Capsule>` | The capsule of the latest publication. |
| `invokeSubscribe()` | `(args) => Promise<void>` | Opens the subscription. |
| `invokeUnsubscribe()` | `() => void` | Closes it and resets `capsuleRef` to the pending capsule. |

`invokeSubscribe()` accepts `{ hooks, valueHash, operationName, extensions, context }`, of which only `hooks` is required.
`capsuleRef` is updated before `hooks.onPublish` runs.

## `useRedirect()`

Navigates to the path in the `redirect` query parameter.

| parameter | type | default |
| :-- | :-- | :-- |
| `defaultPath` | `string` | `'/'` |

| returns | type | description |
| :-- | :-- | :-- |
| `redirectTo()` | `(params?) => Promise<void>` | Navigates to `?redirect=…`, or to `defaultPath`. |

`redirectTo()` accepts `{ path }` to override the destination.

## `buildDefineComponent()`

Builds a `defineComponent()` replacement that prepends shared `setup()` functions.

| parameter | type | description |
| :-- | :-- | :-- |
| `options` | `Array<ComponentOptions>` | Option objects whose `setup()` runs before the component's own. |

| returns | type | description |
| :-- | :-- | :-- |
| (return value) | `typeof defineComponent` | Defines a component, merging every `setup()` return value. |
