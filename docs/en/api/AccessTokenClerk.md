# AccessTokenClerk

Keeps the access token in local storage.

See [Application Setup](https://github.com/openreachtech/furo-nuxt/blob/main/docs/en/features/app-setup.md) for usage.

## Members

| member | description |
| :-- | :-- |
| `.create()` | Factory method. Takes an optional `{ storage, key }`, defaulting to local storage and `.get:STORAGE_KEY`. |
| `.createStorageClerk()` | The storage the clerk writes to. Override to store the token elsewhere. |
| `.get:STORAGE_KEY` | Name of the storage entry. Returns `'access_token'`. |
| `#saveToken()` | Records the token, or clears it when the token is falsy. Returns `false` when it cleared. Takes `{ token }`. |
| `#recordToken()` | Writes the token. Returns `this`. Takes `{ token }`. |
| `#clearToken()` | Removes the token. Returns `this`. |
| `#retrieveToken()` | The stored token, or `null`. |
| `#existsToken()` | `true` while a token is stored. |
