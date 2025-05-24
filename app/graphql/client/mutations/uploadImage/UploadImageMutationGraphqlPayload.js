import BaseAppGraphqlPayload from '../../BaseAppGraphqlPayload.js'

/**
 * UploadImage mutation payload.
 *
 * @extends {BaseAppGraphqlPayload<UploadImageMutationRequestVariables>}
 */
export default class UploadImageMutationGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation UploadImageMutation ($input: UploadImageInput!) {
        uploadImage (input: $input) {
          filename
          mimetype
          encoding
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
   *     image: File
   *   }
   * }} params - Parameters.
   * @returns {UploadImageMutationRequestVariables} Variables.
   */
  static generateVariables ({
    valueHash: {
      image,
    },
  }) {
    return {
      input: {
        image,
      },
    }
  }
}

/**
 * @typedef {{
 *   input: {
 *     image: File
 *   }
 * }} UploadImageMutationRequestVariables
 */

/*
input UploadImageInput {
  image: Upload!
}
*/
