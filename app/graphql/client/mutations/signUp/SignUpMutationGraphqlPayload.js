import BaseAppGraphqlPayload from '../../BaseAppGraphqlPayload.js'

/**
 * SignUp mutation payload.
 *
 * @extends {BaseAppGraphqlPayload<SignUpMutationRequestVariables>}
 */
export default class SignUpMutationGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation SignUpMutation ($input: SignUpInput!) {
        signUp (input: $input) {
          sentTo
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
   *     username: string
   *     firstName: string
   *     lastName: string
   *     password: string
   *   }
   * }} params - Parameters.
   * @returns {SignUpMutationRequestVariables} Variables.
   */
  static generateVariables ({
    valueHash: {
      email,
      username,
      firstName,
      lastName,
      password,
    },
  }) {
    return {
      input: {
        email,
        username,
        firstName,
        lastName,
        password,
      },
    }
  }
}

/**
 * @typedef {{
 *   input: {
 *     email: string
 *     username: string
 *     firstName: string
 *     lastName: string
 *     password: string
 *   }
 * }} SignUpMutationRequestVariables
 */
