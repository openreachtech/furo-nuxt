import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

/**
 * RESTful API sample page context.
 *
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class RestfulApiSamplePageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {RestfulApiSamplePageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    fetcher,
  }) {
    super({
      props,
      componentContext,
    })

    this.fetcher = fetcher
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof RestfulApiSamplePageContext ? X : never} T, X
   * @override
   * @param {RestfulApiSamplePageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    fetcher,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        fetcher,
      })
    )
  }

  /**
   * get: alphaExternalCallbackSuccessCapsule.
   *
   * @returns {import('../../../app/restfulapi/renchan/get/alphaExternalCallbackSuccess/AlphaExternalCallbackSuccessGetRenchanRestfulApiCapsule.js').default} - The capsule for AlphaExternalCallbackSuccess.
   */
  get alphaExternalCallbackSuccessCapsule () {
    return /** @type {*} */ (
      this.fetcher.alphaExternalCallbackSuccessCapsule
    )
  }

  /**
   * get: pathParameterHashCapsule.
   *
   * @returns {import('../../../app/restfulapi/renchan/get/pathParameterHash/PathParameterHashGetRenchanRestfulApiCapsule.js').default} - The capsule for pathParameterHash.
   */
  get pathParameterHashCapsule () {
    return /** @type {*} */ (
      this.fetcher.pathParameterHashCapsule
    )
  }

  /**
   * Fetches the AlphaExternalCallbackSuccess data.
   *
   * @param {{
   *   query: {
   *     alpha: string
   *     beta?: string
   *   }
   * }} params - Parameters for the fetch operation.
   * @returns {Promise<void>} - A promise that resolves when the fetch is complete.
   */
  async fetchAlphaExternalCallbackSuccess ({
    query,
  }) {
    await this.fetcher.fetchAlphaExternalCallbackSuccessOnEvent({
      query,
    })
  }

  /**
   * Fetch pathParameterHash RESTful API content.
   *
   * @param {{
   *   pathParameterHash: {
   *     id: number
   *     name: string
   *   }
   * }} params - Parameters for the fetch operation.
   * @returns {Promise<void>} - A promise that resolves when the fetch is complete.
   */
  async fetchPathParameterHash ({
    pathParameterHash,
  }) {
    await this.fetcher.fetchPathParameterHashOnEvent({
      pathParameterHash,
    })
  }

  /**
   * get: isLoading.
   *
   * @returns {boolean} - Returns true if the fetcher is currently loading data, false otherwise.
   */
  get isLoading () {
    return this.fetcher.isLoading
  }
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   fetcher: import('./RestfulApiSampleFetcher.js').default
 * }} RestfulApiSamplePageContextParams
 */

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   fetcher: import('./RestfulApiSampleFetcher.js').default
 * }} RestfulApiSamplePageContextFactoryParams
 */
