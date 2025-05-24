import {
  ref,
} from 'vue'

import FuroTabLayoutContext from '~/lib/contexts/concretes/FuroTabLayoutContext.js'

import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'
import FuroTabItemContext from '~/lib/contexts/concretes/FuroTabItemContext.js'

describe('FuroTabLayoutContext', () => {
  describe('super class', () => {
    test('to be instance of BaseFuroContext', () => {
      const actual = FuroTabLayoutContext.prototype

      expect(actual)
        .toBeInstanceOf(BaseFuroContext)
    })
  })
})

describe('FuroTabLayoutContext', () => {
  describe('constructor', () => {
    const propsMock = {
      tabs: [
        { tabKey: 'alpha', label: 'Alpha' },
        { tabKey: 'beta', label: 'Beta' },
        { tabKey: 'gamma', label: 'Gamma' },
      ],
      activeTabKey: 'alpha',
    }
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    describe('to keep properties', () => {
      describe('#tabElementsRef', () => {
        const alphaTabElement = document.createElement('div')
        const betaTabElement = document.createElement('div')
        const gammaTabElement = document.createElement('div')

        const cases = [
          {
            params: {
              tabElementsRef: ref([
                alphaTabElement,
                betaTabElement,
                gammaTabElement,
              ]),
            },
          },
          {
            params: {
              tabElementsRef: ref([
                betaTabElement,
                gammaTabElement,
              ]),
            },
          },
          {
            params: {
              tabElementsRef: ref([
                gammaTabElement,
              ]),
            },
          },
          {
            params: {
              tabElementsRef: ref([]),
            },
          },
        ]

        test.each(cases)('tabElementsRef: $params.tabElementsRef', ({ params }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            tabElementsRef: params.tabElementsRef,
            tabContexts: [],
            activeTabKey: null,
          }

          const context = new FuroTabLayoutContext(args)

          expect(context)
            .toHaveProperty('tabElementsRef', params.tabElementsRef)
        })
      })
    })

    describe('to keep properties', () => {
      describe('#tabContexts', () => {
        const cases = [
          {
            params: {
              tabContexts: [
                FuroTabItemContext.create({ tabKey: 'alpha', label: 'Alpha', index: 0 }),
                FuroTabItemContext.create({ tabKey: 'beta', label: 'Beta', index: 1 }),
                FuroTabItemContext.create({ tabKey: 'gamma', label: 'Gamma', index: 2 }),
              ],
            },
          },
          {
            params: {
              tabContexts: [
                FuroTabItemContext.create({ tabKey: 'alpha', label: 'Alpha', index: 0 }),
                FuroTabItemContext.create({ tabKey: 'beta', label: 'Beta', index: 1 }),
              ],
            },
          },
          {
            params: {
              tabContexts: [
                FuroTabItemContext.create({ tabKey: 'alpha', label: 'Alpha', index: 0 }),
              ],
            },
          },
          {
            params: {
              tabContexts: [],
            },
          },
        ]

        test.each(cases)('tabContexts: $params.tabContexts', ({ params }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            tabElementsRef: ref([]),
            tabContexts: params.tabContexts,
            activeTabKey: null,
          }

          const context = new FuroTabLayoutContext(args)

          expect(context)
            .toHaveProperty('tabContexts', params.tabContexts)
        })
      })
    })

    describe('#activeTabKey', () => {
      const cases = [
        {
          params: {
            activeTabKey: 'alpha',
          },
        },
        {
          params: {
            activeTabKey: 'beta',
          },
        },
        {
          params: {
            activeTabKey: 'gamma',
          },
        },
        {
          params: {
            activeTabKey: null,
          },
        },
      ]

      test.each(cases)('activeTabKey: $params.activeTabKey', ({ params }) => {
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          tabElementsRef: ref([]),
          tabContexts: [],
          activeTabKey: params.activeTabKey,
        }

        const context = new FuroTabLayoutContext(args)

        expect(context)
          .toHaveProperty('activeTabKey', params.activeTabKey)
      })
    })
  })
})

