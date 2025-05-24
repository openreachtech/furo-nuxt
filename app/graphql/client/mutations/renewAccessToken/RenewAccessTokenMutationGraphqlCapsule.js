import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * RenewAccessToken mutation graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<RenewAccessTokenMutationResponseContent>}
 */
export default class RenewAccessTokenMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * get: accessToken
   *
   * @returns {string | null} Access token.
   */
  get accessToken () {
    const content = this.extractContent()

    return content
      ?.renewAccessToken
      ?.accessToken
      ?? null
  }
}

/**
 * @typedef {{
 *   renewAccessToken: {
 *     accessToken: string
 *   }
 * }} RenewAccessTokenMutationResponseContent
 */
