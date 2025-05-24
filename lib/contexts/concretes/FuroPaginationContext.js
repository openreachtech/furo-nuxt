import BaseFuroContext from '../BaseFuroContext.js'

import FuroPageItemContext from './FuroPageItemContext.js'

/**
 * Props context class for FuroPagination component.
 *
 * @property {URLSearchParams} searchParams - Search parameters.
 * @property {number} currentPage - Current page.
 * @property {number} maxPageRange - page range in view
 * @property {number} lastPage - Last page.
 * @property {string} pageKey - Page key.
 * @extends {BaseFuroContext<null, FuroPaginationContextProps>} - Base class <Accessor, Props, Emit>
 */
export default class FuroPaginationContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {FuroPaginationContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
    route,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof FuroPaginationContext ? X : never} T, X
   * @override
   * @param {FuroPaginationContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - New instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    route,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        route,
      })
    )
  }

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      CHANGE_PAGE: 'changePage',
    }
  }

  /**
   * get: page key.
   *
   * @returns {string} page key
   */
  get pageKey () {
    return this.props.pageKey
      ?? 'page'
  }

  /**
   * get: max page range.
   *
   * @returns {number} max page range
   */
  get maxPageRange () {
    return this.props.maxPageRange
      ?? 5
  }

  /**
   * get: pagination from props.
   *
   * @returns {{
   *   limit?: number
   *   totalRecords?: number
   * }} pagination
   */
  get pagination () {
    return this.props.pagination
      ?? {}
  }

  /**
   * get: page limit.
   *
   * @returns {number} Page limit.
   */
  get pageLimit () {
    return this.pagination?.limit
      ?? 20
  }

  /**
   * get: total record number.
   *
   * @returns {number} Total record number.
   */
  get totalRecordNumber () {
    return this.pagination?.totalRecords
      ?? 0
  }

  /**
   * Calculate last page.
   *
   * @returns {number} - Last page.
   */
  calculateLastPage () {
    if (this.pageLimit <= 0) {
      return 1
    }

    return Math.ceil(this.totalRecordNumber / this.pageLimit)
  }

  /**
   * Change page.
   *
   * @param {{
   *   event: Event
   *   page: FuroPageItemContext
   * }} params - Parameters.
   * @public
   */
  changePage ({
    event: clickEvent,
    page,
  }) {
    this.emit(
      this.EMIT_EVENT_NAME
        .CHANGE_PAGE,
      {
        event: clickEvent,
        page,
      }
    )
  }

  /**
   * Resolve current page.
   *
   * @returns {number} Current page.
   */
  resolveCurrentPage () {
    const rawPage = Number(
      this.route.query[this.pageKey]
    )

    if (!rawPage) {
      return 1
    }

    return rawPage
  }

  /**
   * Create pages.
   *
   * @param {{
   *   rangePages?: Array<number>
   * }} [params] - Parameters.
   * @returns {Array<FuroPageItemContext>} - Pages.
   * @public
   */
  createRangePages ({
    rangePages = this.generateRangePages(),
  } = {}) {
    const searchParams = this.createURLSearchParamsFromRoute()
    const currentPage = this.resolveCurrentPage()

    return rangePages.map(page =>
      FuroPageItemContext.create({
        pageNumber: page,
        searchParams,
        pageKey: this.pageKey,
        isCurrent: page === currentPage,
      })
    )
  }

  /**
   * Generate range pages.
   *
   * @returns {Array<number>} - Range pages.
   */
  generateRangePages () {
    const startPage = this.calculateRangeStartedPage()

    const pageIterator = Array(this.maxPageRange)
      .keys()
    const lastPage = this.calculateLastPage()

    return [...pageIterator]
      .map(it => startPage + it)
      .filter(it => it <= lastPage)
  }

  /**
   * Create URLSearchParams from route.
   *
   * @returns {URLSearchParams} - URLSearchParams.
   */
  createURLSearchParamsFromRoute () {
    return new URLSearchParams(
      /** @type {Record<string, string>} */ (this.route.query)
    )
  }

  /**
   * Calculate range started page.
   *
   * @returns {number} - Start page.
   */
  calculateRangeStartedPage () {
    const currentPage = this.resolveCurrentPage()

    const simpleStartPage = currentPage - Math.floor(this.maxPageRange / 2)

    if (simpleStartPage <= 1) {
      return 1
    }

    const simpleLastPage = currentPage + Math.floor(this.maxPageRange / 2)
    const lastPage = this.calculateLastPage()

    if (simpleLastPage > lastPage) {
      return Math.max(
        1,
        lastPage - this.maxPageRange + 1
      )
    }

    return simpleStartPage
  }

  /**
   * Create previous page.
   *
   * @returns {FuroPageItemContext} - Previous page.
   */
  createPreviousPage () {
    const currentPage = this.resolveCurrentPage()

    const previousPage = currentPage <= 1
      ? null
      : currentPage - 1

    const searchParams = this.createURLSearchParamsFromRoute()

    return FuroPageItemContext.create({
      pageNumber: previousPage,
      searchParams,
      pageKey: this.pageKey,
    })
  }

  /**
   * Create next page.
   *
   * @returns {FuroPageItemContext} - Next page.
   */
  createNextPage () {
    const searchParams = this.createURLSearchParamsFromRoute()

    const lastPage = this.calculateLastPage()
    const currentPage = this.resolveCurrentPage()

    if (lastPage <= currentPage) {
      return FuroPageItemContext.create({
        pageNumber: null,
        searchParams,
        pageKey: this.pageKey,
      })
    }

    const nextPage = currentPage + 1

    return FuroPageItemContext.create({
      pageNumber: nextPage,
      searchParams,
      pageKey: this.pageKey,
    })
  }

  /**
   * Create first page.
   *
   * @returns {FuroPageItemContext} - First page.
   */
  createFirstPage () {
    const searchParams = this.createURLSearchParamsFromRoute()

    return FuroPageItemContext.create({
      pageNumber: 1,
      searchParams,
      pageKey: this.pageKey,
    })
  }

  /**
   * Create last page.
   *
   * @returns {FuroPageItemContext} - Last page.
   */
  createLastPage () {
    const lastPage = this.calculateLastPage()
    const searchParams = this.createURLSearchParamsFromRoute()

    return FuroPageItemContext.create({
      pageNumber: lastPage,
      searchParams,
      pageKey: this.pageKey,
    })
  }

  /**
   * Generate previous page href.
   *
   * @returns {string | null} - Previous page href.
   * @public
   */
  generatePreviousPageHref () {
    return this.createPreviousPage()
      .generateHref()
  }

  /**
   * Generate next page href.
   *
   * @returns {string | null} - Next page href.
   * @public
   */
  generateNextPageHref () {
    return this.createNextPage()
      .generateHref()
  }

  /**
   * Generate first page href.
   *
   * @returns {string | null} - First page href.
   * @public
   */
  generateFirstPageHref () {
    return this.createFirstPage()
      .generateHref()
  }

  /**
   * Generate last page href.
   *
   * @returns {string | null} - Last page href.
   * @public
   */
  generateLastPageHref () {
    return this.createLastPage()
      .generateHref()
  }

  /**
   * Generate first page link label.
   *
   * @returns {string | null} - First page link label.
   * @public
   */
  generateFirstPageLinkLabel () {
    return this.createFirstPage()
      .generateText()
  }

  /**
   * Generate last page link label.
   *
   * @returns {string | null} - Last page link label.
   * @public
   */
  generateLastPageLinkLabel () {
    return this.createLastPage()
      .generateText()
  }

  /**
   * Is disabled first page.
   *
   * @returns {boolean} - true: disabled.
   * @public
   */
  isDisabledPreviousPage () {
    return this.resolveCurrentPage() === 1
  }

  /**
   * Is disabled next page.
   *
   * @returns {boolean} - true: disabled.
   * @public
   */
  isDisabledNextPage () {
    const lastPage = this.calculateLastPage()
    const currentPage = this.resolveCurrentPage()

    return lastPage <= currentPage
  }

  /**
   * Is hidden first page.
   *
   * @returns {boolean} - true: hidden.
   * @public
   */
  isHiddenFirstPage () {
    const rangePages = this.generateRangePages()

    return rangePages.includes(1)
  }

  /**
   * Is hidden last page.
   *
   * @returns {boolean} - true: hidden.
   * @public
   */
  isHiddenLastPage () {
    const rangePages = this.generateRangePages()
    const lastPage = this.calculateLastPage()

    return rangePages.includes(lastPage)
  }

  /**
   * Is hidden first page dash.
   *
   * @returns {boolean} - true: hidden.
   * @public
   */
  isHiddenFirstPageDash () {
    const rangePages = this.generateRangePages()

    return rangePages.includes(2)
  }

  /**
   * Is hidden last page dash.
   *
   * @returns {boolean} - true: hidden.
   * @public
   */
  isHiddenLastPageDash () {
    const rangePages = this.generateRangePages()
    const lastPage = this.calculateLastPage()

    return rangePages.includes(lastPage - 1)
  }
}

/**
 * @typedef {import('../BaseFuroContext.js').BaseFuroContextParams<P> & {
 *   props: import('vue').Reactive<FuroPaginationContextProps>
 *   componentContext: import('vue').SetupContext
 *   route: import('vue-router').RouteLocationNormalized
 * }} FuroPaginationContextParams
 * @template {FuroPaginationContextProps | {}} [P = {}] - Props.
 */

/**
 * @typedef {import('../BaseFuroContext.js').BaseFuroContextFactoryParams<P> & {
 *   props: import('vue').Reactive<FuroPaginationContextProps>
 *   componentContext: import('vue').SetupContext
 *   route: import('vue-router').RouteLocationNormalized
 *   searchParams?: URLSearchParams
 * }} FuroPaginationContextFactoryParams
 * @template {FuroPaginationContextProps | {}} [P = {}] - Props.
 */

/**
 * @typedef {{
 *   pagination?: {
 *     limit?: number
 *     totalRecords?: number
 *   }
 *   pageKey?: string
 *   maxPageRange?: number
 * }} FuroPaginationContextProps
 */
