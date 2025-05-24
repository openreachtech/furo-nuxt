import {
  ref,
} from 'vue'

import FuroButtonDialogContext from '~/lib/contexts/concretes/FuroButtonDialogContext.js'

import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

describe('FuroButtonDialogContext', () => {
  describe('super class', () => {
    test('to be BaseFuroContext', () => {
      const actual = FuroButtonDialogContext.prototype

      expect(actual)
        .toBeInstanceOf(BaseFuroContext)
    })
  })
})

describe('FuroButtonDialogContext', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      const propsMock = {}
      const componentContextMock = {
        attrs: {},
        emit: () => {},
        expose: () => {},
        slots: {},
      }

      describe('#dialogComponentRef', () => {
        /**
         * @type {Array<{
         *   params: {
         *     props: import('vue').ComponentCustomProps
         *     componentContext: import('vue').SetupContext
         *     dialogComponentRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default | null>
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              props: propsMock,
              componentContext: componentContextMock,
              dialogComponentRef: {
                value: {
                  showDialog: () => {},
                  dismissDialog: () => {},
                },
              },
            },
          },
          {
            params: {
              props: propsMock,
              componentContext: componentContextMock,
              dialogComponentRef: {
                value: null,
              },
            },
          },
        ])

        test.each(cases)('dialogComponentRef: $params.dialogComponentRef', ({ params }) => {
          const context = new FuroButtonDialogContext(params)

          expect(context.dialogComponentRef)
            .toBe(params.dialogComponentRef) // same reference
        })
      })
    })
  })
})

describe('FuroButtonDialogContext', () => {
  describe('.create()', () => {
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
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *     dialogComponentRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default | null>
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: propsMock,
          componentContext: componentContextMock,
          dialogComponentRef: {
            value: {
              showDialog: () => {},
              dismissDialog: () => {},
            },
          },
        },
      },
      {
        params: {
          props: propsMock,
          componentContext: componentContextMock,
          dialogComponentRef: {
            value: null,
          },
        },
      },
    ])

    describe('to be instance of own class', () => {
      test.each(cases)('dialogComponentRef: $params.dialogComponentRef', ({ params }) => {
        const context = FuroButtonDialogContext.create(params)

        expect(context)
          .toBeInstanceOf(FuroButtonDialogContext)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('dialogComponentRef: $params.dialogComponentRef', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroButtonDialogContext)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('FuroButtonDialogContext', () => {
  describe('.get:EMIT_EVENT_NAME', () => {
    test('to return fixed value', () => {
      const expected = {
        CLICK_POSITIVE_BUTTON: 'clickPositiveButton',
        CLICK_NEGATIVE_BUTTON: 'clickNegativeButton',
        CLICK_NEUTRAL_BUTTON: 'clickNeutralButton',
      }

      const actual = FuroButtonDialogContext.EMIT_EVENT_NAME

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroButtonDialogContext', () => {
  describe('#get:dialogComponent', () => {
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
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *     dialogComponentRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default | null>
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: propsMock,
          componentContext: componentContextMock,
          dialogComponentRef: {
            value: {
              showDialog: () => {},
              dismissDialog: () => {},
            },
          },
        },
      },
      {
        params: {
          props: propsMock,
          componentContext: componentContextMock,
          dialogComponentRef: {
            value: null,
          },
        },
      },
    ])

    test.each(cases)('dialogComponentRef: $params.dialogComponentRef', ({ params }) => {
      const context = new FuroButtonDialogContext(params)

      const actual = context.dialogComponent

      expect(actual)
        .toBe(params.dialogComponentRef.value)
    })
  })
})

describe('FuroButtonDialogContext', () => {
  describe('#showDialog()', () => {
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
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *     dialogComponentRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default & {
     *       value: {
     *         showDialog: () => void
     *         dismissDialog: () => void
     *       }
     *     }>
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: propsMock,
          componentContext: componentContextMock,
          dialogComponentRef: {
            value: {
              showDialog: () => {},
              dismissDialog: () => {},
            },
          },
        },
      },
    ])

    test.each(cases)('dialogComponentRef: $params.dialogComponentRef', ({ params }) => {
      const showDialogSpy = jest.spyOn(params.dialogComponentRef.value, 'showDialog')

      const context = new FuroButtonDialogContext(params)

      context.showDialog()

      expect(showDialogSpy)
        .toHaveBeenCalledWith()
    })
  })
})

describe('FuroButtonDialogContext', () => {
  describe('#dismissDialog()', () => {
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
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *     dialogComponentRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default & {
     *       value: {
     *         showDialog: () => void
     *         dismissDialog: () => void
     *       }
     *     }>
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: propsMock,
          componentContext: componentContextMock,
          dialogComponentRef: {
            value: {
              showDialog: () => {},
              dismissDialog: () => {},
            },
          },
        },
      },
    ])

    test.each(cases)('dialogComponentRef: $params.dialogComponentRef', ({ params }) => {
      const dismissDialogSpy = jest.spyOn(params.dialogComponentRef.value, 'dismissDialog')

      const context = new FuroButtonDialogContext(params)

      context.dismissDialog()

      expect(dismissDialogSpy)
        .toHaveBeenCalledWith()
    })
  })
})

describe('FuroButtonDialogContext', () => {
  describe('#generateExposeHash()', () => {
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
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *     dialogComponentRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default & {
     *       value: {
     *         showDialog: () => void
     *         dismissDialog: () => void
     *       }
     *     }>
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: propsMock,
          componentContext: componentContextMock,
          dialogComponentRef: {
            value: {
              showDialog: () => {},
              dismissDialog: () => {},
            },
          },
        },
      },
    ])

    describe('to be object', () => {
      test.each(cases)('dialogComponentRef: $params.dialogComponentRef', ({ params }) => {
        const expected = {
          showDialog: expect.any(Function),
          dismissDialog: expect.any(Function),
        }

        const context = new FuroButtonDialogContext(params)

        const exposeHash = context.generateExposeHash()

        expect(exposeHash)
          .toEqual(expected)
      })
    })

    describe('to call #showDialog()', () => {
      test.each(cases)('dialogComponentRef: $params.dialogComponentRef', ({ params }) => {
        const context = new FuroButtonDialogContext(params)
        const exposeHash = context.generateExposeHash()

        const showDialogSpy = jest.spyOn(context, 'showDialog')

        exposeHash.showDialog()

        expect(showDialogSpy)
          .toHaveBeenCalledWith()
      })
    })

    describe('to call #dismissDialog()', () => {
      test.each(cases)('dialogComponentRef: $params.dialogComponentRef', ({ params }) => {
        const context = new FuroButtonDialogContext(params)
        const exposeHash = context.generateExposeHash()

        const dismissDialogSpy = jest.spyOn(context, 'dismissDialog')

        exposeHash.dismissDialog()

        expect(dismissDialogSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('FuroButtonDialogContext', () => {
  describe('#clickPositiveButton()', () => {
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
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *     dialogComponentRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default & {
     *       value: {
     *         showDialog: () => void
     *         dismissDialog: () => void
     *       }
     *     }>
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: propsMock,
          componentContext: componentContextMock,
          dialogComponentRef: {
            value: {
              showDialog: () => {},
              dismissDialog: () => {},
            },
          },
        },
      },
    ])

    test.each(cases)('dialogComponentRef: $params.dialogComponentRef', ({ params }) => {
      const emitSpy = jest.spyOn(params.componentContext, 'emit')

      const context = new FuroButtonDialogContext(params)
      const dismissDialogSpy = jest.spyOn(context, 'dismissDialog')

      context.clickPositiveButton()

      expect(dismissDialogSpy)
        .toHaveBeenCalledWith()
      expect(emitSpy)
        .toHaveBeenCalledWith('clickPositiveButton')
    })
  })
})

describe('FuroButtonDialogContext', () => {
  describe('#clickNegativeButton()', () => {
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
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *     dialogComponentRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default & {
     *       value: {
     *         showDialog: () => void
     *         dismissDialog: () => void
     *       }
     *     }>
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: propsMock,
          componentContext: componentContextMock,
          dialogComponentRef: {
            value: {
              showDialog: () => {},
              dismissDialog: () => {},
            },
          },
        },
      },
    ])

    test.each(cases)('dialogComponentRef: $params.dialogComponentRef', ({ params }) => {
      const emitSpy = jest.spyOn(params.componentContext, 'emit')

      const context = new FuroButtonDialogContext(params)
      const dismissDialogSpy = jest.spyOn(context, 'dismissDialog')

      context.clickNegativeButton()

      expect(dismissDialogSpy)
        .toHaveBeenCalledWith()
      expect(emitSpy)
        .toHaveBeenCalledWith('clickNegativeButton')
    })
  })
})

describe('FuroButtonDialogContext', () => {
  describe('#clickNeutralButton()', () => {
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
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *     dialogComponentRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default & {
     *       value: {
     *         showDialog: () => void
     *         dismissDialog: () => void
     *       }
     *     }>
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: propsMock,
          componentContext: componentContextMock,
          dialogComponentRef: {
            value: {
              showDialog: () => {},
              dismissDialog: () => {},
            },
          },
        },
      },
    ])

    test.each(cases)('dialogComponentRef: $params.dialogComponentRef', ({ params }) => {
      const emitSpy = jest.spyOn(params.componentContext, 'emit')

      const context = new FuroButtonDialogContext(params)
      const dismissDialogSpy = jest.spyOn(context, 'dismissDialog')

      context.clickNeutralButton()

      expect(dismissDialogSpy)
        .toHaveBeenCalledWith()
      expect(emitSpy)
        .toHaveBeenCalledWith('clickNeutralButton')
    })
  })
})

describe('FuroButtonDialogContext', () => {
  describe('#setupComponent()', () => {
    /**
     * @type {Array<{
     *   params: {
     *     dialogComponentRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default | null>
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          dialogComponentRef: ref(null),
        },
      },
    ])

    describe('to call expose() with generated hash', () => {
      test.each(cases)('dialogComponentRef: $params.dialogComponentRef', ({ params }) => {
        const expected = {
          showDialog: expect.any(Function),
          dismissDialog: expect.any(Function),
        }

        const exposeSpy = jest.fn()

        const args = {
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: exposeSpy, // ✅️
            slots: {},
          },
          dialogComponentRef: params.dialogComponentRef,
        }
        const context = new FuroButtonDialogContext(args)

        context.setupComponent()

        expect(exposeSpy)
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('to return own instance for method chaining', () => {
      test.each(cases)('dialogComponentRef: $params.dialogComponentRef', ({ params }) => {
        const args = {
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogComponentRef: params.dialogComponentRef,
        }
        const context = new FuroButtonDialogContext(args)

        const actual = context.setupComponent()

        expect(actual)
          .toBe(context) // same reference
      })
    })
  })
})
