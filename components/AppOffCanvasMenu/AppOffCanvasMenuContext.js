import BaseFuroContext from '../../lib/contexts/BaseFuroContext.js'

/**
 * Context class for <AppOffCanvasMenu>
 *
 * @template {typeof import('../../lib/contexts/BaseFuroContextAccessor.js').default<*> | null} [A = null] - ContextAccessor class.
 * @template {import('vue').ComponentCustomProps} [P = {}] - Props.
 * @template {string | null} [EE = null] - emit() event names.
 * @property {import('vue').Ref<HTMLDialogElement | null>} dialogRef - Dialog element.
 * @extends {BaseFuroContext<A, P, EE>} - Base class <Accessor, Props, Emit>
 */

export default class AppOffCanvasMenuContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {AppOffCanvasMenuContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    linkHash,
  }) {
    super({
      props,
      componentContext,
    })

    this.linkHash = linkHash
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AppOffCanvasMenuContext<*, *, *> ? X : never} T, X
   * @override
   * @param {AppOffCanvasMenuContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - New instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    linkHash,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        linkHash,
      })
    )
  }

  /**
   * Setup component context.
   *
   * @template {X extends AppOffCanvasMenuContext<*, *, *> ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent (args = {}) {
    return this
  }

  /**
   * Extract link categories.
   *
   * @returns {Array<{
   *   category: string
   *   links: Array<import('./LinkItemContext.js').default>
   * }>} Link entries.
   */
  extractLinkCategories () {
    return Object.entries(this.linkHash)
      .map(([category, links]) => ({
        category,
        links,
      }))
  }
}

/**
 * @typedef {import('../../lib/contexts/BaseFuroContext.js').BaseFuroContextParams<*> & {
 *   linkHash: Record<string, Array<import('./LinkItemContext.js').default>>
 * }} AppOffCanvasMenuContextParams
 */

/**
 * @typedef {AppOffCanvasMenuContextParams} AppOffCanvasMenuContextFactoryParams
 */
