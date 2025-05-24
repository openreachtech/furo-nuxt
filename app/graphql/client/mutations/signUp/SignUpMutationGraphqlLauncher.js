import BaseAppGraphqlLauncher from '../../BaseAppGraphqlLauncher'
import SignUpMutationGraphqlCapsule from './SignUpMutationGraphqlCapsule'
import SignUpMutationGraphqlPayload from './SignUpMutationGraphqlPayload'

/**
 * SignUp mutation graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class SignUpMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return SignUpMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return SignUpMutationGraphqlCapsule
  }
}
