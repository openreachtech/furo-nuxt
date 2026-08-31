# Changelog

## 2.0.0

### Breaking

**The shipped components and their stylesheets are gone.** They were deprecated in 1.12.0 and are now removed, along with
the context class behind each one.

`furo-nuxt` exists to give a base for *how to write logic*. A component and a stylesheet are design decisions, and the
package shipping them read as decisions consumers had to accept. It no longer ships either, so nothing about your markup
or your CSS is dictated here.

Removed:

| Removed | Was |
| :-- | :-- |
| `lib/components/FuroAccessControlLayout.vue`, `FuroAccessControlLayoutContext` | component + context |
| `lib/components/FuroButtonDialog.vue`, `FuroButtonDialogContext` | component + context |
| `lib/components/FuroDialog.vue`, `FuroDialogContext` | component + context |
| `lib/components/FuroLoadingLayout.vue`, `FuroLoadingLayoutContext` | component + context |
| `lib/components/FuroOffCanvasMenuLayout.vue`, `FuroOffCanvasMenuLayoutContext` | component + context |
| `lib/components/FuroPagination.vue`, `FuroPaginationContext`, `FuroPageItemContext` | component + contexts |
| `lib/components/FuroTabLayout.vue`, `FuroTabLayoutContext`, `FuroTabItemContext` | component + contexts |
| `lib/assets/css/0000.furo.css` | `@layer` declaration |
| `lib/assets/css/0010.variables-palette-color-scale.css` | color scale custom properties |
| `lib/assets/css/0020.variables-z-index.css` | z-index custom properties |
| `lib/assets/css/0100.reset.css` | reset for native HTML elements |
| `lib/assets/css/0300.gimmick.css` | `body:has(dialog[open])` scroll lock |

The nine context classes above are no longer exported from the package entry. `BaseFuroContext` and
`BaseFuroContextAccessor` are unchanged and still exported — a component you own keeps extending them.

### Migration

The `css` array in `nuxt.config.js` is the first thing to fix: an unresolved path fails the build.

1. Remove every `@openreachtech/furo-nuxt/lib/assets/css/*` entry from `css` in `nuxt.config.js`.
2. Take the stylesheets you still want from the `1.12.0` tag and put them in your own app, under your own paths:
   <https://github.com/openreachtech/furo-nuxt/tree/1.12.0/lib/assets/css>. `0010.variables-palette-color-scale.css` and
   `0020.variables-z-index.css` are pure custom-property declarations and copy over as-is. `0100.reset.css` resets native
   elements. `0000.furo.css` only declares the `reset, base, furo, app` cascade layers — keep it only if your own CSS
   names those layers.
3. Copy the components you use from <https://github.com/openreachtech/furo-nuxt/tree/1.12.0/lib/components> into your own
   `components/` directory, and their context classes from
   <https://github.com/openreachtech/furo-nuxt/tree/1.12.0/lib/contexts/concretes> alongside them.
4. Point each copied component at your copied context, and repoint your own imports away from `@openreachtech/furo-nuxt`.
   The copied context keeps `import { BaseFuroContext } from '@openreachtech/furo-nuxt'`.
5. Move each component's styles with it. They were declared inside `@layer furo`; in your app they belong in whatever
   layer your own rules use.
6. If you relied on the `<dialog>` scroll lock, copy `body:has(dialog[open]) { overflow: hidden }` into your stylesheet.

`FuroOffCanvasMenuLayout` and `FuroPagination` resolve `useRoute()` and `NuxtLink`, so a copy of either still needs to
live inside a Nuxt app. The rest are plain Vue components.

## 1.12.0

### Breaking

**`lib/assets/css/0200.base.css` is gone.** Remove it from `css` in your `nuxt.config.js` before upgrading, or the build
fails on the unresolved path. The file restyled native HTML tags across every page, which made a rule hard to trace back
from the element it moved: `p + p`, `section + section`, `h1 + *`, `h2 + *` and `h3 + *` all set a margin on an element
because of the element before it. It also set padding on every `<input>`, `text-transform: capitalize` on every `<h1>`,
font sizes on `<h1>` through `<h3>`, and a `z-index` on `<header>` and `<nav>`.

Add back only what your design needs, scoped to your own classes rather than to tag names. `0000.furo.css`,
`0010.variables-palette-color-scale.css`, `0020.variables-z-index.css` and `0100.reset.css` are unchanged, so keep
importing them.

**`lib/assets/css/0300.gimmick.css` now holds one rule.** The `-trigger-unlock-checkbox`, `-trigger-unlock-radio` and
`-aim-unlock` utility classes are gone. Copy them into your own stylesheet if you use them. What remains is
`body:has(dialog[open]) { overflow: hidden }`, which locks page scroll while a `<dialog>` is open, and it now sits inside
`@layer furo` instead of being unlayered. Your own `@layer app` rules therefore override it without `!important`.

### Deprecated

The shipped components and the context classes behind them leave the package in 2.0.0. They keep working in 1.12.x, and
their behavior is unchanged in this release.

| Deprecated | Removed in |
| :-- | :-- |
| `lib/components/FuroAccessControlLayout.vue` and `FuroAccessControlLayoutContext` | 2.0.0 |
| `lib/components/FuroButtonDialog.vue` and `FuroButtonDialogContext` | 2.0.0 |
| `lib/components/FuroDialog.vue` and `FuroDialogContext` | 2.0.0 |
| `lib/components/FuroLoadingLayout.vue` and `FuroLoadingLayoutContext` | 2.0.0 |
| `lib/components/FuroOffCanvasMenuLayout.vue` and `FuroOffCanvasMenuLayoutContext` | 2.0.0 |
| `lib/components/FuroPagination.vue`, `FuroPaginationContext` and `FuroPageItemContext` | 2.0.0 |
| `lib/components/FuroTabLayout.vue`, `FuroTabLayoutContext` and `FuroTabItemContext` | 2.0.0 |
| `lib/assets/css/0300.gimmick.css` | 2.0.0 |

`BaseFuroContext` and `BaseFuroContextAccessor` are not deprecated. A component you copy into your own app keeps
extending them.

[Migrating off the components](./docs/en/features/components.md#migrating-off-the-components) carries the steps.

### Removed from the repository

The demo application is gone: the sample pages, the sample components, and the GraphQL, RESTful API and store scaffolding
that backed them. None of it ever shipped to npm, because `files` in `package.json` publishes `lib/` and `types/` only,
so nothing consumers install has changed. The test suite is 23 files and 1009 tests, down from 40 and 1072; every test
that went was covering demo code.
