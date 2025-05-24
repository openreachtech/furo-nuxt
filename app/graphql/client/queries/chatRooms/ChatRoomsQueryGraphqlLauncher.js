import BaseAppGraphqlLauncher from '../../BaseAppGraphqlLauncher.js'
import ChatRoomsQueryGraphqlPayload from './ChatRoomsQueryGraphqlPayload.js'
import ChatRoomsQueryGraphqlCapsule from './ChatRoomsQueryGraphqlCapsule.js'

/**
 * ChatRooms query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class ChatRoomsQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return ChatRoomsQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return ChatRoomsQueryGraphqlCapsule
  }
}
