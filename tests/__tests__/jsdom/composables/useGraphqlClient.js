import useGraphqlClient from '~/lib/composables/useGraphqlClient.js'

import CompanySponsorsQueryGraphqlLauncher from '~/app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlLauncher.js'
import CurriculumsQueryGraphqlLauncher from '~/app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlLauncher.js'
import SignUpMutationGraphqlLauncher from '~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlLauncher.js'

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
          Launcher: CompanySponsorsQueryGraphqlLauncher,
        },
      },
      {
        params: {
          Launcher: CurriculumsQueryGraphqlLauncher,
        },
      },
      {
        params: {
          Launcher: SignUpMutationGraphqlLauncher,
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
