import FuroLoadingLayoutContext from '~/lib/contexts/concretes/FuroLoadingLayoutContext'

import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

describe('FuroLoadingLayoutContext', () => {
  describe('super class', () => {
    test('to be instance of BaseFuroContext', () => {
      const actual = FuroLoadingLayoutContext.prototype

      expect(actual)
        .toBeInstanceOf(BaseFuroContext)
    })
  })
})

describe('FuroLoadingLayoutContext', () => {
  describe('constructor', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    describe('to keep properties', () => {
      describe('#props', () => {
        const cases = [
          {
            params: {
              props: {
                isLoading: false,
              },
            },
          },
          {
            params: {
              props: {
                isLoading: true,
              },
            },
          },
        ]

        test.each(cases)('props.isLoading: #params.props.isLoading', ({ params }) => {
          const args = {
            props: params.props,
            componentContext: componentContextMock,
          }

          const context = new FuroLoadingLayoutContext(args)

          expect(context)
            .toHaveProperty('props', params.props)
        })
      })
    })
  })
})

describe('FuroLoadingLayoutContext', () => {
  describe('.create()', () => {
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            props: {
              isLoading: false,
            },
          },
        },
        {
          params: {
            props: {
              isLoading: true,
            },
          },
        },
      ]

      test.each(cases)('props.isLoading: $props.isLoading', ({ params }) => {
        const args = {
          props: params.props,
          componentContext: componentContextMock,
        }
        const actual = FuroLoadingLayoutContext.create(args)

        expect(actual)
          .toBeInstanceOf(FuroLoadingLayoutContext)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            props: {
              isLoading: false,
            },
            componentContext: componentContextMock,
          },
          expected: {
            props: {
              isLoading: false,
            },
            componentContext: componentContextMock,
          },
        },
        {
          params: {
            props: {
              isLoading: true,
            },
            componentContext: componentContextMock,
          },
          expected: {
            props: {
              isLoading: true,
            },
            componentContext: componentContextMock,
          },
        },
      ]

      test.each(cases)('props.isLoading: $props.isLoading', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroLoadingLayoutContext)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('FuroLoadingLayoutContext', () => {
  describe('#get:isLoading', () => {
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
            isLoading: false,
          },
        },
        expected: false,
      },
      {
        params: {
          props: {
            isLoading: true,
          },
        },
        expected: true,
      },
    ]

    test.each(cases)('props.isLoading: $props.isLoading', ({ params, expected }) => {
      const args = {
        props: params.props,
        componentContext: componentContextMock,
      }

      const context = FuroLoadingLayoutContext.create(args)
      const actual = context.isLoading

      expect(actual)
        .toEqual(expected)
    })
  })
})
