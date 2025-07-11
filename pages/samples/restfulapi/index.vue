<script>
import {
  defineComponent,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import RestfulApiSamplePageContext from './RestfulApiSamplePageContext.js'
import RestfulApiSampleFetcher from './RestfulApiSampleFetcher.js'
import RestfulApiSampleSubmitterContext from './RestfulApiSampleSubmitterContext.js'

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

    const submitterContext = RestfulApiSampleSubmitterContext.create({
      props,
      componentContext,
      fetcher,
    })
      .setupComponent()

    return {
      context,
      submitterContext,
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

  <section class="unit-section">
    <h1>Path Parameter Hash (GET)</h1>

    <div class="buttons">
      <button
        @click="context.fetchPathParameterHash({
          pathParameterHash: {
            id: 123,
            name: 'JohnDoe',
          },
        })"
      >
        { id: 123, name 'JohnDoe' }
      </button>
      <button
        @click="context.fetchPathParameterHash({
          pathParameterHash: {
            id: 987,
            name: 'JaneSmith',
          },
        })"
      >
        { id: 987, name 'JaneSmith' }
      </button>
    </div>

    <div>
      <pre class="capsule-placeholder">{{
        JSON.stringify(
          context.pathParameterHashCapsule.content,
          null,
          2
        )
      }}</pre>
    </div>
  </section>

  <section class="unit-section">
    <h1>Beta External Callback Success (POST)</h1>

    <form
      :ref="submitterContext.betaExternalCallbackSuccessFormElementShallowRef"
      class="form"
      @submit.prevent="submitterContext.submitForm({
        submitEvent: /** @type {SubmitEvent} */ ($event),
      })"
    >
      <label
        class="control"
      >
        <div
          :class="{
            invalid: submitterContext.betaExternalCallbackSuccessValidationInvalidHash.first,
          }"
        >First</div>
        <input
          type="text"
          name="first"
          value=""
          class="input-field"
        >
        <div class="invalid-feedback">{{
          submitterContext.betaExternalCallbackSuccessValidationMessageHash.first
        }}</div>
      </label>

      <label
        class="control"
      >
        <div
          :class="{
            invalid: submitterContext.betaExternalCallbackSuccessValidationInvalidHash.second,
          }"
        >Second</div>
        <input
          type="text"
          name="second"
          value="second value"
          class="input-field"
        >
        <div class="invalid-feedback">{{
          submitterContext.betaExternalCallbackSuccessValidationMessageHash.second
        }}</div>
      </label>

      <br>
      <br>
      <button
        type="submit"
      >
        Submit
      </button>
    </form>

    <br>

    <div class="unit-layout result-placeholder">
      <div>
        <h2 class="subtitle">
          Metadata of Capsule
        </h2>
        <pre class="capsule-placeholder">{{
          JSON.stringify(
            {
              statusCode: submitterContext.betaExternalCallbackSuccessCapsule.statusCode,
              statusText: submitterContext.betaExternalCallbackSuccessCapsule.statusText,
              errorMessage: submitterContext.betaExternalCallbackSuccessCapsule.getErrorMessage(),
            },
            null,
            2
          )
        }}</pre>
      </div>
      <div>
        <h2 class="subtitle">
          Content of Capsule
        </h2>
        <pre class="capsule-placeholder">{{
          JSON.stringify(
            submitterContext.betaExternalCallbackSuccessCapsule.content,
            null,
            2
          )
        }}</pre>
      </div>
    </div>

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
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

.unit-layout.result-placeholder {
  width: 100%;

  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.unit-layout.result-placeholder > :nth-child(2) {
  flex: 1;
}

.unit-layout.result-placeholder .subtitle {
  margin-block-start: 1.5rem;

  white-space: nowrap;
}

.unit-layout.result-placeholder .subtitle + .capsule-placeholder {
  margin-block: 0.5rem;

  white-space: pre-wrap;
}

/* ---------------------------------------- */

:root {
  --color-text-error: var(--color-red);
}

.unit-section .form .control .invalid::after {
  content: '❌️';

  margin-inline-start: 0.5rem;
}

.unit-section .form .input-field {
  min-width: min(15rem, 100%);
}

.unit-section .form .invalid-feedback {
  margin-block-end: 0.5rem;

  color: red;
}

.unit-section .form .invalid-feedback:empty {
  content: ' ';

  min-height: 1.5rem;
  visibility: hidden;
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
