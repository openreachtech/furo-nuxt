# FuroPaginationContext

> **1.12.0 で非推奨。** `FuroPagination` とともに 2.0.0 で削除します。アップグレードの前に、コンポーネントとこのコンテキストを
> アプリ側へコピーしてください。詳細は [コンポーネント](../features/components.ja.md) を参照してください。

`FuroPagination` のコンテキストです。現在のルートクエリと総レコード数から、ページリンクの範囲を導出します。

[BaseFuroContext](./BaseFuroContext.ja.md) を継承しており、`.create()` は `{ props, componentContext, route }` を受け取ります。

各リンクは現在のルートのクエリから組み立てられるため、他のクエリパラメーターをそのまま保持します。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `#changePage()` | `{ event, page }` を添えて `CHANGE_PAGE` を発火します。`{ event, page }` を受け取ります。 |
| `#createRangePages()` | 表示範囲の [ページアイテム](./FuroPageItemContext.ja.md)。任意の `{ rangePages }` を受け取ります。 |
| `#generatePreviousPageHref()` | 前ページの href。先頭ページでは `null`。 |
| `#generateNextPageHref()` | 次ページの href。末尾ページでは `null`。 |
| `#generateFirstPageHref()` | 先頭ページの href。 |
| `#generateLastPageHref()` | 末尾ページの href。 |
| `#generateFirstPageLinkLabel()` | 先頭ページリンクのラベル。 |
| `#generateLastPageLinkLabel()` | 末尾ページリンクのラベル。 |
| `#isDisabledPreviousPage()` | 先頭ページで `true`。 |
| `#isDisabledNextPage()` | 末尾ページで `true`。 |
| `#isHiddenFirstPage()` | 表示範囲に先頭ページが含まれている場合に `true`。 |
| `#isHiddenLastPage()` | 表示範囲に末尾ページが含まれている場合に `true`。 |
| `#isHiddenFirstPageDash()` | 表示範囲が 2 ページ目に達しており、省略記号が不要な場合に `true`。 |
| `#isHiddenLastPageDash()` | 表示範囲が末尾の 1 つ前のページに達している場合に `true`。 |

コンポーネントは 4 つの `isHidden…` / `isDisabled…` の結果をルート要素のクラスに反映し、非表示の制御はスタイルシートが行います。

## 既定値

| prop | 既定値 |
| :-- | :-- |
| `pageKey` | `'page'` |
| `maxPageRange` | `5` |
| `pagination.limit` | `20` |
| `pagination.totalRecords` | `0` |

現在のページは `pageKey` のクエリパラメーターから取得し、無い場合は `1` になります。
