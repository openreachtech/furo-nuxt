<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import UsingComputedPageContext from './UsingComputedPageContext.js'

export default defineComponent({
  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: 'Using computed in Context',
        // skipFilter: true,
      },
    })

    const messageRef = ref('I am message')

    const args = {
      props,
      componentContext,

      messageRef,
    }

    const context = UsingComputedPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <h1>Using computed</h1>

    <section class="unit-section">
      <input
        v-model="context.messageRef.value"
        class="textfield"
        type="text"
        placeholder="Input message here"
      >

      <dl class="unit-output">
        <dt class="term">
          reference message
        </dt>
        <dd class="definition">
          {{ context.messageRef }}
        </dd>
        <dt class="term">
          computed length
        </dt>
        <dd class="definition">
          {{ context.messageLength }}
        </dd>
      </dl>

      <button
        class="button"
        @click="context.updateMessage({
          message: 'Updated message',
        })"
      >
        Update message
      </button>
    </section>
  </div>
</template>

<style scoped>
.unit-section > .textfield {
  max-width: 100%;
  min-width: max(20rem, 50%);
}

.unit-section > .unit-output {
  margin-block-start: 1rem;

  border: var(--size-thinnest) solid #000;

  padding-block: 0.5rem;
  padding-inline: 1rem;

  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.25rem;
}

.unit-section > .unit-output > .term {
  font-weight: bold;

  padding-block: 0.25rem;
  padding-inline: 0.5rem;

  text-align: end;
}

.unit-section > .unit-output > .term::after {
  content: ':';
}

.unit-section > .unit-output > .definition {
  padding-block: 0.25rem;
  padding-inline: 0.5rem;
}

.unit-section > .unit-output + .button {
  margin-block-start: 1rem;
}

/*
 * Base design for <button>
 */
.unit-section > .button {
  border: none;
  border-radius: 0.25rem;

  background-color: var(--color-primary);
  color: var(--color-text-primary);

  display: inline-block;
  padding-block: 0.5rem;
  padding-inline: 1rem;
}

.unit-section > .button:hover {
  opacity: 0.75;
}
</style>
