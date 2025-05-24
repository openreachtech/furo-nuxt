import BaseFuroContext from '../BaseFuroContext.js'

/**
 * Furo Off Canvas Menu Layout Context
 *
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class FuroOffCanvasMenuLayoutContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {FuroOffCanvasMenuLayoutContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,

    rootElementRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route

    this.rootElementRef = rootElementRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof FuroOffCanvasMenuLayoutContext ? X : never} T, X
   * @override
   * @param {FuroOffCanvasMenuLayoutContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - New instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    route,

    rootElementRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        route,

        rootElementRef,
      })
    )
  }

  /**
   * Setup component.
   *
   * @template {X extends FuroOffCanvasMenuLayoutContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent (args = {}) {
    this.watch(
      () => this.route.fullPath,
      fullPath => {
        this.closeNavigation()
      }
    )

    return this
  }

  /**
   * get: rootElement
   *
   * @returns {HTMLElement | null}
   */
  get rootElement () {
    return this.rootElementRef.value
  }

  /**
   * Is clicked on <main> backdrop.
   * NOTE: must be called on <main> by capturing phase.
   *
   * @param {{
   *   pointerEvent: MouseEvent
   * }} params - Parameters of this method.
   * @returns {boolean} false always.
   */
  clickInMainBackdrop ({
    pointerEvent,
  }) {
    this.closeNavigation()

    return false
  }

  /**
   * Close navigation.
   *
   * @returns {void}
   */
  closeNavigation () {
    this.rootElement
      ?.['classList']
      .remove('open-nav')
  }

  /**
   * Toggle navigation.
   *
   * @returns {void}
   */
  clickToggleNavigation () {
    this.rootElement
      ?.['classList']
      .toggle('open-nav')
  }

  /**
   * Is showed navigation.
   *
   * @returns {boolean} true: showed navigation.
   */
  isShowedNavigation () {
    return this.rootElement
      ?.['classList']
      .contains('open-nav')
      ?? false
  }

  /**
   * Click in <nav>
   *
   * @param {{
   *   event: MouseEvent
   * }} params - Parameters of this method.
   * @returns {void}
   */
  clickInNav ({
    event: pointerEvent,
  }) {
    const isClickedOnBackdrop = this.isClickedOnNavigationBackdrop({
      event: pointerEvent,
    })

    if (!isClickedOnBackdrop) {
      return
    }

    this.closeNavigation()
  }

  /**
   * Is clicked on <nav> backdrop.
   *
   * @param {{
   *   event: MouseEvent
   * }} params - Parameters of this method.
   * @returns {boolean} true: clicked on backdrop.
   */
  isClickedOnNavigationBackdrop ({
    event: {
      clientX,
    },
  }) {
    if (!this.isShowedNavigation()) {
      return false
    }

    const rect = this.extractNavRect()

    if (!rect) {
      return false
    }

    return clientX > rect.right
  }

  /**
   * Extract <nav> rect.
   *
   * @returns {DOMRect | null}
   */
  extractNavRect () {
    const navElements = this.rootElement
      ?.getElementsByTagName('nav')

    if (!navElements) {
      return null
    }

    return navElements.item(0)
      ?.getBoundingClientRect()
      ?? null
  }
}

/**
 * @typedef {import('../BaseFuroContext').BaseFuroContextParams<> & {
 *   rootElementRef: import('vue').Ref<HTMLElement | null>
 *   route: import('vue-router').RouteLocationNormalized
 * }} FuroOffCanvasMenuLayoutContextParams
 */

/**
 * @typedef {FuroOffCanvasMenuLayoutContextParams} FuroOffCanvasMenuLayoutContextFactoryParams
 */
