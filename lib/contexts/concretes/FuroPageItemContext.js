/**
 * Props context class for FuroPagination component.
 *
 * @property {number} current - Current page.
 * @property {number} perPage - Number of items per page.
 * @property {number} total - Total number of items.
 * @property {boolean} isCurrent - Whether the page is current.
 */
export default class FuroPageItemContext {
  /**
   * Constructor.
   *
   * @param {FuroPageItemContextParams} params - Parameters of this constructor.
   */
  constructor ({
    pageNumber,
    searchParams,
    pageKey,
    isCurrent,
  }) {
    this.pageNumber = pageNumber
    this.searchParams = searchParams
    this.pageKey = pageKey
    this.isCurrent = isCurrent
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @param {FuroPageItemContextFactoryParams} params - Parameters of this factory method.
   * @returns {FuroPageItemContext} - New instance of this class.
   */
  static create ({
    pageNumber,
    searchParams,
    pageKey,
    isCurrent = false,
  }) {
    return new this({
      pageNumber,
      searchParams,
      pageKey,
      isCurrent,
    })
  }

  /**
   * Generate href.
   *
   * @returns {string | null} - Pages.
   */
  generateHref () {
    if (!this.pageNumber) {
      return null
    }

    const pageSearchParams = new URLSearchParams(this.searchParams)
    pageSearchParams.set(
      this.pageKey,
      this.pageNumber.toString()
    )

    return `?${pageSearchParams.toString()}`
  }

  /**
   * Generate text.
   *
   * @returns {string | null} - Link text.
   */
  generateText () {
    if (!this.pageNumber) {
      return null
    }

    return this.pageNumber.toString()
  }
}

/**
 * @typedef {{
 *   pageNumber: number | null
 *   isCurrent: boolean
 *   searchParams: URLSearchParams
 *   pageKey: string
 * }} FuroPageItemContextParams
 */

/**
 * @typedef {{
 *   pageNumber: number | null
 *   isCurrent?: boolean
 *   searchParams: URLSearchParams
 *   pageKey: string
 * }} FuroPageItemContextFactoryParams
 */
