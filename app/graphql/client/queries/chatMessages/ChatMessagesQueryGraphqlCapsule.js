import BaseAppGraphqlCapsule from '../../BaseAppGraphqlCapsule'

/**
 * ChatMessages query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<ChatMessagesQueryResponseContent>}
 */
export default class ChatMessagesQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * get: chat messages
   *
   * @returns {Array<ChatMessageEntity>} Array of chat messages.
   */
  get chatMessages () {
    const content = this.extractContent()

    return content
      ?.chatMessages
      ?.messages
      ?? []
  }

  /**
   * get: chat messages
   *
   * @param {{
   *   roomId: number
   * }} args - Arguments.
   * @returns {Array<{
   *   id: number
   *   postedAt: string
   *   content: string
   *   sender: string
   *   roomId: number
   * }>} Array of chat messages
   */
  generateChatMessageEntities ({
    roomId,
  }) {
    return this.chatMessages
      .map(message => ({
        ...message,
        roomId,
      }))
  }
}

/**
 * @typedef {{
 *   chatMessages: {
 *     messages: Array<ChatMessageEntity>
 *   }
 * }} ChatMessagesQueryResponseContent
 */

/**
 * @typedef {{
 *   id: number
 *   postedAt: string
 *   content: string
 *   sender: string
 * }} ChatMessageEntity
 */
