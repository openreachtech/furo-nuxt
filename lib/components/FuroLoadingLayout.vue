<script>
import {
  defineComponent,
} from 'vue'

import FuroLoadingLayoutContext from '../contexts/concretes/FuroLoadingLayoutContext.js'

export default defineComponent({
  name: 'FuroLoadingLayout',
  inheritAttrs: false,

  props: {
    isLoading: {
      type: Boolean,
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
    const context = FuroLoadingLayoutContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div
    class="furo-layout loading"
    :class="{
      'is-loading': context.isLoading,
    }"
    v-bind="$attrs"
  >
    <div class="contents">
      <slot name="contents" />
    </div>

    <div class="loader">
      <slot name="loader">
        Loading...
      </slot>
    </div>
  </div>
</template>

<style>
@layer furo {
  .furo-layout.loading > :where(.contents, .loader) {
    display: contents;
  }

  .furo-layout.loading:not(.is-loading) > .loader {
    display: none;
  }

  .furo-layout.loading.is-loading > :not(.loader) {
    display: none;
  }
}
</style>
