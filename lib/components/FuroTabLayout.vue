<script>
import {
  defineComponent,
  ref,
} from 'vue'

import FuroTabLayoutContext from '../contexts/concretes/FuroTabLayoutContext.js'

const EVENT_NAME = {
  CHANGE_TAB: 'changeTab',
}

export default defineComponent({
  name: 'FuroTabLayout',
  inheritAttrs: false,

  props: {
    tabs: {
      /** @type {import('vue').PropType<Array<import('../contexts/concretes/FuroTabLayoutContext.js').FuroTabParams>>} */
      type: Array,
      default: () => [],
      validator: value => Array.isArray(value),
    },
    activeTabKey: {
      type: String,
      required: false,
      default: null,
    },
  },

  emits: [
    EVENT_NAME.CHANGE_TAB,
  ],

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').Ref<Array<HTMLElement>>} */
    const tabElementsRef = ref([])

    const args = {
      props,
      componentContext,
      tabElementsRef,
    }
    const context = FuroTabLayoutContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div
    class="furo-layout tab"
    v-bind="$attrs"
  >
    <div class="tabs">
      <button
        v-for="(tab, index) in context.tabContexts"
        :key="index"
        :ref="context.tabElementsRef"
        class="tab"
        :class="{
          active: context.isActiveTab({
            tab,
          }),
        }"
        @click="context.onClickTab({
          event: $event,
        })"
      >
        <slot
          :name="tab.slotName"
          :label="tab.label"
        >
          {{ tab.label }}
        </slot>
      </button>
    </div>

    <div class="contents">
      <slot name="contents" />
    </div>
  </div>
</template>

<!-- NOTE: Never use <style scoped> here -->
<style>
@layer furo {
  .furo-layout.tab > .tabs {
    display: flex;
    flex-direction: row;
  }

  .furo-layout.tab > .tabs > .tab {
    border: none;
    appearance: none;

    padding-block: 0.25rem;
    padding-inline: 0.5rem;
  }

  .furo-layout.tab > .tabs > .tab:hover {
    background-color: var(--color-background-highlight);
    color: var(--color-text-highlight);

    cursor: pointer;
  }

  .furo-layout.tab > .tabs > .tab.active {
    background-color: var(--color-background-highlight);
    color: var(--color-text-highlight);

    pointer-events: none;
  }

  /* tab gimmick */

  .furo-layout.tab > .contents > * {
    display: none;
  }

  .furo-layout.tab:has(.tab:nth-of-type(1).active) > .contents > :nth-of-type(1),
  .furo-layout.tab:has(.tab:nth-of-type(2).active) > .contents > :nth-of-type(2),
  .furo-layout.tab:has(.tab:nth-of-type(3).active) > .contents > :nth-of-type(3),
  .furo-layout.tab:has(.tab:nth-of-type(4).active) > .contents > :nth-of-type(4),
  .furo-layout.tab:has(.tab:nth-of-type(5).active) > .contents > :nth-of-type(5),
  .furo-layout.tab:has(.tab:nth-of-type(6).active) > .contents > :nth-of-type(6),
  .furo-layout.tab:has(.tab:nth-of-type(7).active) > .contents > :nth-of-type(7),
  .furo-layout.tab:has(.tab:nth-of-type(8).active) > .contents > :nth-of-type(8),
  .furo-layout.tab:has(.tab:nth-of-type(9).active) > .contents > :nth-of-type(9),
  .furo-layout.tab:has(.tab:nth-of-type(10).active) > .contents > :nth-of-type(10),
  .furo-layout.tab:has(.tab:nth-of-type(11).active) > .contents > :nth-of-type(11),
  .furo-layout.tab:has(.tab:nth-of-type(12).active) > .contents > :nth-of-type(12) {
    display: inherit;
  }
}
</style>
