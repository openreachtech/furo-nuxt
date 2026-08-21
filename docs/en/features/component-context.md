# Component Context

A context class holds everything a component's `setup()` would otherwise scatter across closures: props, the Vue setup
context, refs, and the methods the `<template>` calls.

`setup()` shrinks to "create the context, return it", and the `<template>` talks to `context` only.

## (1) `BaseFuroContext`

Extend it, add the members the template needs, and create it from `setup()`.

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
   * Click the button.
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

The instance forwards the Vue setup context, so `this.attrs`, `this.slots`, `this.emit`, `this.expose` and `this.watch` are
available without importing anything.

`setupComponent()` is the place for side effects — `expose()`, `watch()` and so on — and returns `this` for chaining. The base
implementation does nothing; override it when the component needs setup.

## (2) `emit()` event names

Declare event names once by overriding `.get:EMIT_EVENT_NAME`, and read them back through `this.EMIT_EVENT_NAME`. That keeps
the string literal out of the call sites.

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

## (3) Exposing methods to the parent

Return the methods from `generateExposeHash()` and hand it to `expose()` in `setupComponent()`. A parent holding a `ref` to
the component can then call them.

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

An accessor is a read-only façade over a context, reached through `context.$`. It is where the getters that only reshape data
for the template live, so the context itself stays about behaviour.

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

Wire it up by overriding `.get:ContextAccessor` on the context.

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

The base `.get:ContextAccessor` returns `null`, in which case `context.$` is `null` too.

## (5) `buildDefineComponent()`

`buildDefineComponent()` builds a `defineComponent()` replacement that runs shared `setup()` functions before the
component's own, and merges every returned binding. Use it for setup logic that every component in the app repeats.

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
    // Runs for every component defined by defineAppComponent().
    return {}
  },
}
```

Then define components with it instead of `defineComponent()`.

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
