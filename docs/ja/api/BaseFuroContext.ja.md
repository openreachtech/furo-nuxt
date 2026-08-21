# BaseFuroContext

すべてのコンポーネントコンテキストの基底クラスです。props と Vue のセットアップコンテキストを保持し、セットアップコンテキストのメンバーを転送するため、サブクラスはそれらをインポートする必要がありません。

使い方は [コンポーネントコンテキスト](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/features/component-context.ja.md) を参照してください。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。`{ props, componentContext }` を受け取ります。 |
| `.get:ContextAccessor` | このコンテキストと対になるアクセサークラス。オーバーライドしない限り `null` を返します。 |
| `.get:EMIT_EVENT_NAME` | 抽象メソッド。`emit()` のイベント名のハッシュ。オーバーライドしない限り `{}` を返します。 |
| `#props` | コンポーネントに渡された props。 |
| `#componentContext` | Vue のセットアップコンテキスト。 |
| `#accessor` | アクセサーのインスタンス。`.get:ContextAccessor` が `null` の場合は `null`。 |
| `#get:$` | `#accessor` の短縮形。 |
| `#get:EMIT_EVENT_NAME` | `.get:EMIT_EVENT_NAME` が宣言したハッシュ。 |
| `#get:attrs` | セットアップコンテキストの `attrs`。 |
| `#get:slots` | セットアップコンテキストの `slots`。 |
| `#get:emit` | セットアップコンテキストの `emit()`。 |
| `#get:expose` | セットアップコンテキストの `expose()`。 |
| `#get:watch` | Vue の `watch()`。 |
| `#setupComponent()` | `expose()` や `watch()` などの副作用を書くためのフック。`this` を返します。オーバーライドしない限り何もしません。 |
| `#generateExposeHash()` | `expose()` に渡すメソッドのハッシュ。オーバーライドしない限り `{}` を返します。 |
