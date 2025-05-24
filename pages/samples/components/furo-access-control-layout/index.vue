<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import FuroAccessControlLayoutPageContext from './FuroAccessControlLayoutPageContext.js'
import FuroAccessControlLayout from '~/lib/components/FuroAccessControlLayout.vue'
import AppAccessControlLayout from '~/components/AppAccessControlLayout.vue'

export default defineComponent({
  components: {
    FuroAccessControlLayout,
    AppAccessControlLayout,
  },

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: 'Furo Access Control Layout Samples',
        skipFilter: true,
      },
    })

    const args = {
      props,
      componentContext,

      /** @type {import('vue').Ref<import('./FuroAccessControlLayoutPageContext.js').Role | null>} */
      roleRef: ref('admin'),
    }
    const context = FuroAccessControlLayoutPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <h1 class="heading">
      Furo Access Control Layout Sample
    </h1>

    <section class="unit-section">
      <h2 class="heading">
        &lt;FuroAccessControlLayout&gt;
      </h2>

      <h3>
        Case: has allowed and kicked props
      </h3>

      <pre class="preformatted">
        <div>Current role: {{ `${context.role}` }}</div>
        <div>Allowed roles: {{ ['admin', 'user'] }}</div>
        <div>Kicked roles: {{ ['guest'] }}</div>
      </pre>

      <FuroAccessControlLayout
        :role="context.role"
        :allowed="['admin', 'user']"
        :kicked="['guest']"
      >
        <template #contents>
          <div>{{ context.secretMessage }}</div>
        </template>
      </FuroAccessControlLayout>

      <div class="actions">
        <button
          @click="context.setRole({
            role: 'admin',
          })"
        >
          Allow access
        </button>

        <button
          @click="context.setRole({
            role: 'guest',
          })"
        >
          Kick out
        </button>
      </div>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        &lt;FuroAccessControlLayout&gt;
      </h2>

      <h3>
        Case: allowed props only
      </h3>

      <pre class="preformatted">
        <div>Current role: {{ `${context.role}` }}</div>
        <div>Allowed roles: {{ ['admin', 'user'] }}</div>
        <div>Kicked roles: {{ [] }}</div>
      </pre>

      <FuroAccessControlLayout
        :role="context.role"
        :allowed="['admin', 'user']"
      >
        <template #contents>
          <div>{{ context.secretMessage }}</div>
        </template>
      </FuroAccessControlLayout>

      <div class="actions">
        <button
          @click="context.setRole({
            role: 'admin',
          })"
        >
          Allow access
        </button>

        <button
          @click="context.setRole({
            role: null,
          })"
        >
          Kick out
        </button>
      </div>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        &lt;FuroAccessControlLayout&gt;
      </h2>

      <h3>
        Case: kicked props only
      </h3>

      <pre class="preformatted">
        <div>Current role: {{ `${context.role}` }}</div>
        <div>Allowed roles: {{ [] }}</div>
        <div>Kicked roles: {{ ['guest'] }}</div>
      </pre>

      <FuroAccessControlLayout
        :role="context.role"
        :kicked="['guest']"
      >
        <template #contents>
          <div>{{ context.secretMessage }}</div>
        </template>
      </FuroAccessControlLayout>

      <div class="actions">
        <button
          @click="context.setRole({
            role: null,
          })"
        >
          Allow access
        </button>

        <button
          @click="context.setRole({
            role: 'guest',
          })"
        >
          Kick out
        </button>
      </div>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        &lt;FuroAccessControlLayout&gt;
      </h2>

      <h3>
        Case: no allowed and no kicked props
      </h3>

      <pre class="preformatted">
        <div>Current role: {{ context.role }}</div>
        <div>Allowed roles: {{ [] }}</div>
        <div>Kicked roles: {{ [] }}</div>
      </pre>

      <FuroAccessControlLayout :role="context.role">
        <template #contents>
          <div>{{ context.secretMessage }}</div>
        </template>
      </FuroAccessControlLayout>

      <div class="actions">
        <button
          @click="context.setRole({
            role: 'admin',
          })"
        >
          Allow access
        </button>

        <button
          @click="context.setRole({
            role: 'guest',
          })"
        >
          Kick out
        </button>
      </div>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        &lt;FuroAccessControlLayout&gt;
      </h2>

      <h3>
        Case: role in both allowed and kicked props
      </h3>

      <pre class="preformatted">
        <div>Current role: {{ `${context.role}` }}</div>
        <div>Allowed roles: {{ ['admin', 'user'] }}</div>
        <div>Kicked roles: {{ ['admin', 'user'] }}</div>
      </pre>

      <FuroAccessControlLayout
        :role="context.role"
        :allowed="['admin', 'user']"
        :kicked="['admin', 'user']"
      >
        <template #contents>
          <div>{{ context.secretMessage }}</div>
        </template>
      </FuroAccessControlLayout>

      <div class="actions">
        <button
          @click="context.setRole({
            role: null,
          })"
        >
          Allow access
        </button>

        <button
          @click="context.setRole({
            role: 'admin',
          })"
        >
          Kick out
        </button>
      </div>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        &lt;AppAccessControlLayout&gt;
      </h2>

      <h3>
        Case: customize AppAccessControlLayout component
      </h3>

      <pre class="preformatted">
        <div>Current role: {{ `${context.role}` }}</div>
        <div>Allowed roles: {{ ['admin', 'user'] }}</div>
        <div>Kicked roles: {{ ['guest'] }}</div>
      </pre>

      <AppAccessControlLayout
        :role="context.role"
        :allowed="['admin', 'user']"
        :kicked="['guest']"
      >
        <template #contents>
          <div>{{ context.secretMessage }}</div>
        </template>
      </AppAccessControlLayout>

      <div class="actions">
        <button
          @click="context.setRole({
            role: 'admin',
          })"
        >
          Allow access
        </button>

        <button
          @click="context.setRole({
            role: 'guest',
          })"
        >
          Kick out
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.unit-page {
  padding-block-end: 20rem;
}

.unit-section > * + * {
  margin-block-start: 1.5rem;
}

.unit-section {
  margin-block-start: 3rem;
}

.unit-section > .heading {
  line-height: 1.25;
}

.unit-section > .actions {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.unit-section > .preformatted {
  border-color: var(--color-text);
  border-style: solid;
  border-width: var(--size-thinnest);

  padding-inline: 1rem;
}

/******************************************************************************/

.unit-children.flex-layout {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.unit-children.flex-layout > .unit-child {
  border: var(--size-thinnest) solid var(--color-border);

  flex: 1;

  padding-block: 0.5rem;
  padding-inline: 1rem;
}

/******************************************************************************/

.unit-children.grid-layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.unit-children.grid-layout > .unit-child {
  border: var(--size-thinnest) solid var(--color-border);

  padding-block: 0.5rem;
  padding-inline: 1rem;
}
</style>
