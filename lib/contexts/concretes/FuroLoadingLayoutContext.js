import BaseFuroContext from '../BaseFuroContext.js'

/**
 * Props context class for FuroTabLayout component.
 *
 * @property {boolean} isLoading - Is loading or not.
 * @extends {BaseFuroContext<null, FuroLoadingLayoutContextProps>} - Base class <Accessor, Props, Emit>
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
