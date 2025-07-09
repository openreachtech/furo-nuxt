import {
  defineNuxtPlugin,
  useRuntimeConfig,
} from 'nuxt/app'

import AppShare from '../app/shares/AppShare.js'
import FuroGraphqlShare from '~/lib/shares/FuroGraphqlShare.js'

import graphqlConfig from '~/app/graphql/graphql.config.js'
import renchanRestfulApiConfig from '~/app/restfulapi/renchan/restfulapi.config.js'

import useSubscriptionConnector from '~/lib/composables/useSubscriptionConnector.js'

/**
 * Setup graphql config.
 */
export default defineNuxtPlugin(async () => {
  setupGraphqlConfig()
  setupRestfulApiConfig()

  const $furo = await createShare({
    config: /** @type {furo.GraphqlConfig} */ (graphqlConfig),
  })

  return {
    provide: {
      furo: $furo,
    },
  }
})

/**
 * Setup graphql config.
 */
function setupGraphqlConfig () {
  if (graphqlConfig.ENDPOINT_URL) {
    return
  }

  const runtimeConfig = useRuntimeConfig()

  graphqlConfig.ENDPOINT_URL = runtimeConfig.public
    .ENDPOINT_URL
  graphqlConfig.WEBSOCKET_URL = runtimeConfig.public
    .WEBSOCKET_URL
}

/**
 * Setup RESTful API config.
 */
function setupRestfulApiConfig () {
  const runtimeConfig = useRuntimeConfig()

  renchanRestfulApiConfig.BASE_URL = runtimeConfig.public
    .RENCHAN_RESTFUL_API_BASE_URL
}

/**
 * Setup furo shared object.
 *
 * @param {{
 *   config: furo.GraphqlConfig
 * }} params - Parameters
 * @returns {Promise<AppShare>}
 */
async function createShare ({
  config,
}) {
  const {
    subscriptionConnector,
  } = useSubscriptionConnector({
    graphqlConfig: config,
  })

  const args = {
    config,
    websocketConnector: subscriptionConnector,
  }
  const graphqlShare = FuroGraphqlShare.create(args)

  return AppShare.create({
    graphqlShare,
  })
}
