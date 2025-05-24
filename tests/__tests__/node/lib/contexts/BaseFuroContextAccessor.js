import BaseFuroContext from '~/lib/contexts/BaseFuroContext'
import BaseFuroContextAccessor from '../../../../../lib/contexts/BaseFuroContextAccessor'

describe('BaseFuroContextAccessor', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#context', () => {
        const cases = [
          {
            params: {
              context: new BaseFuroContext({
                props: {
                  alpha: 10001,
                },
                componentContext: {
                  attrs: {},
                  emit: () => {},
                  expose: () => {},
                  slots: {},
                },
              }),
            },
          },
          {
            params: {
              context: new BaseFuroContext({
                props: {
                  alpha: 20002,
                },
                componentContext: {
                  attrs: {},
                  emit: () => {},
                  expose: () => {},
                  slots: {},
                },
              }),
            },
          },
        ]

        test.each(cases)('context: $params.context', ({ params }) => {
          const accessor = new BaseFuroContextAccessor(params)

          expect(accessor.context)
            .toBe(params.context) // same reference
        })
      })
    })
  })
})

describe('BaseFuroContextAccessor', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            context: new BaseFuroContext({
              props: {
                alpha: 10001,
              },
              componentContext: {
                attrs: {},
                emit: () => {},
                expose: () => {},
                slots: {},
              },
            }),
          },
        },
        {
          params: {
            context: new BaseFuroContext({
              props: {
                beta: 10002,
              },
              componentContext: {
                attrs: {},
                emit: () => {},
                expose: () => {},
                slots: {},
              },
            }),
          },
        },
      ]

      test.each(cases)('context: $params.context', ({ params }) => {
        const accessor = BaseFuroContextAccessor.create(params)

        expect(accessor)
          .toBeInstanceOf(BaseFuroContextAccessor)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            context: new BaseFuroContext({
              props: {
                alpha: 10001,
              },
              componentContext: {
                attrs: {},
                emit: () => {},
                expose: () => {},
                slots: {},
              },
            }),
          },
        },
        {
          params: {
            context: new BaseFuroContext({
              props: {
                beta: 10002,
              },
              componentContext: {
                attrs: {},
                emit: () => {},
                expose: () => {},
                slots: {},
              },
            }),
          },
        },
      ]

      test.each(cases)('context: $params.context', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(BaseFuroContextAccessor)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})
