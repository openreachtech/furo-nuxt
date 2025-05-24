/**
 * Furo share.
 */
export default class FuroShare {
  /**
   * Constructor.
   *
   * @param {FuroShareParams} params - Parameters.
   */
  constructor ({
    graphqlShare,
  }) {
    this.graphqlShare = graphqlShare
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof FuroShare ? X : never} T, X
   * @param {FuroShareFactoryParams} params - Parameters.
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create ({
    graphqlShare,
  }) {
    return /** @type {*} */ (
      new this({
        graphqlShare,
      })
    )
  }

  /**
   * get: GraphQL configuration.
   *
   * @returns {furo.GraphqlConfig}
   */
  get graphqlConfig () {
    return this.graphqlShare.config
  }

  /**
   * get: WebSocket connector.
   *
   * @returns {furo.Connector}
   */
  get websocketConnector () {
    return this.graphqlShare.websocketConnector
  }
}

/**
 * @typedef {{
 *   graphqlShare: furo.GraphqlShare
 * }} FuroShareParams
 */

/**
 * @typedef {FuroShareParams} FuroShareFactoryParams
 */
