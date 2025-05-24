import FuroPaginationContext from '~/lib/contexts/concretes/FuroPaginationContext.js'

import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'
import FuroPageItemContext from '~/lib/contexts/concretes/FuroPageItemContext.js'

describe('FuroPaginationContext', () => {
  describe('super class', () => {
    test('to be BaseFuroContext', () => {
      const actual = FuroPaginationContext.prototype

      expect(actual)
        .toBeInstanceOf(BaseFuroContext)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      const propsMock = {}
      const componentContextMock = {
        attrs: {},
        emit: () => {},
        expose: () => {},
        slots: {},
      }

      describe('#route', () => {
        /**
         * @type {Array<{
         *   params: {
         *     route: import('vue-router').RouteLocationNormalized
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              route: {
                query: {
                  alpha: '1',
                  beta: '2',
                },
              },
            },
          },
          {
            params: {
              route: {
                query: {
                  gamma: '3',
                  delta: '4',
                },
              },
            },
          },
        ])

        test.each(cases)('route: $params.route', ({ params }) => {
          /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            route: params.route,
          }

          const context = new FuroPaginationContext(args)

          expect(context)
            .toHaveProperty('route', params.route)
        })
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     route: import('vue-router').RouteLocationNormalized
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              pagination: {
                limit: 10,
                totalRecords: 50,
              },
              pageKey: 'pg',
              maxPageRange: 3,
            },
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            route: {
              query: {},
            },
          },
        },
        {
          params: {
            props: {
              pagination: {
                limit: 20,
                totalRecords: 60,
              },
              pageKey: 'p',
              maxPageRange: 5,
            },
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            route: {
              query: {
                alpha: '1',
                beta: '2',
              },
            },
          },
        },
        {
          params: {
            props: {
              pagination: {
                limit: 30,
                totalRecords: 70,
              },
              // pageKey: 'page',
              maxPageRange: 7,
            },
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            route: {
              query: {
                gamma: '3',
                delta: '4',
              },
            },
          },
        },
        {
          params: {
            props: {
              pagination: {
                limit: 40,
                totalRecords: 80,
              },
              pageKey: 'pg',
              // maxPageRange: 9,
            },
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            route: {
              query: {
                epsilon: '5',
                zeta: '6',
              },
            },
          },
        },
        {
          params: {
            props: {
              pagination: {
                limit: 50,
                totalRecords: 90,
              },
              // pageKey: 'page',
              // maxPageRange: 10,
            },
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            route: {
              query: {
                eta: '7',
                theta: '8',
              },
            },
          },
        },
      ])

      test.each(cases)('pagination: $params.props.pagination', ({ params }) => {
        const actual = FuroPaginationContext.create(params)

        expect(actual)
          .toBeInstanceOf(FuroPaginationContext)
      })
    })

    describe('to call constructor', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     route: import('vue-router').RouteLocationNormalized
       *   }
       *   expected: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     route: import('vue-router').RouteLocationNormalized
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              pagination: {
                limit: 10,
                totalRecords: 100,
              },
              pageKey: 'page',
              maxPageRange: 3,
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            route: {
              query: {},
            },
          },
          expected: {
            props: {
              pagination: {
                limit: 10,
                totalRecords: 100,
              },
              pageKey: 'page',
              maxPageRange: 3,
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: expect.any(Function),
              expose: expect.any(Function),
              slots: {},
            },
            route: {
              query: {},
            },
          },
        },
        {
          params: {
            props: {
              pagination: {
                limit: 20,
                totalRecords: 101,
              },
              pageKey: 'pg',
              // maxPageRange: 5,
            },
            componentContext: {
              attrs: {
                beta: 2,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            route: {
              query: {
                pg: '2',
                alpha: '1',
                beta: '2',
              },
            },
          },
          expected: {
            props: {
              pagination: {
                limit: 20,
                totalRecords: 101,
              },
              pageKey: 'pg',
              // maxPageRange: 5,
            },
            componentContext: {
              attrs: {
                beta: 2,
              },
              emit: expect.any(Function),
              expose: expect.any(Function),
              slots: {},
            },
            route: {
              query: {
                pg: '2',
                alpha: '1',
                beta: '2',
              },
            },
          },
        },
        {
          params: {
            props: {
              pagination: {
                limit: 30,
                totalRecords: 102,
              },
              pageKey: 'px',
              maxPageRange: 7,
            },
            componentContext: {
              attrs: {
                gamma: 3,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            route: {
              query: {
                px: '3',
                gamma: '3',
                delta: '4',
              },
            },
          },
          expected: {
            props: {
              pagination: {
                limit: 30,
                totalRecords: 102,
              },
              pageKey: 'px',
              maxPageRange: 7,
            },
            componentContext: {
              attrs: {
                gamma: 3,
              },
              emit: expect.any(Function),
              expose: expect.any(Function),
              slots: {},
            },
            route: {
              query: {
                px: '3',
                gamma: '3',
                delta: '4',
              },
            },
          },
        },
        {
          params: {
            props: {
              pagination: {
                limit: 40,
                totalRecords: 103,
              },
              maxPageRange: 9,
              // pageKey: undefined,
            },
            componentContext: {
              attrs: {
                delta: 4,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            route: {
              query: {
                page: '4',
                epsilon: '5',
                zeta: '6',
              },
            },
          },
          expected: {
            props: {
              pagination: {
                limit: 40,
                totalRecords: 103,
              },
              maxPageRange: 9,
              // pageKey: undefined,
            },
            componentContext: {
              attrs: {
                delta: 4,
              },
              emit: expect.any(Function),
              expose: expect.any(Function),
              slots: {},
            },
            route: {
              query: {
                page: '4',
                epsilon: '5',
                zeta: '6',
              },
            },
          },
        },
      ])

      test.each(cases)('pagination: $params.props.pagination', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroPaginationContext)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('.get:EMIT_EVENT_NAME', () => {
    test('to be fixed value', () => {
      const expected = {
        CHANGE_PAGE: 'changePage',
      }

      const actual = FuroPaginationContext.EMIT_EVENT_NAME

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#get:pageKey', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /** @type {import('vue-router').RouteLocationNormalized} */
    const routeMock = /** @type {*} */ ({
      query: {},
    })

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *   }
     *   expected: string
     * }>}
     */
    const cases = [
      {
        params: {
          props: {
            // pageKey: 'page',
          },
        },
        expected: 'page',
      },
      {
        params: {
          props: {
            pageKey: 'page',
          },
        },
        expected: 'page',
      },
      {
        params: {
          props: {
            pageKey: 'pg',
          },
        },
        expected: 'pg',
      },
    ]

    test.each(cases)('props: $params.props', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: routeMock,
      }

      const context = new FuroPaginationContext(args)

      const actual = context.pageKey

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#get:maxPageRange', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /** @type {import('vue-router').RouteLocationNormalized} */
    const routeMock = /** @type {*} */ ({
      query: {},
    })

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *   }
     *   expected: number
     * }>}
     */
    const cases = [
      {
        params: {
          props: {
            // pageKey: 'page',
          },
        },
        expected: 5,
      },
      {
        params: {
          props: {
            maxPageRange: 7,
          },
        },
        expected: 7,
      },
      {
        params: {
          props: {
            maxPageRange: 3,
          },
        },
        expected: 3,
      },
    ]

    test.each(cases)('props: $params.props', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: routeMock,
      }

      const context = new FuroPaginationContext(args)

      const actual = context.maxPageRange

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#get:pagination', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /** @type {import('vue-router').RouteLocationNormalized} */
    const routeMock = /** @type {*} */ ({
      query: {},
    })

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *   }
     *   expected: {
     *     limit?: number
     *     totalRecords?: number
     *   }
     * }>}
     */
    const cases = [
      {
        params: {
          props: {
            pagination: {
              limit: 10,
              totalRecords: 100,
            },
          },
        },
        expected: {
          limit: 10,
          totalRecords: 100,
        },
      },
      {
        params: {
          props: {
            pagination: {
              limit: 20,
              totalRecords: 200,
            },
          },
        },
        expected: {
          limit: 20,
          totalRecords: 200,
        },
      },
      {
        params: {
          props: {
            // pagination: {},
          },
        },
        expected: {},
      },
      {
        params: {
          props: {
            pagination: null,
          },
        },
        expected: {},
      },
    ]

    test.each(cases)('props: $params.props', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: routeMock,
      }

      const context = new FuroPaginationContext(args)

      const actual = context.pagination

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#get:pageLimit', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /** @type {import('vue-router').RouteLocationNormalized} */
    const routeMock = /** @type {*} */ ({
      query: {},
    })

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *   }
     *   expected: number
     * }>}
     */
    const cases = [
      {
        params: {
          props: {
            pagination: {
              limit: 5,
              totalRecords: 100,
            },
          },
        },
        expected: 5,
      },
      {
        params: {
          props: {
            pagination: {
              limit: 10,
              totalRecords: 200,
            },
          },
        },
        expected: 10,
      },
      {
        params: {
          props: {
            // pagination: {},
          },
        },
        expected: 20,
      },
      {
        params: {
          props: {
            pagination: null,
          },
        },
        expected: 20,
      },
    ]

    test.each(cases)('props: $params.props', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: routeMock,
      }

      const context = new FuroPaginationContext(args)

      const actual = context.pageLimit

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#get:totalRecordNumber', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /** @type {import('vue-router').RouteLocationNormalized} */
    const routeMock = /** @type {*} */ ({
      query: {},
    })

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *   }
     *   expected: number
     * }>}
     */
    const cases = [
      {
        params: {
          props: {
            pagination: {
              limit: 5,
              totalRecords: 100,
            },
          },
        },
        expected: 100,
      },
      {
        params: {
          props: {
            pagination: {
              limit: 10,
              totalRecords: 200,
            },
          },
        },
        expected: 200,
      },
      {
        params: {
          props: {
            // pagination: {},
          },
        },
        expected: 0,
      },
      {
        params: {
          props: {
            pagination: null,
          },
        },
        expected: 0,
      },
    ]

    test.each(cases)('props: $params.props', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: routeMock,
      }

      const context = new FuroPaginationContext(args)

      const actual = context.totalRecordNumber

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#calculateLastPage()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /** @type {import('vue-router').RouteLocationNormalized} */
    const routeMock = /** @type {*} */ ({
      query: {},
    })

    describe('to calculate last page', () => {
      const limitCases = [
        {
          params: {
            limit: 5,
          },
          cases: [
            { totalRecords: 1, expected: 1 },
            { totalRecords: 3, expected: 1 },
            { totalRecords: 5, expected: 1 },
            { totalRecords: 6, expected: 2 },
            { totalRecords: 10, expected: 2 },
            { totalRecords: 11, expected: 3 },
            { totalRecords: 15, expected: 3 },
            { totalRecords: 50, expected: 10 },
            { totalRecords: 100, expected: 20 },
            { totalRecords: 150, expected: 30 },
          ],
        },
        {
          params: {
            limit: 10,
          },
          cases: [
            { totalRecords: 1, expected: 1 },
            { totalRecords: 5, expected: 1 },
            { totalRecords: 10, expected: 1 },
            { totalRecords: 11, expected: 2 },
            { totalRecords: 20, expected: 2 },
            { totalRecords: 21, expected: 3 },
            { totalRecords: 30, expected: 3 },
            { totalRecords: 50, expected: 5 },
            { totalRecords: 100, expected: 10 },
            { totalRecords: 150, expected: 15 },
          ],
        },
      ]

      describe.each(limitCases)('limit: $params.limit', ({ params, cases }) => {
        test.each(cases)('totalRecords: $totalRecords', ({ totalRecords, expected }) => {
          /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
          const args = {
            props: {
              pagination: {
                limit: params.limit,
                totalRecords,
              },
            },
            componentContext: componentContextMock,
            route: routeMock,
          }

          const context = new FuroPaginationContext(args)

          const actual = context.calculateLastPage()

          expect(actual)
            .toBe(expected)
        })
      })
    })

    describe('to calculate last page with invalid limit', () => {
      const limitCases = [
        {
          params: {
            limit: 0,
          },
        },
        {
          params: {
            limit: -1,
          },
        },
      ]

      describe.each(limitCases)('limit: $params.limit', ({ params }) => {
        const cases = [
          { totalRecords: 1 },
          { totalRecords: 3 },
          { totalRecords: 5 },
          { totalRecords: 6 },
          { totalRecords: 10 },
          { totalRecords: 11 },
          { totalRecords: 15 },
          { totalRecords: 50 },
          { totalRecords: 100 },
          { totalRecords: 150 },
        ]

        test.each(cases)('totalRecords: $totalRecords', ({ totalRecords }) => {
          const expected = 1

          /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
          const args = {
            props: {
              pagination: {
                limit: params.limit,
                totalRecords,
              },
            },
            componentContext: componentContextMock,
            route: routeMock,
          }

          const context = new FuroPaginationContext(args)

          const actual = context.calculateLastPage()

          expect(actual)
            .toBe(expected)
        })
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#calculateRangeStartedPage()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    describe('with (lastPage > maxPageRange)', () => {
      const cases = [
        {
          params: {
            maxPageRange: 5,
          },
          lastPageCases: [
            {
              props: {
                pagination: { // lastPage: 6, max starting page: 2
                  limit: 5,
                  totalRecords: 28,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: 1 },
                { query: { page: 2 }, expected: 1 },
                { query: { page: 3 }, expected: 1 },
                { query: { page: 4 }, expected: 2 },
                { query: { page: 5 }, expected: 2 },
                { query: { page: 6 }, expected: 2 },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 7, max starting page: 3
                  limit: 5,
                  totalRecords: 32,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: 1 },
                { query: { page: 2 }, expected: 1 },
                { query: { page: 3 }, expected: 1 },
                { query: { page: 4 }, expected: 2 },
                { query: { page: 5 }, expected: 3 },
                { query: { page: 6 }, expected: 3 },
                { query: { page: 7 }, expected: 3 },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 8, max starting page: 4
                  limit: 5,
                  totalRecords: 38,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: 1 },
                { query: { page: 2 }, expected: 1 },
                { query: { page: 3 }, expected: 1 },
                { query: { page: 4 }, expected: 2 },
                { query: { page: 5 }, expected: 3 },
                { query: { page: 6 }, expected: 4 },
                { query: { page: 7 }, expected: 4 },
                { query: { page: 8 }, expected: 4 },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 9, max starting page: 5
                  limit: 5,
                  totalRecords: 44,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: 1 },
                { query: { page: 2 }, expected: 1 },
                { query: { page: 3 }, expected: 1 },
                { query: { page: 4 }, expected: 2 },
                { query: { page: 5 }, expected: 3 },
                { query: { page: 6 }, expected: 4 },
                { query: { page: 7 }, expected: 5 },
                { query: { page: 8 }, expected: 5 },
                { query: { page: 9 }, expected: 5 },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 10, max starting page: 6
                  limit: 5,
                  totalRecords: 50,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: 1 },
                { query: { page: 2 }, expected: 1 },
                { query: { page: 3 }, expected: 1 },
                { query: { page: 4 }, expected: 2 },
                { query: { page: 5 }, expected: 3 },
                { query: { page: 6 }, expected: 4 },
                { query: { page: 7 }, expected: 5 },
                { query: { page: 8 }, expected: 6 },
                { query: { page: 9 }, expected: 6 },
                { query: { page: 10 }, expected: 6 },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 11, max starting page: 7
                  limit: 5,
                  totalRecords: 51,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: 1 },
                { query: { page: 2 }, expected: 1 },
                { query: { page: 3 }, expected: 1 },
                { query: { page: 4 }, expected: 2 },
                { query: { page: 5 }, expected: 3 },
                { query: { page: 6 }, expected: 4 },
                { query: { page: 7 }, expected: 5 },
                { query: { page: 8 }, expected: 6 },
                { query: { page: 9 }, expected: 7 },
                { query: { page: 10 }, expected: 7 },
                { query: { page: 11 }, expected: 7 },
              ],
            },
          ],
        },
        {
          params: {
            maxPageRange: 3,
          },
          lastPageCases: [
            {
              props: {
                pagination: { // lastPage: 4, max starting page: 2
                  limit: 5,
                  totalRecords: 16,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: 1 },
                { query: { page: 2 }, expected: 1 },
                { query: { page: 3 }, expected: 2 },
                { query: { page: 4 }, expected: 2 },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 5, max starting page: 3
                  limit: 5,
                  totalRecords: 22,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: 1 },
                { query: { page: 2 }, expected: 1 },
                { query: { page: 3 }, expected: 2 },
                { query: { page: 4 }, expected: 3 },
                { query: { page: 5 }, expected: 3 },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 6, max starting page: 4
                  limit: 5,
                  totalRecords: 29,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: 1 },
                { query: { page: 2 }, expected: 1 },
                { query: { page: 3 }, expected: 2 },
                { query: { page: 4 }, expected: 3 },
                { query: { page: 5 }, expected: 4 },
                { query: { page: 6 }, expected: 4 },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 7, max starting page: 5
                  limit: 5,
                  totalRecords: 35,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: 1 },
                { query: { page: 2 }, expected: 1 },
                { query: { page: 3 }, expected: 2 },
                { query: { page: 4 }, expected: 3 },
                { query: { page: 5 }, expected: 4 },
                { query: { page: 6 }, expected: 5 },
                { query: { page: 7 }, expected: 5 },
              ],
            },
          ],
        },
      ]

      describe.each(cases)('maxPageRange: $params.maxPageRange', ({ params, lastPageCases }) => {
        describe.each(lastPageCases)('pagination: $props.pagination', ({ props, currentPageCases }) => {
          test.each(currentPageCases)('query: $query', ({ query, expected }) => {
            /** @type {import('vue').ComponentCustomProps} */
            const propsArg = /** @type {*} */ ({
              pagination: props.pagination,
              maxPageRange: params.maxPageRange,
            })

            /** @type {import('vue-router').RouteLocationNormalized} */
            const routeArg = /** @type {*} */ ({
              query,
            })

            /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
            const args = {
              props: propsArg,
              componentContext: componentContextMock,
              route: routeArg,
            }

            const context = new FuroPaginationContext(args)

            const actual = context.calculateRangeStartedPage()

            expect(actual)
              .toBe(expected)
          })
        })
      })
    })

    describe('with (lastPage <= maxPageRange)', () => {
      const cases = [
        {
          params: {
            maxPageRange: 5,
          },
          lastPageCases: [
            {
              props: {
                pagination: { // lastPage: 5
                  limit: 7,
                  totalRecords: 33,
                },
              },
              currentPageCases: [
                { query: { page: 1 } },
                { query: { page: 2 } },
                { query: { page: 3 } },
                { query: { page: 4 } },
                { query: { page: 5 } },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 4
                  limit: 8,
                  totalRecords: 25,
                },
              },
              currentPageCases: [
                { query: { page: 1 } },
                { query: { page: 2 } },
                { query: { page: 3 } },
                { query: { page: 4 } },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 3
                  limit: 9,
                  totalRecords: 22,
                },
              },
              currentPageCases: [
                { query: { page: 1 } },
                { query: { page: 2 } },
                { query: { page: 3 } },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 2
                  limit: 10,
                  totalRecords: 15,
                },
              },
              currentPageCases: [
                { query: { page: 1 } },
                { query: { page: 2 } },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 1
                  limit: 11,
                  totalRecords: 10,
                },
              },
              currentPageCases: [
                { query: { page: 1 } },
              ],
            },
          ],
        },
        {
          params: {
            maxPageRange: 3,
          },
          lastPageCases: [
            {
              props: {
                pagination: { // lastPage: 3
                  limit: 7,
                  totalRecords: 20,
                },
              },
              currentPageCases: [
                { query: { page: 1 } },
                { query: { page: 2 } },
                { query: { page: 3 } },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 2
                  limit: 8,
                  totalRecords: 16,
                },
              },
              currentPageCases: [
                { query: { page: 1 } },
                { query: { page: 2 } },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 1
                  limit: 9,
                  totalRecords: 7,
                },
              },
              currentPageCases: [
                { query: { page: 1 } },
              ],
            },
          ],
        },
      ]

      describe.each(cases)('maxPageRange: $params.maxPageRange', ({ params, lastPageCases }) => {
        describe.each(lastPageCases)('pagination: $props.pagination', ({ props, currentPageCases }) => {
          test.each(currentPageCases)('query: $query', ({ query }) => {
            const expected = 1

            /** @type {import('vue').ComponentCustomProps} */
            const propsArg = /** @type {*} */ ({
              pagination: props.pagination,
              maxPageRange: params.maxPageRange,
            })

            /** @type {import('vue-router').RouteLocationNormalized} */
            const routeArg = /** @type {*} */ ({
              query,
            })

            /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
            const args = {
              props: propsArg,
              componentContext: componentContextMock,
              route: routeArg,
            }

            const context = new FuroPaginationContext(args)

            const actual = context.calculateRangeStartedPage()

            expect(actual)
              .toBe(expected)
          })
        })
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#generateRangePages()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    describe('with (lastPage > maxPageRange)', () => {
      const cases = [
        {
          params: {
            maxPageRange: 5,
          },
          lastPageCases: [
            {
              props: {
                pagination: { // lastPage: 6, max starting page: 2
                  limit: 5,
                  totalRecords: 28,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 2 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 3 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 4 }, expected: [2, 3, 4, 5, 6] },
                { query: { page: 5 }, expected: [2, 3, 4, 5, 6] },
                { query: { page: 6 }, expected: [2, 3, 4, 5, 6] },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 7, max starting page: 3
                  limit: 6,
                  totalRecords: 38,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 2 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 3 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 4 }, expected: [2, 3, 4, 5, 6] },
                { query: { page: 5 }, expected: [3, 4, 5, 6, 7] },
                { query: { page: 6 }, expected: [3, 4, 5, 6, 7] },
                { query: { page: 7 }, expected: [3, 4, 5, 6, 7] },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 8, max starting page: 4
                  limit: 7,
                  totalRecords: 55,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 2 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 3 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 4 }, expected: [2, 3, 4, 5, 6] },
                { query: { page: 5 }, expected: [3, 4, 5, 6, 7] },
                { query: { page: 6 }, expected: [4, 5, 6, 7, 8] },
                { query: { page: 7 }, expected: [4, 5, 6, 7, 8] },
                { query: { page: 8 }, expected: [4, 5, 6, 7, 8] },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 9, max starting page: 5
                  limit: 8,
                  totalRecords: 72,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 2 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 3 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 4 }, expected: [2, 3, 4, 5, 6] },
                { query: { page: 5 }, expected: [3, 4, 5, 6, 7] },
                { query: { page: 6 }, expected: [4, 5, 6, 7, 8] },
                { query: { page: 7 }, expected: [5, 6, 7, 8, 9] },
                { query: { page: 8 }, expected: [5, 6, 7, 8, 9] },
                { query: { page: 9 }, expected: [5, 6, 7, 8, 9] },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 10, max starting page: 6
                  limit: 9,
                  totalRecords: 82,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 2 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 3 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 4 }, expected: [2, 3, 4, 5, 6] },
                { query: { page: 5 }, expected: [3, 4, 5, 6, 7] },
                { query: { page: 6 }, expected: [4, 5, 6, 7, 8] },
                { query: { page: 7 }, expected: [5, 6, 7, 8, 9] },
                { query: { page: 8 }, expected: [6, 7, 8, 9, 10] },
                { query: { page: 9 }, expected: [6, 7, 8, 9, 10] },
                { query: { page: 10 }, expected: [6, 7, 8, 9, 10] },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 11, max starting page: 7
                  limit: 10,
                  totalRecords: 101,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 2 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 3 }, expected: [1, 2, 3, 4, 5] },
                { query: { page: 4 }, expected: [2, 3, 4, 5, 6] },
                { query: { page: 5 }, expected: [3, 4, 5, 6, 7] },
                { query: { page: 6 }, expected: [4, 5, 6, 7, 8] },
                { query: { page: 7 }, expected: [5, 6, 7, 8, 9] },
                { query: { page: 8 }, expected: [6, 7, 8, 9, 10] },
                { query: { page: 9 }, expected: [7, 8, 9, 10, 11] },
                { query: { page: 10 }, expected: [7, 8, 9, 10, 11] },
                { query: { page: 11 }, expected: [7, 8, 9, 10, 11] },
              ],
            },
          ],
        },
        {
          params: {
            maxPageRange: 3,
          },
          lastPageCases: [
            {
              props: {
                pagination: { // lastPage: 4, max starting page: 2
                  limit: 5,
                  totalRecords: 16,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: [1, 2, 3] },
                { query: { page: 2 }, expected: [1, 2, 3] },
                { query: { page: 3 }, expected: [2, 3, 4] },
                { query: { page: 4 }, expected: [2, 3, 4] },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 5, max starting page: 3
                  limit: 6,
                  totalRecords: 28,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: [1, 2, 3] },
                { query: { page: 2 }, expected: [1, 2, 3] },
                { query: { page: 3 }, expected: [2, 3, 4] },
                { query: { page: 4 }, expected: [3, 4, 5] },
                { query: { page: 5 }, expected: [3, 4, 5] },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 6, max starting page: 4
                  limit: 7,
                  totalRecords: 38,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: [1, 2, 3] },
                { query: { page: 2 }, expected: [1, 2, 3] },
                { query: { page: 3 }, expected: [2, 3, 4] },
                { query: { page: 4 }, expected: [3, 4, 5] },
                { query: { page: 5 }, expected: [4, 5, 6] },
                { query: { page: 6 }, expected: [4, 5, 6] },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 7, max starting page: 5
                  limit: 8,
                  totalRecords: 49,
                },
              },
              currentPageCases: [
                { query: { page: 1 }, expected: [1, 2, 3] },
                { query: { page: 2 }, expected: [1, 2, 3] },
                { query: { page: 3 }, expected: [2, 3, 4] },
                { query: { page: 4 }, expected: [3, 4, 5] },
                { query: { page: 5 }, expected: [4, 5, 6] },
                { query: { page: 6 }, expected: [5, 6, 7] },
                { query: { page: 7 }, expected: [5, 6, 7] },
              ],
            },
          ],
        },
      ]

      describe.each(cases)('maxPageRange: $params.maxPageRange', ({ params, lastPageCases }) => {
        describe.each(lastPageCases)('pagination: $props.pagination', ({ props, currentPageCases }) => {
          test.each(currentPageCases)('query: $query', ({ query, expected }) => {
            /** @type {import('vue').ComponentCustomProps} */
            const propsArg = /** @type {*} */ ({
              pagination: props.pagination,
              maxPageRange: params.maxPageRange,
            })

            /** @type {import('vue-router').RouteLocationNormalized} */
            const routeArg = /** @type {*} */ ({
              query,
            })

            /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
            const args = {
              props: propsArg,
              componentContext: componentContextMock,
              route: routeArg,
            }

            const context = new FuroPaginationContext(args)

            const actual = context.generateRangePages()

            expect(actual)
              .toEqual(expected)
          })
        })
      })
    })

    describe('with (lastPage <= maxPageRange)', () => {
      const cases = [
        {
          params: {
            maxPageRange: 5,
          },
          lastPageCases: [
            {
              props: {
                pagination: { // lastPage: 5
                  limit: 5,
                  totalRecords: 24,
                },
              },
              expected: [1, 2, 3, 4, 5],
              currentPageCases: [
                { query: { page: 1 } },
                { query: { page: 2 } },
                { query: { page: 3 } },
                { query: { page: 4 } },
                { query: { page: 5 } },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 4
                  limit: 6,
                  totalRecords: 24,
                },
              },
              expected: [1, 2, 3, 4],
              currentPageCases: [
                { query: { page: 1 } },
                { query: { page: 2 } },
                { query: { page: 3 } },
                { query: { page: 4 } },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 3
                  limit: 7,
                  totalRecords: 15,
                },
              },
              expected: [1, 2, 3],
              currentPageCases: [
                { query: { page: 1 } },
                { query: { page: 2 } },
                { query: { page: 3 } },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 2
                  limit: 8,
                  totalRecords: 9,
                },
              },
              expected: [1, 2],
              currentPageCases: [
                { query: { page: 1 } },
                { query: { page: 2 } },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 1
                  limit: 9,
                  totalRecords: 5,
                },
              },
              expected: [1],
              currentPageCases: [
                { query: { page: 1 } },
              ],
            },
          ],
        },
        {
          params: {
            maxPageRange: 3,
          },
          lastPageCases: [
            {
              props: {
                pagination: { // lastPage: 3
                  limit: 5,
                  totalRecords: 13,
                },
              },
              expected: [1, 2, 3],
              currentPageCases: [
                { query: { page: 1 } },
                { query: { page: 2 } },
                { query: { page: 3 } },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 2
                  limit: 6,
                  totalRecords: 10,
                },
              },
              expected: [1, 2],
              currentPageCases: [
                { query: { page: 1 } },
                { query: { page: 2 } },
              ],
            },
            {
              props: {
                pagination: { // lastPage: 1
                  limit: 7,
                  totalRecords: 5,
                },
              },
              expected: [1],
              currentPageCases: [
                { query: { page: 1 } },
              ],
            },
          ],
        },
      ]

      describe.each(cases)('maxPageRange: $params.maxPageRange', ({ params, lastPageCases }) => {
        describe.each(lastPageCases)('pagination: $props.pagination', ({ props, expected, currentPageCases }) => {
          test.each(currentPageCases)('query: $query', ({ query }) => {
            /** @type {import('vue').ComponentCustomProps} */
            const propsArg = /** @type {*} */ ({
              pagination: props.pagination,
              maxPageRange: params.maxPageRange,
            })

            /** @type {import('vue-router').RouteLocationNormalized} */
            const routeArg = /** @type {*} */ ({
              query,
            })

            /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
            const args = {
              props: propsArg,
              componentContext: componentContextMock,
              route: routeArg,
            }

            const context = new FuroPaginationContext(args)

            const actual = context.generateRangePages()

            expect(actual)
              .toEqual(expected)
          })
        })
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#createURLSearchParamsFromRoute()', () => {
    const propsMock = {}

    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /**
     * @type {Array<{
     *   params: {
     *     route: import('vue-router').RouteLocationNormalized
     *   }
     *   expected: URLSearchParams
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          route: {
            query: {},
          },
        },
        expected: new URLSearchParams(),
      },
      {
        params: {
          route: {
            query: {
              page: '2',
            },
          },
        },
        expected: new URLSearchParams({
          page: '2',
        }),
      },
      {
        params: {
          route: {
            query: {
              page: '3',
              alpha: '111',
            },
          },
        },
        expected: new URLSearchParams({
          page: '3',
          alpha: '111',
        }),
      },
      {
        params: {
          route: {
            query: {
              pg: '4',
              alpha: '10001',
              beta: '20002',
            },
          },
        },
        expected: new URLSearchParams({
          pg: '4',
          alpha: '10001',
          beta: '20002',
        }),
      },
    ])

    test.each(cases)('query: $params.route.query', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: propsMock,
        componentContext: componentContextMock,
        route: params.route,
      }
      const context = new FuroPaginationContext(args)

      const actual = context.createURLSearchParamsFromRoute()

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#resolveCurrentPage()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *   }
     *   cases: Array<{
     *     route: import('vue-router').RouteLocationNormalized
     *     expected: number
     *   }>
     * }>}
     */
    const pageKeyCases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            pageKey: 'page',
          },
        },
        cases: [
          {
            route: {
              query: {
                page: 19,
              },
            },
            expected: 19,
          },
          {
            route: {
              query: {
                page: 23,
              },
            },
            expected: 23,
          },
          {
            route: {
              query: {
                // page: 1,
              },
            },
            expected: 1,
          },
          {
            route: {
              query: {
                pg: 999,
              },
            },
            expected: 1,
          },
        ],
      },
      {
        params: {
          props: {
            pageKey: 'pg',
          },
        },
        cases: [
          {
            route: {
              query: {
                pg: 19,
              },
            },
            expected: 19,
          },
          {
            route: {
              query: {
                pg: 23,
              },
            },
            expected: 23,
          },
          {
            route: {
              query: {
                // pg: 1,
              },
            },
            expected: 1,
          },
          {
            route: {
              query: {
                page: 999,
              },
            },
            expected: 1,
          },
        ],
      },
    ])

    describe.each(pageKeyCases)('pageKey: $params.props.pageKey', ({ params, cases }) => {
      test.each(cases)('query: $route.query', ({ route, expected }) => {
        /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
        const args = {
          props: params.props,
          componentContext: componentContextMock,
          route,
        }
        const context = new FuroPaginationContext(args)

        const actual = context.resolveCurrentPage()

        expect(actual)
          .toBe(expected)
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#createRangePages()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     route: import('vue-router').RouteLocationNormalized
     *     rangePages: Array<number>
     *   }
     *   expected: Array<FuroPageItemContext>
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            pageKey: 'page',
          },
          route: {
            query: {
              page: '1',
            },
          },
          rangePages: [1, 2, 3],
        },
        expected: [
          FuroPageItemContext.create({
            pageNumber: 1,
            searchParams: new URLSearchParams({
              page: '1',
            }),
            pageKey: 'page',
            isCurrent: true,
          }),
          FuroPageItemContext.create({
            pageNumber: 2,
            searchParams: new URLSearchParams({
              page: '1',
            }),
            pageKey: 'page',
            isCurrent: false,
          }),
          FuroPageItemContext.create({
            pageNumber: 3,
            searchParams: new URLSearchParams({
              page: '1',
            }),
            pageKey: 'page',
            isCurrent: false,
          }),
        ],
      },
      {
        params: {
          props: {
            pageKey: 'pg',
          },
          route: {
            query: {
              pg: '2',
              alpha: '111',
            },
          },
          rangePages: [1, 2, 3],
        },
        expected: [
          FuroPageItemContext.create({
            pageNumber: 1,
            searchParams: new URLSearchParams({
              pg: '2',
              alpha: '111',
            }),
            pageKey: 'pg',
            isCurrent: false,
          }),
          FuroPageItemContext.create({
            pageNumber: 2,
            searchParams: new URLSearchParams({
              pg: '2',
              alpha: '111',
            }),
            pageKey: 'pg',
            isCurrent: true,
          }),
          FuroPageItemContext.create({
            pageNumber: 3,
            searchParams: new URLSearchParams({
              pg: '2',
              alpha: '111',
            }),
            pageKey: 'pg',
            isCurrent: false,
          }),
        ],
      },
      {
        params: {
          props: {
            // pageKey: 'page',
          },
          route: {
            query: {
              page: '3',
              beta: '222',
              gamma: '333',
            },
          },
          rangePages: [1, 2, 3],
        },
        expected: [
          FuroPageItemContext.create({
            pageNumber: 1,
            searchParams: new URLSearchParams({
              page: '3',
              beta: '222',
              gamma: '333',
            }),
            pageKey: 'page',
            isCurrent: false,
          }),
          FuroPageItemContext.create({
            pageNumber: 2,
            searchParams: new URLSearchParams({
              page: '3',
              beta: '222',
              gamma: '333',
            }),
            pageKey: 'page',
            isCurrent: false,
          }),
          FuroPageItemContext.create({
            pageNumber: 3,
            searchParams: new URLSearchParams({
              page: '3',
              beta: '222',
              gamma: '333',
            }),
            pageKey: 'page',
            isCurrent: true,
          }),
        ],
      },
    ])

    test.each(cases)('query: $params.route.query', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: params.route,
      }
      const context = new FuroPaginationContext(args)

      const actual = context.createRangePages({
        rangePages: params.rangePages,
      })

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#createPreviousPage()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     route: import('vue-router').RouteLocationNormalized
     *   }
     *   expected: FuroPageItemContext
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            pageKey: 'page',
          },
          route: {
            query: {},
          },
        },
        expected: FuroPageItemContext.create({
          pageNumber: null,
          searchParams: new URLSearchParams(),
          pageKey: 'page',
        }),
      },
      {
        params: {
          props: {
            pageKey: 'pg',
          },
          route: {
            query: {
              pg: '2',
            },
          },
        },
        expected: FuroPageItemContext.create({
          pageNumber: 1,
          searchParams: new URLSearchParams({
            pg: '2',
          }),
          pageKey: 'pg',
        }),
      },
      {
        params: {
          props: {
            // pageKey: 'page',
          },
          route: {
            query: {
              page: '3',
            },
          },
        },
        expected: FuroPageItemContext.create({
          pageNumber: 2,
          searchParams: new URLSearchParams({
            page: '3',
          }),
          pageKey: 'page',
        }),
      },
    ])

    test.each(cases)('query: $params.route.query', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: params.route,
      }
      const context = new FuroPaginationContext(args)

      const actual = context.createPreviousPage()

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#createNextPage()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *   }
     *   currentPageCases: Array<{
     *     route: import('vue-router').RouteLocationNormalized
     *     expected: FuroPageItemContext
     *   }>
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            pagination: { // lastPage: 10
              limit: 5,
              totalRecords: 50,
            },
            pageKey: 'page',
          },
        },
        currentPageCases: [
          {
            route: {
              query: {
                page: '1',
              },
            },
            expected: FuroPageItemContext.create({
              pageNumber: 2,
              searchParams: new URLSearchParams({
                page: '1',
              }),
              pageKey: 'page',
            }),
          },
          {
            route: {
              query: {
                page: '9',
              },
            },
            expected: FuroPageItemContext.create({
              pageNumber: 10,
              searchParams: new URLSearchParams({
                page: '9',
              }),
              pageKey: 'page',
            }),
          },
          {
            route: {
              query: {
                page: '10',
              },
            },
            expected: FuroPageItemContext.create({
              pageNumber: null,
              searchParams: new URLSearchParams({
                page: '10',
              }),
              pageKey: 'page',
            }),
          },
        ],
      },
      {
        params: {
          props: {
            pagination: { // lastPage: 100
              limit: 10,
              totalRecords: 1000,
            },
            pageKey: 'pg',
          },
        },
        currentPageCases: [
          {
            route: {
              query: {
                pg: '98',
              },
            },
            expected: FuroPageItemContext.create({
              pageNumber: 99,
              searchParams: new URLSearchParams({
                pg: '98',
              }),
              pageKey: 'pg',
            }),
          },
          {
            route: {
              query: {
                pg: '99',
              },
            },
            expected: FuroPageItemContext.create({
              pageNumber: 100,
              searchParams: new URLSearchParams({
                pg: '99',
              }),
              pageKey: 'pg',
            }),
          },
          {
            route: {
              query: {
                pg: '100',
              },
            },
            expected: FuroPageItemContext.create({
              pageNumber: null,
              searchParams: new URLSearchParams({
                pg: '100',
              }),
              pageKey: 'pg',
            }),
          },
        ],
      },
    ])

    describe.each(cases)('pagination: $params.props.pagination', ({ params, currentPageCases }) => {
      test.each(currentPageCases)('query: $route.query', ({ route, expected }) => {
        /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
        const args = {
          props: params.props,
          componentContext: componentContextMock,
          route,
        }
        const context = new FuroPaginationContext(args)

        const actual = context.createNextPage()

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#createFirstPage()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     route: import('vue-router').RouteLocationNormalized
     *   }
     *   expected: FuroPageItemContext
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            pageKey: 'page',
          },
          route: {
            query: {},
          },
          searchParams: new URLSearchParams(),
        },
        expected: FuroPageItemContext.create({
          pageNumber: 1,
          searchParams: new URLSearchParams(),
          pageKey: 'page',
        }),
      },
      {
        params: {
          props: {
            pageKey: 'pg',
          },
          route: {
            query: {
              pg: '2',
              alpha: '111',
            },
          },
        },
        expected: FuroPageItemContext.create({
          pageNumber: 1,
          searchParams: new URLSearchParams({
            pg: '2',
            alpha: '111',
          }),
          pageKey: 'pg',
        }),
      },
      {
        params: {
          props: {
            // pageKey: 'page',
          },
          route: {
            query: {
              page: '3',
              beta: '222',
            },
          },
          pageKey: 'page',
        },
        expected: FuroPageItemContext.create({
          pageNumber: 1,
          searchParams: new URLSearchParams({
            page: '3',
            beta: '222',
          }),
          pageKey: 'page',
        }),
      },
    ])

    test.each(cases)('query: $params.route.query', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: params.route,
      }
      const context = new FuroPaginationContext(args)

      const actual = context.createFirstPage()

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#createLastPage()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     route: import('vue-router').RouteLocationNormalized
     *   }
     *   expected: FuroPageItemContext
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            pagination: { // lastPage: 10
              limit: 5,
              totalRecords: 50,
            },
            pageKey: 'page',
          },
          route: {
            query: {},
          },
        },
        expected: FuroPageItemContext.create({
          pageNumber: 10,
          searchParams: new URLSearchParams(),
          pageKey: 'page',
        }),
      },
      {
        params: {
          props: {
            pagination: { // lastPage: 100
              limit: 10,
              totalRecords: 1000,
            },
            pageKey: 'pg',
          },
          route: {
            query: {
              alpha: '111',
            },
          },
        },
        expected: FuroPageItemContext.create({
          pageNumber: 100,
          searchParams: new URLSearchParams({
            alpha: '111',
          }),
          pageKey: 'pg',
        }),
      },
      {
        params: {
          props: {
            pagination: { // lastPage: 1000
              limit: 10,
              totalRecords: 10000,
            },
            // pageKey: 'page',
          },
          route: {
            query: {
              beta: '222',
            },
          },
        },
        expected: FuroPageItemContext.create({
          pageNumber: 1000,
          searchParams: new URLSearchParams({
            beta: '222',
          }),
          pageKey: 'page',
        }),
      },
    ])

    test.each(cases)('pagination: $params.props.pagination', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: params.route,
      }
      const context = new FuroPaginationContext(args)

      const actual = context.createLastPage()

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#generatePreviousPageHref()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     route: import('vue-router').RouteLocationNormalized
     *   }
     *   expected: string | null
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            pageKey: 'page',
          },
          route: {
            query: {},
          },
        },
        expected: null,
      },
      {
        params: {
          props: {
            // pageKey: 'page',
          },
          route: {
            query: {
              alpha: '111',
              page: '2',
            },
          },
        },
        expected: '?alpha=111&page=1',
      },
      {
        params: {
          props: {
            pageKey: 'pg',
          },
          route: {
            query: {
              beta: '222',
              pg: '3',
            },
          },
        },
        expected: '?beta=222&pg=2',
      },
    ])

    test.each(cases)('query: $params.route.query', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: params.route,
      }
      const context = new FuroPaginationContext(args)

      const actual = context.generatePreviousPageHref()

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#generateNextPageHref()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     route: import('vue-router').RouteLocationNormalized
     *   }
     *   expected: string | null
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            pagination: { // lastPage: 10
              limit: 5,
              totalRecords: 50,
            },
            pageKey: 'page',
          },
          route: {
            query: {
              page: '10',
            },
          },
        },
        expected: null,
      },
      {
        params: {
          props: {
            pagination: { // lastPage: 10
              limit: 6,
              totalRecords: 60,
            },
            // pageKey: 'page',
          },
          route: {
            query: {
              alpha: '111',
              page: '1',
            },
          },
        },
        expected: '?alpha=111&page=2',
      },
      {
        params: {
          props: {
            pagination: { // lastPage: 10
              limit: 7,
              totalRecords: 70,
            },
            pageKey: 'pg',
          },
          route: {
            query: {
              beta: '222',
              pg: '4',
            },
          },
        },
        expected: '?beta=222&pg=5',
      },
      {
        params: {
          props: {
            pagination: { // lastPage: 10
              limit: 8,
              totalRecords: 80,
            },
            pageKey: 'px',
          },
          route: {
            query: {
              gamma: '333',
              px: '9',
            },
          },
        },
        expected: '?gamma=333&px=10',
      },
    ])

    test.each(cases)('query: $params.route.query', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: params.route,
      }
      const context = new FuroPaginationContext(args)

      const actual = context.generateNextPageHref()

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#generateFirstPageHref()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     route: import('vue-router').RouteLocationNormalized
     *   }
     *   expected: string | null
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            pageKey: 'page',
          },
          route: {
            query: {},
          },
        },
        expected: '?page=1',
      },
      {
        params: {
          props: {
            pageKey: 'pg',
          },
          route: {
            query: {
              alpha: '111',
              pg: '5',
            },
          },
          pageKey: 'pg',
        },
        expected: '?alpha=111&pg=1',
      },
      {
        params: {
          props: {
            // pageKey: 'page',
          },
          route: {
            query: {
              beta: '222',
              gamma: '333',
              page: '10',
            },
          },
        },
        expected: '?beta=222&gamma=333&page=1',
      },
    ])

    test.each(cases)('query: $params.route.query', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: params.route,
      }
      const context = new FuroPaginationContext(args)

      const actual = context.generateFirstPageHref()

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#generateLastPageHref()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     route: import('vue-router').RouteLocationNormalized
     *   }
     *   expected: string
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            pagination: { // lastPage: 10
              limit: 5,
              totalRecords: 50,
            },
            pageKey: 'page',
          },
          route: {
            query: {},
          },
        },
        expected: '?page=10',
      },
      {
        params: {
          props: {
            pagination: { // lastPage: 20
              limit: 6,
              totalRecords: 120,
            },
            // pageKey: 'page',
          },
          route: {
            query: {
              alpha: '111',
              page: '5',
            },
          },
        },
        expected: '?alpha=111&page=20',
      },
      {
        params: {
          props: {
            pagination: { // lastPage: 100
              limit: 7,
              totalRecords: 700,
            },
            pageKey: 'pg',
          },
          route: {
            query: {
              beta: '222',
              gamma: '333',
              pg: '10',
            },
          },
        },
        expected: '?beta=222&gamma=333&pg=100',
      },
    ])

    test.each(cases)('query: $params.route.query', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: params.route,
      }
      const context = new FuroPaginationContext(args)

      const actual = context.generateLastPageHref()

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#generateFirstPageLinkLabel()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     route: import('vue-router').RouteLocationNormalized
     *   }
     *   expected: string
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            pageKey: 'page',
          },
          route: {
            query: {},
          },
        },
        expected: '1',
      },
      {
        params: {
          props: {
            // pageKey: 'page',
          },
          route: {
            query: {
              alpha: '111',
              page: '5',
            },
          },
        },
        expected: '1',
      },
      {
        params: {
          props: {
            pageKey: 'pg',
          },
          route: {
            query: {
              beta: '222',
              pg: '10',
            },
          },
        },
        expected: '1',
      },
    ])

    test.each(cases)('query: $params.route.query', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: params.route,
      }
      const context = new FuroPaginationContext(args)

      const actual = context.generateFirstPageLinkLabel()

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#generateLastPageLinkLabel()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     route: import('vue-router').RouteLocationNormalized
     *   }
     *   expected: string | null
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            pagination: { // lastPage: 10
              limit: 5,
              totalRecords: 50,
            },
            pageKey: 'page',
          },
          route: {
            query: {},
          },
        },
        expected: '10',
      },
      {
        params: {
          props: {
            pagination: { // lastPage: 20
              limit: 6,
              totalRecords: 120,
            },
            // pageKey: 'page',
          },
          route: {
            query: {
              alpha: '111',
              page: '5',
            },
          },
        },
        expected: '20',
      },
      {
        params: {
          props: {
            pagination: { // lastPage: 100
              limit: 7,
              totalRecords: 700,
            },
            pageKey: 'pg',
          },
          route: {
            query: {
              beta: '222',
              pg: '10',
            },
          },
        },
        expected: '100',
      },
    ])

    test.each(cases)('query: $params.route.query', ({ params, expected }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: params.route,
      }
      const context = new FuroPaginationContext(args)

      const actual = context.generateLastPageLinkLabel()

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#isDisabledPreviousPage()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    describe('to be truthy', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     route: import('vue-router').RouteLocationNormalized
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              // pageKey: 'page',
            },
            route: {
              query: {},
            },
          },
        },
        {
          params: {
            props: {
              pageKey: 'page',
            },
            route: {
              query: {
                page: '1',
              },
            },
          },
        },
        {
          params: {
            props: {
              pageKey: 'pg',
            },
            route: {
              query: {},
            },
          },
        },
        {
          params: {
            props: {
              pageKey: 'pg',
            },
            route: {
              query: {
                pg: '1',
              },
            },
          },
        },
        {
          params: {
            props: {
              pageKey: 'pg',
            },
            route: {
              query: {
                page: '1', // not pg
              },
            },
          },
        },
      ])

      test.each(cases)('query: $params.route.query', ({ params }) => {
        /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
        const args = {
          props: params.props,
          componentContext: componentContextMock,
          route: params.route,
        }
        const context = new FuroPaginationContext(args)

        const actual = context.isDisabledPreviousPage()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     route: import('vue-router').RouteLocationNormalized
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              pageKey: 'page',
            },
            route: {
              query: {
                page: '2',
              },
            },
          },
        },
        {
          params: {
            props: {
              pageKey: 'pg',
            },
            route: {
              query: {
                pg: '3',
              },
            },
          },
        },
        {
          params: {
            props: {
              // pageKey: 'page',
            },
            route: {
              query: {
                page: '4',
              },
            },
          },
        },
      ])

      test.each(cases)('query: $params.route.query', ({ params }) => {
        /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
        const args = {
          props: params.props,
          componentContext: componentContextMock,
          route: params.route,
        }
        const context = new FuroPaginationContext(args)

        const actual = context.isDisabledPreviousPage()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#isDisabledNextPage()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    const cases = [
      {
        params: {
          props: {
            pagination: { // lastPage: 10
              limit: 5,
              totalRecords: 46,
            },
          },
        },
        truthyCases: [
          { query: { page: '10' } },
        ],
        falsyCases: [
          { query: { page: '9' } },
          { query: { page: '8' } },
          { query: { page: '7' } },
          { query: { page: '6' } },
          { query: { page: '5' } },
          { query: { page: '4' } },
          { query: { page: '3' } },
          { query: { page: '2' } },
          { query: { page: '1' } },
        ],
      },
      {
        params: {
          props: {
            pagination: { // lastPage: 5
              limit: 5,
              totalRecords: 24,
            },
          },
        },
        truthyCases: [
          { query: { page: '5' } },
        ],
        falsyCases: [
          { query: { page: '4' } },
          { query: { page: '3' } },
          { query: { page: '2' } },
          { query: { page: '1' } },
        ],
      },
    ]

    describe.each(cases)('pagination: $params.props.pagination', ({ params, truthyCases, falsyCases }) => {
      describe('to be truthy', () => {
        test.each(truthyCases)('query: $query', ({ query }) => {
          /** @type {import('vue-router').RouteLocationNormalized} */
          const routeArg = /** @type {*} */ ({
            query,
          })

          /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
          const args = {
            props: params.props,
            componentContext: componentContextMock,
            route: routeArg,
          }
          const context = new FuroPaginationContext(args)

          const actual = context.isDisabledNextPage()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('query: $query', ({ query }) => {
          /** @type {import('vue-router').RouteLocationNormalized} */
          const routeArg = /** @type {*} */ ({
            query,
          })

          /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
          const args = {
            props: params.props,
            componentContext: componentContextMock,
            route: routeArg,
          }
          const context = new FuroPaginationContext(args)

          const actual = context.isDisabledNextPage()

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#isHiddenFirstPage()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /** @type {import('vue-router').RouteLocationNormalized} */
    const routeMock = /** @type {*} */ ({
      query: {},
    })

    describe('to be truthy', () => {
      const cases = [
        {
          params: {
            rangePages: [1, 2, 3],
          },
        },
        {
          params: {
            rangePages: [1, 2, 3, 4, 5],
          },
        },
      ]

      test.each(cases)('rangePages: $params.rangePages', ({ params }) => {
        /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          route: routeMock,
        }
        const context = new FuroPaginationContext(args)

        jest.spyOn(context, 'generateRangePages')
          .mockReturnValue(params.rangePages)

        const actual = context.isHiddenFirstPage()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          params: {
            rangePages: [2, 3, 4],
          },
        },
        {
          params: {
            rangePages: [2, 3, 4, 5, 6],
          },
        },
      ]

      test.each(cases)('rangePages: $params.rangePages', ({ params }) => {
        /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          route: routeMock,
        }
        const context = new FuroPaginationContext(args)

        jest.spyOn(context, 'generateRangePages')
          .mockReturnValue(params.rangePages)

        const actual = context.isHiddenFirstPage()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#isHiddenLastPage()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /** @type {import('vue-router').RouteLocationNormalized} */
    const routeMock = /** @type {*} */ ({
      query: {},
    })

    const cases = [
      {
        params: {
          props: {
            pagination: { // lastPage: 10
              limit: 5,
              totalRecords: 50,
            },
          },
        },
        truthyCases: [
          { rangePages: [6, 7, 8, 9, 10] },
          { rangePages: [8, 9, 10] },
        ],
        falsyCases: [
          { rangePages: [5, 6, 7, 8, 9] },
          { rangePages: [7, 8, 9] },
        ],
      },
      {
        params: {
          props: {
            pagination: { // lastPage: 111
              limit: 10,
              totalRecords: 1109,
            },
          },
        },
        truthyCases: [
          { rangePages: [107, 108, 109, 110, 111] },
          { rangePages: [109, 110, 111] },
        ],
        falsyCases: [
          { rangePages: [106, 107, 108, 109, 110] },
          { rangePages: [108, 109, 110] },
        ],
      },
    ]

    describe.each(cases)('pagination: $params.props.pagination', ({ params, truthyCases, falsyCases }) => {
      describe('to be truthy', () => {
        test.each(truthyCases)('rangePages: $rangePages', ({ rangePages }) => {
          /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
          const args = {
            props: params.props,
            componentContext: componentContextMock,
            route: routeMock,
          }
          const context = new FuroPaginationContext(args)

          jest.spyOn(context, 'generateRangePages')
            .mockReturnValue(rangePages)

          const actual = context.isHiddenLastPage()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('rangePages: $rangePages', ({ rangePages }) => {
          /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
          const args = {
            props: params.props,
            componentContext: componentContextMock,
            route: routeMock,
          }
          const context = new FuroPaginationContext(args)

          jest.spyOn(context, 'generateRangePages')
            .mockReturnValue(rangePages)

          const actual = context.isHiddenLastPage()

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#isHiddenFirstPageDash()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /** @type {import('vue-router').RouteLocationNormalized} */
    const routeMock = /** @type {*} */ ({
      query: {},
    })

    describe('to be truthy', () => {
      const cases = [
        {
          params: {
            rangePages: [1, 2, 3],
          },
        },
        {
          params: {
            rangePages: [2, 3, 4],
          },
        },
        {
          params: {
            rangePages: [1, 2, 3, 4, 5],
          },
        },
        {
          params: {
            rangePages: [2, 3, 4, 5, 6],
          },
        },
      ]

      test.each(cases)('rangePages: $params.rangePages', ({ params }) => {
        /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          route: routeMock,
        }
        const context = new FuroPaginationContext(args)

        jest.spyOn(context, 'generateRangePages')
          .mockReturnValue(params.rangePages)

        const actual = context.isHiddenFirstPageDash()

        expect(actual)
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          params: {
            rangePages: [3, 4, 5],
          },
        },
        {
          params: {
            rangePages: [3, 4, 5, 6, 7],
          },
        },
      ]

      test.each(cases)('rangePages: $params.rangePages', ({ params }) => {
        /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          route: routeMock,
        }
        const context = new FuroPaginationContext(args)

        jest.spyOn(context, 'generateRangePages')
          .mockReturnValue(params.rangePages)

        const actual = context.isHiddenFirstPageDash()

        expect(actual)
          .toBeFalsy()
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#isHiddenLastPageDash()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /** @type {import('vue-router').RouteLocationNormalized} */
    const routeMock = /** @type {*} */ ({
      query: {},
    })

    const cases = [
      {
        params: {
          props: {
            pagination: { // lastPage: 10
              limit: 10,
              totalRecords: 93,
            },
          },
        },
        truthyCases: [
          { rangePages: [5, 6, 7, 8, 9] },
          { rangePages: [7, 8, 9] },
        ],
        falsyCases: [
          { rangePages: [4, 5, 6, 7, 8] },
          { rangePages: [6, 7, 8] },
        ],
      },
      {
        params: {
          props: {
            pagination: { // lastPage: 111
              limit: 10,
              totalRecords: 1107,
            },
          },
        },
        truthyCases: [
          { rangePages: [106, 107, 108, 109, 110] },
          { rangePages: [108, 109, 110] },
        ],
        falsyCases: [
          { rangePages: [105, 106, 107, 108, 109] },
          { rangePages: [107, 108, 109] },
        ],
      },
    ]

    describe.each(cases)('pagination: $params.props.pagination', ({ params, truthyCases, falsyCases }) => {
      /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
      const args = {
        props: params.props,
        componentContext: componentContextMock,
        route: routeMock,
      }

      const context = new FuroPaginationContext(args)

      describe('to be truthy', () => {
        test.each(truthyCases)('rangePages: $rangePages', ({ rangePages }) => {
          jest.spyOn(context, 'generateRangePages')
            .mockReturnValue(rangePages)

          const actual = context.isHiddenLastPageDash()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('rangePages: $rangePages', ({ rangePages }) => {
          jest.spyOn(context, 'generateRangePages')
            .mockReturnValue(rangePages)

          const actual = context.isHiddenLastPageDash()

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FuroPaginationContext', () => {
  describe('#changePage()', () => {
    describe('to emit received arguments', () => {
      const propsMock = {}
      const componentContextMock = {
        attrs: {},
        emit: () => {},
        expose: () => {},
        slots: {},
      }

      /** @type {import('vue-router').RouteLocationNormalized} */
      const routeMock = /** @type {*} */ ({
        query: {},
      })

      const cases = [
        {
          params: {
            event: new Event('alpha'),
            page: FuroPageItemContext.create({
              pageNumber: 1,
              searchParams: new URLSearchParams({
                page: '1',
              }),
              pageKey: 'page',
            }),
          },
        },
        {
          params: {
            event: new Event('beta'),
            page: FuroPageItemContext.create({
              pageNumber: 2,
              searchParams: new URLSearchParams({
                pg: '2',
              }),
              pageKey: 'pg',
            }),
          },
        },
        {
          params: {
            event: new Event('gamma'),
            page: FuroPageItemContext.create({
              pageNumber: 3,
              searchParams: new URLSearchParams({
                px: '3',
              }),
              pageKey: 'px',
            }),
          },
        },
      ]

      test.each(cases)('page: $params.page', ({ params }) => {
        /** @type {import('~/lib/contexts/concretes/FuroPaginationContext.js').FuroPaginationContextParams<*>} */
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          route: routeMock,
        }
        const context = new FuroPaginationContext(args)

        const emitSpy = jest.spyOn(componentContextMock, 'emit')

        context.changePage(params)

        expect(emitSpy)
          .toHaveBeenCalledWith('changePage', params)
      })
    })
  })
})
