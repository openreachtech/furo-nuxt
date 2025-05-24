<script>
import {
  defineComponent,
} from 'vue'

import FuroLoadingLayout from '~/lib/components/FuroLoadingLayout.vue'

export default defineComponent({
  name: 'AppLoadingLayout',

  components: {
    FuroLoadingLayout,
  },

  inheritAttrs: false,
})
</script>

<template>
  <FuroLoadingLayout
    class="design"
    v-bind="$attrs"
  >
    <template #contents>
      <slot name="contents" />
    </template>

    <template #loader>
      <slot name="loader">
        <span class="spinner" />
      </slot>
    </template>
  </FuroLoadingLayout>
</template>

<!-- NOTE: Never use <style scoped> here -->
<style>
@layer app {
  .furo-layout.loading.design.is-loading > .loader {
    border-radius: 0.5rem;

    padding-block: 1rem;
    padding-inline: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 10rem;

    background-color: lightgray;
  }

  /* This was copied from https://icon-sets.iconify.design/svg-spinners/?keyword=spin */
  .furo-layout.loading.design > .loader > .spinner {
    display: inline-block;

    width: 1.5rem;
    height: 1.5rem;

    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg stroke='%23000'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-linecap='round' stroke-width='3'%3E%3Canimate attributeName='stroke-dasharray' calcMode='spline' dur='1.5s' keySplines='0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1' keyTimes='0;0.475;0.95;1' repeatCount='indefinite' values='0 150;42 150;42 150;42 150'/%3E%3Canimate attributeName='stroke-dashoffset' calcMode='spline' dur='1.5s' keySplines='0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1' keyTimes='0;0.475;0.95;1' repeatCount='indefinite' values='0;-16;-59;-59'/%3E%3C/circle%3E%3CanimateTransform attributeName='transform' dur='2s' repeatCount='indefinite' type='rotate' values='0 12 12;360 12 12'/%3E%3C/g%3E%3C/svg%3E");

    background-color: currentColor;

    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }
}
</style>
