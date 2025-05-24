import BaseAppGraphqlPayload from '../../BaseAppGraphqlPayload.js'

/**
 * CreateChatRoom mutation payload.
 *
 * @extends {BaseAppGraphqlPayload<CreateChatRoomMutationRequestVariables>}
 */
export default class CreateChatRoomMutationGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation CreateChatRoomMutation ($input: CreateChatRoomInput!) {
        createChatRoom (input: $input) {
          rooms {
            id
            name
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
      chatRoomName: name,
    },
  }) {
    return {
      name,
    }
  }
}

/**
 * @typedef {{
 *   input: {
 *     name: string
 *   }
 * }} CreateChatRoomMutationRequestVariables
 */
