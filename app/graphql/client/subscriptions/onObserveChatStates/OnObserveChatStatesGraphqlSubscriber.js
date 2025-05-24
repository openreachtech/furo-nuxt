import BaseAppGraphqlSubscriber from '../../BaseAppGraphqlSubscriber.js'
import OnObserveChatStatesSubscriptionGraphqlCapsule from './OnObserveChatStatesSubscriptionGraphqlCapsule.js'
import OnObserveChatStatesSubscriptionGraphqlPayload from './OnObserveChatStatesSubscriptionGraphqlPayload.js'

/**
 * OnObserveChatStates graphql subscriber.
 *
 * @extends {BaseAppGraphqlSubscriber}
 */
export default class OnObserveChatStatesGraphqlSubscriber extends BaseAppGraphqlSubscriber {
  /** @override */
  static get Payload () {
    return OnObserveChatStatesSubscriptionGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return OnObserveChatStatesSubscriptionGraphqlCapsule
  }
}
