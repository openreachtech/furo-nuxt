import {
  onMounted,
  ref,
} from 'vue'

/**
 * RESTful API client.
 *
 * @template {RestfulApiType.CapsuleCtor<*>} [C = RestfulApiType.CapsuleCtor<*>] - RESTful API capsule type.
 */
export default class RestfulApiClient {
  /**
   * Constructor.
   *
   * @param {RestfulApiClientParams<C>} params - Parameters of this constructor.
   */
  constructor ({
    Launcher,
    capsuleRef,
  }) {
    this.Launcher = Launcher
    this.capsuleRef = capsuleRef
  }

  /**
   * Factory method for this class.
   *
   * @template {X extends typeof RestfulApiClient<C> ? X : never} T, X
   * @template {RestfulApiType.CapsuleCtor<*>} [C = RestfulApiType.CapsuleCtor<*>] - RESTful API capsule type.
   * @param {RestfulApiClientFactoryParams<C>} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    Launcher,
  }) {
    const capsuleRef = this.generateCapsuleRef({
      Launcher,
    })

    return /** @type {InstanceType<T>} */ (
      new this({
        Launcher,
        capsuleRef,
      })
    )
  }

  /**
   * Generate capsuleRef.
   *
   * @param {{
   *   Launcher: RestfulApiType.LauncherCtor
   * }} params - Parameters of this method.
   * @returns {import('vue').Ref<RestfulApiType.Capsule<*>>} - Capsule reference.
   */
  static generateCapsuleRef ({
    Launcher,
  }) {
    return /** @type {import('vue').Ref<InstanceType<*>>} */ (
      this.ref(
        Launcher.createCapsuleAsPending()
      )
    )
  }

  /**
   * get: onMounted
   *
   * @returns {typeof onMounted} - The onMounted function from Vue.
   */
  static get onMounted () {
    return onMounted
  }

  /**
   * get: ref
   *
   * @returns {typeof ref} - The ref function from Vue.
   */
  static get ref () {
    return ref
  }

  /**
   * Get the constructor of this class.
   *
   * @returns {typeof RestfulApiClient<C>} - The constructor of this class.
   * @this {RestfulApiClient<C>}
   */
  get Ctor () {
    return /** @type {typeof RestfulApiClient<C>} */ (this.constructor)
  }

  /**
   * Invoke request.
   *
   * @param {RestfulApiRequestParams} [params] - Parameters of this method.
   * @returns {Promise<void>}
   */
  async invokeRequestOnEvent ({
    query = {},
    body = {},
    pathParameterHash = {},
    options = {},
    hooks = {},
  } = {}) {
    await this.invokeRequest({
      query,
      body,
      pathParameterHash,
      options,
      hooks,
    })
  }

  /**
   * Invoke request.
   *
   * @param {RestfulApiRequestParams} [params] - Parameters of this method.
   * @returns {void}
   */
  invokeRequestOnMounted ({
    query = {},
    body = {},
    pathParameterHash = {},
    options = {},
    hooks = {},
  } = {}) {
    this.Ctor.onMounted(async () => {
      await this.invokeRequest({
        query,
        body,
        pathParameterHash,
        options,
        hooks,
      })
    })
  }

  /**
   * Invoke request with <form> value hash.
   *
   * @param {{
   *   valueHash: furo.FormValueHashType
   *   extraValueHash?: Record<string, any>
   *   options?: RequestInit
   *   hooks?: RestfulApiType.LauncherHooks
   * }} params - Parameters of this method.
   * @returns {Promise<void>}
   */
  async invokeRequestWithFormValueHash ({
    valueHash,
    extraValueHash = {},
    options = {},
    hooks = {},
  }) {
    const payload = this.Launcher.createPayloadWithFormValueHash({
      valueHash,
      extraValueHash,
      options,
    })

    const capsule = await this.retrieveCapsule({
      payload,
      hooks,
    })

    this.capsuleRef.value = capsule
  }

  /**
   * Invoke request.
   *
   * @param {RestfulApiRequestParams} [params] - Parameters of this method.
   * @returns {Promise<void>}
   */
  async invokeRequest ({
    query = {},
    body = {},
    pathParameterHash = {},
    options = {},
    hooks = {},
  } = {}) {
    const payload = this.Launcher.createPayload({
      query,
      body,
      pathParameterHash,
      options,
    })

    const capsule = await this.retrieveCapsule({
      payload,
      hooks,
    })

    this.capsuleRef.value = capsule
  }

  /**
   * Retrieve capsule.
   *
   * @param {{
   *   payload: RestfulApiType.Payload<*>
   *   hooks?: RestfulApiType.LauncherHooks
   * }} params - Parameters of this method.
   * @returns {Promise<InstanceType<C>>}
   */
  async retrieveCapsule ({
    payload,
    hooks = {},
  }) {
    const launcher = this.Launcher.create()

    const capsule = await launcher.launchRequest({
      payload,
      hooks,
    })

    return /** @type {InstanceType<C>} */ (capsule)
  }
}

/**
 * @typedef {{
 *   Launcher: RestfulApiType.LauncherCtor
 *   capsuleRef: import('vue').Ref<InstanceType<RestfulApiType.CapsuleCtor<*>>>
 * }} RestfulApiClientParams
 * @template {RestfulApiType.CapsuleCtor<*>} [C = RestfulApiType.CapsuleCtor<*>]
 */

/**
 * @typedef {{
 *   Launcher: RestfulApiType.LauncherCtor
 *   Capsule: C
 * }} RestfulApiClientFactoryParams
 * @template {RestfulApiType.CapsuleCtor<*>} [C = RestfulApiType.CapsuleCtor<*>]
 */

/**
 * @typedef {{
 *   query?: RestfulApiType.RequestQuery
 *   body?: RestfulApiType.RequestBody
 *   pathParameterHash?: RestfulApiType.RequestPathParams
 *   options?: RequestInit
 *   hooks?: RestfulApiType.LauncherHooks
 * }} RestfulApiRequestParams
 */
