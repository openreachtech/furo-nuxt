# FuroTabLayoutContext

Context of `FuroTabLayout`. It turns the `tabs` prop into a list of [FuroTabItemContext](./FuroTabItemContext.md), and moves
the `active` class on click.

Extends [BaseFuroContext](./BaseFuroContext.md).

## Members

| member | description |
| :-- | :-- |
| `.create()` | Factory method. Takes `{ props, componentContext, tabElementsRef }`, and builds the tab contexts from `props.tabs`. |
| `.get:EMIT_EVENT_NAME` | `CHANGE_TAB`. |
| `#tabElementsRef` | Ref of the tab button elements. |
| `#tabContexts` | The tab item contexts, in the order given by the `tabs` prop. |
| `#activeTabKey` | The `activeTabKey` prop as of creation. |
| `#get:tabElements` | The tab button elements. |
| `#isActiveTab()` | `true` when the tab matches `#activeTabKey`. Takes `{ tab }`. |
| `#onClickTab()` | Click handler of a tab. Emits `CHANGE_TAB` with `{ fromTab, toTab }`, then moves the `active` class. Takes `{ event }`. |
