<script>
import {
  reactive,
  ref,
} from 'vue'

import defineAppComponent from '~/app/vue/defineAppComponent.js'

import useGraphqlClient from '~/lib/composables/useGraphqlClient.js'

import UploadImageMutationGraphqlLauncher from '~/app/graphql/client/mutations/uploadImage/UploadImageMutationGraphqlLauncher.js'
import UploadArrayImagesMutationGraphqlLauncher from '~/app/graphql/client/mutations/uploadArrayImages/UploadArrayImagesMutationGraphqlLauncher.js'
import UploadDeepPropertyImagesMutationGraphqlLauncher from '~/app/graphql/client/mutations/uploadDeepPropertyImages/UploadDeepPropertyImagesMutationGraphqlLauncher.js'

import UploadImageFormElementClerk from './UploadImageFormElementClerk.js'
import UploadArrayImagesFormElementClerk from './UploadArrayImagesFormElementClerk.js'
import UploadDeepPropertyImagesFormElementClerk from './UploadDeepPropertyImagesFormElementClerk.js'

import useFormClerk from '~/lib/composables/useFormClerk.js'

import HydratingContext from './HydratingContext.js'
import UploadImagePageContext from './UploadImagePageContext.js'
import UploadDeepPropertyImagesPageContext from './UploadDeepPropertyImagesPageContext.js'

export default defineAppComponent({
  name: 'UploadImagePage',

  setup (
    props,
    componentContext
  ) {
    const statusReactive = reactive({
      isLoading: false,
    })

    const uploadProgressSizeRef = ref({
      contentSize: 0,
      uploadedSize: 0,
    })

    // ------------------------------------------------------------------------

    const hydratingContext = HydratingContext.create({
      props,
      componentContext,

      statusReactive,
      uploadProgressSizeRef,
    })
      .setupComponent()

    // ------------------------------------------------------------------------

    /*
     * Single image suite
     */
    const singleImageFormElementRef = ref(null)

    const singleImageGraphqlClient = useGraphqlClient(UploadImageMutationGraphqlLauncher)

    const singleImageFormClerk = useFormClerk({
      FormElementClerk: UploadImageFormElementClerk,
      invokeRequestWithFormValueHash: singleImageGraphqlClient.invokeRequestWithFormValueHash,
    })

    const singleImageContext = UploadImagePageContext.create({
      props,
      componentContext,

      statusReactive,
      formElementRef: singleImageFormElementRef,
      uploadProgressSizeRef,

      graphqlClient: singleImageGraphqlClient,
      formClerk: singleImageFormClerk,
    })

    // ------------------------------------------------------------------------

    /*
     * Array images suite
     */
    const arrayImagesFormElementRef = ref(null)

    const arrayImagesGraphqlClient = useGraphqlClient(UploadArrayImagesMutationGraphqlLauncher)

    const arrayImagesFormClerk = useFormClerk({
      FormElementClerk: UploadArrayImagesFormElementClerk,
      invokeRequestWithFormValueHash: arrayImagesGraphqlClient.invokeRequestWithFormValueHash,
    })

    const arrayImagesContext = UploadImagePageContext.create({
      props,
      componentContext,

      statusReactive,
      formElementRef: arrayImagesFormElementRef,
      uploadProgressSizeRef,

      graphqlClient: arrayImagesGraphqlClient,
      formClerk: arrayImagesFormClerk,
    })

    // ------------------------------------------------------------------------

    /*
     * Deep property images suite
     */
    const deepPropertyImagesFormElementRef = ref(null)

    const deepPropertyImagesGraphqlClient = useGraphqlClient(UploadDeepPropertyImagesMutationGraphqlLauncher)

    const deepPropertyImagesFormClerk = useFormClerk({
      FormElementClerk: UploadDeepPropertyImagesFormElementClerk,
      invokeRequestWithFormValueHash: deepPropertyImagesGraphqlClient.invokeRequestWithFormValueHash,
    })

    const deepPropertyImagesContext = UploadDeepPropertyImagesPageContext.create({
      props,
      componentContext,

      statusReactive,
      formElementRef: deepPropertyImagesFormElementRef,
      uploadProgressSizeRef,

      graphqlClient: deepPropertyImagesGraphqlClient,
      formClerk: deepPropertyImagesFormClerk,
    })

    // ------------------------------------------------------------------------

    return {
      hydratingContext,

      singleImageContext,
      arrayImagesContext,
      deepPropertyImagesContext,
    }
  },
})
</script>

