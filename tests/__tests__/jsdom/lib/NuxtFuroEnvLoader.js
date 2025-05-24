import path from 'path'
import dotenv from 'dotenv'

import NuxtFuroEnvLoader from '~/lib/tools/NuxtFuroEnvLoader.js'

describe('NuxtFuroEnvLoader', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#processEnv', () => {
        const cases = [
          {
            params: {
              processEnv: {
                API_URL: 'http://localhost:3000/graphql-alpha',
              },
            },
          },
          {
            params: {
              processEnv: {
                API_URL: 'http://localhost:3000/graphql-beta',
              },
            },
          },
        ]

        test.each(cases)('processEnv: $params.processEnv', ({ params }) => {
          const loader = new NuxtFuroEnvLoader(params)

          expect(loader)
            .toHaveProperty('processEnv', params.processEnv)
        })
      })
    })
  })
})

describe('NuxtFuroEnvLoader', () => {
  describe('create', () => {
    const cases = [
      {
        params: {
          processEnv: {
            API_URL: 'http://localhost:3000/graphql-alpha',
          },
        },
      },
      {
        params: {
          processEnv: {
            API_URL: 'http://localhost:3000/graphql-beta',
          },
        },
      },
    ]

    describe('to return instance of own class', () => {
      test.each(cases)('with params: $params', ({ params }) => {
        const loader = NuxtFuroEnvLoader.create(params)

        expect(loader)
          .toBeInstanceOf(NuxtFuroEnvLoader)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('with params: $params', ({ params }) => {
        const SpiedClass = globalThis.constructorSpy.spyOn(NuxtFuroEnvLoader)

        SpiedClass.create(params)

        expect(SpiedClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('NuxtFuroEnvLoader', () => {
  describe('#get:Ctor', () => {
    const cases = [
      {
        params: {
          processEnv: {
            NODE_ENV: 'development',
          },
        },
      },
      {
        params: {
          processEnv: {
            NODE_ENV: 'production',
          },
        },
      },
      {
        params: {
          processEnv: {
            NODE_ENV: 'live',
          },
        },
      },
    ]

    test.each(cases)('processEnv: $params.processEnv', ({ params }) => {
      const loader = NuxtFuroEnvLoader.create(params)

      const actual = loader.Ctor

      expect(actual)
        .toBe(NuxtFuroEnvLoader)
    })
  })
})

describe('NuxtFuroEnvLoader', () => {
  describe('.get:dotenv', () => {
    test('to return the dotenv module', () => {
      const actual = NuxtFuroEnvLoader.dotenv

      expect(actual)
        .toBe(dotenv)
    })
  })
})

describe('NuxtFuroEnvLoader', () => {
  describe('#resolveNodeEnv()', () => {
    describe('to return process.env.NODE_ENV as is', () => {
      const cases = [
        {
          params: {
            processEnv: {
              NODE_ENV: 'development',
            },
          },
          expected: 'development',
        },
        {
          params: {
            processEnv: {
              NODE_ENV: 'production',
            },
          },
          expected: 'production',
        },
        {
          params: {
            processEnv: {
              NODE_ENV: 'live',
            },
          },
          expected: 'live',
        },
        {
          params: {
            processEnv: {
              NODE_ENV: 'staging',
            },
          },
          expected: 'staging',
        },
      ]

      test.each(cases)('processEnv: $params.processEnv', ({ params, expected }) => {
        const loader = NuxtFuroEnvLoader.create(params)

        const actual = loader.resolveNodeEnv()

        expect(actual)
          .toBe(expected)
      })

      test('without params', () => {
        const expected = 'test'

        const loader = NuxtFuroEnvLoader.create()

        const actual = loader.resolveNodeEnv()

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('NuxtFuroEnvLoader', () => {
  describe('#resolveFileName()', () => {
    describe('to return the resolved .furo-env file path', () => {
      describe('when defined NODE_ENV', () => {
        const cases = [
          {
            params: {
              processEnv: {
                NODE_ENV: 'production',
              },
            },
            expected: '.furo-env',
          },
          {
            params: {
              processEnv: {
                NODE_ENV: 'development',
              },
            },
            expected: '.furo-env.development',
          },
          {
            params: {
              processEnv: {
                NODE_ENV: 'live',
              },
            },
            expected: '.furo-env.live',
          },
          {
            params: {
              processEnv: {
                NODE_ENV: 'staging',
              },
            },
            expected: '.furo-env.staging',
          },
        ]

        test.each(cases)('processEnv: $params.processEnv', ({ params, expected }) => {
          const loader = NuxtFuroEnvLoader.create(params)

          const actual = loader.resolveFileName()

          expect(actual)
            .toBe(expected)
        })
      })

      describe('when undefined NODE_ENV', () => {
        /**
         * @type {Array<{
         *   params: {
         *     processEnv: Record<string, any>
         *   }
         * }>}
         */
        const cases = [
          {
            params: {
              processEnv: {
                // NODE_ENV: 'production',
              },
            },
          },
          {
            params: {
              processEnv: {
                NODE_ENV: null,
              },
            },
          },
          {
            params: {
              processEnv: {
                NODE_ENV: undefined,
              },
            },
          },
        ]

        test.each(cases)('NODE_ENV: $params.processEnv.NODE_ENV', ({ params }) => {
          const expected = '.furo-env.development'

          const loader = NuxtFuroEnvLoader.create(params)

          const actual = loader.resolveFileName()

          expect(actual)
            .toBe(expected)
        })
      })
    })
  })
})

describe('NuxtFuroEnvLoader', () => {
  describe('#resolveFilePath()', () => {
    describe('to return the resolved .furo-env file path', () => {
      const dirName = process.cwd()

      describe('when defined NODE_ENV', () => {
        const cases = [
          {
            params: {
              processEnv: {
                NODE_ENV: 'production',
              },
            },
            expected: path.join(dirName, '.furo-env'),
          },
          {
            params: {
              processEnv: {
                NODE_ENV: 'development',
              },
            },
            expected: path.join(dirName, '.furo-env.development'),
          },
          {
            params: {
              processEnv: {
                NODE_ENV: 'live',
              },
            },
            expected: path.join(dirName, '.furo-env.live'),
          },
          {
            params: {
              processEnv: {
                NODE_ENV: 'staging',
              },
            },
            expected: path.join(dirName, '.furo-env.staging'),
          },
        ]

        test.each(cases)('processEnv: $params.processEnv', ({ params, expected }) => {
          const loader = NuxtFuroEnvLoader.create(params)

          const actual = loader.resolveFilePath()

          expect(actual)
            .toBe(expected)
        })
      })

      describe('when undefined NODE_ENV', () => {
        /**
         * @type {Array<{
         *   params: {
         *     processEnv: Record<string, any>
         *   }
         * }>}
         */
        const cases = [
          {
            params: {
              processEnv: {
                // NODE_ENV: 'production',
              },
            },
          },
          {
            params: {
              processEnv: {
                NODE_ENV: null,
              },
            },
          },
          {
            params: {
              processEnv: {
                NODE_ENV: undefined,
              },
            },
          },
        ]

        test.each(cases)('NODE_ENV: $params.processEnv.NODE_ENV', ({ params }) => {
          const expected = path.join(dirName, '.furo-env.development')
          const loader = NuxtFuroEnvLoader.create(params)

          const actual = loader.resolveFilePath()

          expect(actual)
            .toBe(expected)
        })
      })
    })
  })
})

describe('NuxtFuroEnvLoader', () => {
  describe('#loadEnv()', () => {
    describe('to return config object', () => {
      describe('when presented env file', () => {
        const cases = [
          {
            params: {
              processEnv: {
                NODE_ENV: 'development',
              },
            },
            expected: {
              ENDPOINT_URL: 'http://localhost:3900/graphql-customer',
              WEBSOCKET_URL: 'ws://localhost:3900/graphql-customer',
            },
          },
          {
            params: {
              processEnv: {
                NODE_ENV: 'test',
              },
            },
            expected: {
              ENDPOINT_URL: 'http://localhost:3900/graphql-stub',
              TEST_MESSAGE: 'I am .furo-env.test',
            },
          },
        ]

        test.each(cases)('NODE_ENV: $params.processEnv.NODE_ENV', ({ params, expected }) => {
          const loader = NuxtFuroEnvLoader.create(params)

          const actual = loader.loadEnv()

          expect(actual)
            .toEqual(expected)
        })
      })

      describe('when no env file', () => {
        /**
         * @type {Array<{
         *   params: {
         *     processEnv: Record<string, any>
         *   }
         * }>}
         */
        const cases = [
          {
            params: {
              processEnv: {
                NODE_ENV: 'production',
              },
            },
          },
          {
            params: {
              processEnv: {
                NODE_ENV: 'extra',
              },
            },
          },
        ]

        test.each(cases)('NODE_ENV: $params.processEnv.NODE_ENV', ({ params }) => {
          const expected = {}

          const loader = NuxtFuroEnvLoader.create(params)

          const actual = loader.loadEnv()

          expect(actual)
            .toEqual(expected)
        })
      })
    })
  })
})
