<script>
//
// <AppAccessControlLayout> is defined to unify the design of FuroAccessControlLayout used throughout the application.
//

import {
  defineComponent,
} from 'vue'

import FuroAccessControlLayoutContext from '~/lib/contexts/concretes/FuroAccessControlLayoutContext.js'

import FuroAccessControlLayout from '~/lib/components/FuroAccessControlLayout.vue'

export default defineComponent({
  name: 'AppAccessControlLayout',

  components: {
    FuroAccessControlLayout,
  },

  inheritAttrs: false,

  /**
   * @param {FuroAccessControlLayoutContext['props']} props
   * @param {FuroAccessControlLayoutContext['componentContext']} componentContext
   * @returns {{
   *   context: FuroAccessControlLayoutContext
   * }}
   */
  setup (
    props,
    componentContext
  ) {
    const context = FuroAccessControlLayoutContext.create({
      props,
      componentContext,
    })
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <FuroAccessControlLayout
    class="design"
    v-bind="$attrs"
  >
    <template #contents>
      <slot name="contents" />
    </template>

    <template #mask>
      <slot name="mask">
        <span>
          Custom mask content
        </span>
      </slot>
    </template>
  </FuroAccessControlLayout>
</template>

<style>
@layer app {
  .furo-layout.access-control.design > .contents,
  .furo-layout.access-control.design > .mask {
    border-radius: 0.75rem;

    padding-block: 1rem;
    padding-inline: 2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    background-color: #eee;
  }
}
</style>
