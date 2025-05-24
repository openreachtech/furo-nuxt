<script>
import {
  defineComponent,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import FuroPagination from '~/lib/components/FuroPagination.vue'
import AppPagination from '~/components/AppPagination.vue'

import FuroPaginationPageContext from './FuroPaginationPageContext'

export default defineComponent({
  name: 'Furo Pagination',

  components: {
    FuroPagination,
    AppPagination,
  },

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: 'Furo Pagination Samples',
        skipFilter: true,
      },
    })

    const context = FuroPaginationPageContext.create({
      props,
      componentContext,
    })

    return {
      context,
    }
  },
})
</script>

<template>
  <div>
    <h1>Furo Pagination Samples</h1>

    <h2>&lt;FuroPagination&gt; with default Previous and Next</h2>

    <section class="unit-section">
      <h3>with default previous and next<br>(design: &lt;FuroPagination&gt;)</h3>

      <FuroPagination :pagination="context.pagination" />
    </section>

    <section class="unit-section">
      <h3>with pageKey &quot;p&quot;<br>(design: &lt;FuroPagination&gt;)</h3>

      <FuroPagination
        page-key="p"
        :pagination="context.pagination"
      />
    </section>

    <section class="unit-section">
      <h3>with maxPageRange = 7 (design: &lt;FuroPagination&gt;)</h3>

      <FuroPagination
        page-key="p"
        :pagination="{
          limit: 5,
          totalRecords: 100,
        }"
        :max-page-range="7"
      />
    </section>

    <section class="unit-section">
      <h3>with SVG image for previous and next<br>(design: alpha)</h3>

      <FuroPagination
        class="alpha-design"
        :pagination="context.pagination"
      >
        <template #previous>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M17 4.5L8 12L17 19.5V4.5Z"
              fill="currentColor"
            />
          </svg>
        </template>
        <template #next>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M7 4.5L16 12L7 19.5V4.5Z"
              fill="currentColor"
            />
          </svg>
        </template>
      </FuroPagination>
    </section>

    <br>
    <br>

    <h2>&lt;FuroPagination&gt; with a few Total Records</h2>

    <section class="unit-section">
      <h3>with Last Page 5</h3>

      <FuroPagination
        page-key="pg"
        :pagination="{
          limit: 5,
          totalRecords: 24,
        }"
      />
    </section>

    <section class="unit-section">
      <h3>with Last Page 3</h3>

      <FuroPagination
        page-key="pg"
        :pagination="{
          limit: 5,
          totalRecords: 14,
        }"
      />
    </section>

    <section class="unit-section">
      <h3>with Last Page 1</h3>

      <FuroPagination
        page-key="pg"
        :pagination="{
          limit: 5,
          totalRecords: 3,
        }"
      />
    </section>

    <br>
    <br>

    <h2>&lt;AppPagination&gt; with default Previous and Next</h2>

    <section class="unit-section">
      <h3>Default Previous and Next<br>(design: &lt;AppPagination&gt;)</h3>

      <AppPagination :pagination="context.pagination" />
    </section>

    <section class="unit-section">
      <h3>with pageKey &quot;pg&quot;<br>(design: &lt;AppPagination&gt;)</h3>

      <AppPagination
        page-key="pg"
        :pagination="{
          limit: 5,
          totalRecords: 53,
        }"
      />
    </section>

    <section class="unit-section">
      <h3>with Emoji for previous and next<br>(design: beta)</h3>

      <AppPagination
        class="beta-design"
        :pagination="context.pagination"
      >
        <template #previous>
          👈️
        </template>
        <template #next>
          👉️
        </template>
      </AppPagination>
    </section>
  </div>
</template>

<!-- NOTE: Never use <style scoped> here -->
<style>
/*
 * alpha design
 */
.furo-pagination.alpha-design > .page {
  border: none;
  border-radius: 50%;
}

/*
 * beta design
 */
.furo-pagination.beta-design > .page {
  border-color: var(--color-secondary);
  border-style: outset;
  border-width: 0.5rem;

  background: var(--color-secondary);
}

.furo-pagination.beta-design > .page:hover {
  border-color: var(--color-primary);

  background: var(--color-primary);
  color: var(--color-secondary);
}

.furo-pagination.beta-design > .page.current {
  border-color: var(--color-primary);

  background: var(--color-primary);
  color: var(--color-secondary);
}
</style>

<style scoped>
.unit-section {
  border-style: double;
  border-width: 0.25rem;
  border-radius: 0.5rem;

  padding-block: 0.5rem;
  padding-inline: 1rem;
}
</style>
