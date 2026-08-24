# FuroButtonDialogContext

> **Deprecated since 1.12.0.** Will be removed in 2.0.0 together with `FuroButtonDialog`. Copy the component and this context into your app
> before upgrading. See [Components](../features/components.md).

Context of `FuroButtonDialog`. Each button emits its event and then dismisses the dialog.

Extends [BaseFuroContext](./BaseFuroContext.md), and delegates showing and dismissing to the inner `FuroDialog` component.

## Members

| member | description |
| :-- | :-- |
| `.create()` | Factory method. Takes `{ props, componentContext, dialogComponentRef }`. |
| `.get:EMIT_EVENT_NAME` | `CLICK_POSITIVE_BUTTON`, `CLICK_NEGATIVE_BUTTON` and `CLICK_NEUTRAL_BUTTON`. |
| `#dialogComponentRef` | Ref of the inner `FuroDialog` component. |
| `#get:dialogComponent` | The inner `FuroDialog` component, or `null`. |
| `#setupComponent()` | Registers `generateExposeHash()` with `expose()`. |
| `#showDialog()` | Opens the inner dialog. |
| `#dismissDialog()` | Closes the inner dialog. |
| `#clickPositiveButton()` | Emits `CLICK_POSITIVE_BUTTON`, then dismisses. |
| `#clickNegativeButton()` | Emits `CLICK_NEGATIVE_BUTTON`, then dismisses. |
| `#clickNeutralButton()` | Emits `CLICK_NEUTRAL_BUTTON`, then dismisses. |
| `#generateExposeHash()` | Exposes `showDialog()` and `dismissDialog()` to the parent component. |
