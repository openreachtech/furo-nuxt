import BaseAppGraphqlPayload from '../../BaseAppGraphqlPayload.js'

/**
 * ChatMessages query payload.
 *
 * @extends {BaseAppGraphqlPayload<ChatMessagesQueryRequestVariables>}
 */
export default class ChatMessagesQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query ChatMessagesQuery ($input: ChatMessagesInput!) {
        chatMessages (input: $input) {
          messages {
            id
            postedAt
            content
            sender
          }
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     chatRoomId: number
 *     offsetDateTime: string | null
 *     fetchDirection: 'after' | 'before'
 *     limit: number
 *   }
 * }} ChatMessagesQueryRequestVariables
 */
