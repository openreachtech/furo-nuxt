import FuroPageItemContext from '~/lib/contexts/concretes/FuroPageItemContext.js'

describe('FuroPageItemContext', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#pageNumber', () => {
        const cases = [
          {
            params: {
              pageNumber: 1,
            },
          },
          {
            params: {
              pageNumber: 3,
            },
          },
          {
            params: {
              pageNumber: 5,
            },
          },
        ]

        test.each(cases)('pageNumber: $params.pageNumber', ({ params }) => {
          const args = {
            pageNumber: params.pageNumber,
            searchParams: new URLSearchParams(),
            pageKey: 'page',
            isCurrent: false,
          }

          const context = new FuroPageItemContext(args)

          expect(context)
            .toHaveProperty('pageNumber', params.pageNumber)
        })
      })

      describe('#searchParams', () => {
        const cases = [
          {
            params: {
              searchParams: new URLSearchParams(),
            },
          },
          {
            params: {
              searchParams: new URLSearchParams({
                alpha: '1',
                beta: '2',
              }),
            },
          },
          {
            params: {
              searchParams: new URLSearchParams({
                gamma: '3',
                delta: '4',
              }),
            },
          },
        ]

        test.each(cases)('searchParams: $params.searchParams', ({ params }) => {
          const args = {
            pageNumber: 1,
            searchParams: params.searchParams,
            pageKey: 'page',
            isCurrent: false,
          }

          const context = new FuroPageItemContext(args)

          expect(context)
            .toHaveProperty('searchParams', params.searchParams)
        })
      })

      describe('#pageKey', () => {
        const cases = [
          {
            params: {
              pageKey: 'page',
            },
          },
          {
            params: {
              pageKey: 'pg',
            },
          },
          {
            params: {
              pageKey: 'p',
            },
          },
        ]

        test.each(cases)('pageKey: $params.pageKey', ({ params }) => {
          const args = {
            pageNumber: 1,
            searchParams: new URLSearchParams(),
            pageKey: params.pageKey,
            isCurrent: false,
          }

          const context = new FuroPageItemContext(args)

          expect(context)
            .toHaveProperty('pageKey', params.pageKey)
        })
      })

      describe('#isCurrent', () => {
        const cases = [
          {
            params: {
              isCurrent: true,
            },
          },
          {
            params: {
              isCurrent: false,
            },
          },
        ]

        test.each(cases)('isCurrent: $params.isCurrent', ({ params }) => {
          const args = {
            pageNumber: 1,
            searchParams: new URLSearchParams(),
            pageKey: 'page',
            isCurrent: params.isCurrent,
          }

          const context = new FuroPageItemContext(args)

          expect(context)
            .toHaveProperty('isCurrent', params.isCurrent)
        })
      })
    })
  })
})

