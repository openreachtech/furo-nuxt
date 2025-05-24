import BaseAppGraphqlPayload from '../../BaseAppGraphqlPayload'

/**
 * PaginationArticles query payload.
 *
 * @extends {BaseAppGraphqlPayload<PaginationArticlesQueryRequestVariables>}
 */
export default class PaginationArticlesQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query PaginationArticlesQuery ($input: PaginationArticlesInput!) {
        paginationArticles (input: $input) {
          articles {
            id
            title
            description
            postedAt
          }
          pagination {
            limit
            offset
            sort {
              targetColumn
              orderBy
            }
            totalRecords
          }
        }
      }
    `
  }
}

/**
 * category: 'fingers' | 'programmingLanguages'
 *
 * @typedef {{
 *   input: {
 *     category: string
 *     pagination: {
 *       limit: number
 *       offset: number
 *       sort: {
 *         targetColumn: string
 *         orderBy: string
 *       }
 *     }
 *   }
 * }} PaginationArticlesQueryRequestVariables
 */
