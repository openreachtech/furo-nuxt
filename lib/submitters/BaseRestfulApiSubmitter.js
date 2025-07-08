import RestfulApiClient from '../clients/RestfulApiClient.js'

/**
 * RESTful API submitter.
 *
 * @template {Record<string, any>} [FV = Record<string, any>]
 */
export default class BaseRestfulApiSubmitter {
  /**
   * Constructor.
   *
   * @param {BaseRestfulApiSubmitterParams<FV>} params - Parameters of this constructor.
   */
  constructor ({
    formClerk,
    restfulApiClient,
  }) {
    this.formClerk = formClerk
    this.restfulApiClient = restfulApiClient
  }

  /**
   * Factory method for this class.
   *
   * @template {X extends typeof BaseRestfulApiSubmitter<FV> ? X : never} T, X
   * @template {Record<string, any>} [FV = Record<string, any>]
   * @param {BaseRestfulApiSubmitterFactoryParams<FV>} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    formClerk = this.createFormClerk(),
    restfulApiClient = this.createRestfulApiClient(),
  } = {}) {
    return /** @type {InstanceType<T>} */ (
      new this({
        formClerk,
        restfulApiClient,
      })
    )
  }

  /**
   * Create an instance of FormClerk.
   *
   * @returns {import('~/lib/clerks/BaseFormClerk.js').default<*>} - An instance of FormClerk.
   */
  static createFormClerk () {
    return this.FormClerkCtor.create()
  }

  /**
   * Create an instance of RestfulApiClient.
   *
   * @returns {import('~/lib/clients/RestfulApiClient.js').default} - An instance of RestfulApiClient.
   */
  static createRestfulApiClient () {
    return RestfulApiClient.create(this.RestfulApiLauncherCtor)
  }

  /**
   * get: FormClerk constructor.
   *
   * @template {X extends typeof import('~/lib/clerks/BaseFormClerk').default<*> ? X : never} T, X
   * @abstract
   * @returns {T} - An instance of RestfulApiClient.
   * @throws {Error} - this function must be inherited
   */
  static get FormClerkCtor () {
    throw new Error('.get:FormClerkCtor must be inherited')
  }

  /**
   * get: RestfulApiClient constructor.
   *
   * @template {X extends RestfulApiType.LauncherCtor ? X : never} T, X
   * @abstract
   * @returns {T} - An instance of RestfulApiClient.
   * @throws {Error} - this function must be inherited
   */
  static get RestfulApiLauncherCtor () {
    throw new Error('.get:RestfulApiLauncherCtor must be inherited')
  }

  /**
   * get: <form> element shallow reference.
   *
   * @returns {import('vue').ShallowRef<HTMLFormElement | null>} - The form element shallow reference.
   */
  get formElementShallowRef () {
    return this.formClerk.formElementShallowRef
  }

  /**
   * Submit <form> value hash to the RESTful API.
   *
   * @param {{
   *   extraValueHash?: Record<string, any>
   *   hooks?: RestfulApiType.LauncherHooks
   *   options?: RequestInit
   *   submitEvent?: SubmitEvent
   * }} params - Parameters for submitting the form.
   * @returns {Promise<boolean>} - Returns true if the form was submitted successfully, false otherwise.
   */
  async submitForm ({
    extraValueHash = {},
    hooks,
    options,
    submitEvent,
  }) {
    const formValueHash = this.formClerk.extractValueHash()

    const isValid = this.formClerk.validateFormValueHash({
      valueHash: formValueHash,
    })

    // Skip #launchRequest(), if invalid value hash of <form>.
    if (!isValid) {
      return false
    }

    await this.restfulApiClient.invokeRequestWithFormValueHash({
      valueHash: formValueHash,
      extraValueHash,
      hooks,
      options,
    })

    return true
  }
}

/**
 * @typedef {{
 *   formClerk: import('~/lib/clerks/BaseFormClerk.js').default<FV>
 *   restfulApiClient: import('~/lib/clients/RestfulApiClient.js').default
 * }} BaseRestfulApiSubmitterParams
 * @template {Record<string, any>} [FV = Record<string, any>]
 */

/**
 * @typedef {Partial<BaseRestfulApiSubmitterParams<FV>>} BaseRestfulApiSubmitterFactoryParams
 * @template {Record<string, any>} [FV = Record<string, any>]
 */
