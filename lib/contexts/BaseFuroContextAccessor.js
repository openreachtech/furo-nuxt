/**
 * Base class for all context accessors.
 *
 * @template {import('./BaseFuroContext').default<*>} C
 * @property {C} context - Context.
 */
export default class BaseFuroContextAccessor {
  /**
   * Constructor.
   *
   * @param {BaseFuroContextAccessorParams<C>} params - Parameters of this constructor.
   */
  constructor ({
    context,
  }) {
    this.context = context
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof BaseFuroContextAccessor<*> ? X : never} T, X
   * @param {BaseFuroContextAccessorFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - New instance of this class.
   * @this {T}
   */
  static create ({
    context,
  }) {
    return /** @type {*} */ (
      new this({
        context,
      })
    )
  }
}

/**
 * @typedef {{
 *   context: C
 * }} BaseFuroContextAccessorParams
 * @template {import('./BaseFuroContext').default<*>} C
 */

/**
 * @typedef {BaseFuroContextAccessorParams<*>} BaseFuroContextAccessorFactoryParams
 */
