# FuroMeta

ルートの `meta` から `$furo` キーを読み取ります。ページごとに `definePageMeta()` で宣言します。

使い方は [アプリケーションのセットアップ](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/features/app-setup.ja.md) を参照してください。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。遷移先のルートを表す `{ routeTo }` を受け取ります。 |
| `#furo` | ルートの `$furo` メタハッシュ。宣言が無い場合は `{}`。 |
| `#get:pageTitle` | 宣言されたページタイトル。無い場合は `null`。 |
| `#get:skipFilter` | ページが認証フィルターの対象外である場合に `true`。既定値は `false`。 |
