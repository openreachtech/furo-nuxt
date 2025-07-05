import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

import RestfulApiClient from '~/lib/clients/RestfulApiClient.js'

import BetaExternalCallbackSuccessPostRenchanRestfulApiLauncher from '~/app/restfulapi/renchan/post/betaExternalCallbackSuccess/BetaExternalCallbackSuccessPostRenchanRestfulApiLauncher.js'
import BetaExternalCallbackSuccessFormElementClerk from './BetaExternalCallbackSuccessFormElementClerk.js'
import FormClerk from '~/lib/clerks/FormClerk.js'

/**
 * RestfulApiPageSubmitterContext.
 *
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class RestfulApiPageSubmitterContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {RestfulApiPageSubmitterContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
  }) {
    super({
      props,
      componentContext,
    })
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof RestfulApiPageSubmitterContext ? X : never} T, X
   * @override
   * @param {RestfulApiPageSubmitterContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
      })
    )
  }

  /**
   * Setup component.
   *
   * @template {X extends RestfulApiPageSubmitterContext ? X : never} T, X
   * @override
   * @this {T}
   * @returns {T} - This instance.
   */
  setupComponent () {
    return /** @type {T} */ (
      super.setupComponent()
    )
  }

  /**
   * Submit form.
   *
   * @param {{
   *   submitEvent: SubmitEvent
   * }} input - Parameters of this method.
   * @returns {Promise<boolean>} - Form clerk type.
   */
  async submitForm ({
    submitEvent,
  }) {
    console.log('🚀🚀🚀🚀🚀 I am here', submitEvent.target)

    return false
  }
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 * }} RestfulApiPageSubmitterContextParams
 */

/**
 * @typedef {RestfulApiPageSubmitterContextParams} RestfulApiPageSubmitterContextFactoryParams
 */
