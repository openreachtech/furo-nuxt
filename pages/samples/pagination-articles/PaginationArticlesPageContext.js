import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

/**
 * PaginationArticlesPageContext.
 *
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class PaginationArticlesPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {PaginationArticlesPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
    graphqlClient,
  }) {
    super({
      props,
      componentContext,
    })

    this.graphqlClient = graphqlClient
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof PaginationArticlesPageContext ? X : never} T, X
   * @override
   * @param {PaginationArticlesPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    graphqlClient,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        graphqlClient,
      })
    )
  }

  /**
   * Setup component context.
   *
   * @template {X extends PaginationArticlesPageContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.graphqlClient
      .invokeRequestOnMounted({
        variables: this.defaultVariables,
      })

    return this
  }

  /**
   * get: default variables.
   *
   * @returns {PaginationArticlesQueryRequestVariables} - Default variables.
   */
  get defaultVariables () {
    return {
      input: {
        category: 'programmingLanguages', // 'programmingLanguages',
        pagination: {
          limit: 6,
          offset: 0,
          sort: {
            targetColumn: 'pointedAt',
            orderBy: 'DESC',
          },
        },
      },
    }
  }

  /**
   * get: capsuleRef.
   *
   * @returns {import('vue').Ref<import('../../../app/graphql/client/queries/paginationArticles/PaginationArticlesQueryGraphqlCapsule.js').default>} - Capsule reference.
   */
  get capsuleRef () {
    return /** @type {*} */ (
      this.graphqlClient.capsuleRef
    )
  }

  /**
   * get: articles.
   *
   * @returns {import('../../../app/graphql/client/queries/paginationArticles/PaginationArticlesQueryGraphqlCapsule.js').PaginationArticlesQueryResponseContent['paginationArticles']['articles']} - Articles.
   */
  get articles () {
    return this.capsuleRef.value
      ?.articles
      ?? []
  }

  /**
   * get: pagination.
   *
   * @returns {{
   *   limit: number
   *   totalRecords: number
   * }} - Pagination.
   */
  get pagination () {
    const rawPagination = this.capsuleRef.value
      ?.pagination
      ?? {
        limit: 20,
        offset: 0,
        sort: {
          targetColumn: 'pointedAt',
          orderBy: 'DESC',
        },
        totalRecords: 0,
      }

    return {
      limit: rawPagination.limit,
      totalRecords: rawPagination.totalRecords,
    }
  }

  /**
   * Change page event listener.
   *
   * @param {{
   *   event: Event
   *   page: import('~/lib/contexts/concretes/FuroPageItemContext.js').default
   * }} params - Parameters.
   */
  async changePage ({
    event: clickEvent,
    page,
  }) {
    const targetPage = page.pageNumber
      ?? 1

    const limit = 6
    const offset = (targetPage - 1) * limit

    const variables = {
      input: {
        category: 'programmingLanguages', // 'programmingLanguages',
        pagination: {
          limit,
          offset,
          sort: {
            targetColumn: 'pointedAt',
            orderBy: 'DESC',
          },
        },
      },
    }

    await this.graphqlClient
      .invokeRequestOnEvent({
        variables,
      })
  }
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   graphqlClient: furo.GraphqlClient
 * }} PaginationArticlesPageContextParams
 */

/**
 * @typedef {PaginationArticlesPageContextParams} PaginationArticlesPageContextFactoryParams
 */

/**
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
