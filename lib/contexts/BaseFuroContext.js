import {
  watch,
} from 'vue'

/**
 * Furo Component Context.
 *
 * @template {typeof import('./BaseFuroContextAccessor').default<*> | null} [A = null] - ContextAccessor class.
 * @template {import('vue').ComponentCustomProps} [P = {}] - Props.
 * @template {string | null} [EE = null] - emit() event names.
 */
export default class BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {BaseFuroContextParams<P>} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
  }) {
    this.props = props
    this.componentContext = componentContext

    this.accessor = this.createContextAccessor()
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof BaseFuroContext ? X : never} T, X
   * @param {BaseFuroContextFactoryParams<{}>} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - New instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
      })
    )
  }

  /**
   * get: ContextAccessor for this class.
   *
   * @returns {typeof import('./BaseFuroContextAccessor').default<*> | null} - ContextAccessor class of this class.
   */
  static get ContextAccessor () {
    return null
  }

  /**
   * emit() event name.
   *
   * @abstract
   * @returns {Record<string, string>}
   */
  static get EMIT_EVENT_NAME () {
    return {}
  }

  /**
   * Create MutationObserver.
   *
   * @param {{
   *   handler: MutationCallback
   * }} args - Arguments of this method.
   * @returns {MutationObserver} - New instance of MutationObserver.
   */
  static createMutationObserver ({
    handler,
  }) {
    return new MutationObserver(handler)
  }

  /**
   * Get the constructor of this class.
   *
   * @template {X extends typeof BaseFuroContext ? X : never} T, X
   * @returns {T} - Constructor of this
   * @this {InstanceType<T>}
   */
  get Ctor () {
    return /** @type {T} */ (this.constructor)
  }

  /**
   * get: ContextAccessor for this class.
   *
   * @returns {import('./BaseFuroContextAccessor').default<*> | null} - ContextAccessor class of this class.
   */
  createContextAccessor () {
    if (!this.Ctor.ContextAccessor) {
      return null
    }

    return this.Ctor.ContextAccessor
      .create({
        context: this,
      })
  }

  /**
   * get: An instance of ContextAccessor.
   *
   * @returns {InstanceType<A>} - An instance of ContextAccessor.
   */
  get $ () {
    return /** @type {*} */ (this.accessor)
  }

  /**
   * get: emit() event name.
   *
   * @returns {Record<string, EE>} - emit() event name.
   */
  get EMIT_EVENT_NAME () {
    return /** @type {*} */ (this.Ctor.EMIT_EVENT_NAME)
  }

  /**
   * get: attrs of component context.
   *
   * @returns {import('vue').SetupContext['attrs']} - Attributes of component context.
   */
  get attrs () {
    return this.componentContext.attrs
  }

  /**
   * get: slots of component context.
   *
   * @returns {(
   *   event: EE,
   *   ...args: Array<any>
   * ) => void} - emit() function of component context.
   */
  get emit () {
    return /** @type {*} */ (this.componentContext.emit)
  }

  /**
   * get: expose() of component context.
   *
   * @returns {import('vue').SetupContext['expose']} - Listeners of component context.
   */
  get expose () {
    return this.componentContext.expose
  }

  /**
   * get: slots of component context.
   *
   * @returns {import('vue').SetupContext['slots']} - Slots of component context.
   */
  get slots () {
    return this.componentContext.slots
  }

  /**
   * get: watch() of component context.
   *
   * @returns {import('vue').watch} - Watch of component context.
   */
  get watch () {
    return watch
  }

  /**
   * Setup component context.
   *
   * @template T
   * @param {object} [args] - Arguments of this method.
   * @returns {T} - For method chaining.
   * @this {T}
   * @example
   * ```
   * setupComponent (args) {
   *   this..expose(
   *     this.generateExposeHash()
   *   )
   *
   *   watch(
   *     [
   *       this.rootElementRef,
   *     ],
   *     this.generateWatchRootElementHandler()
   *   )
   *
   *   return this
   * }
   * ```
   */
  setupComponent (args = {}) {
    return this
  }

  /**
   * Generate expose() hash.
   *
   * @returns {Record<string, Function>} - expose() hash.
   */
  generateExposeHash () {
    return {}
  }
}

/**
 * @typedef {{
 *   props: P
 *   componentContext: import('vue').SetupContext
 * }} BaseFuroContextParams
 * @template {import('vue').ComponentCustomProps | {}} [P = {}] - Props.
 */

/**
 * @typedef {BaseFuroContextParams<P>} BaseFuroContextFactoryParams
 * @template {import('vue').ComponentCustomProps | {}} [P = {}] - Props.
 */
