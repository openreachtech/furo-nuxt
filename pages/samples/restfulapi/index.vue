<script>
import {
  defineComponent,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

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

    return {}
  },
})
</script>

<template>
  <h1>RESTful API client Sample</h1>
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
