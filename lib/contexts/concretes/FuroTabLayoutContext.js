import BaseFuroContext from '../BaseFuroContext.js'

import FuroTabItemContext from './FuroTabItemContext.js'

/**
 * Props context class for FuroTabLayout component.
 *
 * @property {Array<HTMLElement>} tabElements - Tab elements.
 * @property {Array} tabContexts - Tab contexts.
 * @property {string | null} activeTabKey - Active tab key
 * @extends {BaseFuroContext<null, FuroTabLayoutContextProps, FuroTabLayoutContextEmitOptions>} - Base class <Accessor, Props, Emit>
 */
export default class FuroTabLayoutContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {FuroTabLayoutContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
    tabElementsRef,
    tabContexts,
    activeTabKey,
  }) {
    super({
      props,
      componentContext,
    })

    this.tabElementsRef = tabElementsRef
    this.tabContexts = tabContexts
    this.activeTabKey = activeTabKey
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof FuroTabLayoutContext ? X : never} T, X
   * @override
   * @param {FuroTabLayoutContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - New instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    tabElementsRef,
  }) {
    const {
      tabs,
      activeTabKey = null,
    } = props

    const tabContexts = tabs.map((it, index) =>
      this.createTabContext({
        tab: it,
        index,
      })
    )

    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        tabElementsRef,
        componentContext,
        tabContexts,
        activeTabKey,
      })
    )
  }

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      CHANGE_TAB: 'changeTab',
    }
  }

  /**
   * Create tab contexts.
   *
   * @param {{
   *   tab: FuroTabParams
   *   index: number
   * }} params - Parameters of this factory method.
   * @returns {FuroTabItemContext} - New instance of this class.
   */
  static createTabContext ({
    tab: {
      tabKey,
      slotName,
      label,
    },
    index,
  }) {
    return FuroTabItemContext.create({
      tabKey,
      slotName,
      label,
      index,
    })
  }

  /**
   * get: tabElements.
   *
   * @returns {Array<HTMLElement>} - Tab elements.
   */
  get tabElements () {
    return this.tabElementsRef.value
  }

  /**
   * Is active tab.
   *
   * @param {{
   *   tab: FuroTabItemContext
   * }} params - Parameters of this method
   * @returns {boolean} - true: if default active.
   */
  isActiveTab ({
    tab,
  }) {
    return this.activeTabKey === tab.tabKey
  }

  /**
   * On click tab.
   *
   * @param {{
   *   event: {
   *     currentTarget: HTMLElement
   *   }
   * }} params - Parameters of this method
   * @returns {void}
   */
  onClickTab ({
    event: {
      currentTarget,
    },
  }) {
    const ACTIVE_CLASS = 'active'

    const fromTabIndex = this.tabElements
      .findIndex(it =>
        it['classList'].contains(ACTIVE_CLASS)
      )
    const toTagIndex = this.tabElements
      .findIndex(it =>
        it === currentTarget
      )

    this.emit(this.EMIT_EVENT_NAME.CHANGE_TAB, {
      fromTab: this.tabContexts[fromTabIndex] ?? null,
      toTab: this.tabContexts[toTagIndex] ?? null,
    })

    this.tabElements[fromTabIndex]
      ?.['classList']
      .remove(ACTIVE_CLASS)
    currentTarget['classList']
      .add(ACTIVE_CLASS)
  }
}

/**
 * @typedef {{
 *   props: FuroTabLayoutContextProps
 *   componentContext: import('vue').SetupContext
 *   tabElementsRef: import('vue').Ref<Array<HTMLElement>>
 *   tabContexts: Array<FuroTabItemContext>
 *   activeTabKey: string | null
 * }} FuroTabLayoutContextParams
 */

/**
 * @typedef {{
 *   props: FuroTabLayoutContextProps
 *   componentContext: import('vue').SetupContext
 *   tabElementsRef: import('vue').Ref<Array<HTMLElement>>
 * }} FuroTabLayoutContextFactoryParams
 */

/**
 * @typedef {{
 *   tabs: Array<FuroTabParams>
 *   activeTabKey?: string | null
 * }} FuroTabLayoutContextProps
 */

/**
 * @typedef {{
 *   tabKey: string
 *   slotName?: string
 *   label: string
 * }} FuroTabParams
 */

/**
 * @typedef {'changeTab'} FuroTabLayoutContextEmitOptions
 */
