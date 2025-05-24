import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import RenewAccessTokenMutationGraphqlPayload from '~/app/graphql/client/mutations/renewAccessToken/RenewAccessTokenMutationGraphqlPayload'
import RenewAccessTokenMutationGraphqlCapsule from '~/app/graphql/client/mutations/renewAccessToken/RenewAccessTokenMutationGraphqlCapsule'

/**
 * RenewAccessToken mutation graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class RenewAccessTokenMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return RenewAccessTokenMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return RenewAccessTokenMutationGraphqlCapsule
  }
}
