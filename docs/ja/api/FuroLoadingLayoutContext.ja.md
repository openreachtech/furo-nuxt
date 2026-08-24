# FuroLoadingLayoutContext

> **1.12.0 で非推奨。** `FuroLoadingLayout` とともに 2.0.0 で削除します。アップグレードの前に、コンポーネントとこのコンテキストを
> アプリ側へコピーしてください。詳細は [コンポーネント](../features/components.ja.md) を参照してください。

`FuroLoadingLayout` のコンテキストです。読み込み中フラグをテンプレートに公開します。

[BaseFuroContext](./BaseFuroContext.ja.md) を継承しているため、`.create()` は `{ props, componentContext }` を受け取ります。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `#get:isLoading` | `isLoading` prop。 |
