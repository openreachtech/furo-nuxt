# FuroDialogContext

Context of `FuroDialog`. It watches the native `open` attribute through a `MutationObserver` and turns its changes into
`emit()` events, and reports clicks that land outside the dialog box.

Extends [BaseFuroContext](./BaseFuroContext.md).

## Members

| member | description |
| :-- | :-- |
| `.create()` | Factory method. Takes `{ props, componentContext, dialogElementRef }`. |
| `.get:EMIT_EVENT_NAME` | `SHOW_DIALOG`, `DISMISS_DIALOG` and `CLICK_BACKDROP`. |
| `#dialogElementRef` | Ref of the `<dialog>` element. |
| `#get:dialogElement` | The `<dialog>` element, or `null`. |
| `#setupComponent()` | Registers `generateExposeHash()` with `expose()`, and starts observing the `open` attribute. |
| `#showDialog()` | Opens the dialog with `showModal()`. |
| `#dismissDialog()` | Closes the dialog with `close()`. |
| `#clickInInner()` | Click handler of the `<dialog>`. Emits `CLICK_BACKDROP` when the click was outside the box. Takes `{ event }`. |
| `#generateExposeHash()` | Exposes `showDialog()` and `dismissDialog()` to the parent component. |
