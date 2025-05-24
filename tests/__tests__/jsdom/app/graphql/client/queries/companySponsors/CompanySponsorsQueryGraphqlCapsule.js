import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

import CompanySponsorsQueryGraphqlCapsule from '~/app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlCapsule'

describe('CompanySponsorsQueryGraphqlCapsule', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlCapsule', () => {
      const actual = CompanySponsorsQueryGraphqlCapsule.prototype

      expect(actual)
        .toBeInstanceOf(BaseAppGraphqlCapsule)
    })
  })
})
