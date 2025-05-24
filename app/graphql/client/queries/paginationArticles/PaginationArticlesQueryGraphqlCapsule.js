import BaseAppGraphqlCapsule from '../../BaseAppGraphqlCapsule'

/**
 * PaginationArticles query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<PaginationArticlesQueryResponseContent>}
 */
export default class PaginationArticlesQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract pagination articles.
   *
   * @returns {{
   *   articles: Array<PaginationArticleEntity>
   *   pagination: {
   *     limit: number
   *     offset: number
   *     sort: {
   *       targetColumn: string
   *       orderBy: string
   *     }
   *     totalRecords: number
   *   }
   * } | null}
   */
  extractPaginationArticles () {
    const content = this.extractContent()

    return content?.paginationArticles
      ?? null
  }

  /**
   * get: articles.
   *
   * @returns {Array<PaginationArticleEntity>} Articles.
   */
  get articles () {
    return this.extractPaginationArticles()
      ?.articles
      ?? []
  }

  /**
   * get: pagination.
   *
   * @returns {{
   *   limit: number
   *   offset: number
   *   sort: {
   *     targetColumn: string
   *     orderBy: string
   *   }
   *   totalRecords: number
   * } | null} Pagination.
   */
  get pagination () {
    return this.extractPaginationArticles()
      ?.pagination
      ?? null
  }
}

/**
 * @typedef {{
 *   paginationArticles: {
 *     articles: Array<PaginationArticleEntity>
 *     pagination: {
 *       limit: number
 *       offset: number
 *       sort: {
 *         targetColumn: string
 *         orderBy: string
 *       }
 *       totalRecords: number
 *     }
 *   }
 * }} PaginationArticlesQueryResponseContent
 */

/**
 * @typedef {{
 *   id: number
 *   title: string
 *   description: string
 *   postedAt: string
 * }} PaginationArticleEntity
 */
