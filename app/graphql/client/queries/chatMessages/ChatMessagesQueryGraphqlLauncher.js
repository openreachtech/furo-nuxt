import BaseAppGraphqlLauncher from '../../BaseAppGraphqlLauncher.js'
import ChatMessagesQueryGraphqlPayload from './ChatMessagesQueryGraphqlPayload.js'
import ChatMessagesQueryGraphqlCapsule from './ChatMessagesQueryGraphqlCapsule.js'

/**
 * ChatMessages query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class ChatMessagesQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return ChatMessagesQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return ChatMessagesQueryGraphqlCapsule
  }
}
