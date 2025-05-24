import {
  defineNuxtRouteMiddleware,
  useSeoMeta,
} from '#imports'

import FuroMeta from '~/lib/tools/FuroMeta'

/**
 * Page Title middleware (global)
 *
 * @param {import('#app').RouteMiddleware} context - The context
 * @returns {Promise<void>}
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const furoMeta = FuroMeta.create({
    routeTo: to,
  })

  const resolvedPageTitle = furoMeta.pageTitle
    ?? 'Furo Nuxt'

  useSeoMeta({
    title: resolvedPageTitle,
  })

  return goNextAsIs()
})

/**
 * Go next as is.
 *
 * @returns {Promise<void>}
 */
async function goNextAsIs () {
  return Promise.resolve()
}
