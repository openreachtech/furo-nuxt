import {
  BaseRenchanRestfulApiPayload,
} from '@openreachtech/furo'

import {
  HEADER_KEY,
  STORAGE_KEY,
} from '../../constants.js'

/**
 * Base app for Renchan RESTful API payloads.
 *
 * @template {Record<string, *>} [QP = {}] - Query parameters.
 * @template {Record<string, *>} [BP = {}] - Body parameters.
 * @template {Record<string, *>} [PP = {}] - Path parameters.
 * @abstract
 * @extends {BaseRenchanRestfulApiPayload<QP, BP, PP>}
 */
export default class BaseAppRenchanRestfulApiPayload extends BaseRenchanRestfulApiPayload {
  /** @override */
  static get ACCESS_TOKEN_HEADER_KEY () {
    return HEADER_KEY.ACCESS_TOKEN
  }

  /** @override */
  static get ACCESS_TOKEN_STORAGE_KEY () {
    return STORAGE_KEY.ACCESS_TOKEN
  }

  /** @override */
  static get prefixPathname () {
    return '/v1'
  }
}
