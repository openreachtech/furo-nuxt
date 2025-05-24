import {
  navigateTo,
} from 'nuxt/app'

import {
  defineNuxtRouteMiddleware,
} from '#app'

import useGraphqlClient from '~/lib/composables/useGraphqlClient.js'

import AccessTokenClerk from '~/lib/tools/AccessTokenClerk.js'

import FuroMeta from '~/lib/tools/FuroMeta.js'

import RenewAccessTokenMutationGraphqlLauncher from '~/app/graphql/client/mutations/renewAccessToken/RenewAccessTokenMutationGraphqlLauncher.js'

const {
  invokeRequestOnEvent,
} = useGraphqlClient(RenewAccessTokenMutationGraphqlLauncher)

// TODO: should be moved to configuration
const SIGN_IN_PATH = '/samples/sign-in'

/**
 * Gateway middleware (global)
 *
 * @param {import('nuxt/app').RouteMiddleware} context - The context
 * @returns {Promise<import('nuxt/app').RouteMiddleware>}
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const accessTokenClerk = AccessTokenClerk.create()

  // overwrite access token by received access token ---------------------------
  const accessToken = await sendRenewAccessToken()

  accessTokenClerk.saveToken({
    token: accessToken,
  })

  if (accessTokenClerk.existsToken()) {
    return goNextAsIs()
  }

  // should skip if sign-in page -----------------------------------------------
  if (to.path === SIGN_IN_PATH) {
    return goNextAsIs()
  }

  // should skip to confirm authentication -------------------------------------
  const furoMeta = FuroMeta.create({
    routeTo: to,
  })

  if (furoMeta.skipFilter) {
    return goNextAsIs()
  }

  return navigateTo(`${SIGN_IN_PATH}?redirect=${to.fullPath}`)
})

/**
 * Send renew access token.
 *
 * @returns {Promise<string>}
 */
async function sendRenewAccessToken () {
  const accessToken = await new Promise(resolve => {
    invokeRequestOnEvent({
      hooks: {
        async afterRequest (capsule) {
          resolve(capsule.accessToken)
        },
      },
    })
  })

  return accessToken
}

/**
 * Go next as is.
 *
 * @returns {Promise<void>}
 */
async function goNextAsIs () {
  return Promise.resolve()
}
