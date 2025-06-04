import FuroTabItemContext from '~/lib/contexts/concretes/FuroTabItemContext.js'

describe('FuroTabItemContext', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#tabKey', () => {
        const cases = [
          {
            params: {
              tabKey: 'alpha',
            },
          },
          {
            params: {
              tabKey: 'beta',
            },
          },
          {
            params: {
              tabKey: 'gamma',
            },
          },
        ]

        test.each(cases)('tabKey: $params.tabKey', ({ params }) => {
          const args = {
            tabKey: params.tabKey,
            slotName: 'tabControl',
            label: 'Test Tab',
            index: 999,
          }

          const context = new FuroTabItemContext(args)

          expect(context)
            .toHaveProperty('tabKey', params.tabKey)
        })
      })

      describe('#label', () => {
        const cases = [
          {
            params: {
              label: 'Alpha',
            },
          },
          {
            params: {
              label: 'Beta',
            },
          },
          {
            params: {
              label: 'Gamma',
            },
          },
        ]

        test.each(cases)('label: $params.label', ({ params }) => {
          const args = {
            tabKey: 'test-tab',
            slotName: 'tabControl',
            label: params.label,
            index: 999,
          }

          const context = new FuroTabItemContext(args)

          expect(context)
            .toHaveProperty('label', params.label)
        })
      })

      describe('#index', () => {
        const cases = [
          {
            params: {
              index: 0,
            },
          },
          {
            params: {
              index: 1,
            },
          },
          {
            params: {
              index: 2,
            },
          },
        ]

        test.each(cases)('index: $params.index', ({ params }) => {
          const args = {
            tabKey: 'test-tab',
            slotName: 'tabControl',
            label: 'Test Tab',
            index: params.index,
          }

          const context = new FuroTabItemContext(args)

          expect(context)
            .toHaveProperty('index', params.index)
        })
      })

      describe('#slotName', () => {
        const cases = [
          {
            params: {
              slotName: 'tabControl',
            },
          },
          {
            params: {
              slotName: 'alphaTabControl',
            },
          },
          {
            params: {
              slotName: 'betaTabControl',
            },
          },
          {
            params: {
              slotName: 'gammaTabControl',
            },
          },
        ]

        test.each(cases)('index: $params.index', ({ params }) => {
          const args = {
            tabKey: 'test-tab',
            slotName: params.slotName,
            label: 'Test Tab',
            index: 999,
          }

          const context = new FuroTabItemContext(args)

          expect(context)
            .toHaveProperty('slotName', params.slotName)
        })
      })
    })
  })
})

describe('FuroTabItemContext', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            tabKey: 'alpha',
            label: 'Alpha',
            index: 0,
          },
        },
        {
          params: {
            tabKey: 'beta',
            label: 'Beta',
            index: 1,
          },
        },
        {
          params: {
            tabKey: 'gamma',
            label: 'Gamma',
            index: 2,
          },
        },
        {
          params: {
            tabKey: 'alpha',
            slotName: 'alpha',
            label: 'Alpha',
            index: 0,
          },
        },
        {
          params: {
            tabKey: 'beta',
            slotName: 'beta',
            label: 'Beta',
            index: 1,
          },
        },
        {
          params: {
            tabKey: 'gamma',
            slotName: 'gamma',
            label: 'Gamma',
            index: 2,
          },
        },
      ]

      test.each(cases)('tabKey: $params.tabKey', ({ params }) => {
        const actual = FuroTabItemContext.create(params)

        expect(actual)
          .toBeInstanceOf(FuroTabItemContext)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            tabKey: 'alpha',
            label: 'Alpha',
            index: 0,
          },
          expected: {
            tabKey: 'alpha',
            slotName: 'tabControl',
            label: 'Alpha',
            index: 0,
          },
        },
        {
          params: {
            tabKey: 'alpha',
            slotName: 'alpha',
            label: 'Alpha',
            index: 0,
          },
          expected: {
            tabKey: 'alpha',
            slotName: 'alphaTabControl',
            label: 'Alpha',
            index: 0,
          },
        },
        {
          params: {
            tabKey: 'beta',
            label: 'Beta',
            index: 1,
          },
          expected: {
            tabKey: 'beta',
            slotName: 'tabControl',
            label: 'Beta',
            index: 1,
          },
        },
        {
          params: {
            tabKey: 'beta',
            slotName: 'beta',
            label: 'Beta',
            index: 1,
          },
          expected: {
            tabKey: 'beta',
            slotName: 'betaTabControl',
            label: 'Beta',
            index: 1,
          },
        },
        {
          params: {
            tabKey: 'gamma',
            label: 'Gamma',
            index: 2,
          },
          expected: {
            tabKey: 'gamma',
            slotName: 'tabControl',
            label: 'Gamma',
            index: 2,
          },
        },
        {
          params: {
            tabKey: 'gamma',
            slotName: 'gamma',
            label: 'Gamma',
            index: 2,
          },
          expected: {
            tabKey: 'gamma',
            slotName: 'gammaTabControl',
            label: 'Gamma',
            index: 2,
          },
        },
      ]

      test.each(cases)('tabKey: $params.tabKey', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroTabItemContext)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('FuroTabItemContext', () => {
  describe('#isTargetTab()', () => {
    const cases = [
      {
        params: {
          context: {
            tabKey: 'alpha',
            label: 'Alpha',
            index: 0,
          },
        },
        truthyCases: [
          { tabKey: 'alpha' },
        ],
        falsyCases: [
          { tabKey: 'beta' },
          { tabKey: 'gamma' },
        ],
      },
      {
        params: {
          context: {
            tabKey: 'beta',
            label: 'Beta',
            index: 1,
          },
        },
        truthyCases: [
          { tabKey: 'beta' },
        ],
        falsyCases: [
          { tabKey: 'alpha' },
          { tabKey: 'gamma' },
        ],
      },
      {
        params: {
          context: {
            tabKey: 'gamma',
            label: 'Gamma',
            index: 2,
          },
        },
        truthyCases: [
          { tabKey: 'gamma' },
        ],
        falsyCases: [
          { tabKey: 'alpha' },
          { tabKey: 'beta' },
        ],
      },
    ]

    describe.each(cases)('tabKey: $params.context.tabKey', ({ params, truthyCases, falsyCases }) => {
      const context = FuroTabItemContext.create(params.context)

      describe('to be truthy', () => {
        test.each(truthyCases)('tabKey: $tabKey', ({ tabKey }) => {
          const actual = context.isTargetTab({
            tabKey,
          })

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('tabKey: $tabKey', ({ tabKey }) => {
          const actual = context.isTargetTab({
            tabKey,
          })

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})