<template>
  <h1 class="page-title">
    Upload Image - GraphQL client
  </h1>

  <section class="unit-section">
    <h2 class="title">
      Single image by &lt;input&gt;
    </h2>

    <div class="content">
      <form
        :ref="singleImageContext.formElementRef"
        class="unit-form"
        @submit.prevent="singleImageContext.submitFormWithHooks()"
      >
        <label class="control">
          <span class="title">File Input</span>
          <input
            name="image"
            type="file"
          >
          <div class="validation-message">{{
            singleImageContext.validationRef.value
              .message
              .image
          }}</div>
        </label>

        <button type="submit">
          Submit
        </button>
      </form>

      <div class="unit-response">
        <div>data</div>
        <pre class="json">{{
          JSON.stringify(
            singleImageContext.capsuleRef.value
              ?.extractContent(),
            null,
            2
          )
        }}</pre>
      </div>

      <div class="unit-response">
        <div>errors</div>
        <pre class="json">{{
          JSON.stringify(
            singleImageContext.capsuleRef.value
              ?.extractErrors(),
            null,
            2
          )
        }}</pre>
      </div>
    </div>
  </section>

  <section class="unit-section">
    <h2 class="title">
      Array images by &lt;input multiple&gt;
    </h2>

    <div class="content">
      <form
        :ref="arrayImagesContext.formElementRef"
        class="unit-form"
        @submit.prevent="arrayImagesContext.submitFormWithHooks()"
      >
        <label class="control">
          <span class="title">File Input</span>
          <input
            name="images"
            type="file"
            multiple
          >
          <div class="validation-message">{{
            arrayImagesContext.validationRef.value
              .message
              .images
          }}</div>
        </label>

        <button type="submit">
          Submit
        </button>
      </form>

      <div class="unit-response">
        <div>data</div>
        <pre class="json">{{
          JSON.stringify(
            arrayImagesContext.capsuleRef.value
              ?.extractContent(),
            null,
            2
          )
        }}</pre>
      </div>

      <div class="unit-response">
        <div>errors</div>
        <pre class="json">{{
          JSON.stringify(
            arrayImagesContext.capsuleRef.value
              ?.extractErrors(),
            null,
            2
          )
        }}</pre>
      </div>
    </div>
  </section>

  <section class="unit-section">
    <h2 class="title">
      Upload Image in Deep Property Nest
    </h2>

    <div class="content">
      <form
        :ref="deepPropertyImagesContext.formElementRef"
        class="unit-form"
        @submit.prevent="deepPropertyImagesContext.submitFormWithHooks()"
      >
        <!-- Profile Section -->
        <div class="form-section">
          <h3>Profile Information</h3>

          <label class="control">
            <span class="title">Nickname</span>
            <input
              name="nickname"
              type="text"
              value="John Doe"
            >
            <div class="validation-message">{{
              deepPropertyImagesContext.validationRef.value
                .message
                .nickname
            }}</div>
          </label>

          <label class="control">
            <span class="title">Bio</span>
            <textarea
              name="bio"
              rows="3"
            >John Doe is a software engineer.</textarea>
            <div class="validation-message">{{
              deepPropertyImagesContext.validationRef.value
                .message
                .bio
            }}</div>
          </label>

          <label class="control">
            <span class="title">Avatar Image</span>
            <input
              name="avatar-image"
              type="file"
              accept="image/*"
            >
            <div class="validation-message">{{
              deepPropertyImagesContext.validationRef.value
                .message
                .avatarImage
            }}</div>
          </label>
        </div>

        <!-- Config Section -->
        <div class="form-section">
          <h3>Configuration</h3>

          <label class="control">
            <span class="title">Theme Color</span>
            <input
              name="theme-color"
              type="color"
            >
            <div class="validation-message">{{
              deepPropertyImagesContext.validationRef.value
                .message
                .themeColor
            }}</div>
          </label>

          <label class="control">
            <span class="title">Cover Image</span>
            <input
              name="cover-image"
              type="file"
              accept="image/*"
            >
            <div class="validation-message">{{
              deepPropertyImagesContext.validationRef.value
                .message
                .coverImage
            }}</div>
          </label>
        </div>

        <button type="submit">
          Submit
        </button>
      </form>

      <div class="unit-response">
        <div>Response Data</div>
        <pre class="json">{{
          JSON.stringify(
            deepPropertyImagesContext.capsuleRef.value
              ?.extractContent(),
            null,
            2
          )
        }}</pre>
      </div>

      <div class="unit-response">
        <div>Errors</div>
        <pre class="json">{{
          JSON.stringify(
            deepPropertyImagesContext.capsuleRef.value
              ?.extractErrors(),
            null,
            2
          )
        }}</pre>
      </div>
    </div>
  </section>

  <div
    v-if="hydratingContext.isLoading"
    class="unit-loading"
  >
    <div>Loading ...</div>

    <progress
      class="progress"
      :max="hydratingContext.progressContentSize"
      :value="hydratingContext.progressUploadedSize"
    />
  </div>
</template>

<style scoped>
.page-title {
  margin-block-end: 2rem;

  font-size: 2rem;
}

.unit-section > .title {
  grid-column: 1 / -1;

  font-size: calc(1rem * var(--value-golden-ratio));
}

.unit-section > .content {
  margin-block-start: 0.75rem;

  border: calc(var(--size-thinnest) * 3) #000 double;

  padding-block: 0.5rem;
  padding-inline: 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/******************************************************************************/

.unit-form {
  grid-column: 1 / -1;
}

.unit-form .control {
  display: flex;
  flex-direction: column;
}

.unit-form .control .validation-message {
  min-height: calc(1rem * var(--value-golden-ratio));
}

/******************************************************************************/

.unit-response .json {
  border: var(--size-thinnest) #000 solid;

  padding-block: 0.25rem;
  padding-inline: 0.5rem;
}

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

.unit-loading .progress {
  margin-inline-start: 1rem;

  max-width: 20rem;
}
</style>
