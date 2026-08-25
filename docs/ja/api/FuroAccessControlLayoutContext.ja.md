# FuroAccessControlLayoutContext

> **1.12.0 で非推奨。** `FuroAccessControlLayout` とともに 2.0.0 で削除します。アップグレードの前に、コンポーネントとこのコンテキストを
> アプリ側へコピーしてください。詳細は [コンポーネント](../features/components.ja.md) を参照してください。

`FuroAccessControlLayout` のコンテキストです。現在のロールが内容を閲覧できるかどうかを判定します。

[BaseFuroContext](./BaseFuroContext.ja.md) を継承しているため、`.create()` は `{ props, componentContext }` を受け取ります。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `#canShowContent()` | ロールが設定され、許可され、かつ排除されていない場合に `true`。 |

`role` が無い場合は常に拒否されます。`allowed` が空ならすべてのロールを許可し、`kicked` が空なら誰も排除しません。
