import BaseRestfulApiSubmitter from '~/lib/submitters/BaseRestfulApiSubmitter.js'

import BetaExternalCallbackSuccessFormClerk from './BetaExternalCallbackSuccessFormClerk.js'
import BetaExternalCallbackSuccessPostRenchanRestfulApiLauncher from '~/app/restfulapi/renchan/post/betaExternalCallbackSuccess/BetaExternalCallbackSuccessPostRenchanRestfulApiLauncher.js'

/**
 * Beta External Callback Success Submitter.
 *
 * @extends {BaseRestfulApiSubmitter<BetaExternalCallbackSuccessFormValueHashType>}
 */
export default class BetaExternalCallbackSuccessSubmitter extends BaseRestfulApiSubmitter {
  /** @override */
  static get FormClerkCtor () {
    return /** @type {*} */ (BetaExternalCallbackSuccessFormClerk)
  }

  /** @override */
  static get RestfulApiLauncherCtor () {
    return /** @type {*} */ (BetaExternalCallbackSuccessPostRenchanRestfulApiLauncher)
  }
}

/**
 * @typedef {{
 *   FormClerk: typeof import('~/lib/clerks/BaseFormClerk.js').default
 *   restfulApiClient: import('~/lib/clients/RestfulApiClient.js').default
 * }} BetaExternalCallbackSuccessSubmitterParams
 */

/**
 * @typedef {BetaExternalCallbackSuccessSubmitterParams} BetaExternalCallbackSuccessSubmitterFactoryParams
 */

/**
 * @typedef {{
 *   first: string
 *   second: string
 * }} BetaExternalCallbackSuccessFormValueHashType
 */
