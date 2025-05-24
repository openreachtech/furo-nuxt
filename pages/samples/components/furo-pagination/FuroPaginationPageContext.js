import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

/**
 * FuroPaginationPageContext.
 *
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class FuroPaginationPageContext extends BaseFuroContext {
  /**
   * get: pagination.
   *
   * @returns {{
   *   limit: number,
   *   totalRecords: number
   * }} - Pagination.
   */
  get pagination () {
    return {
      limit: 5,
      totalRecords: 53,
    }
  }
}
