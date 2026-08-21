# FuroTabItemContext

One tab of `FuroTabLayout`. Instances are built by
[FuroTabLayoutContext](./FuroTabLayoutContext.md) from the `tabs` prop, and arrive in the `change-tab` payload.

## Members

| member | description |
| :-- | :-- |
| `.create()` | Factory method. Takes `{ tabKey, label, index, slotName }`, and normalizes the slot name. |
| `#tabKey` | Key identifying the tab. |
| `#label` | Label shown on the tab. |
| `#index` | Position of the tab in the list. |
| `#slotName` | Name of the tab control slot: `tabControl` when no `slotName` was given, otherwise `<slotName>TabControl`. |
| `#isTargetTab()` | `true` when the given key is this tab's key. Takes `{ tabKey }`. |
