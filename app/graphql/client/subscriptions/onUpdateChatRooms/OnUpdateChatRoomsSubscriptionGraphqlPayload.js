import BaseAppSubscriptionGraphqlPayload from '../../BaseAppSubscriptionGraphqlPayload.js'

/**
 * On observe chat states subscription GraphQL payload.
 *
 * @extends {BaseAppSubscriptionGraphqlPayload<OnUpdateChatRoomsSubscriptionRequestVariables>}
 */
export default class OnUpdateChatRoomsSubscriptionGraphqlPayload extends BaseAppSubscriptionGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      subscription OnUpdateChatRooms {
        onUpdateChatRooms {
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
 * @typedef {{}} OnUpdateChatRoomsSubscriptionRequestVariables
 */
