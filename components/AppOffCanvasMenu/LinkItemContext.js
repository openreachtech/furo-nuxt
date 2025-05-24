/**
 * Link item context.
 */
export default class LinkItemContext {
  /**
   * Constructor.
   *
   * @param {LinkItemContextParams} params - Parameters of this constructor.
   */
  constructor ({
    text,
    href,
    iconUrl,
  }) {
    this.text = text
    this.href = href
    this.iconUrl = iconUrl
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof LinkItemContext ? X : never} T, X
   * @param {LinkItemContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - New instance of this class.
   * @this {T}
   */
  static create ({
    text,
    href,
    iconUrl = null,
  }) {
    return /** @type {*} */ (
      new this({
        text,
        href,
        iconUrl,
      })
    )
  }
}

/**
 * @typedef {{
 *   text: string
 *   href: string
 *   iconUrl: string | null
 * }} LinkItemContextParams
 */

/**
 * @typedef {{
 *   text: string
 *   href: string
 *   iconUrl?: string | null
 * }} LinkItemContextFactoryParams
 */
