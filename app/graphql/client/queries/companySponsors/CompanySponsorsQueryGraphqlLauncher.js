import BaseAppGraphqlLauncher from '../../BaseAppGraphqlLauncher'
import CompanySponsorsQueryGraphqlCapsule from './CompanySponsorsQueryGraphqlCapsule'
import CompanySponsorsQueryGraphqlPayload from './CompanySponsorsQueryGraphqlPayload'

/**
 * Company sponsors query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class CompanySponsorsQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CompanySponsorsQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CompanySponsorsQueryGraphqlCapsule
  }
}
