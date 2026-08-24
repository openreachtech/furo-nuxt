# FuroDialogContext

> **1.12.0 で非推奨。** `FuroDialog` とともに 2.0.0 で削除します。アップグレードの前に、コンポーネントとこのコンテキストを
> アプリ側へコピーしてください。詳細は [コンポーネント](../features/components.ja.md) を参照してください。

`FuroDialog` のコンテキストです。ネイティブの `open` 属性を `MutationObserver` で監視してその変化を `emit()` イベントに変換し、ダイアログの矩形の外側へのクリックを通知します。

[BaseFuroContext](./BaseFuroContext.ja.md) を継承しています。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。`{ props, componentContext, dialogElementRef }` を受け取ります。 |
| `.get:EMIT_EVENT_NAME` | `SHOW_DIALOG`・`DISMISS_DIALOG`・`CLICK_BACKDROP`。 |
| `#dialogElementRef` | `<dialog>` 要素の ref。 |
| `#get:dialogElement` | `<dialog>` 要素。無い場合は `null`。 |
| `#setupComponent()` | `generateExposeHash()` を `expose()` に登録し、`open` 属性の監視を開始します。 |
| `#showDialog()` | `showModal()` でダイアログを開きます。 |
| `#dismissDialog()` | `close()` でダイアログを閉じます。 |
| `#clickInInner()` | `<dialog>` のクリックハンドラー。矩形の外側がクリックされた場合に `CLICK_BACKDROP` を発火します。`{ event }` を受け取ります。 |
| `#generateExposeHash()` | `showDialog()` と `dismissDialog()` を親コンポーネントに公開します。 |
