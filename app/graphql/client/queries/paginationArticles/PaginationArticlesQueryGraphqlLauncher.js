import BaseAppGraphqlLauncher from '../../BaseAppGraphqlLauncher'
import PaginationArticlesQueryGraphqlCapsule from './PaginationArticlesQueryGraphqlCapsule'
import PaginationArticlesQueryGraphqlPayload from './PaginationArticlesQueryGraphqlPayload'

/**
 * PaginationArticles query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class PaginationArticlesQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return PaginationArticlesQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return PaginationArticlesQueryGraphqlCapsule
  }
}
