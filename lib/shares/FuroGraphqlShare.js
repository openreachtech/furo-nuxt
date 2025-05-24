/**
 * Furo share for GraphQL
 */
export default class FuroGraphqlShare {
  /**
   * Constructor.
   *
   * @param {FuroGraphqlShareParams} params - Parameters.
   */
  constructor ({
    config,
    websocketConnector,
  }) {
    this.config = config
    this.websocketConnector = websocketConnector
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof FuroGraphqlShare ? X : never} T, X
   * @param {FuroGraphqlShareFactoryParams} params - Parameters.
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create ({
    config,
    websocketConnector,
  }) {
    return /** @type {*} */ (
      new this({
        config,
        websocketConnector,
      })
    )
  }
}

/**
 * @typedef {{
 *   config: furo.GraphqlConfig
 *   websocketConnector: furo.Connector
 * }} FuroGraphqlShareParams
 */

/**
 * @typedef {FuroGraphqlShareParams} FuroGraphqlShareFactoryParams
 */
