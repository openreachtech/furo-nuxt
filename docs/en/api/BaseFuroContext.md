# BaseFuroContext

Base class of every component context. It holds the props and the Vue setup context, and forwards the setup context members
so a subclass never has to import them.

See [Component Context](https://github.com/openreachtech/furo-nuxt/blob/main/docs/en/features/component-context.md) for usage.

## Members

| member | description |
| :-- | :-- |
| `.accessorPool` | `WeakMap` that holds the accessor instance of each context, keyed by the context. |
| `.create()` | Factory method. Takes `{ props, componentContext }`. |
| `.get:ContextAccessor` | Accessor class paired with this context. Returns `null` unless overridden. |
| `.get:EMIT_EVENT_NAME` | Abstract. Hash of `emit()` event names. Returns `{}` unless overridden. |
| `.createContextAccessor()` | Takes `{ context }`. Creates an instance of `.get:ContextAccessor` for the context, or returns `null` when `.get:ContextAccessor` is `null`. |
| `#props` | Props passed to the component. |
| `#componentContext` | The Vue setup context. |
| `#get:$` | The accessor instance of this context, or `null` when `.get:ContextAccessor` is `null`. Every access returns the same instance. |
| `#get:EMIT_EVENT_NAME` | The hash declared by `.get:EMIT_EVENT_NAME`. |
| `#get:attrs` | `attrs` of the setup context. |
| `#get:slots` | `slots` of the setup context. |
| `#get:emit` | `emit()` of the setup context. |
| `#get:expose` | `expose()` of the setup context. |
| `#get:watch` | Vue's `watch()`. |
| `#setupComponent()` | Hook for side effects such as `expose()` and `watch()`. Returns `this`. Does nothing unless overridden. |
| `#generateExposeHash()` | Hash of the methods to hand to `expose()`. Returns `{}` unless overridden. |
