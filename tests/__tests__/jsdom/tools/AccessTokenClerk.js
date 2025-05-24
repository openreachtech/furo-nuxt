import {
  StorageClerk,
} from '@openreachtech/furo'

import AccessTokenClerk from '~/lib/tools/AccessTokenClerk.js'

describe('AccessTokenClerk', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#storage', () => {
        const cases = [
          {
            title: 'localStorage',
            params: {
              storage: StorageClerk.createAsLocal(),
            },
          },
          {
            title: 'sessionStorage',
            params: {
              storage: StorageClerk.createAsSession(),
            },
          },
        ]

        test.each(cases)('$title', ({ params }) => {
          const args = {
            storage: params.storage,
            key: 'access_token',
          }
          const clerk = new AccessTokenClerk(args)

          expect(clerk)
            .toHaveProperty('storage', args.storage)
        })
      })

      describe('#key', () => {
        const storageClerk = StorageClerk.createAsLocal()

        const cases = [
          {
            params: {
              key: 'access_token_local',
            },
          },
          {
            params: {
              key: 'access_token_session',
            },
          },
        ]

        test.each(cases)('key: $params.key', ({ params }) => {
          const args = {
            storage: storageClerk,
            key: params.key,
          }
          const clerk = new AccessTokenClerk(args)

          expect(clerk)
            .toHaveProperty('key', params.key)
        })
      })
    })
  })
})

describe('AccessTokenClerk', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_001',
          },
        },
        {
          params: {
            // storage: StorageClerk.createAsLocal(),
            key: 'access_token_002',
          },
        },
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            // key: 'access_token_003',
          },
        },
        {
          params: {
            // storage: StorageClerk.createAsLocal(),
            // key: 'access_token_004',
          },
        },
      ]

      test.each(cases)('key: $params.key', ({ params }) => {
        const clerk = AccessTokenClerk.create(params)

        expect(clerk)
          .toBeInstanceOf(AccessTokenClerk)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_001',
          },
          expected: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_001',
          },
        },
        {
          params: {
            // storage: StorageClerk.createAsLocal(),
            key: 'access_token_002',
          },
          expected: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_002',
          },
        },
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            // key: 'access_token_003',
          },
          expected: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token',
          },
        },
        {
          params: {
            // storage: StorageClerk.createAsLocal(),
            // key: 'access_token_004',
          },
          expected: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token',
          },
        },
      ]

      test.each(cases)('key: $params.key', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(AccessTokenClerk)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('AccessTokenClerk', () => {
  describe('.createStorageClerk()', () => {
    test('to be instance of StorageClerk', () => {
      const actual = AccessTokenClerk.createStorageClerk()

      expect(actual)
        .toBeInstanceOf(StorageClerk)
    })
  })
})

describe('AccessTokenClerk', () => {
  describe('.get:STORAGE_KEY', () => {
    test('to be fixed value', () => {
      const expected = 'access_token'

      const actual = AccessTokenClerk.STORAGE_KEY

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('AccessTokenClerk', () => {
  describe('#clearToken()', () => {
    describe('to be this', () => {
      const cases = [
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_001',
          },
        },
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_002',
          },
        },
      ]

      test.each(cases)('key: $params.key', ({ params }) => {
        const clerk = new AccessTokenClerk(params)

        const actual = clerk.clearToken()

        expect(actual)
          .toBe(clerk) // same reference
      })
    })

    describe('to call StorageClerk#remove()', () => {
      const cases = [
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_001',
          },
        },
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_002',
          },
        },
      ]

      test.each(cases)('key: $params.key', ({ params }) => {
        const clerk = new AccessTokenClerk(params)

        const removeSpy = jest.spyOn(params.storage, 'remove')

        clerk.clearToken()

        expect(removeSpy)
          .toHaveBeenCalledWith(params.key)
      })
    })
  })
})

describe('AccessTokenClerk', () => {
  describe('#recordToken()', () => {
    describe('to be this', () => {
      const cases = [
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_001',
          },
          tokenCases: [
            {
              token: 'token_001',
            },
            {
              token: 'token_002',
            },
          ],
        },
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_002',
          },
          tokenCases: [
            {
              token: 'token_001',
            },
            {
              token: 'token_002',
            },
          ],
        },
      ]

      describe.each(cases)('key: $params.key', ({ params, tokenCases }) => {
        const clerk = new AccessTokenClerk(params)

        test.each(tokenCases)('token: $token', ({ token }) => {
          const actual = clerk.recordToken({
            token,
          })

          expect(actual)
            .toBe(clerk) // same reference
        })
      })
    })

    describe('to call StorageClerk#set()', () => {
      const cases = [
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_001',
          },
          tokenCases: [
            {
              token: 'token_001',
            },
            {
              token: 'token_002',
            },
          ],
        },
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_002',
          },
          tokenCases: [
            {
              token: 'token_001',
            },
            {
              token: 'token_002',
            },
          ],
        },
      ]

      describe.each(cases)('key: $params.key', ({ params, tokenCases }) => {
        const clerk = new AccessTokenClerk(params)

        test.each(tokenCases)('token: $token', ({ token }) => {
          const setSpy = jest.spyOn(params.storage, 'set')

          clerk.recordToken({
            token,
          })

          expect(setSpy)
            .toHaveBeenCalledWith(
              params.key,
              token
            )
        })
      })
    })
  })
})

