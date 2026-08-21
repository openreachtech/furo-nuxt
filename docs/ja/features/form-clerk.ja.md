# フォーム要素クラーク

フォームクラークは `<form>` から値を読み取り、検証し、その結果を Vue の ref として公開します。

入口は 2 つあり、どちらを使うかはリクエストをどこに置くかで決まります。

| 入口 | 組み合わせる相手 | 検証ルールの置き場所 |
| :-- | :-- | :-- |
| `useFormClerk()` | `furo` の `BaseFormElementClerk` のサブクラス | フォーム要素クラーク（`.get:rules`） |
| `BaseFormClerk` | サブミッタークラス（例: `BaseRestfulApiSubmitter`） | クラークのサブクラス（`.get:validationRules`） |

## (1) `useFormClerk()`

`useFormClerk()` は `furo` のフォーム要素クラークとリクエスト関数を接続します。`submitForm()` はまず検証を行い、すべてのルールを満たしたときにのみリクエストを発行します。

```js
import {
  BaseFormElementClerk,
} from '@openreachtech/furo'

/**
 * @extends {BaseFormElementClerk<AlphaFormValueHash>}
 */
export default class AlphaFormElementClerk extends BaseFormElementClerk {
  /** @override */
  static get rules () {
    return [
      {
        ok: (it, valueHash) => it,
        field: 'email',
        message: 'email must be set',
      },
      {
        ok: (it, valueHash) => /^[^@]+@[^@]+\.[^@]+$/u.test(it),
        field: 'email',
        message: 'email must be valid',
      },
    ]
  }
}
```

```js
import {
  defineComponent,
  shallowRef,
} from 'vue'

import {
  useFormClerk,
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import AlphaMutationGraphqlLauncher from '~/app/graphql/client/mutations/alpha/AlphaMutationGraphqlLauncher.js'
import AlphaFormElementClerk from './AlphaFormElementClerk.js'

export default defineComponent({
  setup () {
    const {
      capsuleRef,
      invokeRequestWithFormValueHash,
    } = useGraphqlClient({
      Launcher: AlphaMutationGraphqlLauncher,
    })

    const {
      validationRef,
      submitForm,
    } = useFormClerk({
      FormElementClerk: AlphaFormElementClerk,
      invokeRequestWithFormValueHash,
    })

    /** @type {import('vue').ShallowRef<HTMLFormElement | null>} */
    const formElementRef = shallowRef(null)

    return {
      capsuleRef,
      validationRef,
      formElementRef,
      submitForm,
    }
  },
})
```

```vue
<template>
  <form
    :ref="formElementRef"
    @submit.prevent="submitForm({
      formElement: formElementRef,
    })"
  >
    <label>
      <input
        name="email"
        type="text"
      >
      <span>{{ validationRef.message.email }}</span>
    </label>

    <button type="submit">
      Send
    </button>
  </form>
</template>
```

`submitForm()` は検証に失敗してリクエストを送らなかった場合は `false`、リクエストを発行した場合は `true` を返します。`validationRef` は `furo` の検証ハッシュ（`valid`・`invalid`・`messages`・`message`）をフィールド名をキーとして保持します。

任意の `extraValueHash` はフォームコントロール以外の値をペイロードにマージし、`hooks` と `options` はそのまま Launcher に渡されます。

## (2) `BaseFormClerk`

`BaseFormClerk` はクラス形式です。`useFormClerk()` と異なり、フォーム要素の ref 自体を保持するため、サブミッタークラスがフォームの状態をまとめて持つことができます。

ルールは `.get:validationRules` をオーバーライドして宣言します。

```js
import {
  BaseFormClerk,
} from '@openreachtech/furo-nuxt'

/**
 * @extends {BaseFormClerk<AlphaFormValueHash>}
 */
export default class AlphaFormClerk extends BaseFormClerk {
  /** @override */
  static get validationRules () {
    return [
      {
        ok: (it, valueHash) => it,
        field: 'first',
        message: 'first must be set',
      },
      {
        ok: (it, valueHash) => it,
        field: 'second',
        message: 'second must be set',
      },
    ]
  }
}
```

```js
const alphaFormClerk = AlphaFormClerk.create()

// これを :ref で <form> 要素に結び付けます。
const {
  formElementShallowRef,
  validationRef,
} = alphaFormClerk

// <form> を読み取り、ルールを実行し、validationRef を更新します。
const isValid = alphaFormClerk.validateFormValueHash()

if (isValid) {
  const valueHash = alphaFormClerk.extractValueHash()
}
```

`extractValueHash()` は ref が `null` のままだと `Error: no mounted form element` を投げるため、`<form>` がマウントされた後に呼び出してください。

通常はクラークを直接操作せず、サブミッターに渡します。[RESTful API クライアント](./restful-api-client.ja.md) を参照してください。
