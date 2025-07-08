import {
  RESTFUL_API_METHOD,
} from '@openreachtech/furo'

import BaseAppRenchanRestfulApiPayload from '../../BaseAppRenchanRestfulApiPayload.js'

/**
 * Alpha external callback success GET Renchan RESTful API payload.
 *
 * @extends {BaseAppRenchanRestfulApiPayload<AlphaExternalCallbackSuccessGetRenchanRestfulApiQueryParams, *, *>}
 */
export default class AlphaExternalCallbackSuccessGetRenchanRestfulApiPayload extends BaseAppRenchanRestfulApiPayload {
  /**
   * get: method.
   *
   * @override
   * @returns {RestfulApiType.METHOD} HTTP method.
   */
  static get method () {
    return RESTFUL_API_METHOD.GET
  }

  /** @override */
  static get pathname () {
    return '/alpha-external-callback/success'
  }
}

/**
 * @typedef {{
 *   first: *
 *   second: *
 * }} AlphaExternalCallbackSuccessGetRenchanRestfulApiQueryParams
 */
