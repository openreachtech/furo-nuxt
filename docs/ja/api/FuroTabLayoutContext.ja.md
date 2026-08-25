# FuroTabLayoutContext

> **1.12.0 で非推奨。** `FuroTabLayout` とともに 2.0.0 で削除します。アップグレードの前に、コンポーネントとこのコンテキストを
> アプリ側へコピーしてください。詳細は [コンポーネント](../features/components.ja.md) を参照してください。

`FuroTabLayout` のコンテキストです。`tabs` prop を [FuroTabItemContext](./FuroTabItemContext.ja.md) のリストに変換し、クリック時に `active` クラスを移動します。

[BaseFuroContext](./BaseFuroContext.ja.md) を継承しています。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。`{ props, componentContext, tabElementsRef }` を受け取り、`props.tabs` からタブのコンテキストを構築します。 |
| `.get:EMIT_EVENT_NAME` | `CHANGE_TAB`。 |
| `#tabElementsRef` | タブボタン要素の ref。 |
| `#tabContexts` | タブアイテムのコンテキスト。`tabs` prop の順序に従います。 |
| `#activeTabKey` | 生成時点の `activeTabKey` prop。 |
| `#get:tabElements` | タブボタン要素。 |
| `#isActiveTab()` | タブが `#activeTabKey` に一致する場合に `true`。`{ tab }` を受け取ります。 |
| `#onClickTab()` | タブのクリックハンドラー。`{ fromTab, toTab }` を添えて `CHANGE_TAB` を発火した後、`active` クラスを移動します。`{ event }` を受け取ります。 |
