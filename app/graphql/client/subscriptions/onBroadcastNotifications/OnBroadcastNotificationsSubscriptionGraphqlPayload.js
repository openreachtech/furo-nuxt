import BaseAppSubscriptionGraphqlPayload from '../../BaseAppSubscriptionGraphqlPayload.js'

/**
 * On observe chat states subscription GraphQL payload.
 *
 * @extends {BaseAppSubscriptionGraphqlPayload<OnBroadcastNotificationsSubscriptionRequestVariables>}
 */
export default class OnBroadcastNotificationsSubscriptionGraphqlPayload extends BaseAppSubscriptionGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      subscription onBroadcastNotifications ($input: OnBroadcastNotificationsInput!) {
        onBroadcastNotifications (input: $input) {
          notification {
            segment
            message
          }
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     segment: string
 *   }
 * }} OnBroadcastNotificationsSubscriptionRequestVariables
 */
