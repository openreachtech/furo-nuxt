<script>
import {
  defineComponent,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import TriggerUnlockPageContext from './TriggerUnlockPageContext.js'

export default defineComponent({
  name: 'Trigger Unlock',

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: 'Trigger Unlock Samples',
        skipFilter: true,
      },
    })

    const args = {
      props,
      componentContext,
    }
    const context = TriggerUnlockPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div>
    <h1>Trigger Unlock</h1>

    <h2>Checkbox Types</h2>

    <section class="unit-section">
      <h3>one trigger - one aim &lt;label&gt;&lt;input&gt;&lt;/label&gt;</h3>

      <label class="-trigger-unlock-checkbox">
        <input type="checkbox">
        <span>I agree it</span>
      </label>
      <br>

      <button
        class="-aim-unlock button usual"
        type="submit"
        onclick="alert('Submit!')"
      >
        Submit
      </button>
    </section>

    <section class="unit-section">
      <h3>one trigger - one aim &lt;label for&gt;&lt;input id&gt;</h3>

      <input
        id="labeled-input"
        class="-trigger-unlock-checkbox"
        type="checkbox"
      >
      <label for="labeled-input">I agree it</label>
      <br>

      <button
        class="-aim-unlock button usual"
        type="submit"
        onclick="alert('Submit!')"
      >
        Submit
      </button>
    </section>

    <section class="unit-section">
      <h3>plural triggers - one aim (Open Type)</h3>

      <label class="-trigger-unlock-checkbox">
        <input type="checkbox">
        <span>I agree it (1)</span>
      </label>
      <br>
      <label class="-trigger-unlock-checkbox">
        <input type="checkbox">
        <span>I agree it (2)</span>
      </label>
      <br>

      <button
        class="-aim-unlock button usual"
        type="submit"
        onclick="alert('Submit!')"
      >
        Submit
      </button>
    </section>

    <section class="unit-section">
      <h3>plural triggers - one aim (Unified Type)</h3>

      <fieldset class="-trigger-unlock-checkbox">
        <label>
          <input type="checkbox">
          <span>I agree it (1)</span>
        </label>
        <br>
        <label>
          <input type="checkbox">
          <span>I agree it (2)</span>
        </label>
      </fieldset>

      <button
        class="-aim-unlock button usual"
        type="submit"
        onclick="alert('Submit!')"
      >
        Submit
      </button>
    </section>

    <h2>Radio Types</h2>

    <section class="unit-section">
      <h3>one radio set - one aim (Open Type)</h3>

      <label class="-trigger-unlock-radio">
        <input
          type="radio"
          name="radio-group-first"
        >
        <span>Alpha</span>
      </label>
      <br>
      <label class="-trigger-unlock-radio">
        <input
          type="radio"
          name="radio-group-first"
        >
        <span>Beta</span>
      </label>
      <br>
      <label class="-trigger-unlock-radio">
        <input
          type="radio"
          name="radio-group-first"
        >
        <span>Gamma</span>
      </label>
      <br>

      <button
        class="-aim-unlock button usual"
        type="submit"
        onclick="alert('Submit!')"
      >
        Submit
      </button>
    </section>

    <section class="unit-section">
      <h3>one radio set - one aim (Unified Type)</h3>

      <fieldset class="-trigger-unlock-radio">
        <label>
          <input
            type="radio"
            name="radio-group-second"
          >
          <span>Alpha</span>
        </label>
        <br>
        <label>
          <input
            type="radio"
            name="radio-group-second"
          >
          <span>Beta</span>
        </label>
        <br>
        <label>
          <input
            type="radio"
            name="radio-group-second"
          >
          <span>Gamma</span>
        </label>
      </fieldset>

      <button
        class="-aim-unlock button usual"
        type="submit"
        onclick="alert('Submit!')"
      >
        Submit
      </button>
    </section>
  </div>
</template>

<style scoped>
.unit-section {
  border-style: double;
  border-width: 0.25rem;
  border-radius: 0.5rem;

  padding-block: 0.5rem;
  padding-inline: 1rem;
}

.unit-section * + .button.usual {
  margin-block-start: 0.5rem;
}

.unit-section .button.usual {
  border: none;
  border-radius: 0.25rem;

  background-color: var(--color-primary);
  color: var(--color-text-primary);

  display: inline-block;
  padding-block: 0.5rem;
  padding-inline: 1rem;
}

/* for <h2>Radio Types</h2> */
.unit-section + :not(.unit-section) {
  margin-block-start: 3rem;
}
</style>
