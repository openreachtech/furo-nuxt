<script>
import {
  defineComponent,
  ref,
} from 'vue'

import FuroDialog from './FuroDialog.vue'

import FuroButtonDialogContext from '../contexts/concretes/FuroButtonDialogContext.js'

const EVENT_NAME = {
  CLICK_BACKDROP: 'clickBackdrop',

  CLICK_POSITIVE_BUTTON: 'clickPositiveButton',
  CLICK_NEGATIVE_BUTTON: 'clickNegativeButton',
  CLICK_NEUTRAL_BUTTON: 'clickNeutralButton',
}

export default defineComponent({
  name: 'FuroButtonDialog',

  components: {
    FuroDialog,
  },

  inheritAttrs: false,

  emits: [
    EVENT_NAME.CLICK_BACKDROP,

    EVENT_NAME.CLICK_POSITIVE_BUTTON,
    EVENT_NAME.CLICK_NEGATIVE_BUTTON,
    EVENT_NAME.CLICK_NEUTRAL_BUTTON,
  ],

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').Ref<FuroDialog | null>} */
    const dialogComponentRef = ref(null)

    const args = {
      props,
      componentContext,
      dialogComponentRef,
    }

    const context = FuroButtonDialogContext.create(args)
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
    class="button-enhanced"
    v-bind="$attrs"
  >
    <template #contents>
      <div class="contents">
        <slot name="contents" />
      </div>

      <div class="unit-buttons">
        <button
          class="button neutral"
          @click="context.clickNeutralButton()"
        >
          <slot name="neutral">
            &nbsp;
          </slot>
        </button>
        <button
          class="button negative"
          @click="context.clickNegativeButton()"
        >
          <slot name="negative">
            &nbsp;
          </slot>
        </button>
        <button
          class="button positive"
          @click="context.clickPositiveButton()"
        >
          <slot name="positive">
            &nbsp;
          </slot>
        </button>
      </div>
    </template>
  </FuroDialog>
</template>

<style>
@layer furo {
  .furo-dialog[open].button-enhanced {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    padding-block: 1rem;
    padding-inline: 1rem;
  }

  .furo-dialog[open].button-enhanced > .contents {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .furo-dialog[open].button-enhanced > .unit-buttons {
    min-width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .furo-dialog[open].button-enhanced > .unit-buttons > .button {
    border-radius: 0.3rem;
    border-style: solid;
    border-width: var(--size-thinnest);

    padding-block: 0.25rem;
    padding-inline: 0.5rem;

    display: inline-block;

    appearance: none;
  }

  .furo-dialog[open].button-enhanced.alert > .unit-buttons > .button {
    display: inline-block;

    appearance: none;
  }

  .furo-dialog[open].button-enhanced.alert > .unit-buttons > .button:where(.neutral, .negative),
  .furo-dialog[open].button-enhanced.confirm > .unit-buttons > .button:where(.neutral) {
    display: none;
  }

  .furo-dialog[open].button-enhanced.alert > .unit-buttons > .button {
    min-width: 32%;
  }

  .furo-dialog[open].button-enhanced.confirm > .unit-buttons > .button {
    min-width: 32%;
  }

  .furo-dialog[open].button-enhanced.ternary > .unit-buttons > .button {
    min-width: 25%;
  }

  .furo-dialog[open].button-enhanced.ternary > .unit-buttons > .button.neutral {
    margin-inline-end: auto;
  }
}
</style>
