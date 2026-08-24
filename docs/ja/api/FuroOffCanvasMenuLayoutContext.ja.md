# FuroOffCanvasMenuLayoutContext

> **1.12.0 で非推奨。** `FuroOffCanvasMenuLayout` とともに 2.0.0 で削除します。アップグレードの前に、コンポーネントとこのコンテキストを
> アプリ側へコピーしてください。詳細は [コンポーネント](../features/components.ja.md) を参照してください。

`FuroOffCanvasMenuLayout` のコンテキストです。ナビゲーションの開閉状態は、ルート要素の `open-nav` クラスで表されます。

[BaseFuroContext](./BaseFuroContext.ja.md) を継承しています。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。`{ props, componentContext, route, rootElementRef }` を受け取ります。 |
| `#route` | 現在のルート。遷移時にナビゲーションを閉じるために使います。 |
| `#rootElementRef` | レイアウトのルート要素の ref。 |
| `#get:rootElement` | レイアウトのルート要素。無い場合は `null`。 |
| `#setupComponent()` | `route.fullPath` を監視し、ルートの変更時にナビゲーションを閉じます。 |
| `#clickToggleNavigation()` | `open-nav` クラスをトグルします。 |
| `#closeNavigation()` | `open-nav` クラスを取り除きます。 |
| `#isShowedNavigation()` | `open-nav` クラスが付いている間は `true`。 |
| `#clickInNav()` | `<nav>` のクリックハンドラー。`<nav>` の矩形より右側がクリックされた場合にナビゲーションを閉じます。`{ event }` を受け取ります。 |
| `#clickInMainBackdrop()` | `<main>` のキャプチャフェーズのクリックハンドラー。ナビゲーションを閉じ、`false` を返します。`{ pointerEvent }` を受け取ります。 |
