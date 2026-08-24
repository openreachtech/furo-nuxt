import {
  BaseGraphqlCapsule,
  BaseGraphqlLauncher,
} from '@openreachtech/furo'

import useGraphqlClient from '~/lib/composables/useGraphqlClient.js'

describe('useGraphqlClient()', () => {
  describe('to be an object', () => {
    /**
     * @type {Array<{
     *   params: {
     *     Launcher: furo.LauncherCtor
     *   }
     * }>}
     */
    const cases = [
      {
        params: {
          Launcher: class CompanySponsorsQueryGraphqlLauncher extends BaseGraphqlLauncher {
            /** @override */
            static get Capsule () {
              return BaseGraphqlCapsule
            }
          },
        },
      },
      {
        params: {
          Launcher: class CurriculumsQueryGraphqlLauncher extends BaseGraphqlLauncher {
            /** @override */
            static get Capsule () {
              return BaseGraphqlCapsule
            }
          },
        },
      },
      {
        params: {
          Launcher: class SignUpMutationGraphqlLauncher extends BaseGraphqlLauncher {
            /** @override */
            static get Capsule () {
              return BaseGraphqlCapsule
            }
          },
        },
      },
    ]

    test.each(cases)('Launcher: $params.Launcher.name', ({ params }) => {
      const expected = {
        capsuleRef: expect.any(Object),
        invokeRequestOnEvent: expect.any(Function),
        invokeRequestOnMounted: expect.any(Function),
        invokeRequestWithFormValueHash: expect.any(Function),
      }

      const actual = useGraphqlClient(params.Launcher)

      expect(actual)
        .toEqual(expected)
    })
  })
})
