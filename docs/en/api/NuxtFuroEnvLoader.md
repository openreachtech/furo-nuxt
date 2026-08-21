# NuxtFuroEnvLoader

Loads a `.furo-env` dotenv file whose name is chosen from `NODE_ENV`.

See [Application Setup](https://github.com/openreachtech/furo-nuxt/blob/main/docs/en/features/app-setup.md) for usage.

## Members

| member | description |
| :-- | :-- |
| `.create()` | Factory method. Takes an optional `{ processEnv }`, defaulting to `process.env`. |
| `#processEnv` | The environment the file name is resolved from. |
| `#loadEnv()` | The parsed file content. Returns `{}` when the file is missing or unreadable. |
| `#resolveFilePath()` | Absolute path of the file, resolved against `process.cwd()`. |
| `#resolveFileName()` | `.furo-env` in production, otherwise `.furo-env.<NODE_ENV>`. |
| `#resolveNodeEnv()` | `NODE_ENV`, falling back to `'development'`. |
