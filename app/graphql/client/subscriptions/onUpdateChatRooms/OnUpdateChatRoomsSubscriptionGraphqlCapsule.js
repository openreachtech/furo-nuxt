import BaseAppSubscriptionGraphqlCapsule from '../../BaseAppSubscriptionGraphqlCapsule'

/**
 * OnUpdateChatRooms subscription capsule.
 *
 * @extends {BaseAppSubscriptionGraphqlCapsule<OnUpdateChatRoomsSubscriptionResponseContent>}
 */
export default class OnUpdateChatRoomsSubscriptionGraphqlCapsule extends BaseAppSubscriptionGraphqlCapsule {
  /**
   * Extract value hash.
   *
   * @returns {Record<string, *> | null} Value hash.
   */
  extractValueHash () {
    const content = this.extractContent()

    return content?.onUpdateChatRooms
      ?? null
  }

  /**
   * Has unread messages.
   *
   * @returns {boolean | null} Has unread messages
   */
  extractRooms () {
    return this.extractValueHash()
      ?.rooms
      ?? []
  }
}

/**
 * @typedef {{
 *   onUpdateChatRooms: {
 *     rooms: Array<{
 *       id: number
 *       name: string
 *     }>
 *   }
 * }} OnUpdateChatRoomsSubscriptionResponseContent
 */
