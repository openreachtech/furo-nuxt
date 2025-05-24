import {
  SubscriptionConnector,
} from '@openreachtech/furo'

/**
 * Composable to use a subscription GraphQL client.
 * Used in plugin 010.graphql.js.
 *
 * @param {{
 *   graphqlConfig: furo.GraphqlConfig
 * }} params - Parameters
 * @returns {{
 *   subscriptionConnector: furo.Connector
 * }}
 */
export default function useSubscriptionConnector ({
  graphqlConfig,
}) {
  const subscriptionConnector = SubscriptionConnector.create({
    config: graphqlConfig,
  })
  // .addLifecycleListener({
  //   eventName: 'connecting',
  //   handler: result => {
  //     Timber.log('🪵 [1] WebSocket: connecting()', result)
  //   },
  // })
  // .addLifecycleListener({
  //   eventName: 'opened',
  //   handler: socket => {
  //     Timber.log('🪵 [2] WebSocket: opened()', socket)
  //   },
  // })
  // .addLifecycleListener({
  //   eventName: 'message',
  //   handler: message => {
  //     Timber.log('🪵 [3] WebSocket: message()', message)
  //   },
  // })
  // .addLifecycleListener({
  //   eventName: 'connected',
  //   handler: socket => {
  //     Timber.log('🪵 [4] WebSocket: connected()', socket)
  //   },
  // })
  // .addLifecycleListener({
  //   eventName: 'closed',
  //   handler: error => {
  //     Timber.log('🪵 [5] WebSocket: closed()', error)
  //   },
  // })
  // .addLifecycleListener({
  //   eventName: 'error',
  //   handler: error => {
  //     Timber.log('🪵 [6] WebSocket: error()', error)
  //   },
  // })
  // .addLifecycleListener({
  //   eventName: 'ping',
  //   handler: message => {
  //     Timber.log('🪵 [7] WebSocket: ping()', message)
  //   },
  // })
  // .addLifecycleListener({
  //   eventName: 'pong',
  //   handler: message => {
  //     Timber.log('🪵 [8] WebSocket: pong()', message)
  //   },
  // })

  return {
    subscriptionConnector,
  }
}
