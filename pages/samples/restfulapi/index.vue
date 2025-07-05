<script>
import {
  defineComponent,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import RestfulApiPageContext from './RestfulApiPageContext.js'
import RestfulApiFetcher from './RestfulApiPageFetcher.js'
import RestfulApiPageSubmitterContext from './RestfulApiPageSubmitterContext.js'

// import BetaExternalCallbackSuccessFormElementClerk from './BetaExternalCallbackSuccessFormElementClerk.js'

export default defineComponent({
  name: 'RestfulApiClientPage',

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: 'RESTful API client sample',
        skipFilter: true,
      },
    })

    const args = {
      props,
      componentContext,
    }
    const context = RestfulApiPageContext.create(args)
      .setupComponent()

    const fetcher = RestfulApiFetcher.create()

    const submitterContext = RestfulApiPageSubmitterContext.create({
      props,
      componentContext,
    })
      .setupComponent()

    return {
      context,
      fetcher,
      submitterContext,
    }
  },
})
</script>

<template>
  <h1>RESTful API client Sample</h1>

  <section class="unit-section">
    <h1>Alpha External Callback Success</h1>

    <div class="buttons">
      <button
        @click="fetcher.fetchAlphaExternalCallbackSuccess({
          query: {
            alpha: '1st',
            beta: '2nd',
          },
        })"
      >
        ?alpha=1st&beta=2nd
      </button>
      <button
        @click="fetcher.fetchAlphaExternalCallbackSuccess({
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
          fetcher.alphaExternalCallbackSuccessCapsule.content,
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
        @click="fetcher.fetchPathParameterHash({
          pathParameterHash: {
            id: 123,
            name: 'JohnDoe',
          },
        })"
      >
        { id: 123, name 'JohnDoe' }
      </button>
      <button
        @click="fetcher.fetchPathParameterHash({
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
          fetcher.pathParameterHashCapsule.content,
          null,
          2
        )
      }}</pre>
    </div>
  </section>

  <section class="unit-section">
    <h2>Beta External Callback Success (POST)</h2>

    <form
      @submit.prevent="submitterContext.submitForm({
        submitEvent: /** @type {SubmitEvent} */ ($event),
      })"
    >
      <label>
        <div>First Parameter</div>
        <input
          type="text"
          name="first"
          value="first value"
        >
      </label>
      <label>
        <div>Second Parameter</div>
        <input
          type="text"
          name="second"
          value="second value"
        >
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

    <div
      id="placeholder-beta-external-callback-success"
      class="unit-layout result-placeholder"
    >
      <div>
        <h2>Content of Capsule</h2>
        <pre
          id="result-box-success"
          class="result-box"
        />
      </div>
      <div>
        <h2>Metadata of Capsule</h2>
        <pre
          id="result-box-failure"
          class="result-box"
        />
      </div>
    </div>
  </section>
<!--
  <section class="unit-section">
    <h2>Sign In &lt;form&gt;</h2>

    <form
      :ref="context.formElementRef"
      @submit.prevent="context.submitFormWithHooks()"
    >
      <span>Account</span>
      <input
        name="email"
        type="email"
        placeholder="Please input email address here."
        value="customer.100001@example.com"
      >
      <div>
        {{
          context.validationRef
            .message
            .email
        }}&nbsp;
      </div>

      <span>Password</span>
      <input
        name="password"
        type="password"
        placeholder="Please input password here."
        value="pAsswOrd$01"
      >
      <div>
        {{
          context.validationRef
            .message
            .password
        }}&nbsp;
      </div>

      <button type="submit">
        Submit
      </button>
    </form>
  </section> -->

  <!-- <div
    v-if="context.isLoading"
    class="unit-loading"
  >
    Loading ...
  </div> -->
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
