import BaseAppGraphqlCapsule from '../../BaseAppGraphqlCapsule'

/**
 * ChatRooms query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<ChatRoomsQueryResponseContent>}
 */
export default class ChatRoomsQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * get: chat rooms
   *
   * @returns {Array<RoomEntity>} Array of chat rooms
   */
  get chatRooms () {
    const content = this.extractContent()

    return content
      ?.chatRooms
      ?.rooms
      ?? []
  }
}

/**
 * @typedef {{
 *   chatRooms: {
 *     rooms: Array<RoomEntity>
 *   }
 * }} ChatRoomsQueryResponseContent
 */

/**
 * @typedef {{
 *   id: number
 *   name: string
 * }} RoomEntity
 */
