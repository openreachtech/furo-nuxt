# NuxtFuroEnvLoader

`NODE_ENV` から決まる名前の `.furo-env` dotenv ファイルを読み込みます。

使い方は [アプリケーションのセットアップ](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/features/app-setup.ja.md) を参照してください。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。任意の `{ processEnv }` を受け取り、既定では `process.env` を使います。 |
| `#processEnv` | ファイル名の解決に使う環境変数。 |
| `#loadEnv()` | パース済みのファイル内容。ファイルが無い場合や読み取れない場合は `{}` を返します。 |
| `#resolveFilePath()` | `process.cwd()` を基準に解決したファイルの絶対パス。 |
| `#resolveFileName()` | 本番環境では `.furo-env`、それ以外では `.furo-env.<NODE_ENV>`。 |
| `#resolveNodeEnv()` | `NODE_ENV`。無い場合は `'development'`。 |
