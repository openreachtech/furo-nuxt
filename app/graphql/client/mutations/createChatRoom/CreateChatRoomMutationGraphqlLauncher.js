import BaseAppGraphqlLauncher from '../../BaseAppGraphqlLauncher.js'
import CreateChatRoomMutationGraphqlPayload from './CreateChatRoomMutationGraphqlPayload.js'
import CreateChatRoomMutationGraphqlCapsule from './CreateChatRoomMutationGraphqlCapsule.js'

/**
 * CreateChatRoom mutation graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class CreateChatRoomMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CreateChatRoomMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CreateChatRoomMutationGraphqlCapsule
  }
}
