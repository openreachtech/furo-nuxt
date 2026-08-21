# FuroPageItemContext

`FuroPagination` の 1 つのページリンクです。インスタンスは
[FuroPaginationContext](./FuroPaginationContext.ja.md) が構築し、`change-page` のペイロードに含まれます。

`pageNumber` が `null` の場合は遷移先が無いリンク（先頭ページでの「前へ」リンクなど）を意味し、2 つの生成メソッドはいずれも `null` を返します。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。`{ pageNumber, searchParams, pageKey, isCurrent }` を受け取ります。`isCurrent` の既定値は `false`。 |
| `#pageNumber` | このリンクが指すページ。無い場合は `null`。 |
| `#searchParams` | 現在のルートのクエリパラメーター。リンクに引き継がれます。 |
| `#pageKey` | ページ番号を保持するクエリパラメーターの名前。 |
| `#isCurrent` | このリンクが現在のページである場合に `true`。 |
| `#generateHref()` | リンクのクエリ文字列（例: `?page=3`）。無い場合は `null`。 |
| `#generateText()` | ページ番号の文字列。無い場合は `null`。 |
