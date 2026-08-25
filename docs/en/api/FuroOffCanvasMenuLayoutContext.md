# FuroOffCanvasMenuLayoutContext

> **Deprecated since 1.12.0.** Will be removed in 2.0.0 together with `FuroOffCanvasMenuLayout`. Copy the component and this context into your
> app before upgrading. See [Components](../features/components.md).

Context of `FuroOffCanvasMenuLayout`. The open state of the navigation is the `open-nav` class on the root element.

Extends [BaseFuroContext](./BaseFuroContext.md).

## Members

| member | description |
| :-- | :-- |
| `.create()` | Factory method. Takes `{ props, componentContext, route, rootElementRef }`. |
| `#route` | The current route, used to close the navigation on navigation. |
| `#rootElementRef` | Ref of the layout root element. |
| `#get:rootElement` | The layout root element, or `null`. |
| `#setupComponent()` | Watches `route.fullPath` and closes the navigation on a route change. |
| `#clickToggleNavigation()` | Toggles the `open-nav` class. |
| `#closeNavigation()` | Removes the `open-nav` class. |
| `#isShowedNavigation()` | `true` while the `open-nav` class is present. |
| `#clickInNav()` | Click handler of `<nav>`. Closes the navigation when the click was to the right of the `<nav>` box. Takes `{ event }`. |
| `#clickInMainBackdrop()` | Capture-phase click handler of `<main>`. Closes the navigation and returns `false`. Takes `{ pointerEvent }`. |
