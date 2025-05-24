<script>
import {
  defineComponent,
  reactive,
  shallowRef,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import useFormClerk from '~/lib/composables/useFormClerk.js'
import useGraphqlClient from '~/lib/composables/useGraphqlClient.js'
import useRedirect from '~/lib/composables/useRedirect.js'

import SignInMutationGraphqlLauncher from '~/app/graphql/client/mutations/signIn/SignInMutationGraphqlLauncher.js'
import SignInFormElementClerk from './SignInFormElementClerk.js'

import SignInPageContext from './SignInPageContext.js'

export default defineComponent({
  name: 'SignInPage',

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: 'Sign In',
        skipFilter: true,
      },
      layout: 'gateway',
    })

    const graphqlClient = useGraphqlClient(SignInMutationGraphqlLauncher)
    const formClerk = useFormClerk({
      FormElementClerk: SignInFormElementClerk,
      invokeRequestWithFormValueHash: graphqlClient.invokeRequestWithFormValueHash,
    })
    const {
      redirectTo,
    } = useRedirect()

    const formElementRef = shallowRef(null)
    const statusReactive = reactive({
      isLoading: false,
    })

    const args = {
      props,
      componentContext,

      graphqlClient,
      formClerk,
      redirectTo,

      formElementRef,
      statusReactive,
    }
    const context = SignInPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <h1>sign in form sample</h1>

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
  </section>

  <section class="unit-section">
    <h2>Sign In Information</h2>

    <p>Please run server <strong>renchan-boilerplate</strong></p>

    <dl class="unit-test-account">
      <dt class="term">
        email
      </dt>
      <dd class="details">
        customer.100001@example.com
      </dd>
      <dt class="term">
        password
      </dt>
      <dd class="details">
        pAsswOrd$01
      </dd>
    </dl>
  </section>

  <section class="unit-section">
    <h2>GraphQL API result</h2>

    <h3>data</h3>
    <pre class="preformatted">{{
      JSON.stringify(
        context.capsuleRef.value
          .extractContent(),
        null,
        4
      )
    }}</pre>
    <h3>error</h3>
    <pre class="preformatted">{{
      JSON.stringify(
        context.capsuleRef.value
          .getErrorMessage(),
        null,
        4
      )
    }}</pre>
  </section>

  <div
    v-if="context.isLoading"
    class="unit-loading"
  >
    Loading ...
  </div>
</template>

<style scoped>
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
