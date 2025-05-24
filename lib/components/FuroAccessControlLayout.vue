<script>
import {
  defineComponent,
} from 'vue'

import FuroAccessControlLayoutContext from '../contexts/concretes/FuroAccessControlLayoutContext.js'

export default defineComponent({
  name: 'FuroAccessControlLayout',
  inheritAttrs: false,

  props: {
    role: {
      type: /** @type {import('vue').PropType<string | null>} */ ([
        String,
        null,
      ]),
      default: null,
    },
    allowed: {
      /** @type {import('vue').PropType<Array<string>>} */
      type: Array,
      default: () => [],
    },
    kicked: {
      /** @type {import('vue').PropType<Array<string>>} */
      type: Array,
      default: () => [],
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
    const context = FuroAccessControlLayoutContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div
    class="furo-layout access-control"
    v-bind="$attrs"
  >
    <div
      v-if="context.canShowContent()"
      class="contents"
    >
      <slot name="contents" />
    </div>

    <div
      v-else
      class="mask"
    >
      <slot name="mask" />
    </div>
  </div>
</template>

<style>
@layer furo {
  .furo-layout.access-control > .contents {
    display: contents;
  }

  .furo-layout.access-control > .mask {
    display: contents;
  }
}
</style>
