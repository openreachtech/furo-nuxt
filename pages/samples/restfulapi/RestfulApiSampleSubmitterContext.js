import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

import BaseFormClerk from '~/lib/clerks/BaseFormClerk.js'

import BetaExternalCallbackSuccessSubmitter from './BetaExternalCallbackSuccessSubmitter.js'

/**
 * RESTful API sample page context.
 *
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class RestfulApiSampleSubmitterContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {RestfulApiSampleSubmitterContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    submitterHash,
    fetcher,
  }) {
    super({
      props,
      componentContext,
    })

    this.submitterHash = submitterHash
    this.fetcher = fetcher
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof RestfulApiSampleSubmitterContext ? X : never} T, X
   * @override
   * @param {RestfulApiSampleSubmitterContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    submitterHash = this.createSubmitterHash(),
    fetcher,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        submitterHash,
        fetcher,
      })
    )
  }

  /**
   * Create a hash of submitter hash.
   *
   * @returns {Record<string, import('~/lib/submitters/BaseRestfulApiSubmitter.js').default<*>>} - A hash of submitters.
   */
  static createSubmitterHash () {
    return {
      betaExternalCallbackSuccess: BetaExternalCallbackSuccessSubmitter.create(),
    }
  }

  /**
   * Create an instance of FormClerk.
   *
   * @returns {BaseFormClerk} - An instance of FormClerk.
   */
  static createFormClerk () {
    return BaseFormClerk.create()
  }

  /**
   * Setup component.
   *
   * @template {X extends RestfulApiSampleSubmitterContext ? X : never} T, X
   * @override
   * @returns {T} - This instance.
   * @this {T}
   */
  setupComponent () {
    return /** @type {T} */ (
      super.setupComponent()
    )
  }

  /**
   * get: <form> element shallow reference.
   *
   * @returns {ReturnType<BaseFormClerk['formElementShallowRef']>} - The form element shallow reference.
   */
  get betaExternalCallbackSuccessFormElementShallowRef () {
    return this.submitterHash.betaExternalCallbackSuccess
      .formElementShallowRef
  }

  /**
   * get: the capsule reference.
   *
   * @returns {import('~/app/restfulapi/renchan/post/betaExternalCallbackSuccess/BetaExternalCallbackSuccessPostRenchanRestfulApiCapsule.js').default} - The capsule reference.
   */
  get betaExternalCallbackSuccessCapsule () {
    return /** @type {*} */ (
      this.submitterHash.betaExternalCallbackSuccess
        .capsuleRef
        .value
    )
  }

  /**
   * Submit form.
   *
   * @param {{
   *   submitEvent: SubmitEvent
   * }} input - Parameters of this method.
   * @returns {Promise<void>} - Form clerk type.
   */
  async submitForm ({
    submitEvent,
  }) {
    await this.submitterHash.betaExternalCallbackSuccess
      .submitForm({
        submitEvent,
        hooks: this.requestHooks,
      })
  }

  /**
   * get: Request hooks for RESTful API clients.
   *
   * @returns {RestfulApiType.LauncherHooks<>} - Request hooks for RESTful API clients.
   */
  get requestHooks () {
    return {
      beforeRequest: async payload => {
        this.fetcher.statusReactive.isLoading = true

        return false
      },
      afterRequest: async capsule => {
        this.fetcher.statusReactive.isLoading = false
      },
    }
  }

  /**
   * get: Validation reference for the form.
   *
   * @returns {import('vue').Ref<furo.ValidatorHashType>} - Validation reference for the form.
   */
  get betaExternalCallbackSuccessValidationRef () {
    return /** @type {*} */ (
      this.submitterHash.betaExternalCallbackSuccess
        .validationRef
    )
  }

  /**
   * get: Validation valid hash.
   *
   * @returns {Record<string, boolean>} - Validation rules for the form.
   */
  get betaExternalCallbackSuccessValidationValidHash () {
    return /** @type {*} */ (
      this.betaExternalCallbackSuccessValidationRef.value
        .invalid
    )
  }

  /**
   * get: Validation invalid hash.
   *
   * @returns {Record<string, boolean>} - Validation rules for the form.
   */
  get betaExternalCallbackSuccessValidationInvalidHash () {
    return /** @type {*} */ (
      this.betaExternalCallbackSuccessValidationRef.value
        .invalid
    )
  }
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   submitterHash: Record<string, import('~/lib/submitters/BaseRestfulApiSubmitter.js').default<*>>
 *   fetcher: import('./RestfulApiSampleFetcher.js').default
 * }} RestfulApiSampleSubmitterContextParams
 */

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   submitterHash?: Record<string, import('~/lib/submitters/BaseRestfulApiSubmitter.js').default<*>>
 *   fetcher: import('./RestfulApiSampleFetcher.js').default
 * }} RestfulApiSampleSubmitterContextFactoryParams
 */
