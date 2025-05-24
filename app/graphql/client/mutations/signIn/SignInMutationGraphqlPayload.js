import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * SignIn mutation payload.
 *
 * @extends {BaseAppGraphqlPayload<SignInMutationRequestVariables>}
 */
export default class SignInMutationGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation SignInMutation ($input: SignInInput!) {
        signIn (input: $input) {
          accessToken
        }
      }
    `
  }

  /**
   * Generate variables from value hash.
   *
   * @override
   * @param {{
   *   valueHash: {
   *     email: string
   *     password: string
   *   }
   * }} params - Parameters.
   * @returns {SignInMutationRequestVariables} Variables.
   */
  static generateVariables ({
    valueHash: {
      email,
      password,
    },
  }) {
    return {
      input: {
        email,
        password,
      },
    }
  }
}

/**
 * @typedef {{
 *   input: {
 *     email: string
 *     password: string
 *   }
 * }} SignInMutationRequestVariables
 */
