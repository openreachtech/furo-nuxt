import BaseAppSubscriptionGraphqlCapsule from '../../BaseAppSubscriptionGraphqlCapsule'

/**
 * OnBroadcastNotifications subscription capsule.
 *
 * @extends {BaseAppSubscriptionGraphqlCapsule<OnBroadcastNotificationsSubscriptionResponseContent>}
 */
export default class OnBroadcastNotificationsSubscriptionGraphqlCapsule extends BaseAppSubscriptionGraphqlCapsule {
  /**
   * Extract value hash.
   *
   * @returns {Record<string, *> | null} Value hash.
   */
  extractValueHash () {
    const content = this.extractContent()

    return content?.onBroadcastNotifications
      ?? null
  }

  /**
   * Extract notification.
   *
   * @returns {NotificationEntity | null}
   */
  extractNotification () {
    return this.extractValueHash()
      ?.notification
      ?? null
  }
}

/**
 * @typedef {{
 *   onBroadcastNotifications: {
 *     notification: NotificationEntity
 *   }
 * }} OnBroadcastNotificationsSubscriptionResponseContent
 */

/**
 * @typedef {{
 *   message: string
 *   segment: string
 * }} NotificationEntity
 */
