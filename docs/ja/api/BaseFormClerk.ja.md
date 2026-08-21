# BaseFormClerk

`<form>` 要素の ref と検証結果の ref を保持し、`furo` のフォーム要素インスペクターと値ハッシュバリデーターを取りまとめるフォームクラークです。

使い方は [フォーム要素クラーク](https://github.com/openreachtech/furo-nuxt/blob/main/docs/ja/features/form-clerk.ja.md) を参照してください。

## メンバー

| メンバー | 説明 |
| :-- | :-- |
| `.create()` | ファクトリメソッド。任意の `{ formElementShallowRef, validationRef }` を受け取ります。いずれも既定では新しい ref を生成します。 |
| `.get:validationRules` | 抽象メソッド。このフォームの検証ルール。オーバーライドしない限り `[]` を返します。 |
| `#validateFormValueHash()` | ルールを実行し、結果を検証用 ref に書き込み、妥当かどうかを返します。任意の `{ valueHash }` を受け取り、既定では現在のフォームの値を使います。 |
| `#isValid()` | 検証ハッシュのすべてのフィールドが妥当な場合に `true`。任意の `{ validationHash }` を受け取ります。 |
| `#isInvalid()` | `#isValid()` の否定。任意の `{ validationHash }` を受け取ります。 |
| `#extractValueHash()` | `<form>` 要素から読み取った値ハッシュ。 |

`#extractValueHash()` は、フォーム要素の ref が `null` のままの場合に `Error: no mounted form element` を投げます。

クラークの `formElementShallowRef` を `:ref` で `<form>` に結び付け、メッセージは `validationRef` から読み出してください。
