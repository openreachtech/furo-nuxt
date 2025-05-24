<script>
import {
  reactive,
  shallowRef,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import defineAppComponent from '~/app/vue/defineAppComponent.js'

import useFormClerk from '~/lib/composables/useFormClerk.js'
import useGraphqlClient from '~/lib/composables/useGraphqlClient.js'

import SignUpMutationGraphqlLauncher from '~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlLauncher.js'
import SignUpFormElementClerk from './SignUpFormElementClerk.js'

import SignUpPageContext from './SignUpPageContext.js'

export default defineAppComponent({
  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: 'Sign Up',
        skipFilter: true,
      },
      layout: 'gateway',
    })

    const graphqlClient = useGraphqlClient(SignUpMutationGraphqlLauncher)
    const formClerk = useFormClerk({
      FormElementClerk: SignUpFormElementClerk,
      invokeRequestWithFormValueHash: graphqlClient.invokeRequestWithFormValueHash,
    })

    const formElementRef = shallowRef(null)
    const statusReactive = reactive({
      allowsToSubmit: false,
      isLoading: false,
    })

    const args = {
      props,
      componentContext,

      graphqlClient,
      formClerk,

      formElementRef,
      statusReactive,
    }
    const context = SignUpPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <h1>Sign Up Sample</h1>

  <section class="unit-section">
    <form
      :ref="context.formElementRef"
      class="unit-form"
      @submit.prevent="context.submitFormWithHooks()"
    >
      <label class="control">
        <span>メールアドレス</span>
        <input
          name="email"
          type="text"
          placeholder="メールアドレスを入力してください。"
          value="stew.eucen@openreach.tech"
        >
        <div>{{ context.validationRef.message.email }}&nbsp;</div>
      </label>

      <label class="control">
        <span>ユーザ名</span>
        <input
          name="username"
          type="text"
          placeholder="ユーザ名を入力してください。"
          value="John Doe"
        >
        <div>{{ context.validationRef.message.username }}&nbsp;</div>
      </label>

      <label class="control">
        <span>First Name</span>
        <input
          name="firstName"
          type="text"
          placeholder="Please enter your first name."
          value="Eucen"
        >
        <div>{{ context.validationRef.message.firstName }}&nbsp;</div>
      </label>

      <label class="control">
        <span>First Name</span>
        <input
          name="lastName"
          type="text"
          placeholder="Please enter your last name."
          value="Stew"
        >
        <div>{{ context.validationRef.message.lastName }}&nbsp;</div>
      </label>

      <label class="control">
        <span>パスワード</span>
        <input
          name="password"
          type="password"
          placeholder="パスワードを入力してください。"
        >
        <div>{{ context.validationRef.message.password }}&nbsp;</div>
      </label>

      <label class="control">
        <span>パスワード (確認用)</span>
        <input
          name="password-confirmation"
          type="password"
          placeholder="パスワードを入力してください。"
        >
        <div>{{ context.validationRef.message['password-confirmation'] }}&nbsp;</div>
      </label>

      <label class="column">
        <input
          v-model="context.statusReactive.allowsToSubmit"
          type="checkbox"
        >
        <span>利用規約に同意する</span>
      </label>

      <button
        type="submit"
        :disabled="!context.statusReactive.allowsToSubmit"
      >
        新規登録
      </button>
    </form>
  </section>

  <section class="unit-section">
    <div style="margin-block-start: 3rem;">
      data
    </div>
    <pre class="preformatted">{{
      JSON.stringify(
        context.capsuleRef.value.extractContent(),
        null,
        4
      )
    }}</pre>

    <div>errors</div>
    <pre class="preformatted">{{
      JSON.stringify(
        context.capsuleRef.value.extractErrors(),
        null,
        4
      )
    }}</pre>
  </section>

  <div
    v-if="context.statusReactive.isLoading"
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

.unit-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
}

.unit-form > .control {
  min-width: min(80%, 20rem);
  display: flex;
  flex-direction: column;
}

/******************************************************************************/

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
