import BaseAppRenchanRestfulApiLauncher from '~/app/restfulapi/renchan/BaseAppRenchanRestfulApiLauncher.js'

import {
  BaseRestfulApiLauncher,
} from '@openreachtech/furo'

describe('BaseAppRenchanRestfulApiLauncher', () => {
  describe('inheritance', () => {
    test('should be a subclass of BaseRestfulApiLauncher', () => {
      const actual = BaseAppRenchanRestfulApiLauncher.prototype

      expect(actual)
        .toBeInstanceOf(BaseRestfulApiLauncher)
    })
  })
})

describe('BaseAppRenchanRestfulApiLauncher', () => {
  describe('.get:restfulApiConfig', () => {
    test('should be fixed value', () => {
      const expected = {
        BASE_URL: null,
      }

      const actual = BaseAppRenchanRestfulApiLauncher.restfulApiConfig

      expect(actual)
        .toEqual(expected)
    })
  })
})
