# RestfulApiClient

RESTful API client that wraps a `furo` RESTful API launcher and keeps the capsule in a Vue ref.

See [RESTful API Client](https://github.com/openreachtech/furo-nuxt/blob/main/docs/en/features/restful-api-client.md) for usage.

## Members

| member | description |
| :-- | :-- |
| `.create()` | Factory method. Takes `{ Launcher }`, and creates the capsule ref as pending. |
| `#Launcher` | The launcher class of the request. |
| `#capsuleRef` | The capsule of the latest response. |
| `#invokeRequestOnEvent()` | Fires the request immediately. |
| `#invokeRequestOnMounted()` | Fires the request inside `onMounted()`. |
| `#invokeRequest()` | Fires the request immediately; the method the two above delegate to. |
| `#invokeRequestWithFormValueHash()` | Fires the request built from a `<form>` value hash. Takes `{ valueHash, extraValueHash, options, hooks }`. |

The three plain request methods take the same optional parameters: `{ query, body, pathParameterHash, options, hooks }`.
