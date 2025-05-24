<script>
import {
  defineComponent,
} from 'vue'

import {
  useRoute,
} from 'vue-router'

import {
  NuxtLink,
} from '#components'

import FuroPaginationContext from '../contexts/concretes/FuroPaginationContext.js'

export default defineComponent({
  name: 'FuroPagination',

  components: {
    NuxtLink,
  },

  inheritAttrs: false,

  props: {
    pagination: {
      /**
       * @type {import('vue').PropType<{
       *   limit: number
       *   totalRecords: number
       * }>}
       */
      type: Object,
      default: () => ({
        limit: 20,
        totalRecords: 0,
      }),
      validator: value => {
        if (typeof value !== 'object') {
          return false
        }

        if (value === null) {
          return false
        }

        if (Array.isArray(value)) {
          return false
        }

        return true
      },
    },
    pageKey: {
      type: String,
      default: 'page',
    },
    maxPageRange: {
      type: Number,
      default: 5,
    },
  },

  setup (
    props,
    componentContext
  ) {
    const route = useRoute()

    const context = FuroPaginationContext.create({
      props,
      componentContext,
      route,
    })
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div
    class="furo-pagination"
    :class="{
      'disabled-previous': context.isDisabledPreviousPage(),
      'disabled-next': context.isDisabledNextPage(),
      'hidden-first': context.isHiddenFirstPage(),
      'hidden-last': context.isHiddenLastPage(),
      'hidden-first-dash': context.isHiddenFirstPageDash(),
      'hidden-last-dash': context.isHiddenLastPageDash(),
    }"
    v-bind="$attrs"
  >
    <NuxtLink
      class="previous"
      :to="context.generatePreviousPageHref()"
      @click="context.changePage({
        event: $event,
        page: context.createPreviousPage(),
      })"
    >
      <slot name="previous">
        &lt;
      </slot>
    </NuxtLink>

    <NuxtLink
      class="page first"
      :to="context.generateFirstPageHref()"
      @click="context.changePage({
        event: $event,
        page: context.createFirstPage(),
      })"
    >
      {{
        context.generateFirstPageLinkLabel()
      }}
    </NuxtLink>

    <span class="first dash">⋯</span>

    <NuxtLink
      v-for="page in context.createRangePages()"
      :key="page.page"
      class="page"
      :class="{
        current: page.isCurrent,
      }"
      :to="page.generateHref()"
      @click="context.changePage({
        event: $event,
        page,
      })"
    >
      {{
        page.generateText()
      }}
    </NuxtLink>

    <span class="last dash">⋯</span>

    <NuxtLink
      class="page last"
      :to="context.generateLastPageHref()"
      @click="context.changePage({
        event: $event,
        page: context.createLastPage(),
      })"
    >
      {{
        context.generateLastPageLinkLabel()
      }}
    </NuxtLink>

    <NuxtLink
      class="next"
      :to="context.generateNextPageHref()"
      @click="context.changePage({
        event: $event,
        page: context.createNextPage(),
      })"
    >
      <slot name="next">
        &gt;
      </slot>
    </NuxtLink>
  </div>
</template>

<!-- NOTE: Never use <style scoped> here -->
<style>
@layer furo {
  .furo-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .furo-pagination > .page {
    height: 100%;

    padding-block: 0.25rem;
    padding-inline: 0.5rem;
  }

  .furo-pagination > .page:hover {
    background-color: var(--color-background-hover);
    color: var(--color-text-hover);
  }

  .furo-pagination > .page.current {
    background-color: var(--color-background-highlight);
    color: var(--color-text-highlight);
  }

  .furo-pagination > .page.current:hover {
    background-color: var(--color-background-hover);
    color: var(--color-text-hover);
  }

  .furo-pagination > :where(.previous, .next) {
    height: 100%;

    display: inline-grid;
    place-items: center;

    padding-inline: 0.25rem;

    font-size: 1.2rem;
  }

  .furo-pagination > :where(.previous, .next):hover {
    background-color: var(--color-background-hover);
    color: var(--color-text-hover);
  }

  .furo-pagination.disabled-previous > .previous,
  .furo-pagination.disabled-next > .next {
    pointer-events: none;

    color: var(--color-disabled);
  }

  .furo-pagination.hidden-first > .first,
  .furo-pagination.hidden-last > .last {
    display: none;
  }

  .furo-pagination.hidden-first-dash > .first.dash,
  .furo-pagination.hidden-last-dash > .last.dash {
    display: none;
  }
}
</style>
