import BaseAppGraphqlLauncher from '../../BaseAppGraphqlLauncher'
import CurriculumsQueryGraphqlCapsule from './CurriculumsQueryGraphqlCapsule'
import CurriculumsQueryGraphqlPayload from './CurriculumsQueryGraphqlPayload'

/**
 * Curriculums query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class CurriculumsQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CurriculumsQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CurriculumsQueryGraphqlCapsule
  }
}
