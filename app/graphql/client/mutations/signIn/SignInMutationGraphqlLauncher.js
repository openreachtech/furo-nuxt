import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import SignInMutationGraphqlPayload from '~/app/graphql/client/mutations/signIn/SignInMutationGraphqlPayload'
import SignInMutationGraphqlCapsule from '~/app/graphql/client/mutations/signIn/SignInMutationGraphqlCapsule'

/**
 * SignIn mutation graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class SignInMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return SignInMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return SignInMutationGraphqlCapsule
  }
}
