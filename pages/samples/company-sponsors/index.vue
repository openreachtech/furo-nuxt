<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import CompanySponsorsPageContext from './CompanySponsorsPageContext.js'

import useGraphqlClient from '~/lib/composables/useGraphqlClient.js'

import CompanySponsorsQueryGraphqlLauncher from '~/app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlLauncher.js'

export default defineComponent({
  name: 'IndexPage',

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: 'Company Sponsors',
        // skipFilter: true,
      },
    })

    const graphqlClient = useGraphqlClient(CompanySponsorsQueryGraphqlLauncher)

    const statusReactive = reactive({
      isLoading: true,
    })

    const args = {
      props,
      componentContext,
      graphqlClient,
      statusReactive,
    }
    const context = CompanySponsorsPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <h1>Company Sponsors</h1>

    <section class="company-sponsors">
      <div
        v-for="it in context.$.companySponsors"
        :key="it.id"
        class="unit-company-sponsor"
      >
        <h3 class="name">
          {{ it.companyName }}
        </h3>
        <div class="description">
          {{ it.companyDescription }}
        </div>
      </div>
    </section>
  </div>

  <div
    v-if="context.$.isLoading"
    class="unit-loading"
  >
    Loading ...
  </div>
</template>

<style scoped>
.unit-company-sponsor {
  margin-bottom: 1rem;
  border: 1px solid #ccc;

  padding-block: 0.5rem;
  padding-inline: 1rem;
}

.unit-company-sponsor .name {
  font-size: 1.5rem;
}

.unit-company-sponsor .description {
  margin-block-start: 0.5rem;
  color: green;
  font-size: 1rem;
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
