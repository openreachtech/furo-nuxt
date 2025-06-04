<script>
import {
  defineComponent,
} from 'vue'

import FuroTabLayout from '~/lib/components/FuroTabLayout.vue'

export default defineComponent({
  name: 'AppTabLayout',

  components: {
    FuroTabLayout,
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
  <FuroTabLayout
    class="design"
    v-bind="$attrs"
  >
    <template
      v-for="(_, name) in $slots"
      #[name]="slotProps"
    >
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>

    <template #contents>
      <slot name="contents" />
    </template>
  </FuroTabLayout>
</template>

<!-- NOTE: Never use <style scoped> here -->
<style>
@layer app {
  .furo-layout.tab.design > .tabs {
    gap: 0.25rem;
  }

  .furo-layout.tab.design > .tabs > .tab:hover {
    background-color: var(--color-primary);
    color: var(--color-secondary);

    cursor: pointer;
  }

  .furo-layout.tab.design > .tabs > .tab.active {
    background-color: var(--color-primary);
    color: var(--color-secondary);

    pointer-events: none;
  }

  .furo-layout.tab.design > .contents > :first-child {
    margin-block-start: 0.25rem;
  }

  .furo-layout.tab.design > .contents > * {
    border: var(--size-thinnest) var(--color-text) solid;

    padding-block: 1rem;
    padding-inline: 2rem;
  }
}
</style>
