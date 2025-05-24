import BaseAppGraphqlSubscriber from '../../BaseAppGraphqlSubscriber.js'
import OnUpdateChatRoomsSubscriptionGraphqlCapsule from './OnUpdateChatRoomsSubscriptionGraphqlCapsule.js'
import OnUpdateChatRoomsSubscriptionGraphqlPayload from './OnUpdateChatRoomsSubscriptionGraphqlPayload.js'

/**
 * OnUpdateChatRooms graphql subscriber.
 *
 * @extends {BaseAppGraphqlSubscriber}
 */
export default class OnUpdateChatRoomsGraphqlSubscriber extends BaseAppGraphqlSubscriber {
  /** @override */
  static get Payload () {
    return OnUpdateChatRoomsSubscriptionGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return OnUpdateChatRoomsSubscriptionGraphqlCapsule
  }
}
