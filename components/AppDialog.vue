<script>
//
// <AppDialog> is defined to unify the design of dialogs used throughout the application.
//

import {
  defineComponent,
  ref,
} from 'vue'

import FuroDialog from '~/lib/components/FuroDialog.vue'

import FuroButtonDialogContext from '~/lib/contexts/concretes/FuroButtonDialogContext.js'

export default defineComponent({
  name: 'AppDialog',

  components: {
    FuroDialog,
  },

  inheritAttrs: false,

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').Ref<FuroDialog | null>} */
    const dialogComponentRef = ref(null)

    const context = FuroButtonDialogContext.create({
      props,
      componentContext,
      dialogComponentRef,
    })
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <FuroDialog
    :ref="context.dialogComponentRef"
    class="design"
    v-bind="$attrs"
  >
    <template #contents>
      <slot name="contents" />
    </template>
  </FuroDialog>
</template>

<style>
@layer app {
  .furo-dialog[open].design {
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
