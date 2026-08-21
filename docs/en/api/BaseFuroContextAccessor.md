# BaseFuroContextAccessor

Base class of a context accessor — a read-only façade over a context, reached through `context.$`. It is where the getters
that only reshape data for the template live.

See [Component Context](https://github.com/openreachtech/furo-nuxt/blob/main/docs/en/features/component-context.md) for usage.

## Members

| member | description |
| :-- | :-- |
| `.create()` | Factory method. Takes `{ context }`. |
| `#context` | The context this accessor wraps. |
