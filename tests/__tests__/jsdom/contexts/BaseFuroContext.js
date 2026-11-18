import {
  watch,
} from 'vue'

import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'
import BaseFuroContextAccessor from '~/lib/contexts/BaseFuroContextAccessor'

describe('BaseFuroContext', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#props', () => {
        /**
         * @type {Array<{
         *   params: {
         *     props: import('vue').ComponentCustomProps
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              props: {
                label: 'alpha',
              },
            },
          },
        ])

        test.each(cases)('label: $params.props.label', ({ params }) => {
          const args = {
            props: params.props,
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
          }

          const context = new BaseFuroContext(args)

          expect(context)
            .toHaveProperty('props', params.props)
        })
      })

      describe('#componentContext', () => {
        /**
         * @type {Array<{
         *   params: {
         *     componentContext: import('vue').SetupContext
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              componentContext: {
                attrs: {
                  label: 'alpha',
                },
                emit: () => {},
                expose: () => {},
                slots: {},
              },
            },
          },
          {
            params: {
              componentContext: {
                attrs: {
                  label: 'beta',
                },
                emit: () => {},
                expose: () => {},
                slots: {},
              },
            },
          },
        ])

        test.each(cases)('label: $params.componentContext.attrs.label', ({ params }) => {
          const args = {
            props: {},
            componentContext: params.componentContext,
          }

          const context = new BaseFuroContext(args)

          expect(context)
            .toHaveProperty('componentContext', params.componentContext)
        })
      })
    })
  })
})

describe('BaseFuroContext', () => {
  describe('.create()', () => {
    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            label: 'alpha',
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        },
      },
      {
        params: {
          props: {
            label: 'beta',
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        },
      },
    ])

    describe('to be instance of own class', () => {
      test.each(cases)('label: $params.props.label', ({ params }) => {
        const context = BaseFuroContext.create(params)

        expect(context)
          .toBeInstanceOf(BaseFuroContext)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('label: $params.props.label', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(BaseFuroContext)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('BaseFuroContext', () => {
  describe('.get:ContextAccessor', () => {
    test('to be fixed value', () => {
      const actual = BaseFuroContext.ContextAccessor

      expect(actual)
        .toBeNull()
    })
  })
})

describe('BaseFuroContext', () => {
  describe('.get:EMIT_EVENT_NAME', () => {
    test('to be fixed value', () => {
      const expected = {}

      const actual = BaseFuroContext.EMIT_EVENT_NAME

      expect(actual)
        .toStrictEqual(expected)
    })
  })
})

describe('BaseFuroContext', () => {
  describe('.createMutationObserver()', () => {
    /**
     * @type {Array<{
     *   params: {
     *     handler: MutationCallback
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          handler: () => {},
        },
      },
    ])

    describe('to be instance of MutationObserver', () => {
      test.each(cases)('handler: $params.handler', ({ params }) => {
        const actual = BaseFuroContext.createMutationObserver(params)

        expect(actual)
          .toBeInstanceOf(MutationObserver)
      })
    })
  })
})

describe('BaseFuroContext', () => {
  describe('#get:Ctor', () => {
    describe('to be own class', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              label: 'alpha',
            },
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
          },
        },
        {
          params: {
            props: {
              label: 'beta',
            },
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
          },
        },
      ])

      test.each(cases)('label: $params.props.label', ({ params }) => {
        const context = BaseFuroContext.create(params)

        const actual = context.Ctor

        expect(actual)
          .toBe(BaseFuroContext) // same reference
      })
    })
  })
})

describe('BaseFuroContext', () => {
  describe('#get:EMIT_EVENT_NAME', () => {
    describe('to be own class', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     EMIT_EVENT_NAME: Record<string, string>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              label: 'alpha',
            },
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            EMIT_EVENT_NAME: {
              ALPHA: 'alpha',
            },
          },
        },
        {
          params: {
            props: {
              label: 'beta',
            },
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            EMIT_EVENT_NAME: {
              BETA: 'beta',
            },
          },
        },
      ])

      test.each(cases)('label: $params.props.label', ({ params }) => {
        const args = {
          props: params.props,
          componentContext: params.componentContext,
        }
        const context = BaseFuroContext.create(args)

        jest.spyOn(BaseFuroContext, 'EMIT_EVENT_NAME', 'get')
          .mockReturnValue(params.EMIT_EVENT_NAME)

        const actual = context.EMIT_EVENT_NAME

        expect(actual)
          .toEqual(params.EMIT_EVENT_NAME)
      })
    })
  })
})

describe('BaseFuroContext', () => {
  describe('#get:attrs', () => {
    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *   }
     *   expected: import('vue').SetupContext['attrs']
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            label: 'alpha',
          },
          componentContext: {
            attrs: {
              command: 'alpha',
            },
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        },
        expected: {
          command: 'alpha',
        },
      },
      {
        params: {
          props: {
            label: 'beta',
          },
          componentContext: {
            attrs: {
              command: 'beta',
            },
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        },
        expected: {
          command: 'beta',
        },
      },
    ])

    test.each(cases)('label: $params.props.label', ({ params, expected }) => {
      const context = BaseFuroContext.create(params)

      const actual = context.attrs

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('BaseFuroContext', () => {
  describe('#get:emit', () => {
    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            label: 'alpha',
          },
          componentContext: {
            attrs: {
              command: 'alpha',
            },
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        },
      },
      {
        params: {
          props: {
            label: 'beta',
          },
          componentContext: {
            attrs: {
              command: 'beta',
            },
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        },
      },
    ])

    test.each(cases)('label: $params.props.label', ({ params }) => {
      const context = BaseFuroContext.create(params)

      const actual = context.emit

      expect(actual)
        .toBe(params.componentContext.emit) // same reference
    })
  })
})

describe('BaseFuroContext', () => {
  describe('#get:expose', () => {
    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            label: 'alpha',
          },
          componentContext: {
            attrs: {
              command: 'alpha',
            },
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        },
      },
      {
        params: {
          props: {
            label: 'beta',
          },
          componentContext: {
            attrs: {
              command: 'beta',
            },
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        },
      },
    ])

    test.each(cases)('label: $params.props.label', ({ params }) => {
      const context = BaseFuroContext.create(params)

      const actual = context.expose

      expect(actual)
        .toBe(params.componentContext.expose) // same reference
    })
  })
})

describe('BaseFuroContext', () => {
  describe('#get:slots', () => {
    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            label: 'alpha',
          },
          componentContext: {
            attrs: {
              command: 'alpha',
            },
            emit: () => {},
            expose: () => {},
            slots: {
              default: () => {},
              alpha: () => {},
            },
          },
        },
      },
      {
        params: {
          props: {
            label: 'beta',
          },
          componentContext: {
            attrs: {
              command: 'beta',
            },
            emit: () => {},
            expose: () => {},
            slots: {
              default: () => {},
              beta: () => {},
            },
          },
        },
      },
    ])

    test.each(cases)('label: $params.props.label', ({ params }) => {
      const context = BaseFuroContext.create(params)

      const actual = context.slots

      expect(actual)
        .toBe(params.componentContext.slots) // same reference
    })
  })
})

describe('BaseFuroContext', () => {
  describe('#setupComponent()', () => {
    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            label: 'alpha',
          },
          componentContext: {
            attrs: {
              command: 'alpha',
            },
            emit: () => {},
            expose: () => {},
            slots: {
              default: () => {},
              alpha: () => {},
            },
          },
        },
      },
      {
        params: {
          props: {
            label: 'beta',
          },
          componentContext: {
            attrs: {
              command: 'beta',
            },
            emit: () => {},
            expose: () => {},
            slots: {
              default: () => {},
              beta: () => {},
            },
          },
        },
      },
    ])

    describe('to return own instance for method chaining', () => {
      test.each(cases)('label: $params.props.label', ({ params }) => {
        const context = BaseFuroContext.create(params)

        const actual = context.setupComponent()

        expect(actual)
          .toBe(context) // same reference
      })
    })
  })
})

describe('BaseFuroContext', () => {
  describe('#get:watch()', () => {
    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            label: 'alpha',
          },
          componentContext: {
            attrs: {
              command: 'alpha',
            },
            emit: () => {},
            expose: () => {},
            slots: {
              default: () => {},
              alpha: () => {},
            },
          },
        },
      },
      {
        params: {
          props: {
            label: 'beta',
          },
          componentContext: {
            attrs: {
              command: 'beta',
            },
            emit: () => {},
            expose: () => {},
            slots: {
              default: () => {},
              beta: () => {},
            },
          },
        },
      },
    ])

    describe('to return own instance for method chaining', () => {
      test.each(cases)('label: $params.props.label', ({ params }) => {
        const context = BaseFuroContext.create(params)

        const actual = context.watch

        expect(actual)
          .toBe(watch) // same reference
      })
    })
  })
})

describe('BaseFuroContext', () => {
  describe('#generateExposeHash()', () => {
    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            label: 'alpha',
          },
          componentContext: {
            attrs: {
              command: 'alpha',
            },
            emit: () => {},
            expose: () => {},
            slots: {
              default: () => {},
              alpha: () => {},
            },
          },
        },
      },
      {
        params: {
          props: {
            label: 'beta',
          },
          componentContext: {
            attrs: {
              command: 'beta',
            },
            emit: () => {},
            expose: () => {},
            slots: {
              default: () => {},
              beta: () => {},
            },
          },
        },
      },
    ])

    describe('to be fixed value', () => {
      test.each(cases)('label: $params.props.label', ({ params }) => {
        const expected = {}

        const context = BaseFuroContext.create(params)

        const actual = context.generateExposeHash()

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})

describe('BaseFuroContext', () => {
  describe('.accessorPool', () => {
    test('to be instance of WeakMap', () => {
      expect(BaseFuroContext.accessorPool)
        .toBeInstanceOf(WeakMap)
    })
  })
})

describe('BaseFuroContext', () => {
  describe('.createContextAccessor()', () => {
    /**
     * @extends {BaseFuroContextAccessor<*>}
     */
    const AlphaContextAccessor = class extends BaseFuroContextAccessor {
      // noop
    }

    /**
     * @extends {BaseFuroContextAccessor<*>}
     */
    const BetaContextAccessor = class extends BaseFuroContextAccessor {
      // noop
    }

    describe('to be instance of ContextAccessor', () => {
      const cases = [
        {
          params: {
            ContextAccessor: AlphaContextAccessor,
          },
        },
        {
          params: {
            ContextAccessor: BetaContextAccessor,
          },
        },
      ]

      test.each(cases)('ContextAccessor: $params.ContextAccessor', ({ params }) => {
        jest.spyOn(BaseFuroContext, 'ContextAccessor', 'get')
          .mockReturnValue(params.ContextAccessor)

        const context = new BaseFuroContext({
          props: {
            alpha: 10001,
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        })

        const actual = BaseFuroContext.createContextAccessor({
          context,
        })

        expect(actual)
          .toBeInstanceOf(params.ContextAccessor)
      })
    })

    describe('to keep the given context', () => {
      test('with ContextAccessor', () => {
        jest.spyOn(BaseFuroContext, 'ContextAccessor', 'get')
          .mockReturnValue(AlphaContextAccessor)

        const context = new BaseFuroContext({
          props: {
            alpha: 10001,
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        })

        const actual = BaseFuroContext.createContextAccessor({
          context,
        })

        expect(actual)
          .toHaveProperty('context', context)
      })
    })

    describe('to be null', () => {
      test('with no ContextAccessor', () => {
        const context = new BaseFuroContext({
          props: {
            alpha: 10001,
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        })

        const actual = BaseFuroContext.createContextAccessor({
          context,
        })

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('BaseFuroContext', () => {
  describe('.ensureContextAccessor()', () => {
    /**
     * @extends {BaseFuroContextAccessor<*>}
     */
    const AlphaContextAccessor = class extends BaseFuroContextAccessor {
      // noop
    }

    /**
     * @extends {BaseFuroContextAccessor<*>}
     */
    const BetaContextAccessor = class extends BaseFuroContextAccessor {
      // noop
    }

    describe('to return the pooled instance', () => {
      test('on repeated calls for the same context', () => {
        jest.spyOn(BaseFuroContext, 'ContextAccessor', 'get')
          .mockReturnValue(AlphaContextAccessor)

        const context = new BaseFuroContext({
          props: {
            alpha: 10001,
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        })

        const first = BaseFuroContext.ensureContextAccessor({
          context,
        })
        const second = BaseFuroContext.ensureContextAccessor({
          context,
        })

        expect(second)
          .toBe(first)
      })

      test('with null for a context without ContextAccessor', () => {
        const context = new BaseFuroContext({
          props: {
            alpha: 10001,
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        })

        const first = BaseFuroContext.ensureContextAccessor({
          context,
        })
        const second = BaseFuroContext.ensureContextAccessor({
          context,
        })

        expect(first)
          .toBeNull()
        expect(second)
          .toBeNull()
      })
    })

    describe('to return a different instance for each context', () => {
      test('with two contexts', () => {
        jest.spyOn(BaseFuroContext, 'ContextAccessor', 'get')
          .mockReturnValue(BetaContextAccessor)

        const alphaContext = new BaseFuroContext({
          props: {
            alpha: 10001,
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        })
        const betaContext = new BaseFuroContext({
          props: {
            alpha: 10001,
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        })

        const alphaAccessor = BaseFuroContext.ensureContextAccessor({
          context: alphaContext,
        })
        const betaAccessor = BaseFuroContext.ensureContextAccessor({
          context: betaContext,
        })

        expect(alphaAccessor)
          .not.toBe(betaAccessor)
        expect(alphaAccessor)
          .toHaveProperty('context', alphaContext)
        expect(betaAccessor)
          .toHaveProperty('context', betaContext)
      })
    })

    describe('to call .createContextAccessor()', () => {
      test('once for the same context', () => {
        jest.spyOn(BaseFuroContext, 'ContextAccessor', 'get')
          .mockReturnValue(AlphaContextAccessor)
        const spyCreate = jest.spyOn(BaseFuroContext, 'createContextAccessor')

        const context = new BaseFuroContext({
          props: {
            alpha: 10001,
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        })

        BaseFuroContext.ensureContextAccessor({
          context,
        })
        BaseFuroContext.ensureContextAccessor({
          context,
        })

        expect(spyCreate)
          .toHaveBeenCalledTimes(1)
        expect(spyCreate)
          .toHaveBeenCalledWith({
            context,
          })
      })
    })
  })
})

describe('BaseFuroContext', () => {
  describe('#createContextAccessor()', () => {
    /**
     * @extends {BaseFuroContextAccessor<*>}
     */
    const AlphaContextAccessor = class extends BaseFuroContextAccessor {
      // noop
    }

    /**
     * @extends {BaseFuroContextAccessor<*>}
     */
    const BetaContextAccessor = class extends BaseFuroContextAccessor {
      // noop
    }

    describe('to be instance of ContextAccessor', () => {
      const cases = [
        {
          params: {
            ContextAccessor: AlphaContextAccessor,
          },
        },
        {
          params: {
            ContextAccessor: BetaContextAccessor,
          },
        },
      ]

      test.each(cases)('ContextAccessor: $params.ContextAccessor', ({ params }) => {
        jest.spyOn(BaseFuroContext, 'ContextAccessor', 'get')
          .mockReturnValue(params.ContextAccessor)

        const context = new BaseFuroContext({
          props: {
            alpha: 10001,
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        })

        const actual = context.createContextAccessor()

        expect(actual)
          .toBeInstanceOf(params.ContextAccessor)
      })
    })

    describe('to be null', () => {
      test('with no arguments', () => {
        const context = new BaseFuroContext({
          props: {
            alpha: 10001,
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        })

        const actual = context.createContextAccessor()

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('BaseFuroContext', () => {
  describe('#get:$', () => {
    /**
     * @extends {BaseFuroContextAccessor<*>}
     */
    const AlphaContextAccessor = class extends BaseFuroContextAccessor {
      // noop
    }

    /**
     * @extends {BaseFuroContextAccessor<*>}
     */
    const BetaContextAccessor = class extends BaseFuroContextAccessor {
      // noop
    }

    describe('to be instance of ContextAccessor', () => {
      const cases = [
        {
          params: {
            ContextAccessor: AlphaContextAccessor,
          },
        },
        {
          params: {
            ContextAccessor: BetaContextAccessor,
          },
        },
      ]

      test.each(cases)('ContextAccessor: $params.ContextAccessor', ({ params }) => {
        jest.spyOn(BaseFuroContext, 'ContextAccessor', 'get')
          .mockReturnValue(params.ContextAccessor)

        const context = new BaseFuroContext({
          props: {
            alpha: 10001,
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        })

        const actual = context.$

        expect(actual)
          .toBeInstanceOf(params.ContextAccessor)
      })
    })

    describe('to be null', () => {
      test('with no arguments', () => {
        const context = new BaseFuroContext({
          props: {
            alpha: 10001,
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        })

        const actual = context.$

        expect(actual)
          .toBeNull()
      })
    })

    describe('to call .ensureContextAccessor()', () => {
      test('with itself as context', () => {
        jest.spyOn(BaseFuroContext, 'ContextAccessor', 'get')
          .mockReturnValue(AlphaContextAccessor)
        const spyEnsure = jest.spyOn(BaseFuroContext, 'ensureContextAccessor')

        const context = new BaseFuroContext({
          props: {
            alpha: 10001,
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        })

        const actual = context.$

        expect(actual)
          .toBeInstanceOf(AlphaContextAccessor)
        expect(spyEnsure)
          .toHaveBeenCalledTimes(1)
        expect(spyEnsure)
          .toHaveBeenCalledWith({
            context,
          })
      })
    })

    describe('to be the same instance', () => {
      test('on repeated access', () => {
        jest.spyOn(BaseFuroContext, 'ContextAccessor', 'get')
          .mockReturnValue(AlphaContextAccessor)

        const context = new BaseFuroContext({
          props: {
            alpha: 10001,
          },
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
        })

        expect(context.$)
          .toBe(context.$)
      })
    })
  })
})
