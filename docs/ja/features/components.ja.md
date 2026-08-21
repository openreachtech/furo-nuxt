# コンポーネント

コンポーネントは `lib/components/` 配下の `.vue` ファイルとして同梱されているため、パスを指定してインポートします。

```js
import FuroDialog from '@openreachtech/furo-nuxt/lib/components/FuroDialog.vue'
```

いずれのコンポーネントも [コンテキストクラス](./component-context.ja.md) で駆動されており、それぞれのコンテキストはパッケージのエントリーポイントからエクスポートされているため、継承して拡張できます。

`FuroOffCanvasMenuLayout` と `FuroPagination` は `useRoute()` と `NuxtLink` を解決するため、Nuxt アプリの中でのみ動作します。それ以外は素の Vue コンポーネントです。

## (1) スタイルシート

基本スタイルシートは `lib/assets/css/` にあります。`nuxt.config.js` の `css` にこの順序で追加してください。数値のプレフィックスが意図されたカスケード順です。

```js
export default defineNuxtConfig({
  css: [
    '@openreachtech/furo-nuxt/lib/assets/css/0000.furo.css',
    '@openreachtech/furo-nuxt/lib/assets/css/0010.variables-palette-color-scale.css',
    '@openreachtech/furo-nuxt/lib/assets/css/0020.variables-z-index.css',
    '@openreachtech/furo-nuxt/lib/assets/css/0100.reset.css',
    '@openreachtech/furo-nuxt/lib/assets/css/0200.base.css',
    '@openreachtech/furo-nuxt/lib/assets/css/0300.gimmick.css',
  ],
})
```

コンポーネントのスタイルは `@layer furo` の中で宣言されているため、レイヤーに属さない独自のルールは `!important` なしでこれらに優先します。

## (2) `FuroDialog`

`<dialog>` のラッパーです。ネイティブの `open` 属性の変化をイベントに変換し、バックドロップへのクリックを通知します。

| slot | 内容 |
| :-- | :-- |
| `contents` | ダイアログの本体 |
| `x-button` | 組み込みの閉じるボタンのラベル（既定値は `✕`） |

| event | 発火するタイミング |
| :-- | :-- |
| `show-dialog` | ダイアログが開いたとき |
| `dismiss-dialog` | ダイアログが閉じたとき |
| `click-backdrop` | ダイアログの矩形の外側がクリックされたとき |

公開メソッド: `showDialog()` と `dismissDialog()`。

組み込みの閉じるボタンは、要素に `x-close` クラスが付いていない限り非表示です。

```js
import {
  defineComponent,
  ref,
} from 'vue'

import FuroDialog from '@openreachtech/furo-nuxt/lib/components/FuroDialog.vue'

export default defineComponent({
  components: {
    FuroDialog,
  },

  setup () {
    /** @type {import('vue').Ref<FuroDialog | null>} */
    const dialogComponentRef = ref(null)

    return {
      dialogComponentRef,
    }
  },
})
```

```vue
<template>
  <button @click="dialogComponentRef.showDialog()">
    Open
  </button>

  <FuroDialog
    ref="dialogComponentRef"
    class="x-close"
    @click-backdrop="dialogComponentRef.dismissDialog()"
  >
    <template #contents>
      Hello.
    </template>
  </FuroDialog>
</template>
```

## (3) `FuroButtonDialog`

3 つのボタンのフッターを備えた `FuroDialog` です。いずれのボタンをクリックしても、対応するイベントを発火した後にダイアログを閉じます。

| slot | 内容 |
| :-- | :-- |
| `contents` | ダイアログの本体 |
| `neutral` | ニュートラルボタンのラベル |
| `negative` | ネガティブボタンのラベル |
| `positive` | ポジティブボタンのラベル |

| event | 発火するタイミング |
| :-- | :-- |
| `click-positive-button` | ポジティブボタンがクリックされたとき |
| `click-negative-button` | ネガティブボタンがクリックされたとき |
| `click-neutral-button` | ニュートラルボタンがクリックされたとき |
| `click-backdrop` | ダイアログの矩形の外側がクリックされたとき |

公開メソッド: `showDialog()` と `dismissDialog()`。

```vue
<template>
  <FuroButtonDialog
    ref="dialogComponentRef"
    @click-positive-button="submit()"
  >
    <template #contents>
      Delete this item?
    </template>

    <template #negative>
      Cancel
    </template>

    <template #positive>
      Delete
    </template>
  </FuroButtonDialog>
</template>
```

## (4) `FuroLoadingLayout`

リクエスト中は内容をローダーに差し替えます。

| prop | 型 | 既定値 |
| :-- | :-- | :-- |
| `isLoading` | `boolean` | 必須 |

| slot | 内容 |
| :-- | :-- |
| `contents` | 読み込み中でないときに表示されます |
| `loader` | 読み込み中に表示されます（既定値は `Loading...`） |

