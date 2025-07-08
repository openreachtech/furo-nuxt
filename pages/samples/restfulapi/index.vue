<script>
import {
  defineComponent,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import RestfulApiSamplePageContext from './RestfulApiSamplePageContext.js'
import RestfulApiSampleFetcher from './RestfulApiSampleFetcher.js'

export default defineComponent({
  name: 'RestfulApiSamplePage',

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: 'Renchan RESTful API client sample',
        // skipFilter: true,
      },
    })

    const fetcher = RestfulApiSampleFetcher.create()

    const args = {
      props,
      componentContext,

      fetcher,
    }
    const context = RestfulApiSamplePageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <h1>Renchan RESTful API client Sample</h1>

  <section class="unit-section">
    <h1>Alpha External Callback Success (GET)</h1>

    <div class="buttons">
      <button
        @click="context.fetchAlphaExternalCallbackSuccess({
          query: {
            alpha: '1st',
            beta: '2nd',
          },
        })"
      >
        ?alpha=1st&beta=2nd
      </button>
      <button
        @click="context.fetchAlphaExternalCallbackSuccess({
          query: {
            alpha: '3rd',
            beta: '4th',
          },
        })"
      >
        ?alpha=3rd&beta=4th
      </button>
    </div>

    <div>
      <pre class="capsule-placeholder">{{
        JSON.stringify(
          context.alphaExternalCallbackSuccessCapsule.content,
          null,
          2
        )
      }}</pre>
    </div>
  </section>

  <div
    v-if="context.isLoading"
    class="unit-loading"
  >
    Loading ...
  </div>
</template>

<style scoped>
.unit-section {
  padding-block: 0.5rem;
  padding-inline: 1rem;
}

.unit-section + .unit-section {
  margin-block-start: 3rem;
}

.capsule-placeholder {
  border: 1px solid var(--color-text);
  padding-block: 0.25rem;
  padding-inline: 0.5rem;
}

.unit-section .buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.unit-section > .preformatted {
  border-color: var(--color-text);
  border-style: solid;
  border-width: var(--size-thinnest);

  padding-block: 0.5rem;
  padding-inline: 1rem;
}

.unit-test-account {
  border-color: var(--color-text);
  border-style: solid;
  border-width: var(--size-thinnest);

  padding-block: 0.5rem;
  padding-inline: 1rem;

  display: grid;
  grid-template-columns: auto 1fr;
}

.unit-test-account > .term {
  text-align: right;
  font-weight: bold;
}

.unit-test-account > .term::after {
  content: ':';

  margin-inline-end: 0.5rem;
}

.unit-test-account > .details {
  font-style: italic;
}

/* ---------------------------------------- */

.unit-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  border: 1rem red solid;

  display: grid;
  place-items: center;

  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 3rem;

  z-index: calc(var(--value-z-index-layer-overlay) + 0);
}
</style>
