# FuroMeta

Reads the `$furo` key out of a route's `meta`, as declared per page with `definePageMeta()`.

See [Application Setup](https://github.com/openreachtech/furo-nuxt/blob/main/docs/en/features/app-setup.md) for usage.

## Members

| member | description |
| :-- | :-- |
| `.create()` | Factory method. Takes `{ routeTo }`, the route the navigation is heading to. |
| `#furo` | The `$furo` meta hash of the route, or `{}` when the route declared none. |
| `#get:pageTitle` | The declared page title, or `null`. |
| `#get:skipFilter` | `true` when the page opted out of the authentication filter. Defaults to `false`. |
