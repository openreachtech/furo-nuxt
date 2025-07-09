import {
  reactive,
} from 'vue'

import RestfulApiClient from '~/lib/clients/RestfulApiClient.js'

import AlphaExternalCallbackSuccessGetRenchanRestfulApiLauncher from '~/app/restfulapi/renchan/get/alphaExternalCallbackSuccess/AlphaExternalCallbackSuccessGetRenchanRestfulApiLauncher.js'
import PathParameterHashGetRenchanRestfulApiLauncher from '~/app/restfulapi/renchan/get/pathParameterHash/PathParameterHashGetRenchanRestfulApiLauncher.js'

/**
 * RESTful API client sample page fetcher.
 */
export default class RestfulApiSampleFetcher {
  /**
   * Constructor.
   *
   * @param {RestfulApiSampleFetcherParams} params - Parameters of this constructor.
   */
  constructor ({
    statusReactive,
    restfulApiClientHash,
  }) {
    this.statusReactive = statusReactive
    this.restfulApiClientHash = restfulApiClientHash
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof RestfulApiSampleFetcher ? X : never} T, X
   * @param {RestfulApiSampleFetcherFactoryParams} [params] - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    statusReactive = this.createStatusReactive(),
    restfulApiClientHash = this.buildRestfulApiClientHash(),
  } = {}) {
    return /** @type {InstanceType<T>} */ (
      new this({
        statusReactive,
        restfulApiClientHash,
      })
    )
  }

  /**
   * Create a reactive status object.
   *
   * @returns {import('vue').Reactive<Record<string, boolean>>} - Reactive status object.
   */
  static createStatusReactive () {
    return reactive({
      isLoading: false,
    })
  }

  /**
   * Build a hash of RESTful API clients.
   *
   * @returns {Record<string, RestfulApiClient>} - Hash of RESTful API clients.
   */
  static buildRestfulApiClientHash () {
    const alphaExternalCallbackSuccessClient = RestfulApiClient.create(AlphaExternalCallbackSuccessGetRenchanRestfulApiLauncher)
    const pathParameterHashClient = RestfulApiClient.create(PathParameterHashGetRenchanRestfulApiLauncher)

    return {
      alphaExternalCallbackSuccess: alphaExternalCallbackSuccessClient,
      pathParameterHash: pathParameterHashClient,
    }
  }

  /**
   * get: Request hooks for RESTful API clients.
   *
   * @returns {RestfulApiType.LauncherHooks<>} - Request hooks for RESTful API clients.
   */
  get requestHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoading = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoading = false
      },
    }
  }

  /**
   * get: alphaExternalCallbackSuccess RESTful API client.
   *
   * @returns {RestfulApiClient<AlphaExternalCallbackSuccessGetRenchanRestfulApiLauncher.Capsule>} - Alpha external callback success RESTful API client.
   */
  get alphaExternalCallbackSuccessRestfulApiClient () {
    return /** @type {*} */ (this.restfulApiClientHash.alphaExternalCallbackSuccess)
  }

  /**
   * get: pathParameterHash RESTful API client.
   *
   * @returns {RestfulApiClient<PathParameterHashGetRenchanRestfulApiLauncher.Capsule>} - Path parameter hash RESTful API client.
   */
  get pathParameterHashRestfulApiClient () {
    return /** @type {*} */ (this.restfulApiClientHash.pathParameterHash)
  }

  /**
   * get: capsuleRef of alphaExternalCallbackSuccess RESTful API client.
   *
   * @returns {AlphaExternalCallbackSuccessGetRenchanRestfulApiLauncher.Capsule} - Capsule reference.
   */
  get alphaExternalCallbackSuccessCapsule () {
    return /** @type {*} */ (
      this.alphaExternalCallbackSuccessRestfulApiClient.capsuleRef
        .value
    )
  }

  /**
   * get: capsuleRef of pathParameterHash RESTful API client.
   *
   * @returns {PathParameterHashGetRenchanRestfulApiLauncher.Capsule} - Capsule reference.
   */
  get pathParameterHashCapsule () {
    return /** @type {*} */ (
      this.pathParameterHashRestfulApiClient.capsuleRef
        .value
    )
  }

  /**
   * Invoke alphaExternalCallbackSuccess RESTful API client.
   *
   * @param {{
   *   query: {
   *     alpha: string
   *     beta?: string
   *   }
   *   hooks?: RestfulApiType.LauncherHooks<*>
   * }} params - Parameters of this method.
   * @returns {Promise<void>} - Promise that resolves when the request is completed.
   */
  async fetchAlphaExternalCallbackSuccessOnEvent ({
    query: {
      alpha,
      beta,
    },
    hooks = this.requestHooks,
  }) {
    await this.alphaExternalCallbackSuccessRestfulApiClient
      .invokeRequestOnEvent({
        query: {
          alpha,
          beta,
        },
        hooks,
      })
  }

  /**
   * Invoke betaExternalCallbackSuccess RESTful API client.
   *
   * @param {{
   *   pathParameterHash: {
   *     id: number
   *     name: string
   *   }
   *   hooks?: RestfulApiType.LauncherHooks<*>
   * }} params - Parameters of this method.
   * @returns {Promise<void>} - Promise that resolves when the request is completed.
   */
  async fetchPathParameterHashOnEvent ({
    pathParameterHash: {
      id,
      name,
    },
    hooks = this.requestHooks,
  }) {
    await this.pathParameterHashRestfulApiClient
      .invokeRequestOnEvent({
        pathParameterHash: {
          id,
          name,
        },
        hooks,
      })
  }

  /**
   * get: isLoading.
   *
   * @returns {boolean} - Loading status.
   */
  get isLoading () {
    return this.statusReactive.isLoading
  }
}

/**
 * @typedef {{
 *   statusReactive: import('vue').Reactive<Record<string, boolean>>
 *   restfulApiClientHash: Record<string, RestfulApiClient>
 * }} RestfulApiSampleFetcherParams
 */

/**
 * @typedef {Partial<RestfulApiSampleFetcherParams>} RestfulApiSampleFetcherFactoryParams
 */
