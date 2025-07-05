import {
  BaseRenchanRestfulApiLauncher,
} from '@openreachtech/furo'

import renchanRestfulApiConfig from './renchan-restfulapi.config.js'

/**
 * Base app for Renchan RESTful API launchers.
 *
 * @extends {BaseRenchanRestfulApiLauncher}
 */
export default class BaseAppRenchanRestfulApiLauncher extends BaseRenchanRestfulApiLauncher {
  /** @override */
  static get restfulApiConfig () {
    console.log('renchanRestfulApiConfig', renchanRestfulApiConfig)

    return /** @type {*} */ (renchanRestfulApiConfig)
  }
}
