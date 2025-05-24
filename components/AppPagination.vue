<script>
import {
  defineComponent,
} from 'vue'

import FuroPagination from '~/lib/components/FuroPagination.vue'

export default defineComponent({
  name: 'AppPagination',

  components: {
    FuroPagination,
  },

  inheritAttrs: false,

  setup (props) {
    return {
      props,
    }
  },
})
</script>

<template>
  <FuroPagination
    class="design"
    v-bind="$attrs"
  >
    <template #previous>
      <slot name="previous">
        ←
      </slot>
    </template>
    <template #next>
      <slot name="next">
        →
      </slot>
    </template>
  </FuroPagination>
</template>

<!-- NOTE: Never use <style scoped> here -->
<style>
@layer app {
  .furo-pagination.design {
    gap: 0.25rem;
  }

  .furo-pagination.design > .page {
    border: 3px double var(--color-primary);
    border-radius: 0.25rem;
  }

  .furo-pagination.design > .page:hover {
    border-color: var(--color-primary);

    background-color: var(--color-primary);
  }

  .furo-pagination.design > :where(.previous, .next):hover {
    background-color: var(--color-primary);
    color: var(--color-secondary);
  }
}
</style>
