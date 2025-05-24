import FuroMeta from '~/lib/tools/FuroMeta.js'

describe('FuroMeta', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#furo', () => {
        const cases = [
          {
            params: {
              furo: {
                pageTitle: 'Alpha Page',
                skipFilter: true,
              },
            },
          },
          {
            params: {
              furo: {
                pageTitle: 'Beta Page',
                skipFilter: false,
              },
            },
          },
          {
            params: {
              furo: {
                pageTitle: 'Gamma Page',
                // skipFilter: false,
              },
            },
          },
          {
            params: {
              furo: {
                // pageTitle: 'Delta Page',
                skipFilter: true,
              },
            },
          },
        ]

        test.each(cases)('pageTitle: $params.furo', ({ params }) => {
          const meta = new FuroMeta(params)

          expect(meta)
            .toHaveProperty('furo', params.furo)
        })
      })
    })
  })
})

describe('FuroMeta', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      /**
       * @type {Array<{
       *   params: {
       *     routeTo: Parameters<import('#app').RouteMiddleware>[0]
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            routeTo: {
              meta: {
                $furo: {
                  pageTitle: 'Page Title',
                },
              },
            },
          },
        },
        {
          params: {
            routeTo: {
              meta: {
                $furo: {},
              },
            },
          },
        },
        {
          params: {
            routeTo: {
              meta: {},
            },
          },
        },
      ])

      test.each(cases)('routeTo.meta: $params.routeTo.meta', ({ params }) => {
        const meta = FuroMeta.create(params)

        expect(meta)
          .toBeInstanceOf(FuroMeta)
      })
    })

    describe('to call extractFuroMetaFromRoute', () => {
      /**
       * @type {Array<{
       *   params: {
       *     routeTo: Parameters<import('#app').RouteMiddleware>[0]
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            routeTo: {
              meta: {
                $furo: {
                  pageTitle: 'Page Title',
                  skipFilter: true,
                },
              },
            },
          },
        },
        {
          params: {
            routeTo: {
              meta: {},
            },
          },
        },
      ])

      test.each(cases)('routeTo.meta: $params.routeTo.meta', ({ params }) => {
        const extractSpy = jest.spyOn(FuroMeta, 'extractFuroMetaFromRoute')

        FuroMeta.create(params)

        expect(extractSpy)
          .toHaveBeenCalledWith(params)
      })
    })

    describe('to call constructor', () => {
      /**
       * @type {Array<{
       *   params: {
       *     routeTo: Parameters<import('#app').RouteMiddleware>[0]
       *   }
       *   expected: {
       *     furo: {
       *       pageTitle?: string
       *       skipFilter?: boolean
       *     }
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            routeTo: {
              meta: {
                $furo: {
                  pageTitle: 'Alpha Page',
                  skipFilter: false,
                },
              },
            },
          },
          expected: {
            furo: {
              pageTitle: 'Alpha Page',
              skipFilter: false,
            },
          },
        },
        {
          params: {
            routeTo: {
              meta: {
                $furo: {
                  pageTitle: 'Beta Page',
                  skipFilter: true,
                },
              },
            },
          },
          expected: {
            furo: {
              pageTitle: 'Beta Page',
              skipFilter: true,
            },
          },
        },
        {
          params: {
            routeTo: {
              meta: {
                $furo: {
                  pageTitle: 'Gamma Page',
                },
              },
            },
          },
          expected: {
            furo: {
              pageTitle: 'Gamma Page',
            },
          },
        },
        {
          params: {
            routeTo: {
              meta: {
                $furo: {
                  skipFilter: true,
                },
              },
            },
          },
          expected: {
            furo: {
              skipFilter: true,
            },
          },
        },
        {
          params: {
            routeTo: {
              meta: {},
            },
          },
          expected: {
            furo: {},
          },
        },
      ])

      test.each(cases)('routeTo.meta: $params.routeTo.meta', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroMeta)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('FuroMeta', () => {
  describe('.extractFuroMetaFromRoute()', () => {
    describe('to return furo meta', () => {
      /**
       * @type {Array<{
       *   params: {
       *     routeTo: Parameters<import('#app').RouteMiddleware>[0]
       *   }
       *   expected: {
       *     pageTitle?: string
       *     skipFilter?: boolean
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            routeTo: {
              meta: {
                $furo: {
                  pageTitle: 'Page Title',
                  skipFilter: true,
                },
              },
            },
          },
          expected: {
            pageTitle: 'Page Title',
            skipFilter: true,
          },
        },
        {
          params: {
            routeTo: {
              meta: {},
            },
          },
          expected: {},
        },
      ])

      test.each(cases)('meta: $params.routeTo.meta', ({ params, expected }) => {
        const actual = FuroMeta.extractFuroMetaFromRoute(params)

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('FuroMeta', () => {
  describe('get:pageTitle', () => {
    describe('to return page title', () => {
      describe('with existing pageTitle', () => {
        const cases = [
          {
            params: {
              furo: {
                pageTitle: 'Alpha Page',
                skipFilter: true,
              },
            },
            expected: 'Alpha Page',
          },
          {
            params: {
              furo: {
                pageTitle: 'Beta Page',
                skipFilter: false,
              },
            },
            expected: 'Beta Page',
          },
        ]

        test.each(cases)('pageTitle: $params.furo.pageTitle', ({ params, expected }) => {
          const meta = new FuroMeta(params)

          const actual = meta.pageTitle

          expect(actual)
            .toBe(expected)
        })
      })

      describe('without pageTitle', () => {
        const cases = [
          {
            params: {
              furo: {
                skipFilter: true,
              },
            },
          },
          {
            params: {
              furo: {
                skipFilter: false,
              },
            },
          },
          {
            params: {
              furo: {},
            },
          },
        ]

        test.each(cases)('furo: $params.furo', ({ params }) => {
          const meta = new FuroMeta(params)

          const actual = meta.pageTitle

          expect(actual)
            .toBeNull()
        })
      })
    })
  })
})

describe('FuroMeta', () => {
  describe('get:skipFilter', () => {
    describe('to be truthy', () => {
      const cases = [
        {
          params: {
            furo: {
              skipFilter: true,
            },
          },
          expected: true,
        },
      ]

      test.each(cases)('furo: $params.furo', ({ params }) => {
        const meta = new FuroMeta(params)

        const actual = meta.skipFilter

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          params: {
            furo: {
              skipFilter: false,
            },
          },
        },
        {
          params: {
            furo: {},
          },
        },
      ]

      test.each(cases)('furo: $params.furo', ({ params }) => {
        const meta = new FuroMeta(params)

        const actual = meta.skipFilter

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})
