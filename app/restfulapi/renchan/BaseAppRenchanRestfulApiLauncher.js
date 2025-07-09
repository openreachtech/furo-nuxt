import {
  BaseRenchanRestfulApiLauncher,
} from '@openreachtech/furo'

import renchanRestfulApiConfig from './restfulapi.config.js'

/**
 * Base app for Renchan RESTful API launchers.
 *
 * @extends {BaseRenchanRestfulApiLauncher}
 */
export default class BaseAppRenchanRestfulApiLauncher extends BaseRenchanRestfulApiLauncher {
  /** @override */
  static get restfulApiConfig () {
    return /** @type {*} */ (renchanRestfulApiConfig)
  }
}
