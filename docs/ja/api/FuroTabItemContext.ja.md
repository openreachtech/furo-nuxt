# FuroTabItemContext

> **1.12.0 で非推奨。** `FuroTabLayout` とともに 2.0.0 で削除します。アップグレードの前に、コンポーネントとこのコンテキストを
> アプリ側へコピーしてください。詳細は [コンポーネント](../features/components.ja.md) を参照してください。

`FuroTabLayout` の 1 つのタブです。インスタンスは `tabs` prop から
[FuroTabLayoutContext](./FuroTabLayoutContext.ja.md) が構築し、`change-tab` のペイロードに含まれます。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。`{ tabKey, label, index, slotName }` を受け取り、スロット名を正規化します。 |
| `#tabKey` | タブを識別するキー。 |
| `#label` | タブに表示されるラベル。 |
| `#index` | リスト内でのタブの位置。 |
| `#slotName` | タブコントロールのスロット名。`slotName` が未指定なら `tabControl`、指定があれば `<slotName>TabControl`。 |
| `#isTargetTab()` | 渡されたキーがこのタブのキーである場合に `true`。`{ tabKey }` を受け取ります。 |
