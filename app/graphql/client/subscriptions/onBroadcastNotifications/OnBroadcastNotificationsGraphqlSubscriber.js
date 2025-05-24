import BaseAppGraphqlSubscriber from '../../BaseAppGraphqlSubscriber.js'
import OnBroadcastNotificationsSubscriptionGraphqlCapsule from './OnBroadcastNotificationsSubscriptionGraphqlCapsule.js'
import OnBroadcastNotificationsSubscriptionGraphqlPayload from './OnBroadcastNotificationsSubscriptionGraphqlPayload.js'

/**
 * OnBroadcastNotifications graphql subscriber.
 *
 * @extends {BaseAppGraphqlSubscriber}
 */
export default class OnBroadcastNotificationsGraphqlSubscriber extends BaseAppGraphqlSubscriber {
  /** @override */
  static get Payload () {
    return OnBroadcastNotificationsSubscriptionGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return OnBroadcastNotificationsSubscriptionGraphqlCapsule
  }
}
