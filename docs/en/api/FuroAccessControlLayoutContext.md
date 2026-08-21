# FuroAccessControlLayoutContext

Context of `FuroAccessControlLayout`. It decides whether the current role may see the contents.

Extends [BaseFuroContext](./BaseFuroContext.md), so `.create()` takes `{ props, componentContext }`.

## Members

| member | description |
| :-- | :-- |
| `#canShowContent()` | `true` when a role is set, is allowed, and is not kicked. |

A missing `role` is always denied. An empty `allowed` allows every role, and an empty `kicked` kicks none.
