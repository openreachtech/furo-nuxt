import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * SignIn mutation GraphQL capsule.
 *
 * @extends {BaseAppGraphqlCapsule<SignUpMutationResponseContent>}
 */
export default class SignUpMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * get: accessToken
   *
   * @returns {string | null} Access token.
   */
  get accessToken () {
    const content = this.extractContent()

    return content
      ?.signIn
      ?.accessToken
      ?? null
  }
}

/**
 * @typedef {{
 *   signIn: {
 *     accessToken: string
 *   }
 * }} SignUpMutationResponseContent
 */
