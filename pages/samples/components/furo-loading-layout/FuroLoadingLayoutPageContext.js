import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

/**
 * Page context for FuroLoadingLayout.
 *
 * @property {StatusReactiveProperty} statusReactive - Reactive object of status.
 * @extends BaseFuroContext<null>
 */
export default class FuroLoadingLayoutPageContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {FuroLoadingLayoutPageContextParams} params - Parameters of constructor.
   */
  constructor ({
    props,
    componentContext,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof FuroLoadingLayoutPageContext ? X : never} T, X
   * @override
   * @param {FuroLoadingLayoutPageContextFactoryParams} params - Parameters of factory method.
   * @returns {InstanceType<T>} - New instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        statusReactive,
      })
    )
  }

  /**
   * Emulate loading.
   *
   * @param {{
   *   statusLoadingKey: keyof StatusReactiveProperty
   *   durationInMs: number
   * }} params - Parameters.
   * @returns {void}
   */
  emulateLoading ({
    statusLoadingKey,
    durationInMs,
  }) {
    this.statusReactive[statusLoadingKey] = true

    const timeoutId = setTimeout(
      () => {
        this.statusReactive[statusLoadingKey] = false

        clearTimeout(timeoutId)
      },
      durationInMs
    )
  }
}

/**
 * @typedef {{
 *   props: import('vue').ComponentCustomProps
 *   componentContext: import('vue').SetupContext
 *   statusReactive: StatusReactiveProperty
 * }} FuroLoadingLayoutPageContextParams
 */

/**
 * @typedef {FuroLoadingLayoutPageContextParams} FuroLoadingLayoutPageContextFactoryParams
 */

/**
 * @typedef {{
 *   isLoadingFuro: boolean
 *   isLoadingApp: boolean
 *   isLoadingAppWithDisplayFlex: boolean
 *   isLoadingAppWithDisplayGrid: boolean
 * }} StatusReactiveProperty
 */
