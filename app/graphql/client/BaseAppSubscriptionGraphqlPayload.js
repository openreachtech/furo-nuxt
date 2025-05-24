import {
  BaseSubscriptionGraphqlPayload,
  StorageClerk,
} from '@openreachtech/furo'

import {
  HEADER_KEY,
  STORAGE_KEY,
} from '../../constants'

/**
 * Base class for all app subscription graphql payloads.
 *
 * @template {furo.GraphqlRequestVariables} SV
 * @extends {BaseSubscriptionGraphqlPayload<SV>}
 */
export default class BaseAppSubscriptionGraphqlPayload extends BaseSubscriptionGraphqlPayload {
  /**
   * Collect based headers options.
   *
   * @override
   * @returns {Array<Record<string, string>>} Headers options.
   */
  static collectBasedHeadersOptions () {
    const basedOptions = super.collectBasedHeadersOptions()

    const accessToken = this.loadAccessToken()
    if (!accessToken) {
      return basedOptions
    }

    return [
      ...basedOptions,

      {
        [HEADER_KEY.ACCESS_TOKEN]: accessToken,
      },
    ]
  }

  /**
   * Load access token from storage.
   *
   * @returns {string | null} Access token.
   */
  static loadAccessToken () {
    const storageClerk = this.createStorageClerk()

    return storageClerk.get(STORAGE_KEY.ACCESS_TOKEN)
  }

  /**
   * Create an instance of StorageClerk.
   *
   * @returns {StorageClerk} Instance of StorageClerk.
   */
  static createStorageClerk () {
    return StorageClerk.createAsLocal()
  }
}
