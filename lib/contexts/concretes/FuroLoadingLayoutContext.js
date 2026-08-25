import BaseFuroContext from '../BaseFuroContext.js'

/**
 * Props context class for FuroTabLayout component.
 *
 * @property {boolean} isLoading - Is loading or not.
 * @extends {BaseFuroContext<null, FuroLoadingLayoutContextProps>} - Base class <Accessor, Props, Emit>
 * @deprecated since 1.12.0. Will be removed in 2.0.0 together with FuroLoadingLayout.
 */
export default class FuroLoadingLayoutContext extends BaseFuroContext {
  /**
   * get: isLoading
   *
   * @returns {boolean}
   */
  get isLoading () {
    return this.props.isLoading
  }
}

/**
 * @typedef {{
 *   props: FuroLoadingLayoutContextProps
 *   componentContext: import('vue').SetupContext
 * }} FuroLoadingLayoutContextParams
 */

/**
 * @typedef {{
 *   props: FuroLoadingLayoutContextProps
 *   componentContext: import('vue').SetupContext
 * }} FuroLoadingLayoutContextFactoryParams
 */

/**
 * @typedef {{
 *   isLoading: boolean
 * }} FuroLoadingLayoutContextProps
 */