```vue
<template>
  <FuroLoadingLayout :is-loading="context.isLoading">
    <template #contents>
      <ul>
        <li
          v-for="alpha of context.alphas"
          :key="alpha.id"
        >
          {{ alpha.name }}
        </li>
      </ul>
    </template>

    <template #loader>
      Fetching...
    </template>
  </FuroLoadingLayout>
</template>
```

## (5) `FuroAccessControlLayout`

現在のロールが両方のリストの条件を満たしたときにのみ、内容を表示します。

| prop | 型 | 既定値 |
| :-- | :-- | :-- |
| `role` | `string \| null` | `null` |
| `allowed` | `Array<string>` | `[]` |
| `kicked` | `Array<string>` | `[]` |

| slot | 内容 |
| :-- | :-- |
| `contents` | アクセスが許可されたときに表示されます |
| `mask` | アクセスが拒否されたときに表示されます |

`role` が無い場合は常に拒否されます。`allowed` が空ならすべてのロールを許可し、`kicked` が空なら誰も排除しないため、ロールが `allowed` に含まれ、かつ `kicked` に含まれないときに内容が表示されます。

```vue
<template>
  <FuroAccessControlLayout
    :role="context.role"
    :allowed="[
      'admin',
      'staff',
    ]"
  >
    <template #contents>
      <AdminPanel />
    </template>

    <template #mask>
      You are not allowed to see this page.
    </template>
  </FuroAccessControlLayout>
</template>
```

## (6) `FuroTabLayout`

リストからタブバーを描画し、クリックされたタブをアクティブにします。

| prop | 型 | 既定値 |
| :-- | :-- | :-- |
| `tabs` | `Array<{ tabKey: string, label: string, slotName?: string }>` | `[]` |
| `activeTabKey` | `string` | `null` |

| event | ペイロード |
| :-- | :-- |
| `change-tab` | `{ fromTab, toTab }`。いずれも `FuroTabItemContext` または `null` |

| slot | 内容 |
| :-- | :-- |
| `contents` | タブパネルの本体 |
| `tabControl` | `slotName` を宣言していないタブのラベル |
| `<slotName>TabControl` | `slotName` を宣言したタブのラベル |

各タブコントロールのスロットはタブの `label` をスコープとして受け取り、既定ではそれをそのまま描画します。

```vue
<template>
  <FuroTabLayout
    :tabs="[
      {
        tabKey: 'alpha',
        label: 'Alpha',
      },
      {
        tabKey: 'beta',
        label: 'Beta',
        slotName: 'beta',
      },
    ]"
    active-tab-key="alpha"
    @change-tab="context.changeTab($event)"
  >
    <template #betaTabControl="{ label }">
      <strong>{{ label }}</strong>
    </template>

    <template #contents>
      <AlphaPanel />
    </template>
  </FuroTabLayout>
</template>
```

## (7) `FuroPagination`

現在のルートクエリからページリンクの範囲を組み立てます。Nuxt 専用です。

| prop | 型 | 既定値 |
| :-- | :-- | :-- |
| `pagination` | `{ limit: number, totalRecords: number }` | `{ limit: 20, totalRecords: 0 }` |
| `pageKey` | `string` | `'page'` |
| `maxPageRange` | `number` | `5` |

| event | ペイロード |
| :-- | :-- |
| `change-page` | `{ event, page }`。`page` は `FuroPageItemContext` |

| slot | 内容 |
| :-- | :-- |
| `previous` | 前ページリンクのラベル（既定値は `<`） |
| `next` | 次ページリンクのラベル（既定値は `>`） |

現在のページは `pageKey` のクエリパラメーターから読み取られるため、リンクは他のクエリパラメーターをそのまま保持します。各リンクは `NuxtLink` であり、遷移自体はイベントハンドラーを介さずに行われます。再取得には `change-page` を使ってください。

```vue
<template>
  <FuroPagination
    :pagination="context.pagination"
    @change-page="context.changePage($event)"
  />
</template>
```

## (8) `FuroOffCanvasMenuLayout`

ヘッダー / ナビゲーション / メインのレイアウトで、幅の狭い画面ではナビゲーションがスライドインします。Nuxt 専用です。

| slot | 内容 |
| :-- | :-- |
| `toggle-menu` | ナビゲーション開閉ボタンのラベル |
| `header` | ヘッダーの本体 |
| `navigation` | `<nav>` の本体 |
| `contents` | `<main>` の本体 |

開いている状態はルート要素の `open-nav` クラスで表されます。ナビゲーションは、ルートの変更時、`<main>` のバックドロップのクリック時、そして `<nav>` の矩形より右側のクリック時に閉じます。

```vue
<template>
  <FuroOffCanvasMenuLayout>
    <template #toggle-menu>
      ☰
    </template>

    <template #header>
      <h1>Alpha</h1>
    </template>

    <template #navigation>
      <NuxtLink to="/">
        Home
      </NuxtLink>
    </template>

    <template #contents>
      <NuxtPage />
    </template>
  </FuroOffCanvasMenuLayout>
</template>
```
