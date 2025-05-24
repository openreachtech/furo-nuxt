/**
 * Props context class for FuroTab component.
 *
 * @property {string} tabKey - Tab key.
 * @property {string} label - Tab label.
 * @property {boolean} isActive - Whether the tab is active.
 */
export default class FuroTabItemContext {
  /**
   * Constructor.
   *
   * @param {FuroTabItemContextParams} params - Parameters of this constructor.
   */
  constructor ({
    tabKey,
    label,
    index,
  }) {
    this.tabKey = tabKey
    this.label = label
    this.index = index
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @param {FuroTabItemContextFactoryParams} params - Parameters of this factory method.
   * @returns {FuroTabItemContext} - New instance of this class.
   */
  static create ({
    tabKey,
    label,
    index,
  }) {
    return new this({
      tabKey,
      label,
      index,
    })
  }

  /**
   * Is target tab
   *
   * @param {{
   *   tabKey: string
   * }} params - Parameters of this method.
   * @returns {boolean} - Whether the tab is target.
   */
  isTargetTab ({
    tabKey,
  }) {
    return this.tabKey === tabKey
  }
}

/**
 * @typedef {{
 *   tabKey: string
 *   label: string
 *   index: number
 * }} FuroTabItemContextParams
 */

/**
 * @typedef {FuroTabItemContextParams} FuroTabItemContextFactoryParams
 */
