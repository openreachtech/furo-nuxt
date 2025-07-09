import BaseAppRenchanRestfulApiCapsule from '~/app/restfulapi/renchan/BaseAppRenchanRestfulApiCapsule.js'

import {
  BaseRenchanRestfulApiCapsule,
} from '@openreachtech/furo'

describe('BaseAppRenchanRestfulApiCapsule', () => {
  describe('inheritance', () => {
    test('should be a subclass of BaseRenchanRestfulApiCapsule', () => {
      const actual = BaseAppRenchanRestfulApiCapsule.prototype

      expect(actual)
        .toBeInstanceOf(BaseRenchanRestfulApiCapsule)
    })
  })
})
