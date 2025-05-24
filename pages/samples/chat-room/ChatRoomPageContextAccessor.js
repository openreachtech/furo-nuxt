import BaseFuroContextAccessor from '~/lib/contexts/BaseFuroContextAccessor.js'

/**
 * ChatRoomPagePageContextAccessor.
 *
 * @extends {BaseFuroContextAccessor<import('./ChatRoomPageContext.js').default>} - Base class <Context, State, Emit>
 */
export default class ChatRoomPagePageContextAccessor extends BaseFuroContextAccessor {
  /**
   * get: capsuleRef.
   *
   * @returns {import('../../../app/graphql/client/queries/chatRooms/ChatRoomsQueryGraphqlCapsule.js').default}
   */
  get chatRoomsCapsule () {
    return /** @type {*} */ (
      this.context
        .graphqlClientHash
        .chatRooms
        .capsuleRef
        .value
    )
  }

  /**
   * get: ChatRoomPage.
   *
   * @returns {Array<import('../../../app/graphql/client/queries/chatRooms/ChatRoomsQueryGraphqlCapsule.js').RoomEntity>}
   */
  get chatRooms () {
    return this.chatRoomsCapsule
      .chatRooms
  }

  /**
   * get: capsuleRef.
   *
   * @returns {import('../../../app/graphql/client/queries/chatMessages/ChatMessagesQueryGraphqlCapsule.js').default}
   */
  get chatMessagesCapsule () {
    return /** @type {*} */ (
      this.context
        .graphqlClientHash
        .chatMessages
        .capsuleRef
        .value
    )
  }

  /**
   * get: ChatRoomPage.
   *
   * @returns {Array<import('../../../app/graphql/client/queries/chatMessages/ChatMessagesQueryGraphqlCapsule.js').ChatMessageEntity>}
   */
  get chatMessages () {
    return this.chatMessagesCapsule
      .chatMessages
  }
}
