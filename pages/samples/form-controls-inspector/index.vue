<script>
import {
  ref,
} from 'vue'

import defineAppComponent from '~/app/vue/defineAppComponent.js'

import FormControlsInspectorPageContext from './FormControlsInspectorPageContext'

export default defineAppComponent({
  name: 'FormControlsInspectorPage',

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').Ref<HTMLFormElement>} */
    const formElementRef = /** @type {*} */ (
      ref(null)
    )

    const valueHashRef = ref({})

    const args = {
      props,
      componentContext,
      formElementRef,
      valueHashRef,
    }
    const context = FormControlsInspectorPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <h1>&lt;form&gt; Controls Inspector</h1>

  <div class="unit-layout">
    <form
      :ref="context.formElementRef"
      class="unit-form"
      @submit.prevent="context.submitForm()"
    >
      <button type="submit">
        Submit (above)
      </button>

      <label class="control">
        <span>Test</span>
        <input
          name="text"
          type="text"
          value="default text"
        >
      </label>

      <fieldset name="users[]">
        <legend>Users [0]</legend>

        <label class="control">
          <span>Username</span>
          <input
            name="username"
            type="text"
            value="John Doe"
          >
        </label>
        <br>
        <label class="control">
          <span>Message</span>
          <input
            name="message"
            type="text"
            value="Hello, I am John Doe."
          >
        </label>
      </fieldset>

      <fieldset name="users[]">
        <legend>Users [1]</legend>

        <label class="control">
          <span>Username</span>
          <input
            name="username"
            type="text"
            value="Jane Smith"
          >
        </label>
        <br>
        <label class="control">
          <span>Message</span>
          <input
            name="message"
            type="text"
            value="Hello, I am Jane Smith."
          >
        </label>
      </fieldset>

      <div class="control">
        <span>Double Text</span>

        <input
          name="double-text[]"
          type="text"
          value="double 001"
        >
        <input
          name="double-text[]"
          type="text"
          value="double 002"
        >
      </div>

      <label class="control">
        <span>Password</span>
        <input
          name="password"
          type="password"
          value="password123"
        >
      </label>

      <label class="control">
        <span>Email</span>
        <input
          name="email"
          type="email"
          value="example@example.com"
        >
      </label>

      <label class="control">
        <span>Website</span>
        <input
          name="url"
          type="url"
          value="https://www.example.com"
        >
      </label>

      <label class="control">
        <span>Telephone Number</span>
        <input
          name="tel"
          type="tel"
          value="090-1234-5678"
        >
      </label>

      <button type="submit">
        Submit (middle-01)
      </button>

      <label class="control">
        <span>Color</span>
        <input
          name="color"
          type="color"
          value="#ff00ff"
        >
      </label>

      <label class="control">
        <span>Number</span>
        <input
          name="number"
          type="number"
          min="1"
          max="10"
          value="5"
        >
      </label>

      <label class="control">
        <span>Range</span>
        <input
          name="range"
          type="range"
          min="0"
          max="100"
          value="50"
        >
      </label>

      <label class="control">
        <span>Date</span>
        <input
          name="date"
          type="date"
          value="2024-01-01"
        >
      </label>

      <label class="control">
        <span>Time</span>
        <input
          name="time"
          type="time"
          value="11:22:33"
          step="1"
        >
      </label>

      <label class="control">
        <span>DateTime</span>
        <input
          name="datetime-local"
          type="datetime-local"
          value="2024-01-31T11:22:33"
          step="1"
        >
      </label>

      <label class="control">
        <span>Year Month</span>
        <input
          name="month"
          type="month"
          value="2024-01"
        >
      </label>

      <label class="control">
        <span>File</span>
        <input
          name="file"
          type="file"
        >
      </label>

      <button type="submit">
        Submit (middle-02)
      </button>

      <div class="control">
        <span>Emotion</span>

        <label>
          <input
            name="emotion"
            type="radio"
            value="happy"
          >
          <span>happy</span>
        </label>
        <label>
          <input
            name="emotion"
            type="radio"
            value="sad"
          >
          <span>sad</span>
        </label>
        <label>
          <input
            name="emotion"
            type="radio"
            value="angry"
          >
          <span>angry</span>
        </label>
      </div>

      <div class="control">
        <span>Interest</span>

        <label>
          <input
            name="interest"
            type="checkbox"
            value="coding"
            checked
          >
          <span>coding</span>
        </label>
        <label>
          <input
            name="interest"
            type="checkbox"
            value="music"
          >
          <span>music</span>
        </label>
        <label>
          <input
            name="interest"
            type="checkbox"
            value="sports"
            checked
          >
          <span>sports</span>
        </label>
      </div>

      <label class="control">
        <span>Message</span>
        <textarea
          class="textarea"
          name="message"
          rows="4"
          cols="50"
        >default message</textarea>
      </label>

      <label class="control">
        <span>City</span>
        <select
          name="city"
          style="
            min-width: 10rem;
          "
        >
          <option value="tokyo">Tokyo</option>
          <option value="osaka">Osaka</option>
          <option value="kyoto">Kyoto</option>
        </select>
      </label>

      <label class="control">
        <span>Amount (Optional)</span>
        <select
          name="amount"
          style="
            min-width: 10rem;
          "
        >
          <option
            value=""
            disabled
            selected
          >Please select</option>
          <option value="small">small</option>
          <option value="large">large</option>
        </select>
      </label>

      <label class="control">
        <span>Greek</span>
        <select
          name="greek"
          multiple
          style="
            height: 5rem;
            min-width: 10rem;
          "
        >
          <option
            value="alpha"
            selected
          >alpha</option>
          <option value="beta">beta</option>
          <option
            value="gamma"
            selected
          >gamma</option>
          <option value="delta">delta</option>
          <option value="epsilon">epsilon</option>
          <option value="zeta">zeta</option>
          <option value="eta">eta</option>
          <option value="theta">theta</option>
        </select>
      </label>

      <button type="submit">
        Submit (below)
      </button>
    </form>
    <div class="value-hash-reactive-placeholder">
      <pre class="preformatted">{{
        JSON.stringify(
          context.valueHashRef.value,
          null,
          2
        )
      }}</pre>
    </div>
  </div>
</template>

<style scoped>
.unit-layout {
  min-height: 100vh;

  display: grid;
  grid-template-columns: max(15rem, 50%) 1fr;
  gap: 1rem;
}

/******************************************************************************/

.unit-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.unit-form > .control {
  max-width: 20rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.unit-form > .control.vertical {
  flex-direction: column;
  align-items: flex-start;
}

.unit-form > .control .textarea {
  max-width: 15rem;
}

/******************************************************************************/

.value-hash-reactive-placeholder {
  position: sticky;
  top: calc(var(--size-header-height) + 1rem);

  align-self: start;

  border: var(--size-thinnest) solid #000;

  max-height: calc(100vh - var(--size-header-height));

  padding-inline: 0.5rem;

  overflow-y: auto;
}

.value-hash-reactive-placeholder > .preformatted {
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 100%;
}
</style>
