<script>
import {
  defineComponent,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import useGraphqlClient from '~/lib/composables/useGraphqlClient.js'

import PaginationArticlesQueryGraphqlLauncher from '~/app/graphql/client/queries/paginationArticles/PaginationArticlesQueryGraphqlLauncher.js'

import FuroPagination from '~/lib/components/FuroPagination.vue'
import FuroPaginationWithGraphqlPageContext from './PaginationArticlesPageContext.js'

export default defineComponent({
  components: {
    FuroPagination,
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

    const graphqlClient = useGraphqlClient(PaginationArticlesQueryGraphqlLauncher)

    const args = {
      props,
      componentContext,
      graphqlClient,
    }
    const context = FuroPaginationWithGraphqlPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div>
    <h1>Pagination with GraphQL</h1>

    <section>
      <FuroPagination
        :pagination="context.pagination"
        @change-page="context.changePage($event)"
      />

      <div class="unit-articles">
        <div
          v-for="article in context.articles"
          :key="article.id"
          class="unit-article"
        >
          <h2 class="title">
            {{ article.title }}
          </h2>
          <p class="description">
            {{ article.description }}
          </p>
          <time class="date">{{
            new Date(article.postedAt)
              .toLocaleDateString()
          }}</time>
        </div>
      </div>

      <FuroPagination
        :pagination="context.pagination"
        @change-page="context.changePage($event)"
      />
    </section>
  </div>
</template>

<style scoped>
.unit-articles {
  margin-block: 1rem;

  padding-block: 0.5rem;
  padding-inline: 1rem;
}

.unit-article {
  border: var(--size-thinnest) solid #333;
  border-radius: 0.5rem;

  padding-block: 0.5rem;
  padding-inline: 1rem;

  display: flex;
  flex-direction: column;
}

.unit-article + .unit-article {
  margin-block-start: 0.5rem;
}

.unit-article > .title {
  color: orangered;

  font-size: 1.5rem;
  font-weight: bold;
}

.unit-article > .description {
  margin-block-start: 1rem;

  font-size: 0.8rem;
  text-align: justify;
  text-justify: inter-ideograph;
}

.unit-article > .description::first-letter {
  margin-inline-start: 0.5rem;
}

.unit-article > .date {
  margin-block-start: 1rem;

  text-align: right;
  font-size: 0.8rem;
}
</style>
