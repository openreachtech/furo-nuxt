import BaseAppSubscriptionGraphqlCapsule from '../../BaseAppSubscriptionGraphqlCapsule'

/**
 * OnObserveChatStates subscription capsule.
 *
 * @extends {BaseAppSubscriptionGraphqlCapsule<OnObserveChatStatesSubscriptionResponseContent>}
 */
export default class OnObserveChatStatesSubscriptionGraphqlCapsule extends BaseAppSubscriptionGraphqlCapsule {
  /**
   * Extract value hash.
   *
   * @returns {Record<string, *> | null} Value hash.
   */
  extractValueHash () {
    const content = this.extractContent()

    return content?.onObserveChatStates
      ?? null
  }

  /**
   * Has unread messages.
   *
   * @returns {boolean} true: Has unread messages
   */
  hasUnreadMessages () {
    return this.extractValueHash()
      ?.hasUnreadMessages
      ?? false
  }

  /**
   * Has updated members.
   *
   * @returns {boolean} true: Has updated members
   */
  hasUpdatedMembers () {
    return this.extractValueHash()
      ?.hasUpdatedMembers
      ?? false
  }
}

/**
 * @typedef {{
 *   onObserveChatStates: {
 *     hasUnreadMessages: boolean
 *     hasUpdatedMembers: boolean
 *   }
 * }} OnObserveChatStatesSubscriptionResponseContent
 */