describe('FuroTabLayoutContext', () => {
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
              tabs: [
                { tabKey: 'gamma', label: 'Gamma' },
                { tabKey: 'alpha', label: 'Alpha' },
                { tabKey: 'beta', label: 'Beta' },
              ],
            },
          },
        },
        {
          params: {
            props: {
              tabs: [
                { tabKey: 'alpha', label: 'Alpha' },
                { tabKey: 'beta', label: 'Beta' },
              ],
            },
          },
        },
        {
          params: {
            props: {
              tabs: [
                { tabKey: 'alpha', label: 'Alpha' },
              ],
            },
          },
        },
      ]

      test.each(cases)('tabs length: $params.props.tabs.length', ({ params }) => {
        const args = {
          props: params.props,
          componentContext: componentContextMock,
          tabElementsRef: ref([]),
        }
        const actual = FuroTabLayoutContext.create(args)

        expect(actual)
          .toBeInstanceOf(FuroTabLayoutContext)
      })
    })

    describe('to call constructor', () => {
      const alphaTabElement = document.createElement('div')
      const betaTabElement = document.createElement('div')
      const gammaTabElement = document.createElement('div')

      const cases = [
        {
          params: {
            props: {
              tabs: [
                { tabKey: 'gamma', label: 'Gamma' },
                { tabKey: 'alpha', label: 'Alpha' },
                { tabKey: 'beta', label: 'Beta' },
              ],
              activeTabKey: 'alpha',
            },
            componentContext: componentContextMock,
            tabElementsRef: ref([
              alphaTabElement,
              betaTabElement,
              gammaTabElement,
            ]),
          },
          expected: {
            props: {
              tabs: [
                { tabKey: 'gamma', label: 'Gamma' },
                { tabKey: 'alpha', label: 'Alpha' },
                { tabKey: 'beta', label: 'Beta' },
              ],
              activeTabKey: 'alpha',
            },
            componentContext: componentContextMock,
            tabElementsRef: ref([
              alphaTabElement,
              betaTabElement,
              gammaTabElement,
            ]),
            tabContexts: [
              FuroTabItemContext.create({ tabKey: 'gamma', label: 'Gamma', index: 0 }),
              FuroTabItemContext.create({ tabKey: 'alpha', label: 'Alpha', index: 1 }),
              FuroTabItemContext.create({ tabKey: 'beta', label: 'Beta', index: 2 }),
            ],
            activeTabKey: 'alpha',
          },
        },
        {
          params: {
            props: {
              tabs: [
                { tabKey: 'alpha', label: 'Alpha' },
                { tabKey: 'beta', label: 'Beta' },
              ],
              activeTabKey: 'beta',
            },
            componentContext: componentContextMock,
            tabElementsRef: ref([
              betaTabElement,
              gammaTabElement,
            ]),
          },
          expected: {
            props: {
              tabs: [
                { tabKey: 'alpha', label: 'Alpha' },
                { tabKey: 'beta', label: 'Beta' },
              ],
              activeTabKey: 'beta',
            },
            componentContext: componentContextMock,
            tabElementsRef: ref([
              betaTabElement,
              gammaTabElement,
            ]),
            tabContexts: [
              FuroTabItemContext.create({ tabKey: 'alpha', label: 'Alpha', index: 0 }),
              FuroTabItemContext.create({ tabKey: 'beta', label: 'Beta', index: 1 }),
            ],
            activeTabKey: 'beta',
          },
        },
        {
          params: {
            props: {
              tabs: [
                { tabKey: 'alpha', label: 'Alpha' },
              ],
              // activeTabKey: 'alpha,
            },
            componentContext: componentContextMock,
            tabElementsRef: ref([
              gammaTabElement,
            ]),
          },
          expected: {
            props: {
              tabs: [
                { tabKey: 'alpha', label: 'Alpha' },
              ],
              // activeTabKey: 'alpha,
            },
            componentContext: componentContextMock,
            tabElementsRef: ref([
              gammaTabElement,
            ]),
            tabContexts: [
              FuroTabItemContext.create({ tabKey: 'alpha', label: 'Alpha', index: 0 }),
            ],
            activeTabKey: null,
          },
        },
      ]

      test.each(cases)('tabs length: $params.props.tabs.length', ({ params, expected }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroTabLayoutContext)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('FuroTabLayoutContext', () => {
  describe('.get:EMIT_EVENT_NAME', () => {
    test('to be fixed value', () => {
      const expected = {
        CHANGE_TAB: 'changeTab',
      }

      const actual = FuroTabLayoutContext.EMIT_EVENT_NAME

      expect(actual)
        .toStrictEqual(expected)
    })
  })
})

describe('FuroTabLayoutContext', () => {
  describe('.createTabContext()', () => {
    const cases = [
      {
        params: {
          tab: {
            tabKey: 'alpha',
            label: 'Alpha',
          },
          index: 0,
        },
        expected: FuroTabItemContext.create({
          tabKey: 'alpha',
          label: 'Alpha',
          index: 0,
        }),
      },
      {
        params: {
          tab: {
            tabKey: 'beta',
            label: 'Beta',
          },
          index: 1,
        },
        expected: FuroTabItemContext.create({
          tabKey: 'beta',
          label: 'Beta',
          index: 1,
        }),
      },
    ]

    test.each(cases)('tab: $params.tab', ({ params, expected }) => {
      const actual = FuroTabLayoutContext.createTabContext(params)

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroTabLayoutContext', () => {
  describe('#get:tabElements', () => {
    const propsMock = {
      tabs: [
        { tabKey: 'alpha', label: 'Alpha' },
        { tabKey: 'beta', label: 'Beta' },
        { tabKey: 'gamma', label: 'Gamma' },
      ],
      activeTabKey: 'alpha',
    }
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    const alphaTabElement = document.createElement('div')
    const betaTabElement = document.createElement('div')
    const gammaTabElement = document.createElement('div')

    const cases = [
      {
        params: {
          tabElementsRef: ref([
            alphaTabElement,
            betaTabElement,
            gammaTabElement,
          ]),
        },
        expected: [
          alphaTabElement,
          betaTabElement,
          gammaTabElement,
        ],
      },
      {
        params: {
          tabElementsRef: ref([
            betaTabElement,
            gammaTabElement,
          ]),
        },
        expected: [
          betaTabElement,
          gammaTabElement,
        ],
      },
      {
        params: {
          tabElementsRef: ref([
            gammaTabElement,
          ]),
        },
        expected: [
          gammaTabElement,
        ],
      },
      {
        params: {
          tabElementsRef: ref([]),
        },
        expected: [],
      },
    ]

    test.each(cases)('tabElementsRef: $params.tabElementsRef', ({ params, expected }) => {
      const args = {
        props: propsMock,
        componentContext: componentContextMock,
        tabElementsRef: params.tabElementsRef,
        tabContexts: [],
        activeTabKey: null,
      }

      const context = new FuroTabLayoutContext(args)

      const actual = context.tabElements

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroTabLayoutContext', () => {
  describe('#isActiveTab()', () => {
    const propsMock = {
      tabs: [
        { tabKey: 'alpha', label: 'Alpha' },
        { tabKey: 'beta', label: 'Beta' },
        { tabKey: 'gamma', label: 'Gamma' },
      ],
      activeTabKey: 'alpha',
    }
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    const alphaTabItemContext = FuroTabItemContext.create({ tabKey: 'alpha', label: 'Alpha', index: 0 })
    const betaTabItemContext = FuroTabItemContext.create({ tabKey: 'beta', label: 'Beta', index: 1 })
    const gammaTabItemContext = FuroTabItemContext.create({ tabKey: 'gamma', label: 'Gamma', index: 2 })

    const cases = [
      {
        params: {
          activeTabKey: 'alpha',
        },
        truthyCases: [
          { tab: alphaTabItemContext },
        ],
        falsyCases: [
          { tab: betaTabItemContext },
          { tab: gammaTabItemContext },
        ],
      },
    ]

    describe.each(cases)('activeTabKey: $params.activeTabKey', ({ params, truthyCases, falsyCases }) => {
      const args = {
        props: propsMock,
        componentContext: componentContextMock,
        tabElementsRef: ref([]),
        tabContexts: [],
        activeTabKey: params.activeTabKey,
      }

      const context = new FuroTabLayoutContext(args)

      describe('to be truthy', () => {
        test.each(truthyCases)('tabKey: $tab.tagKey', ({ tab }) => {
          const actual = context.isActiveTab({
            tab,
          })

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        test.each(falsyCases)('tabKey: $tab.tabKey', ({ tab }) => {
          const actual = context.isActiveTab({
            tab,
          })

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FuroTabLayoutContext', () => {
  describe('#onClickTab()', () => {
    describe('to change tab by updating class', () => {
      const alphaElement = document.createElement('div')
      const betaElement = document.createElement('div')
      const gammaElement = document.createElement('div')

      const tabElements = [
        alphaElement,
        betaElement,
        gammaElement,
      ]

      const propsMock = {
        tabs: [
          { tabKey: 'alpha', label: 'Alpha' },
          { tabKey: 'beta', label: 'Beta' },
          { tabKey: 'gamma', label: 'Gamma' },
        ],
        activeTabKey: 'alpha',
      }
      const componentContextMock = {
        attrs: {},
        emit: () => {},
        expose: () => {},
        slots: {},
      }

      const context = new FuroTabLayoutContext({
        props: propsMock,
        componentContext: componentContextMock,
        tabElementsRef: ref(tabElements),
        tabContexts: [],
        activeTabKey: null,
      })

      describe('on click alpha tab', () => {
        const expected = 'active'

        const args = {
          event: {
            target: alphaElement,
          },
        }

        test('to call #remove()', () => {
          alphaElement['classList'].remove('active')
          betaElement['classList'].remove('active')
          gammaElement['classList'].add('active')

          const alphaRemoveSpy = jest.spyOn(alphaElement['classList'], 'remove')
          const betaRemoveSpy = jest.spyOn(betaElement['classList'], 'remove')
          const gammaRemoveSpy = jest.spyOn(gammaElement['classList'], 'remove')

          context.onClickTab(args)

          expect(alphaRemoveSpy)
            .not
            .toHaveBeenCalledWith(expected)
          expect(betaRemoveSpy)
            .not
            .toHaveBeenCalledWith(expected)
          expect(gammaRemoveSpy)
            .toHaveBeenCalledWith(expected)
        })

        test('to call #add()', () => {
          alphaElement['classList'].remove('active')
          betaElement['classList'].remove('active')
          gammaElement['classList'].add('active')

          const alphaAddSpy = jest.spyOn(alphaElement['classList'], 'add')
          const betaAddSpy = jest.spyOn(betaElement['classList'], 'add')
          const gammaAddSpy = jest.spyOn(gammaElement['classList'], 'add')

          context.onClickTab(args)

          expect(alphaAddSpy)
            .toHaveBeenCalledWith(expected)
          expect(betaAddSpy)
            .not
            .toHaveBeenCalledWith(expected)
          expect(gammaAddSpy)
            .not
            .toHaveBeenCalledWith(expected)
        })
      })

      describe('on click beta tab', () => {
        const expected = 'active'

        const args = {
          event: {
            target: betaElement,
          },
        }

        test('to call #remove()', () => {
          alphaElement['classList'].add('active')
          betaElement['classList'].remove('active')
          gammaElement['classList'].remove('active')

          const alphaRemoveSpy = jest.spyOn(alphaElement['classList'], 'remove')
          const betaRemoveSpy = jest.spyOn(betaElement['classList'], 'remove')
          const gammaRemoveSpy = jest.spyOn(gammaElement['classList'], 'remove')

          context.onClickTab(args)

          expect(alphaRemoveSpy)
            .toHaveBeenCalledWith(expected)
          expect(betaRemoveSpy)
            .not
            .toHaveBeenCalledWith(expected)
          expect(gammaRemoveSpy)
            .not
            .toHaveBeenCalledWith(expected)
        })

        test('to call #add()', () => {
          alphaElement['classList'].add('active')
          betaElement['classList'].remove('active')
          gammaElement['classList'].remove('active')

          const alphaAddSpy = jest.spyOn(alphaElement['classList'], 'add')
          const betaAddSpy = jest.spyOn(betaElement['classList'], 'add')
          const gammaAddSpy = jest.spyOn(gammaElement['classList'], 'add')

          context.onClickTab(args)

          expect(alphaAddSpy)
            .not
            .toHaveBeenCalledWith(expected)
          expect(betaAddSpy)
            .toHaveBeenCalledWith(expected)
          expect(gammaAddSpy)
            .not
            .toHaveBeenCalledWith(expected)
        })
      })

      describe('on click gamma tab', () => {
        const expected = 'active'

        const args = {
          event: {
            target: gammaElement,
          },
        }

        test('to call #remove()', () => {
          alphaElement['classList'].remove('active')
          betaElement['classList'].add('active')
          gammaElement['classList'].remove('active')

          const alphaRemoveSpy = jest.spyOn(alphaElement['classList'], 'remove')
          const betaRemoveSpy = jest.spyOn(betaElement['classList'], 'remove')
          const gammaRemoveSpy = jest.spyOn(gammaElement['classList'], 'remove')

          context.onClickTab(args)

          expect(alphaRemoveSpy)
            .not
            .toHaveBeenCalledWith(expected)
          expect(betaRemoveSpy)
            .toHaveBeenCalledWith(expected)
          expect(gammaRemoveSpy)
            .not
            .toHaveBeenCalledWith(expected)
        })

        test('to call #add()', () => {
          alphaElement['classList'].remove('active')
          betaElement['classList'].add('active')
          gammaElement['classList'].remove('active')

          const alphaAddSpy = jest.spyOn(alphaElement['classList'], 'add')
          const betaAddSpy = jest.spyOn(betaElement['classList'], 'add')
          const gammaAddSpy = jest.spyOn(gammaElement['classList'], 'add')

          context.onClickTab(args)

          expect(alphaAddSpy)
            .not
            .toHaveBeenCalledWith(expected)
          expect(betaAddSpy)
            .not
            .toHaveBeenCalledWith(expected)
          expect(gammaAddSpy)
            .toHaveBeenCalledWith(expected)
        })
      })
    })

    describe('to emit tab change event', () => {
      const propsMock = {
        tabs: [
          { tabKey: 'alpha', label: 'Alpha' },
          { tabKey: 'beta', label: 'Beta' },
          { tabKey: 'gamma', label: 'Gamma' },
        ],
        activeTabKey: 'alpha',
      }

      const alphaTabContext = FuroTabItemContext.create({ tabKey: 'alpha', label: 'Alpha', index: 0 })
      const betaTabContext = FuroTabItemContext.create({ tabKey: 'beta', label: 'Beta', index: 1 })
      const gammaTabContext = FuroTabItemContext.create({ tabKey: 'gamma', label: 'Gamma', index: 2 })

      const tabContexts = [
        alphaTabContext,
        betaTabContext,
        gammaTabContext,
      ]

      describe('on click alpha tab', () => {
        const emitMock = jest.fn()
        const componentContextMock = {
          attrs: {},
          emit: emitMock,
          expose: () => {},
          slots: {},
        }

        const alphaElement = document.createElement('div')
        const betaElement = document.createElement('div')
        const gammaElement = document.createElement('div')

        gammaElement['classList'].add('active')

        const tabElements = [
          alphaElement,
          betaElement,
          gammaElement,
        ]

        const context = new FuroTabLayoutContext({
          props: propsMock,
          componentContext: componentContextMock,
          tabElementsRef: ref(tabElements),
          tabContexts,
          activeTabKey: propsMock.activeTabKey,
        })

        const args = {
          event: {
            target: alphaElement,
          },
        }

        test('to emit change tab event', () => {
          const expected = [
            FuroTabLayoutContext.EMIT_EVENT_NAME.CHANGE_TAB,
            {
              fromTab: gammaTabContext,
              toTab: alphaTabContext,
            },
          ]

          context.onClickTab(args)

          expect(emitMock)
            .toHaveBeenCalledWith(...expected)
        })
      })

      describe('on click beta tab', () => {
        const emitMock = jest.fn()
        const componentContextMock = {
          attrs: {},
          emit: emitMock,
          expose: () => {},
          slots: {},
        }

        const alphaElement = document.createElement('div')
        const betaElement = document.createElement('div')
        const gammaElement = document.createElement('div')

        alphaElement['classList'].add('active')

        const tabElements = [
          alphaElement,
          betaElement,
          gammaElement,
        ]

        const context = new FuroTabLayoutContext({
          props: propsMock,
          componentContext: componentContextMock,
          tabElementsRef: ref(tabElements),
          tabContexts,
          activeTabKey: propsMock.activeTabKey,
        })

        const args = {
          event: {
            target: betaElement,
          },
        }

        test('to emit change tab event', () => {
          const expected = [
            FuroTabLayoutContext.EMIT_EVENT_NAME.CHANGE_TAB,
            {
              fromTab: alphaTabContext,
              toTab: betaTabContext,
            },
          ]

          context.onClickTab(args)

          expect(emitMock)
            .toHaveBeenCalledWith(...expected)
        })
      })

      describe('on click gamma tab', () => {
        const emitMock = jest.fn()
        const componentContextMock = {
          attrs: {},
          emit: emitMock,
          expose: () => {},
          slots: {},
        }

        const alphaElement = document.createElement('div')
        const betaElement = document.createElement('div')
        const gammaElement = document.createElement('div')

        betaElement['classList'].add('active')

        const tabElements = [
          alphaElement,
          betaElement,
          gammaElement,
        ]

        const context = new FuroTabLayoutContext({
          props: propsMock,
          componentContext: componentContextMock,
          tabElementsRef: ref(tabElements),
          tabContexts,
          activeTabKey: propsMock.activeTabKey,
        })

        const args = {
          event: {
            target: gammaElement,
          },
        }

        test('to emit change tab event', () => {
          const expected = [
            FuroTabLayoutContext.EMIT_EVENT_NAME.CHANGE_TAB,
            {
              fromTab: betaTabContext,
              toTab: gammaTabContext,
            },
          ]

          context.onClickTab(args)

          expect(emitMock)
            .toHaveBeenCalledWith(...expected)
        })
      })
    })
  })
})
