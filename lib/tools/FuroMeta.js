/**
 * Furo meta.
 */
export default class FuroMeta {
  /**
   * Constructor.
   *
   * @param {{
   *   furo: {
   *     pageTitle?: string
   *     skipFilter?: boolean
   *   }
   * }} params - Parameters.
   */
  constructor ({
    furo,
  }) {
    this.furo = furo
  }

  /**
   * Factory method.
   *
   * @param {{
   *   routeTo: Parameters<import('#app').RouteMiddleware>[0]
   * }} params - Parameters.
   * @returns {FuroMeta}
   */
  static create ({
    routeTo,
  }) {
    const furo = this.extractFuroMetaFromRoute({
      routeTo,
    })

    return new this({
      furo,
    })
  }

  /**
   * Extract meta from route.
   *
   * @param {{
   *   routeTo: Parameters<import('#app').RouteMiddleware>[0]
   * }} params - Parameters.
   * @returns {{
   *   pageTitle?: string
   *   skipFilter?: boolean
   * }}
   */
  static extractFuroMetaFromRoute ({
    routeTo,
  }) {
    return routeTo.meta.$furo
      ?? {}
  }

  /**
   * get: Page title.
   *
   * @returns {string | null} Page title.
   */
  get pageTitle () {
    return this.furo.pageTitle
      ?? null
  }

  /**
   * get: Skip filter.
   *
   * @returns {boolean} true: if skip filter.
   */
  get skipFilter () {
    return this.furo.skipFilter
      ?? false
  }
}
