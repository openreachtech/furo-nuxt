import BaseAppGraphqlPayload from '../../BaseAppGraphqlPayload.js'

/**
 * SendChatMessage mutation payload.
 *
 * @extends {BaseAppGraphqlPayload<SendChatMessageMutationRequestVariables>}
 */
export default class SendChatMessageMutationGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation SendMessageMutation ($input: SendChatMessageInput!) {
        sendChatMessage (input: $input) {
          message {
            id
            postedAt
            content
            sender
          }
        }
      }
    `
  }

  /**
   * Normalize form based value hash.
   *
   * @override
   * @param {{
   *   valueHash: {
   *     [field: string]: furo.FormControlElementValueType
   *   }
   * }} params - Parameters.
   * @returns {{
   *   [field: string]: any
   * }} Normalized form value hash.
   */
  static normalizeFormBasedValueHash ({
    valueHash: {
      chatRoomId,
      content,
    },
  }) {
    return {
      chatRoomId: Number(chatRoomId),
      content,
    }
  }
}

/**
 * @typedef {{
 *   input: {
 *     chatRoomId: number
 *     content: string
 *   }
 * }} SendChatMessageMutationRequestVariables
 */
