# Components

> **Deprecated since 1.12.0. Will be removed in 2.0.0.** Every component listed here, and the context class behind it, leaves the package at
> the next major version. The stylesheets `0200.base.css` and `0300.gimmick.css` go with them.
>
> Copy the components you still need into your own app before upgrading. They carry no hidden dependency on the package:
> each one is a single `.vue` file plus its context class, and both are yours to own once copied. See
> [Migrating off the components](#migrating-off-the-components) below.

The components ship as `.vue` files under `lib/components/`, so import them by path.

```js
import FuroDialog from '@openreachtech/furo-nuxt/lib/components/FuroDialog.vue'
```

Every component is driven by a [context class](./component-context.md), and each one is exported from the package entry so
you can extend it.

`FuroOffCanvasMenuLayout` and `FuroPagination` resolve `useRoute()` and `NuxtLink`, so they only work inside a Nuxt app. The
rest are plain Vue components.

## (1) Stylesheets

The base stylesheets live in `lib/assets/css/`. Add them to `css` in `nuxt.config.js`, in this order — the numeric prefixes
are the intended cascade.

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

Component styles are declared inside `@layer furo`, so any unlayered rule of your own wins over them without needing
`!important`.

## (2) `FuroDialog`

A `<dialog>` wrapper that turns the native `open` attribute into events, and reports clicks that land on the backdrop.

| slot | content |
| :-- | :-- |
| `contents` | dialog body |
| `x-button` | label of the built-in close button (defaults to `✕`) |

| event | fires when |
| :-- | :-- |
| `show-dialog` | the dialog has opened |
| `dismiss-dialog` | the dialog has closed |
| `click-backdrop` | a click landed outside the dialog box |

Exposed methods: `showDialog()` and `dismissDialog()`.

The built-in close button is hidden unless the element carries the `x-close` class.

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

`FuroDialog` with a three-button footer. Clicking any of the buttons emits its event and then dismisses the dialog.

| slot | content |
| :-- | :-- |
| `contents` | dialog body |
| `neutral` | neutral button label |
| `negative` | negative button label |
| `positive` | positive button label |

| event | fires when |
| :-- | :-- |
| `click-positive-button` | the positive button was clicked |
| `click-negative-button` | the negative button was clicked |
| `click-neutral-button` | the neutral button was clicked |
| `click-backdrop` | a click landed outside the dialog box |

Exposed methods: `showDialog()` and `dismissDialog()`.

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

Swaps the contents for a loader while a request is in flight.

| prop | type | default |
| :-- | :-- | :-- |
| `isLoading` | `boolean` | required |

| slot | content |
| :-- | :-- |
| `contents` | shown while not loading |
| `loader` | shown while loading (defaults to `Loading...`) |

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

Shows the contents only when the current role passes both lists.

| prop | type | default |
| :-- | :-- | :-- |
| `role` | `string \| null` | `null` |
| `allowed` | `Array<string>` | `[]` |
| `kicked` | `Array<string>` | `[]` |

| slot | content |
| :-- | :-- |
| `contents` | shown when access is granted |
| `mask` | shown when access is denied |

A missing `role` is always denied. An empty `allowed` allows every role, and an empty `kicked` kicks none, so the contents
show when the role is in `allowed` and absent from `kicked`.

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

Renders a tab bar from a list, and marks the clicked tab active.

| prop | type | default |
| :-- | :-- | :-- |
| `tabs` | `Array<{ tabKey: string, label: string, slotName?: string }>` | `[]` |
| `activeTabKey` | `string` | `null` |

| event | payload |
| :-- | :-- |
| `change-tab` | `{ fromTab, toTab }`, both `FuroTabItemContext` or `null` |

| slot | content |
| :-- | :-- |
| `contents` | tab panel body |
| `tabControl` | label of a tab that declared no `slotName` |
| `<slotName>TabControl` | label of the tab that declared `slotName` |

Each tab control slot receives the tab's `label` as a scope, and falls back to rendering it.

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

Builds a page link range out of the current route query. Nuxt only.

| prop | type | default |
| :-- | :-- | :-- |
| `pagination` | `{ limit: number, totalRecords: number }` | `{ limit: 20, totalRecords: 0 }` |
| `pageKey` | `string` | `'page'` |
| `maxPageRange` | `number` | `5` |

| event | payload |
| :-- | :-- |
| `change-page` | `{ event, page }`, where `page` is a `FuroPageItemContext` |

| slot | content |
| :-- | :-- |
| `previous` | previous link label (defaults to `<`) |
| `next` | next link label (defaults to `>`) |

The current page is read from the `pageKey` query parameter, so links keep every other query parameter intact. Each link is a
`NuxtLink`, which means navigation happens without the event handler; use `change-page` to refetch.

```vue
<template>
  <FuroPagination
    :pagination="context.pagination"
    @change-page="context.changePage($event)"
  />
</template>
```

## (8) `FuroOffCanvasMenuLayout`

A header / navigation / main layout whose navigation slides in on narrow screens. Nuxt only.

| slot | content |
| :-- | :-- |
| `toggle-menu` | label of the navigation toggle button |
| `header` | header body |
| `navigation` | `<nav>` body |
| `contents` | `<main>` body |

The open state is the `open-nav` class on the root element. The navigation closes on a route change, on a click in the
`<main>` backdrop, and on a click to the right of the `<nav>` box.

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

## Migrating off the components

Do this before upgrading to 2.0.0. Nothing here needs to wait for the major version, and every step works against the
current release.

1. Copy the `.vue` files you use from `node_modules/@openreachtech/furo-nuxt/lib/components/` into your own `components/`
   directory, and copy their context classes from `lib/contexts/concretes/` alongside them.
2. Point the copied component at your copied context instead of the package one, and repoint your own imports at the copy.
   `BaseFuroContext` stays in the package, so a copied context keeps extending it.
3. Move the component's styles with it. They are declared inside `@layer furo`; put them in `@layer app` in your app so
   your own rules keep winning.
4. Drop `0300.gimmick.css` from `css` in `nuxt.config.js`. Its only production rule is `body:has(dialog[open])`, which
   locks page scroll while a `<dialog>` is open. Copy that one rule into your app if you rely on it.
5. Drop `0200.base.css` from `css` in `nuxt.config.js` last, because it restyles native tags across every page. Removing
   it drops the margins that `p + p`, `section + section` and `h1 + *` add, the padding on every `<input>`, the
   `capitalize` on every `<h1>`, and the `z-index` on `<header>` and `<nav>`. Add back only what your design needs, scoped
   to your own classes.

`0000.furo.css`, `0010.variables-palette-color-scale.css`, `0020.variables-z-index.css` and `0100.reset.css` stay in the
package. Keep importing them.