describe('AccessTokenClerk', () => {
  describe('#saveToken()', () => {
    describe('to be boolean', () => {
      const cases = [
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_001',
          },
          truthyCases: [
            { token: 'token_001' },
            { token: 'token_002' },
          ],
          falsyCases: [
            { token: null },
          ],
        },
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_002',
          },
          truthyCases: [
            { token: 'token_001' },
            { token: 'token_002' },
          ],
          falsyCases: [
            { token: null },
          ],
        },
      ]

      describe.each(cases)('key: $params.key', ({ params, truthyCases, falsyCases }) => {
        const clerk = new AccessTokenClerk(params)

        describe('to be truthy', () => {
          test.each(truthyCases)('token: $token', ({ token }) => {
            const actual = clerk.saveToken({
              token,
            })

            expect(actual)
              .toBeTruthy()
          })
        })

        describe('to be falsy', () => {
          test.each(falsyCases)('token: $token', ({ token }) => {
            const actual = clerk.saveToken({
              token,
            })

            expect(actual)
              .toBeFalsy()
          })
        })
      })
    })

    describe('to call members', () => {
      const cases = [
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_001',
          },
          toCallRecordTokenCases: [
            { token: 'token_001' },
            { token: 'token_002' },
          ],
          toCallClearTokenCases: [
            { token: null },
          ],
        },
        {
          params: {
            storage: StorageClerk.createAsLocal(),
            key: 'access_token_002',
          },
          toCallRecordTokenCases: [
            { token: 'token_001' },
            { token: 'token_002' },
          ],
          toCallClearTokenCases: [
            { token: null },
          ],
        },
      ]

      describe.each(cases)('key: $params.key', ({ params, toCallRecordTokenCases, toCallClearTokenCases }) => {
        const clerk = new AccessTokenClerk(params)

        describe('to call #recordToken()', () => {
          test.each(toCallRecordTokenCases)('token: $token', ({ token }) => {
            const recordTokenSpy = jest.spyOn(clerk, 'recordToken')
            const clearTokenSpy = jest.spyOn(clerk, 'clearToken')

            clerk.saveToken({
              token,
            })

            expect(recordTokenSpy)
              .toHaveBeenCalledWith({
                token,
              })
            expect(clearTokenSpy)
              .toHaveBeenCalledTimes(0)
          })
        })

        describe('to call #clearToken()', () => {
          test.each(toCallClearTokenCases)('token: $token', ({ token }) => {
            const recordTokenSpy = jest.spyOn(clerk, 'recordToken')
            const clearTokenSpy = jest.spyOn(clerk, 'clearToken')

            clerk.saveToken({
              token,
            })

            expect(recordTokenSpy)
              .toHaveBeenCalledTimes(0)
            expect(clearTokenSpy)
              .toHaveBeenCalledWith()
          })
        })
      })
    })
  })
})

describe('AccessTokenClerk', () => {
  describe('#retrieveToken()', () => {
    describe('to be token', () => {
      const cases = [
        {
          params: {
            key: 'access_token_001',
          },
          expected: 'token_001',
        },
        {
          params: {
            key: 'access_token_002',
          },
          expected: 'token_002',
        },
      ]

      test.each(cases)('key: $params.key', ({ params, expected }) => {
        const storageClerk = StorageClerk.createAsLocal()
          .clearAll()
          .set('access_token_001', 'token_001')
          .set('access_token_002', 'token_002')

        const clerk = new AccessTokenClerk({
          storage: storageClerk,
          key: params.key,
        })

        const actual = clerk.retrieveToken()

        expect(actual)
          .toBe(expected)
      })
    })

    describe('to be null', () => {
      const cases = [
        {
          params: {
            key: 'access_token_003',
          },
        },
        {
          params: {
            key: 'access_token_004',
          },
        },
      ]

      test.each(cases)('key: $params.key', ({ params }) => {
        const storageClerk = StorageClerk.createAsLocal()
          .clearAll()
          .set('access_token_001', 'token_001')
          .set('access_token_002', 'token_002')

        const clerk = new AccessTokenClerk({
          storage: storageClerk,
          key: params.key,
        })

        const actual = clerk.retrieveToken()

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('AccessTokenClerk', () => {
  describe('#existsToken()', () => {
    describe('to be truthy', () => {
      const cases = [
        {
          params: {
            key: 'access_token_001',
          },
        },
        {
          params: {
            key: 'access_token_002',
          },
        },
      ]

      test.each(cases)('key: $params.key', ({ params }) => {
        const storageClerk = StorageClerk.createAsLocal()
          .clearAll()
          .set('access_token_001', 'token_001')
          .set('access_token_002', 'token_002')

        const clerk = new AccessTokenClerk({
          storage: storageClerk,
          key: params.key,
        })

        const actual = clerk.existsToken()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          params: {
            key: 'access_token_003',
          },
        },
        {
          params: {
            key: 'access_token_004',
          },
        },
      ]

      test.each(cases)('key: $params.key', ({ params }) => {
        const storageClerk = StorageClerk.createAsLocal()
          .clearAll()
          .set('access_token_001', 'token_001')
          .set('access_token_002', 'token_002')

        const clerk = new AccessTokenClerk({
          storage: storageClerk,
          key: params.key,
        })

        const actual = clerk.existsToken()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})