describe('FuroPageItemContext', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            pageNumber: 1,
            searchParams: new URLSearchParams(),
            pageKey: 'page',
            isCurrent: true,
          },
        },
        {
          params: {
            pageNumber: 3,
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
            pageKey: 'pg',
            isCurrent: false,
          },
        },
        {
          params: {
            pageNumber: 5,
            searchParams: new URLSearchParams({
              gamma: '3',
              delta: '4',
            }),
            pageKey: 'p',
            // isCurrent: false,
          },
        },
      ]

      test.each(cases)('pageNumber: $params.pageNumber', ({ params }) => {
        const actual = FuroPageItemContext.create(params)

        expect(actual)
          .toBeInstanceOf(FuroPageItemContext)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            pageNumber: 1,
            searchParams: new URLSearchParams(),
            pageKey: 'page',
            isCurrent: true,
          },
          expected: {
            pageNumber: 1,
            searchParams: new URLSearchParams(),
            pageKey: 'page',
            isCurrent: true,
          },
        },
        {
          params: {
            pageNumber: 3,
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
            pageKey: 'pg',
            isCurrent: false,
          },
          expected: {
            pageNumber: 3,
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
            pageKey: 'pg',
            isCurrent: false,
          },
        },
        {
          params: {
            pageNumber: 5,
            searchParams: new URLSearchParams({
              gamma: '3',
              delta: '4',
            }),
            pageKey: 'p',
            // isCurrent: false,
          },
          expected: {
            pageNumber: 5,
            searchParams: new URLSearchParams({
              gamma: '3',
              delta: '4',
            }),
            pageKey: 'p',
            isCurrent: false,
          },
        },
      ]

      test.each(cases)('pageNumber: $params.pageNumber', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroPageItemContext)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('FuroPageItemContext', () => {
  describe('#generateHref()', () => {
    describe('to return string', () => {
      const cases = [
        {
          params: {
            pageNumber: 1,
            searchParams: new URLSearchParams(),
            pageKey: 'page',
          },
          expected: '?page=1',
        },
        {
          params: {
            pageNumber: 3,
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
            pageKey: 'page',
          },
          expected: '?alpha=1&beta=2&page=3',
        },
        {
          params: {
            pageNumber: 5,
            searchParams: new URLSearchParams({
              page: '10',
              gamma: '3',
              delta: '4',
            }),
            pageKey: 'p',
          },
          expected: '?page=10&gamma=3&delta=4&p=5',
        },
        {
          params: {
            pageNumber: 7,
            searchParams: new URLSearchParams({
              pg: '40',
              gamma: '3',
              delta: '4',
            }),
            pageKey: 'pg',
          },
          expected: '?pg=7&gamma=3&delta=4',
        },
      ]

      test.each(cases)('pageNumber: $params.pageNumber', ({ params, expected }) => {
        const context = FuroPageItemContext.create(params)

        const actual = context.generateHref()

        expect(actual)
          .toBe(expected)
      })
    })

    describe('to return null', () => {
      const cases = [
        {
          params: {
            pageNumber: null,
            searchParams: new URLSearchParams(),
            pageKey: 'page',
          },
        },
        {
          params: {
            pageNumber: null,
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
            pageKey: 'pg',
          },
        },
        {
          params: {
            pageNumber: null,
            searchParams: new URLSearchParams({
              gamma: '3',
              delta: '4',
            }),
            pageKey: 'p',
          },
        },
      ]

      test.each(cases)('pageNumber: $params.pageNumber', ({ params }) => {
        const context = FuroPageItemContext.create(params)

        const actual = context.generateHref()

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('FuroPageItemContext', () => {
  describe('#generateText()', () => {
    describe('to return string', () => {
      const cases = [
        {
          params: {
            pageNumber: 1,
            searchParams: new URLSearchParams(),
            pageKey: 'page',
          },
          expected: '1',
        },
        {
          params: {
            pageNumber: 3,
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
            pageKey: 'pg',
          },
          expected: '3',
        },
        {
          params: {
            pageNumber: 5,
            searchParams: new URLSearchParams({
              gamma: '3',
              delta: '4',
            }),
            pageKey: 'p',
          },
          expected: '5',
        },
      ]

      test.each(cases)('pageNumber: $params.pageNumber', ({ params, expected }) => {
        const context = FuroPageItemContext.create(params)

        const actual = context.generateText()

        expect(actual)
          .toBe(expected)
      })
    })

    describe('to return null', () => {
      const cases = [
        {
          params: {
            pageNumber: null,
            searchParams: new URLSearchParams(),
            pageKey: 'page',
          },
        },
        {
          params: {
            pageNumber: null,
            searchParams: new URLSearchParams({
              alpha: '1',
              beta: '2',
            }),
            pageKey: 'pg',
          },
        },
        {
          params: {
            pageNumber: null,
            searchParams: new URLSearchParams({
              gamma: '3',
              delta: '4',
            }),
            pageKey: 'p',
          },
        },
      ]

      test.each(cases)('pageNumber: $params.pageNumber', ({ params }) => {
        const context = FuroPageItemContext.create(params)

        const actual = context.generateText()

        expect(actual)
          .toBeNull()
      })
    })
  })
})
