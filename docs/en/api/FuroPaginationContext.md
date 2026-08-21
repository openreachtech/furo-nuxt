# FuroPaginationContext

Context of `FuroPagination`. It derives the page link range from the current route query and the total record count.

Extends [BaseFuroContext](./BaseFuroContext.md), and `.create()` takes `{ props, componentContext, route }`.

Every link keeps the other query parameters intact, because they are built from the current route's query.

## Members

| member | description |
| :-- | :-- |
| `#changePage()` | Emits `CHANGE_PAGE` with `{ event, page }`. Takes `{ event, page }`. |
| `#createRangePages()` | The [page items](./FuroPageItemContext.md) of the visible range. Takes an optional `{ rangePages }`. |
| `#generatePreviousPageHref()` | Href of the previous page, or `null` on the first page. |
| `#generateNextPageHref()` | Href of the next page, or `null` on the last page. |
| `#generateFirstPageHref()` | Href of the first page. |
| `#generateLastPageHref()` | Href of the last page. |
| `#generateFirstPageLinkLabel()` | Label of the first page link. |
| `#generateLastPageLinkLabel()` | Label of the last page link. |
| `#isDisabledPreviousPage()` | `true` on the first page. |
| `#isDisabledNextPage()` | `true` on the last page. |
| `#isHiddenFirstPage()` | `true` when the visible range already contains the first page. |
| `#isHiddenLastPage()` | `true` when the visible range already contains the last page. |
| `#isHiddenFirstPageDash()` | `true` when the visible range reaches page 2, so no ellipsis is needed. |
| `#isHiddenLastPageDash()` | `true` when the visible range reaches the page before the last one. |

The component maps the four `isHidden…` / `isDisabled…` results onto root element classes, and the stylesheet does the hiding.

## Defaults

| prop | default |
| :-- | :-- |
| `pageKey` | `'page'` |
| `maxPageRange` | `5` |
| `pagination.limit` | `20` |
| `pagination.totalRecords` | `0` |

The current page comes from the `pageKey` query parameter, falling back to `1`.
