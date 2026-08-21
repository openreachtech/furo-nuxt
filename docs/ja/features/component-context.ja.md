# コンポーネントコンテキスト

コンテキストクラスは、コンポーネントの `setup()` がクロージャーに散らばらせてしまうもの — props、Vue のセットアップコンテキスト、ref、`<template>` が呼び出すメソッド — をまとめて保持します。

`setup()` は「コンテキストを生成して返す」だけに縮み、`<template>` は `context` とだけやり取りします。

## (1) `BaseFuroContext`

継承してテンプレートが必要とするメンバーを追加し、`setup()` から生成します。

```js
import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * @extends {BaseFuroContext<null, AlphaContextProps, null>}
 */
export default class AlphaContext extends BaseFuroContext {
  /**
   * get: title
   *
   * @returns {string}
   */
  get title () {
    return this.props.title
  }

  /**
   * ボタンをクリックする。
   *
   * @returns {void}
   */
  clickButton () {
    this.emit(this.EMIT_EVENT_NAME.CLICK_BUTTON)
  }
}

/**
 * @typedef {{
 *   title: string
 * }} AlphaContextProps
 */
```

```js
import {
  defineComponent,
} from 'vue'

import AlphaContext from './AlphaContext.js'

export default defineComponent({
  name: 'Alpha',

  props: {
    title: {
      type: String,
      required: true,
    },
  },

  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = AlphaContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
```

```vue
<template>
  <button @click="context.clickButton()">
    {{ context.title }}
  </button>
</template>
```

インスタンスは Vue のセットアップコンテキストを転送するため、何もインポートせずに `this.attrs`・`this.slots`・`this.emit`・`this.expose`・`this.watch` を利用できます。

`setupComponent()` は副作用（`expose()`・`watch()` など）を書く場所で、メソッドチェーンのために `this` を返します。基底クラスの実装は何もしないため、セットアップが必要なコンポーネントでオーバーライドしてください。

## (2) `emit()` のイベント名

`.get:EMIT_EVENT_NAME` をオーバーライドしてイベント名を一箇所で宣言し、`this.EMIT_EVENT_NAME` から読み出します。これにより、呼び出し側から文字列リテラルを排除できます。

```js
export default class AlphaContext extends BaseFuroContext {
  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      CLICK_BUTTON: 'clickButton',
    }
  }
}
```

## (3) 親コンポーネントへのメソッド公開

`generateExposeHash()` からメソッドを返し、`setupComponent()` の中で `expose()` に渡します。コンポーネントへの `ref` を持つ親から、それらを呼び出せるようになります。

```js
export default class AlphaContext extends BaseFuroContext {
  /** @override */
  setupComponent () {
    this.expose(
      this.generateExposeHash()
    )

    return this
  }

  /** @override */
  generateExposeHash () {
    return {
      reload: () => this.reload(),
    }
  }
}
```

## (4) `BaseFuroContextAccessor`

アクセサーはコンテキストに対する読み取り専用のファサードで、`context.$` からアクセスします。テンプレート向けにデータを整形するだけのゲッターをここに置くことで、コンテキスト自体は振る舞いに専念できます。

```js
import {
  BaseFuroContextAccessor,
} from '@openreachtech/furo-nuxt'

/**
 * @extends {BaseFuroContextAccessor<import('./AlphaContext.js').default>}
 */
export default class AlphaContextAccessor extends BaseFuroContextAccessor {
  /**
   * get: alphas
   *
   * @returns {Array<*>}
   */
  get alphas () {
    return this.context
      .capsuleRef
      .value
      .alphas
  }
}
```

コンテキスト側で `.get:ContextAccessor` をオーバーライドして結び付けます。

```js
export default class AlphaContext extends BaseFuroContext {
  /** @override */
  static get ContextAccessor () {
    return AlphaContextAccessor
  }
}
```

```vue
<template>
  <li
    v-for="alpha of context.$.alphas"
    :key="alpha.id"
  >
    {{ alpha.name }}
  </li>
</template>
```

基底クラスの `.get:ContextAccessor` は `null` を返し、その場合 `context.$` も `null` になります。

## (5) `buildDefineComponent()`

`buildDefineComponent()` は、共有の `setup()` 関数をコンポーネント自身の `setup()` より先に実行し、返されたバインディングをすべてマージする `defineComponent()` の代替を組み立てます。アプリ内のすべてのコンポーネントが繰り返すセットアップ処理に使ってください。

```js
// app/vue/defineAppComponent.js
import {
  buildDefineComponent,
} from '@openreachtech/furo-nuxt'

import sharedComponentOptions from './shared-component-options.js'

export default buildDefineComponent({
  options: [
    sharedComponentOptions,
  ],
})
```

```js
// app/vue/shared-component-options.js
/** @type {import('vue').ComponentOptions} */
export default {
  setup (
    props,
    componentContext
  ) {
    // defineAppComponent() で定義したすべてのコンポーネントで実行されます。
    return {}
  },
}
```

以降は `defineComponent()` の代わりにこれでコンポーネントを定義します。

```js
import defineAppComponent from '~/app/vue/defineAppComponent.js'

export default defineAppComponent({
  setup (
    props,
    componentContext
  ) {
    return {}
  },
})
```
