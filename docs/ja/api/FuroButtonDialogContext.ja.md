# FuroButtonDialogContext

> **1.12.0 で非推奨。** `FuroButtonDialog` とともに 2.0.0 で削除します。アップグレードの前に、コンポーネントとこのコンテキストを
> アプリ側へコピーしてください。詳細は [コンポーネント](../features/components.ja.md) を参照してください。

`FuroButtonDialog` のコンテキストです。各ボタンは対応するイベントを発火した後、ダイアログを閉じます。

[BaseFuroContext](./BaseFuroContext.ja.md) を継承し、開閉処理は内部の `FuroDialog` コンポーネントに委譲します。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。`{ props, componentContext, dialogComponentRef }` を受け取ります。 |
| `.get:EMIT_EVENT_NAME` | `CLICK_POSITIVE_BUTTON`・`CLICK_NEGATIVE_BUTTON`・`CLICK_NEUTRAL_BUTTON`。 |
| `#dialogComponentRef` | 内部の `FuroDialog` コンポーネントの ref。 |
| `#get:dialogComponent` | 内部の `FuroDialog` コンポーネント。無い場合は `null`。 |
| `#setupComponent()` | `generateExposeHash()` を `expose()` に登録します。 |
| `#showDialog()` | 内部のダイアログを開きます。 |
| `#dismissDialog()` | 内部のダイアログを閉じます。 |
| `#clickPositiveButton()` | `CLICK_POSITIVE_BUTTON` を発火した後、ダイアログを閉じます。 |
| `#clickNegativeButton()` | `CLICK_NEGATIVE_BUTTON` を発火した後、ダイアログを閉じます。 |
| `#clickNeutralButton()` | `CLICK_NEUTRAL_BUTTON` を発火した後、ダイアログを閉じます。 |
| `#generateExposeHash()` | `showDialog()` と `dismissDialog()` を親コンポーネントに公開します。 |
