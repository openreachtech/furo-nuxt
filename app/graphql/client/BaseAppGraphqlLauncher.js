import {
  BaseGraphqlLauncher,
} from '@openreachtech/furo'

import graphqlConfig from '../graphql.config'

/**
 * Base class for all app graphql launchers.
 *
 * @extends {BaseGraphqlLauncher}
 */
export default class BaseAppGraphqlLauncher extends BaseGraphqlLauncher {
  /** @override */
  static get graphqlConfig () {
    return /** @type {*} */ (
      graphqlConfig
    )
  }
}

/**
 * @typedef {GraphqlType.LauncherFactoryParams} BaseAppGraphqlLauncherFactoryParams
 */
