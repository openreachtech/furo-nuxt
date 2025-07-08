import BaseAppRenchanRestfulApiCapsule from '~/app/restfulapi/renchan/BaseAppRenchanRestfulApiCapsule.js'

import {
  BaseRestfulApiCapsule,
} from '@openreachtech/furo'

describe('BaseAppRenchanRestfulApiCapsule', () => {
  describe('inheritance', () => {
    test('should be a subclass of BaseRestfulApiCapsule', () => {
      const actual = BaseAppRenchanRestfulApiCapsule.prototype

      expect(actual)
        .toBeInstanceOf(BaseRestfulApiCapsule)
    })
  })
})
