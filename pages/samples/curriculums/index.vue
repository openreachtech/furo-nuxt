<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import CurriculumsPageContext from './CurriculumsPageContext.js'

import useGraphqlClient from '~/lib/composables/useGraphqlClient.js'

import CurriculumsQueryGraphqlLauncher from '~/app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlLauncher'

export default defineComponent({
  name: 'IndexPage',

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: 'Curriculums',
        // skipFilter: true,
      },
    })

    const graphqlClient = useGraphqlClient(CurriculumsQueryGraphqlLauncher)

    const statusReactive = reactive({
      isLoading: true,
    })

    const args = {
      props,
      componentContext,
      graphqlClient,
      statusReactive,
    }
    const context = CurriculumsPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <h1>Curriculums</h1>

    <button @click="context.requestCurriculums()">
      Fetch curriculums with offset 0
    </button>

    <br>
    <br>

    <button
      @click="context.requestCurriculums({
        offset: 2,
      })"
    >
      Fetch curriculums with offset 2
    </button>

    <br>
    <br>

    <button
      @click="context.requestCurriculums({
        offset: 4,
      })"
    >
      Fetch curriculums with offset 4
    </button>

    <pre>{{
      JSON.stringify(
        context.$.curriculums,
        null,
        2
      )
    }}</pre>
  </div>

  <div
    v-if="context.$.isLoading"
    class="unit-loading"
  >
    Loading ...
  </div>
</template>

<style scoped>
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
