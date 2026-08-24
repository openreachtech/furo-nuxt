# FuroPageItemContext

> **Deprecated since 1.12.0.** Will be removed in 2.0.0 together with `FuroPagination`. Copy the component and this context into your app
> before upgrading. See [Components](../features/components.md).

One page link of `FuroPagination`. Instances are built by
[FuroPaginationContext](./FuroPaginationContext.md), and arrive in the `change-page` payload.

A `pageNumber` of `null` means the link has no destination — the previous link on the first page, for instance — in which case
both generators return `null`.

## Members

| member | description |
| :-- | :-- |
| `.create()` | Factory method. Takes `{ pageNumber, searchParams, pageKey, isCurrent }`; `isCurrent` defaults to `false`. |
| `#pageNumber` | The page this link points at, or `null`. |
| `#searchParams` | Query parameters of the current route, carried over to the link. |
| `#pageKey` | Name of the query parameter holding the page number. |
| `#isCurrent` | `true` when this link is the current page. |
| `#generateHref()` | Query string for the link, e.g. `?page=3`, or `null`. |
| `#generateText()` | The page number as a string, or `null`. |
