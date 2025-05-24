import {
  BaseGraphqlCapsule,
} from '@openreachtech/furo'

import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

describe('BaseAppGraphqlCapsule', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlCapsule', () => {
      const actual = BaseAppGraphqlCapsule.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlCapsule)
    })
  })
})
