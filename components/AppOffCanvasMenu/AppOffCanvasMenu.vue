<script>
import {
  defineComponent,
} from 'vue'

import {
  NuxtLink,
} from '#components'

import AppOffCanvasMenuContext from './AppOffCanvasMenuContext.js'

import linkHash from './off-canvas-menu-links.js'

export default defineComponent({
  name: 'AppOffCanvasMenu',

  components: {
    NuxtLink,
  },

  inheritAttrs: false,

  setup (
    props,
    componentContext
  ) {
    const context = AppOffCanvasMenuContext.create({
      props,
      componentContext,

      linkHash,
    })
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-layout">
    <section
      v-for="({ category, links }) in context.extractLinkCategories()"
      :key="category"
      class="category"
    >
      <h1 class="title">
        {{ category }}
      </h1>
      <div
        v-for="(link, index) in links"
        :key="index"
        class="link"
      >
        <NuxtLink :to="link.href">
          {{ link.text }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
@layer app {
  .unit-layout {
    width: 100%;
    height: 100%;

    padding-block: .5rem;
    padding-inline: 1rem;
  }

  .unit-layout > .category > .title {
    margin-block-start: 0.5rem;

    font-size: 1.2rem;
    font-weight: bold;
  }

  .unit-layout > .category > .title + * {
    margin-block-start: 0.5rem;
  }
}
</style>
