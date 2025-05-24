<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import FuroTabLayout from '~/lib/components/FuroTabLayout.vue'
import AppTabLayout from '~/components/AppTabLayout.vue'

import FuroTabLayoutPageContext from './FuroTabLayoutPageContext.js'

export default defineComponent({
  name: 'Furo TabLayout',

  components: {
    FuroTabLayout,
    AppTabLayout,
  },

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: 'Furo TabLayout Samples',
        skipFilter: true,
      },
    })

    /**
     * @type {import('vue').Ref<{
     *   fromTab: import('~/lib/contexts/concretes/FuroTabItemContext').default | null
     *   toTab: import('~/lib/contexts/concretes/FuroTabItemContext').default | null
     * }>}
     */
    const changeTabResultRef = ref({
      fromTab: null,
      toTab: null,
    })

    const args = {
      props,
      componentContext,
      changeTabResultRef,
    }
    const context = FuroTabLayoutPageContext.create(args)

    return {
      context,

      changeTabResultRef,
    }
  },
})
</script>

<template>
  <div>
    <h1>Furo TabLayout Samples</h1>

    <h2>&lt;FuroTabLayout&gt; samples</h2>

    <!-- ///////////////////////////////////////////////////////////////// -->
    <!-- <FuroTabLayout> with default design -->
    <!-- ///////////////////////////////////////////////////////////////// -->
    <section class="unit-section">
      <h3>&lt;FuroTabLayout&gt; with default design</h3>

      <FuroTabLayout
        :tabs="context.tabs"
        :active-tab-key="context.tabs[0].tabKey"
      >
        <template #contents>
          <div class="alpha">
            Alpha Content
          </div>

          <div class="beta">
            Beta Content
          </div>

          <div class="gamma">
            Gamma Content
          </div>
        </template>
      </FuroTabLayout>
    </section>

    <!-- ///////////////////////////////////////////////////////////////// -->
    <!-- <FuroTabLayout> with change tab event -->
    <!-- ///////////////////////////////////////////////////////////////// -->
    <section class="unit-section">
      <h3>&lt;FuroTabLayout&gt; with change tab event</h3>

      <FuroTabLayout
        :tabs="context.tabs"
        :active-tab-key="context.tabs[0].tabKey"
        @change-tab="context.changeTab($event)"
      >
        <template #contents>
          <div class="alpha">
            Alpha Content
          </div>

          <div class="beta">
            Beta Content
          </div>

          <div class="gamma">
            Gamma Content
          </div>
        </template>
      </FuroTabLayout>

      <div class="button-reaction-placeholder">
        <div>[from: [{{ changeTabResultRef.fromTab?.index }}] {{ changeTabResultRef.fromTab?.tabKey }}]</div>
        <div>↓</div>
        <div>[to: [{{ changeTabResultRef.toTab?.index }}] {{ changeTabResultRef.toTab?.tabKey }}]</div>
      </div>
    </section>

    <!-- ///////////////////////////////////////////////////////////////// -->
    <!-- <FuroTabLayout> with customized .design.alpha -->
    <!-- ///////////////////////////////////////////////////////////////// -->
    <section class="unit-section">
      <h3>&lt;FuroTabLayout&gt; with customized .design.alpha</h3>

      <FuroTabLayout
        :tabs="context.tabs"
        :active-tab-key="context.tabs[0].tabKey"
        class="design alpha"
      >
        <template #contents>
          <div class="alpha">
            Alpha Content
          </div>

          <div class="beta">
            Beta Content
          </div>

          <div class="gamma">
            Gamma Content
          </div>
        </template>
      </FuroTabLayout>
    </section>

    <br>
    <br>

    <h1>&lt;AppTabLayout&gt; Samples</h1>

    <!-- ///////////////////////////////////////////////////////////////// -->
    <!-- <AppTabLayout> with default design -->
    <!-- ///////////////////////////////////////////////////////////////// -->
    <section class="unit-section">
      <h3>&lt;AppTabLayout&gt; with default design</h3>

      <AppTabLayout
        :tabs="context.tabs"
        :active-tab-key="context.tabs[0].tabKey"
      >
        <template #contents>
          <div class="alpha">
            Alpha Content
          </div>

          <div class="beta">
            Beta Content
          </div>

          <div class="gamma">
            Gamma Content
          </div>
        </template>
      </AppTabLayout>
    </section>

    <!-- ///////////////////////////////////////////////////////////////// -->
    <!-- <AppTabLayout> with customized .design.beta -->
    <!-- ///////////////////////////////////////////////////////////////// -->
    <section class="unit-section">
      <h3>&lt;AppTabLayout&gt; with customized .design.beta</h3>

      <AppTabLayout
        :tabs="context.tabs"
        :active-tab-key="context.tabs[0].tabKey"
        class="design beta"
      >
        <template #contents>
          <div class="alpha">
            Alpha Content
          </div>

          <div class="beta">
            Beta Content
          </div>

          <div class="gamma">
            Gamma Content
          </div>
        </template>
      </AppTabLayout>
    </section>
  </div>
</template>

<style scoped>
.button-reaction-placeholder {
  border: var(--size-thinnest) var(--color-text) solid;
  border-radius: .5rem;

  margin-block: 1rem;

  padding-block: .5rem;
  padding-inline: 1rem;

  font-size: 1.2rem;
}
</style>

<!-- NOTE: Never use <style scoped> here -->
<style>
/*
 * common design of contents
 */
.furo-layout.tab > .contents > * {
  margin-block-start: 0.25rem;

  border: var(--size-thinnest) var(--color-text) solid;

  padding-block: 1rem;
  padding-inline: 2rem;

  background-color: var(--color-background-content);
}

/*
 * .design.alpha
 */
.furo-layout.tab.alpha > .contents > :first-child {
  margin-block-start: 0.25rem;
}

.furo-layout.tab.alpha > .tabs > .tab {
  font-size: 1.5rem;

  border-bottom: 0.25rem solid transparent;
}

.furo-layout.tab.alpha > .tabs > .tab.active {
  border-bottom: 0.25rem solid var(--color-primary);

  background-color: inherit;
  color: inherit;
}

/*
 * .design.beta
 */
.furo-layout.tab.beta > .contents > * {
  margin-block-start: 0;
}

.furo-layout.tab.beta > .tabs > .tab {
  border-top: var(--size-thinnest) var(--color-text) solid;
  border-left: var(--size-thinnest) var(--color-text) solid;
  border-right: var(--size-thinnest) var(--color-text) solid;
  border-radius: 0.5rem 0.5rem 0 0;

  font-size: 1.5rem;
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
