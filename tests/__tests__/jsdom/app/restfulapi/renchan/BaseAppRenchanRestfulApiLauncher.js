import BaseAppRenchanRestfulApiLauncher from '~/app/restfulapi/renchan/BaseAppRenchanRestfulApiLauncher.js'

import {
  BaseRenchanRestfulApiLauncher,
} from '@openreachtech/furo'

describe('BaseAppRenchanRestfulApiLauncher', () => {
  describe('inheritance', () => {
    test('should be a subclass of BaseRenchanRestfulApiLauncher', () => {
      const actual = BaseAppRenchanRestfulApiLauncher.prototype

      expect(actual)
        .toBeInstanceOf(BaseRenchanRestfulApiLauncher)
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
