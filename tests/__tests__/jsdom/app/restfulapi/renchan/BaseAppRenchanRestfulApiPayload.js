import BaseAppRenchanRestfulApiPayload from '~/app/restfulapi/renchan/BaseAppRenchanRestfulApiPayload.js'

import {
  BaseRestfulApiPayload,
} from '@openreachtech/furo'

describe('BaseAppRenchanRestfulApiPayload', () => {
  describe('inheritance', () => {
    test('should be a subclass of BaseRestfulApiPayload', () => {
      const actual = BaseAppRenchanRestfulApiPayload.prototype

      expect(actual)
        .toBeInstanceOf(BaseRestfulApiPayload)
    })
  })
})

describe('BaseAppRenchanRestfulApiPayload', () => {
  describe('.get:ACCESS_TOKEN_HEADER_KEY', () => {
    test('should be fixed value', () => {
      const expected = 'x-renchan-access-token'

      const actual = BaseAppRenchanRestfulApiPayload.ACCESS_TOKEN_HEADER_KEY

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('BaseAppRenchanRestfulApiPayload', () => {
  describe('.get:ACCESS_TOKEN_STORAGE_KEY', () => {
    test('should be fixed value', () => {
      const expected = 'access_token'

      const actual = BaseAppRenchanRestfulApiPayload.ACCESS_TOKEN_STORAGE_KEY

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('BaseAppRenchanRestfulApiPayload', () => {
  describe('.get:prefixPathname', () => {
    test('should be fixed value', () => {
      const expected = '/v1'

      const actual = BaseAppRenchanRestfulApiPayload.prefixPathname

      expect(actual)
        .toBe(expected)
    })
  })
})
