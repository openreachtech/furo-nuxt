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
    slotName,
    label,
    index,
  }) {
    this.tabKey = tabKey
    this.slotName = slotName
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
    slotName,
    label,
    index,
  }) {
    const normalizedSlotName = this.generateSlotName({
      name: slotName,
    })

    return new this({
      tabKey,
      slotName: normalizedSlotName,
      label,
      index,
    })
  }

  /**
   * Generate slot name.
   *
   * @param {{
   *   name?: string
   * }} params - Parameters.
   * @returns {string} Slot name.
   */
  static generateSlotName ({
    name,
  }) {
    if (!name) {
      return 'tabControl'
    }

    return `${name}TabControl`
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
 *   slotName: string
 *   label: string
 *   index: number
 * }} FuroTabItemContextParams
 */

/**
 * @typedef {Omit<FuroTabItemContextParams, 'slotName'> & {
 *   slotName?: string
 * }} FuroTabItemContextFactoryParams
 */
