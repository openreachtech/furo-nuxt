import {
  RESTFUL_API_METHOD,
} from '@openreachtech/furo'

import BaseAppRenchanRestfulApiPayload from '../../BaseAppRenchanRestfulApiPayload.js'

/**
 * Beta external callback success POST Renchan RESTful API payload.
 *
 * @extends {BaseAppRenchanRestfulApiPayload<*, *, *>}
 */
export default class BetaExternalCallbackSuccessPostRenchanRestfulApiPayload extends BaseAppRenchanRestfulApiPayload {
  /**
   * get: method.
   *
   * @override
   * @returns {RestfulApiType.METHOD} HTTP method.
   */
  static get method () {
    return RESTFUL_API_METHOD.POST
  }

  /** @override */
  static get pathname () {
    return '/beta-external-callback/success'
  }

  /**
   * Generate request parameter hash.
   *
   * @override
   * @param {{
   *   valueHash: Record<string, *>
   * }} params - Parameters of this method.
   * @returns {RestfulApiType.RequestValueHash<>} Request parameter hash.
   */
  static generateRequestParameterHash ({
    valueHash,
  }) {
    return {
      body: valueHash,
    }
  }
}
