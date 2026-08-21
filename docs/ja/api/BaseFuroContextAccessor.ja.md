# BaseFuroContextAccessor

コンテキストアクセサーの基底クラスです。アクセサーはコンテキストに対する読み取り専用のファサードで、`context.$` からアクセスします。テンプレート向けにデータを整形するだけのゲッターをここに置きます。

使い方は [コンポーネントコンテキスト](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/features/component-context.ja.md) を参照してください。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。`{ context }` を受け取ります。 |
| `#context` | このアクセサーがラップするコンテキスト。 |
