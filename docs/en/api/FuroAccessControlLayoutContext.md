# FuroAccessControlLayoutContext

> **Deprecated since 1.12.0.** Will be removed in 2.0.0 together with `FuroAccessControlLayout`. Copy the component and this context into your
> app before upgrading. See [Components](../features/components.md).

Context of `FuroAccessControlLayout`. It decides whether the current role may see the contents.

Extends [BaseFuroContext](./BaseFuroContext.md), so `.create()` takes `{ props, componentContext }`.

## Members

| member | description |
| :-- | :-- |
| `#canShowContent()` | `true` when a role is set, is allowed, and is not kicked. |

A missing `role` is always denied. An empty `allowed` allows every role, and an empty `kicked` kicks none.
