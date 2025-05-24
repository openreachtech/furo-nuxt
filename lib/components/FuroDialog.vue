<script>
import {
  defineComponent,
  ref,
} from 'vue'

import FuroDialogContext from '../contexts/concretes/FuroDialogContext.js'

const EVENT_NAME = {
  SHOW_DIALOG: 'showDialog',
  DISMISS_DIALOG: 'dismissDialog',
  CLICK_BACKDROP: 'clickBackdrop',
}

export default defineComponent({
  name: 'FuroDialog',
  inheritAttrs: false,

  emits: [
    EVENT_NAME.SHOW_DIALOG,
    EVENT_NAME.DISMISS_DIALOG,
    EVENT_NAME.CLICK_BACKDROP,
  ],

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').Ref<HTMLDialogElement | null>} */
    const dialogElementRef = ref(null)

    const args = {
      props,
      componentContext,
      dialogElementRef,
    }
    const context = FuroDialogContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <dialog
    :ref="context.dialogElementRef"
    class="furo-dialog"
    v-bind="$attrs"
    @click="context.clickInInner({
      event: $event,
    })"
  >
    <slot name="contents" />

    <button
      class="built-in-close"
      @click="context.dismissDialog()"
    >
      <slot name="x-button">
        ✕
      </slot>
    </button>
  </dialog>
</template>

<style scoped>
@layer furo {
  .furo-dialog[open] {
    border-radius: 0.5rem;

    min-height: 10rem;
    min-width: 20rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    --size-x-button: 2rem;
  }

  .furo-dialog.x-close {
    overflow: visible;
  }

  .furo-dialog.x-close .built-in-close {
    position: absolute;
    top: calc(var(--size-x-button) * -0.4);
    right: calc(var(--size-x-button) * -0.4);

    border: none;
    border-radius: 50%;

    width: var(--size-x-button);
    aspect-ratio: 1 / 1;

    display: none;

    background: var(--color-background-highlight);
    color: var(--color-text-highlight);

    appearance: none;
  }

  .furo-dialog.x-close .built-in-close {
    display: inline-block;
  }

  .furo-dialog.x-close .built-in-close:active {
    filter: brightness(0.8);
  }

  .furo-dialog:not(.x-close) .built-in-close {
    display: none;
  }

  .furo-dialog[open]::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
