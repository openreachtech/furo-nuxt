import BaseAppGraphqlPayload from '../../BaseAppGraphqlPayload.js'

/**
 * ChatRooms query payload.
 *
 * @extends {BaseAppGraphqlPayload<ChatRoomsQueryRequestVariables>}
 */
export default class ChatRoomsQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query ChatRoomsQuery {
        chatRooms {
          rooms {
            id
            name
          }
        }
      }
    `
  }
}

/**
 * @typedef {{}} ChatRoomsQueryRequestVariables
 */
