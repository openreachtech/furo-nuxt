import {
  ref,
} from 'vue'

import FuroDialogContext from '~/lib/contexts/concretes/FuroDialogContext.js'

import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

describe('FuroDialogContext', () => {
  describe('super class', () => {
    test('to extend BaseFuroContext', () => {
      const actual = FuroDialogContext.prototype

      expect(actual)
        .toBeInstanceOf(BaseFuroContext)
    })
  })
})

describe('FuroDialogContext', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#dialogElementRef', () => {
        /**
         * @type {Array<{
         *   params: {
         *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
         *   }
         * }>}
         */
        const cases = /** @type {Array<*>} */ ([
          {
            params: {
              dialogElementRef: {
                value: document.createElement('dialog'),
              },
            },
          },
          {
            params: {
              dialogElementRef: {
                value: null,
              },
            },
          },
        ])

        test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
          const args = {
            props: {},
            componentContext: {
              attrs: {},
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: params.dialogElementRef,
            emit: () => {},
          }

          const context = new FuroDialogContext(args)

          expect(context.dialogElementRef)
            .toBe(params.dialogElementRef)
        })
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              alpha: Symbol('alpha'),
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: document.createElement('dialog'),
            },
          },
        },
        {
          params: {
            props: {
              beta: Symbol('beta'),
            },
            componentContext: {
              attrs: {
                beta: 2,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: null,
            },
          },
        },
      ])

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
        const context = FuroDialogContext.create(params)

        expect(context)
          .toBeInstanceOf(FuroDialogContext)
      })
    })

    describe('to call constructor', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              alpha: Symbol('alpha'),
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: document.createElement('dialog'),
            },
          },
        },
        {
          params: {
            props: {
              beta: Symbol('beta'),
            },
            componentContext: {
              attrs: {
                beta: 2,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: null,
            },
          },
        },
      ])

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroDialogContext)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('.get:EMIT_EVENT_NAME', () => {
    test('to return fixed value', () => {
      const expected = {
        SHOW_DIALOG: 'showDialog',
        DISMISS_DIALOG: 'dismissDialog',
        CLICK_BACKDROP: 'clickBackdrop',
      }

      const actual = FuroDialogContext.EMIT_EVENT_NAME

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#get:dialogElement', () => {
    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
     *   }
     *   expected: HTMLDialogElement | null
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            alpha: Symbol('alpha'),
          },
          componentContext: {
            attrs: {
              alpha: 1,
            },
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogElementRef: {
            value: document.createElement('dialog'),
          },
        },
        expected: expect.any(HTMLDialogElement),
      },
      {
        params: {
          props: {
            beta: Symbol('beta'),
          },
          componentContext: {
            attrs: {
              beta: 2,
            },
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogElementRef: {
            value: null,
          },
        },
        expected: null,
      },
    ])

    test.each(cases)('props: $params.props', ({ params, expected }) => {
      const context = new FuroDialogContext(params)

      const actual = context.dialogElement

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#showDialog()', () => {
    describe('to call HTMLDialogElement#showModal()', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     dialogElementRef: import('vue').Ref<HTMLDialogElement>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              alpha: Symbol('alpha'),
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: {
                showModal: () => {},
                close: () => {},
              },
            },
          },
        },
      ])

      test.each(cases)('props: $params.props', ({ params }) => {
        const showModalSpy = jest.spyOn(params.dialogElementRef.value, 'showModal')

        const context = new FuroDialogContext(params)

        context.showDialog()

        expect(showModalSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#dismissDialog()', () => {
    describe('to call HTMLDialogElement#showModal()', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     dialogElementRef: import('vue').Ref<HTMLDialogElement>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              alpha: Symbol('alpha'),
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: {
                showModal: () => {},
                close: () => {},
              },
            },
            emit: () => {},
          },
        },
      ])

      test.each(cases)('props: $params.props', ({ params }) => {
        const closeSpy = jest.spyOn(params.dialogElementRef.value, 'close')

        const context = new FuroDialogContext(params)

        context.dismissDialog()

        expect(closeSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#generateExposeHash', () => {
    /**
     * @type {Array<{
     *   params: {
     *     props: import('vue').ComponentCustomProps
     *     componentContext: import('vue').SetupContext
     *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
     *   }
     * }>}
     */
    const cases = /** @type {Array<*>} */ ([
      {
        params: {
          props: {
            alpha: Symbol('alpha'),
          },
          componentContext: {
            attrs: {
              alpha: 1,
            },
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogElementRef: {
            value: document.createElement('dialog'),
          },
        },
      },
      {
        params: {
          props: {
            beta: Symbol('beta'),
          },
          componentContext: {
            attrs: {
              beta: 2,
            },
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogElementRef: {
            value: null,
          },
          emit: () => {},
        },
      },
    ])

    describe('to be generated object', () => {
      test.each(cases)('props: $params.props', ({ params }) => {
        const expected = {
          showDialog: expect.any(Function),
          dismissDialog: expect.any(Function),
        }

        const context = new FuroDialogContext(params)

        const actual = context.generateExposeHash()

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to call #showDialog()', () => {
      test.each(cases)('props: $params.props', ({ params }) => {
        const context = new FuroDialogContext(params)
        const showDialogSpy = jest.spyOn(context, 'showDialog')
          .mockImplementation(() => {})

        const exposeHash = context.generateExposeHash()

        exposeHash.showDialog()

        expect(showDialogSpy)
          .toHaveBeenCalledWith()
      })
    })

    describe('to call #dismissDialog()', () => {
      test.each(cases)('props: $params.props', ({ params }) => {
        const context = new FuroDialogContext(params)
        const dismissDialogSpy = jest.spyOn(context, 'dismissDialog')
          .mockImplementation(() => {})

        const exposeHash = context.generateExposeHash()

        exposeHash.dismissDialog()

        expect(dismissDialogSpy)
          .toHaveBeenCalledWith()
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#extractDialogRect()', () => {
    describe('to return DOMRect', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              alpha: Symbol('alpha'),
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: document.createElement('dialog'),
            },
          },
        },
      ])

      test.each(cases)('props: $params.props', ({ params }) => {
        const expected = {
          top: expect.any(Number),
          left: expect.any(Number),
          right: expect.any(Number),
          bottom: expect.any(Number),
          width: expect.any(Number),
          height: expect.any(Number),
          x: expect.any(Number),
          y: expect.any(Number),
        }

        const context = new FuroDialogContext(params)

        const actual = context.extractDialogRect()

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to return null', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: import('vue').ComponentCustomProps
       *     componentContext: import('vue').SetupContext
       *     dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
       *   }
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            props: {
              alpha: Symbol('alpha'),
            },
            componentContext: {
              attrs: {
                alpha: 1,
              },
              emit: () => {},
              expose: () => {},
              slots: {},
            },
            dialogElementRef: {
              value: null,
            },
          },
        },
      ])

      test.each(cases)('props: $params.props', ({ params }) => {
        const context = new FuroDialogContext(params)

        const actual = context.extractDialogRect()

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#isClickedOnBackdrop()', () => {
    const args = {
      props: {},
      componentContext: {
        attrs: {},
        emit: () => {},
        expose: () => {},
        slots: {},
      },
      dialogElementRef: /** @type {*} */ ({
        value: document.createElement('dialog'),
      }),
    }
    const context = new FuroDialogContext(args)

    describe('when exists <dialog>', () => {
      /**
       * @type {Array<{
       *   params: {
       *     dialogRect: DOMRect
       *   }
       *   truthyCases: Array<{
       *     mouseEvent: MouseEvent
       *   }>
       *   falsyCases: Array<{
       *     mouseEvent: MouseEvent
       *   }>
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            dialogRect: {
              top: 50,
              left: 50,
              right: 100,
              bottom: 100,
              height: 50,
              width: 50,
            },
          },
          truthyCases: [
            { mouseEvent: { clientX: 49, clientY: 50 } },
            { mouseEvent: { clientX: 50, clientY: 49 } },
            { mouseEvent: { clientX: 100, clientY: 101 } },
            { mouseEvent: { clientX: 101, clientY: 100 } },
          ],
          falsyCases: [
            { mouseEvent: { clientX: 50, clientY: 50 } },
            { mouseEvent: { clientX: 50, clientY: 100 } },
            { mouseEvent: { clientX: 100, clientY: 50 } },
            { mouseEvent: { clientX: 100, clientY: 100 } },
          ],
        },
        {
          params: {
            dialogRect: {
              top: 500,
              left: 200,
              right: 400,
              bottom: 600,
              height: 100,
              width: 200,
            },
          },
          truthyCases: [
            { mouseEvent: { clientX: 199, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 499 } },
            { mouseEvent: { clientX: 400, clientY: 601 } },
            { mouseEvent: { clientX: 401, clientY: 600 } },
          ],
          falsyCases: [
            { mouseEvent: { clientX: 200, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 600 } },
            { mouseEvent: { clientX: 400, clientY: 500 } },
            { mouseEvent: { clientX: 400, clientY: 600 } },
          ],
        },
      ])

      describe.each(cases)('dialogRect: $params.dialogRect', ({ params, truthyCases, falsyCases }) => {
        describe('to be truthy', () => {
          test.each(truthyCases)('event: $mouseEvent', ({ mouseEvent }) => {
            jest.spyOn(context, 'extractDialogRect')
              .mockReturnValue(params.dialogRect)

            const actual = context.isClickedOnBackdrop({
              event: mouseEvent,
            })

            expect(actual)
              .toBeTruthy()
          })
        })

        describe('to be falsy', () => {
          test.each(falsyCases)('event: $mouseEvent', ({ mouseEvent }) => {
            jest.spyOn(context, 'extractDialogRect')
              .mockReturnValue(params.dialogRect)

            const actual = context.isClickedOnBackdrop({
              event: mouseEvent,
            })

            expect(actual)
              .toBeFalsy()
          })
        })
      })
    })

    describe('when closed <dialog>', () => {
      /**
       * @type {Array<{
       *   params: {
       *     dialogRect: DOMRect
       *   }
       *   eventCases: Array<{
       *     mouseEvent: MouseEvent
       *   }>
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            dialogRect: {
              top: 50,
              left: 50,
              right: 100,
              bottom: 100,
              height: 0,
              width: 0,
            },
          },
          eventCases: [
            { mouseEvent: { clientX: 49, clientY: 50 } },
            { mouseEvent: { clientX: 50, clientY: 49 } },
            { mouseEvent: { clientX: 100, clientY: 101 } },
            { mouseEvent: { clientX: 101, clientY: 100 } },
            { mouseEvent: { clientX: 50, clientY: 50 } },
            { mouseEvent: { clientX: 50, clientY: 100 } },
            { mouseEvent: { clientX: 100, clientY: 50 } },
            { mouseEvent: { clientX: 100, clientY: 100 } },
          ],
        },
        {
          params: {
            dialogRect: {
              top: 500,
              left: 200,
              right: 400,
              bottom: 600,
              height: 0,
              width: 0,
            },
          },
          eventCases: [
            { mouseEvent: { clientX: 199, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 499 } },
            { mouseEvent: { clientX: 400, clientY: 601 } },
            { mouseEvent: { clientX: 401, clientY: 600 } },
            { mouseEvent: { clientX: 200, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 600 } },
            { mouseEvent: { clientX: 400, clientY: 500 } },
            { mouseEvent: { clientX: 400, clientY: 600 } },
          ],
        },
        {
          params: {
            dialogRect: {
              top: 500,
              left: 200,
              right: 400,
              bottom: 600,
              height: 100,
              width: 0,
            },
          },
          eventCases: [
            { mouseEvent: { clientX: 199, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 499 } },
            { mouseEvent: { clientX: 400, clientY: 601 } },
            { mouseEvent: { clientX: 401, clientY: 600 } },
            { mouseEvent: { clientX: 200, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 600 } },
            { mouseEvent: { clientX: 400, clientY: 500 } },
            { mouseEvent: { clientX: 400, clientY: 600 } },
          ],
        },
        {
          params: {
            dialogRect: {
              top: 500,
              left: 200,
              right: 400,
              bottom: 600,
              height: 0,
              width: 200,
            },
          },
          eventCases: [
            { mouseEvent: { clientX: 199, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 499 } },
            { mouseEvent: { clientX: 400, clientY: 601 } },
            { mouseEvent: { clientX: 401, clientY: 600 } },
            { mouseEvent: { clientX: 200, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 600 } },
            { mouseEvent: { clientX: 400, clientY: 500 } },
            { mouseEvent: { clientX: 400, clientY: 600 } },
          ],
        },
      ])

      describe.each(cases)('dialogRect: $params.dialogRect', ({ params, eventCases }) => {
        test.each(eventCases)('event: $mouseEvent', ({ mouseEvent }) => {
          jest.spyOn(context, 'extractDialogRect')
            .mockReturnValue(params.dialogRect)

          const actual = context.isClickedOnBackdrop({
            event: mouseEvent,
          })

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#clickInInner', () => {
    const args = {
      props: {},
      componentContext: {
        attrs: {},
        emit: () => {},
        expose: () => {},
        slots: {},
      },
      dialogElementRef: /** @type {*} */ ({
        value: document.createElement('dialog'),
      }),
    }
    const context = new FuroDialogContext(args)

    describe('when exists <dialog>', () => {
      /**
       * @type {Array<{
       *   params: {
       *     dialogRect: DOMRect
       *   }
       *   truthyCases: Array<{
       *     mouseEvent: MouseEvent
       *   }>
       *   falsyCases: Array<{
       *     mouseEvent: MouseEvent
       *   }>
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            dialogRect: {
              top: 50,
              left: 50,
              right: 100,
              bottom: 100,
              height: 50,
              width: 50,
            },
          },
          truthyCases: [
            { mouseEvent: { clientX: 49, clientY: 50 } },
            { mouseEvent: { clientX: 50, clientY: 49 } },
            { mouseEvent: { clientX: 100, clientY: 101 } },
            { mouseEvent: { clientX: 101, clientY: 100 } },
          ],
          falsyCases: [
            { mouseEvent: { clientX: 50, clientY: 50 } },
            { mouseEvent: { clientX: 50, clientY: 100 } },
            { mouseEvent: { clientX: 100, clientY: 50 } },
            { mouseEvent: { clientX: 100, clientY: 100 } },
          ],
        },
        {
          params: {
            dialogRect: {
              top: 500,
              left: 200,
              right: 400,
              bottom: 700,
              height: 200,
              width: 200,
            },
          },
          truthyCases: [
            { mouseEvent: { clientX: 199, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 499 } },
            { mouseEvent: { clientX: 400, clientY: 701 } },
            { mouseEvent: { clientX: 401, clientY: 700 } },
          ],
          falsyCases: [
            { mouseEvent: { clientX: 200, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 700 } },
            { mouseEvent: { clientX: 400, clientY: 500 } },
            { mouseEvent: { clientX: 400, clientY: 700 } },
          ],
        },
      ])

      describe.each(cases)('dialogRect: $params.dialogRect', ({ params, truthyCases, falsyCases }) => {
        describe('to call #componentContext.emit()', () => {
          test.each(truthyCases)('event: $mouseEvent', ({ mouseEvent }) => {
            const expected = 'clickBackdrop'

            jest.spyOn(context, 'extractDialogRect')
              .mockReturnValue(params.dialogRect)
            const isClickedOnBackdropSpy = jest.spyOn(context, 'isClickedOnBackdrop')
            const emitSpy = jest.spyOn(context.componentContext, 'emit')

            context.clickInInner({
              event: mouseEvent,
            })

            expect(isClickedOnBackdropSpy)
              .toHaveBeenCalledWith({
                event: mouseEvent,
              })
            expect(emitSpy)
              .toHaveBeenCalledWith(expected)
          })
        })

        describe('not to call #componentContext.emit()', () => {
          test.each(falsyCases)('event: $mouseEvent', ({ mouseEvent }) => {
            jest.spyOn(context, 'extractDialogRect')
              .mockReturnValue(params.dialogRect)
            const isClickedOnBackdropSpy = jest.spyOn(context, 'isClickedOnBackdrop')
            const emitSpy = jest.spyOn(context.componentContext, 'emit')

            context.clickInInner({
              event: mouseEvent,
            })

            expect(isClickedOnBackdropSpy)
              .toHaveBeenCalledWith({
                event: mouseEvent,
              })
            expect(emitSpy)
              .not
              .toHaveBeenCalled()
          })
        })
      })
    })

    describe('when closed <dialog>', () => {
      /**
       * @type {Array<{
       *   params: {
       *     dialogRect: DOMRect
       *   }
       *   eventCases: Array<{
       *     mouseEvent: MouseEvent
       *   }>
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          params: {
            dialogRect: {
              top: 50,
              left: 50,
              right: 100,
              bottom: 100,
              height: 0,
              width: 0,
            },
          },
          eventCases: [
            { mouseEvent: { clientX: 49, clientY: 50 } },
            { mouseEvent: { clientX: 50, clientY: 49 } },
            { mouseEvent: { clientX: 100, clientY: 101 } },
            { mouseEvent: { clientX: 101, clientY: 100 } },
            { mouseEvent: { clientX: 50, clientY: 50 } },
            { mouseEvent: { clientX: 50, clientY: 100 } },
            { mouseEvent: { clientX: 100, clientY: 50 } },
            { mouseEvent: { clientX: 100, clientY: 100 } },
          ],
        },
        {
          params: {
            dialogRect: {
              top: 500,
              left: 200,
              right: 400,
              bottom: 700,
              height: 200,
              width: 0,
            },
          },
          eventCases: [
            { mouseEvent: { clientX: 199, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 499 } },
            { mouseEvent: { clientX: 400, clientY: 701 } },
            { mouseEvent: { clientX: 401, clientY: 700 } },
            { mouseEvent: { clientX: 200, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 700 } },
            { mouseEvent: { clientX: 400, clientY: 500 } },
            { mouseEvent: { clientX: 400, clientY: 700 } },
          ],
        },
        {
          params: {
            dialogRect: {
              top: 500,
              left: 200,
              right: 400,
              bottom: 700,
              height: 0,
              width: 200,
            },
          },
          eventCases: [
            { mouseEvent: { clientX: 199, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 499 } },
            { mouseEvent: { clientX: 400, clientY: 701 } },
            { mouseEvent: { clientX: 401, clientY: 700 } },
            { mouseEvent: { clientX: 200, clientY: 500 } },
            { mouseEvent: { clientX: 200, clientY: 700 } },
            { mouseEvent: { clientX: 400, clientY: 500 } },
            { mouseEvent: { clientX: 400, clientY: 700 } },
          ],
        },
      ])

      describe.each(cases)('dialogRect: $params.dialogRect', ({ params, eventCases }) => {
        describe('not to call #componentContext.emit()', () => {
          test.each(eventCases)('event: $mouseEvent', ({ mouseEvent }) => {
            jest.spyOn(context, 'extractDialogRect')
              .mockReturnValue(params.dialogRect)
            const isClickedOnBackdropSpy = jest.spyOn(context, 'isClickedOnBackdrop')
            const emitSpy = jest.spyOn(context.componentContext, 'emit')

            context.clickInInner({
              event: mouseEvent,
            })

            expect(isClickedOnBackdropSpy)
              .toHaveBeenCalledWith({
                event: mouseEvent,
              })
            expect(emitSpy)
              .not
              .toHaveBeenCalled()
          })
        })
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#generateWatchCallback()', () => {
    describe('to be instance of Function', () => {
      const cases = [
        {
          params: {
            dialogElementRef: ref(
              document.createElement('dialog')
            ),
          },
        },
        {
          params: {
            dialogElementRef: ref(null),
          },
        },
      ]

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
        const args = {
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogElementRef: params.dialogElementRef,
        }
        const context = new FuroDialogContext(args)

        const actual = context.generateWatchCallback()

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('to return early if old value exists', () => {
      const cases = [
        {
          params: {
            dialogElementRef: ref(
              document.createElement('dialog')
            ),
          },
        },
      ]

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
        const args = {
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogElementRef: params.dialogElementRef,
        }
        const context = new FuroDialogContext(args)

        const observeSpy = jest.spyOn(MutationObserver.prototype, 'observe')
        const onCleanupTally = () => {}

        const callback = context.generateWatchCallback()

        callback(
          [params.dialogElementRef.value],
          [params.dialogElementRef.value], // ✅️ old value is not null
          onCleanupTally
        )

        expect(observeSpy)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('to return early if new value is null', () => {
      const cases = [
        {
          params: {
            dialogElementRef: ref(null),
          },
        },
      ]

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
        const args = {
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogElementRef: params.dialogElementRef, // ✅️ new value is null
        }
        const context = new FuroDialogContext(args)

        const observeSpy = jest.spyOn(MutationObserver.prototype, 'observe')
        const onCleanupTally = () => {}

        const callback = context.generateWatchCallback()

        callback(
          [params.dialogElementRef.value],
          [null],
          onCleanupTally
        )

        expect(observeSpy)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('to setup MutationObserver with correct options', () => {
      const cases = [
        {
          params: {
            dialogElementRef: ref(
              document.createElement('dialog')
            ),
          },
        },
      ]

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
        const expectedOptions = [
          params.dialogElementRef.value,
          {
            attributes: true,
            attributeFilter: ['open'],
            attributeOldValue: true,
          },
        ]

        const args = {
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogElementRef: params.dialogElementRef,
        }
        const context = new FuroDialogContext(args)

        const observeSpy = jest.spyOn(MutationObserver.prototype, 'observe')
        const onCleanupTally = () => {}

        const callback = context.generateWatchCallback()

        callback(
          [params.dialogElementRef.value],
          [null],
          onCleanupTally
        )

        expect(observeSpy)
          .toHaveBeenCalledWith(...expectedOptions)
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#generateMutationObserverHandler()', () => {
    describe('to be instance of Function', () => {
      const cases = [
        {
          params: {
            dialogElementRef: ref(
              document.createElement('dialog')
            ),
          },
        },
        {
          params: {
            dialogElementRef: ref(null),
          },
        },
      ]

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
        const args = {
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogElementRef: params.dialogElementRef,
        }
        const context = new FuroDialogContext(args)

        const actual = context.generateMutationObserverHandler()

        expect(actual)
          .toBeInstanceOf(Function)
      })
    })

    describe('to emit showDialog when dialog is opened', () => {
      const alphaDialogElement = document.createElement('dialog')
      const betaDialogElement = document.createElement('dialog')

      alphaDialogElement.setAttribute('open', '')
      betaDialogElement.setAttribute('open', '')

      const cases = [
        {
          params: {
            dialogElementRef: ref(alphaDialogElement),
          },
        },
        {
          params: {
            dialogElementRef: ref(betaDialogElement),
          },
        },
      ]

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
        const expectedEmitEvent = 'showDialog'

        const emitSpy = jest.fn()

        const args = {
          props: {},
          componentContext: {
            attrs: {},
            emit: emitSpy, // ✅️
            expose: () => {},
            slots: {},
          },
          dialogElementRef: params.dialogElementRef,
        }
        const context = new FuroDialogContext(args)

        const handler = context.generateMutationObserverHandler()

        /** @type {Array<MutationRecord>} */
        const mutations = /** @type {Array<*>} */ ([{
          type: 'attributes',
          attributeName: 'open',
          target: params.dialogElementRef.value,
          oldValue: null,
        }])

        handler(
          mutations,
          new MutationObserver(() => {})
        )

        expect(emitSpy)
          .toHaveBeenCalledWith(expectedEmitEvent)
      })
    })

    describe('to emit dismissDialog when dialog is closed', () => {
      const alphaDialogElement = document.createElement('dialog')
      const betaDialogElement = document.createElement('dialog')

      alphaDialogElement.removeAttribute('open')
      betaDialogElement.removeAttribute('open')

      const cases = [
        {
          params: {
            dialogElementRef: ref(alphaDialogElement),
          },
        },
        {
          params: {
            dialogElementRef: ref(betaDialogElement),
          },
        },
      ]

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
        const expectedEmitEvent = 'dismissDialog'

        const emitSpy = jest.fn()

        const args = {
          props: {},
          componentContext: {
            attrs: {},
            emit: emitSpy, // ✅️
            expose: () => {},
            slots: {},
          },
          dialogElementRef: params.dialogElementRef,
        }
        const context = new FuroDialogContext(args)

        const handler = context.generateMutationObserverHandler()

        /** @type {Array<MutationRecord>} */
        const mutations = /** @type {Array<*>} */ ([{
          type: 'attributes',
          attributeName: 'open',
          target: params.dialogElementRef.value,
          oldValue: null,
        }])

        handler(
          mutations,
          new MutationObserver(() => {})
        )

        expect(emitSpy)
          .toHaveBeenCalledWith(expectedEmitEvent)
      })
    })

    describe('to not emit when mutation is not for open attribute', () => {
      const alphaDialogElement = document.createElement('dialog')
      const betaDialogElement = document.createElement('dialog')

      alphaDialogElement.setAttribute('open', '')
      betaDialogElement.removeAttribute('open')

      const cases = [
        {
          params: {
            dialogElementRef: ref(alphaDialogElement),
          },
        },
        {
          params: {
            dialogElementRef: ref(betaDialogElement),
          },
        },
      ]

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
        const emitSpy = jest.fn()

        const args = {
          props: {},
          componentContext: {
            attrs: {},
            emit: emitSpy, // ✅️
            expose: () => {},
            slots: {},
          },
          dialogElementRef: params.dialogElementRef,
        }
        const context = new FuroDialogContext(args)

        const handler = context.generateMutationObserverHandler()

        /** @type {Array<MutationRecord>} */
        const mutations = /** @type {Array<*>} */ ([{
          type: 'attributes',
          attributeName: 'class', // ❌️ not 'open' attribute
          target: params.dialogElementRef.value,
          oldValue: null,
        }])

        handler(
          mutations,
          new MutationObserver(() => {})
        )

        expect(emitSpy)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('to not emit when mutation target is not dialog element', () => {
      const alphaDialogElement = document.createElement('dialog')
      const betaDialogElement = document.createElement('dialog')

      alphaDialogElement.setAttribute('open', '')
      betaDialogElement.removeAttribute('open')

      const cases = [
        {
          params: {
            dialogElementRef: ref(alphaDialogElement),
          },
        },
        {
          params: {
            dialogElementRef: ref(betaDialogElement),
          },
        },
      ]

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
        const emitSpy = jest.fn()

        const args = {
          props: {},
          componentContext: {
            attrs: {},
            emit: emitSpy, // ✅️
            expose: () => {},
            slots: {},
          },
          dialogElementRef: params.dialogElementRef,
        }
        const context = new FuroDialogContext(args)

        const handler = context.generateMutationObserverHandler()

        /** @type {Array<MutationRecord>} */
        const mutations = /** @type {Array<*>} */ ([{
          type: 'attributes',
          attributeName: 'open',
          target: document.createElement('dialog'), // ❌️ not same dialog element
          oldValue: null,
        }])

        handler(
          mutations,
          new MutationObserver(() => {})
        )

        expect(emitSpy)
          .not
          .toHaveBeenCalled()
      })
    })
  })
})

describe('FuroDialogContext', () => {
  describe('#setupComponent()', () => {
    describe('to call expose() with generated hash', () => {
      const cases = [
        {
          params: {
            dialogElementRef: ref(
              document.createElement('dialog')
            ),
          },
        },
        {
          params: {
            dialogElementRef: ref(null),
          },
        },
      ]

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
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
            expose: exposeSpy,
            slots: {},
          },
          dialogElementRef: params.dialogElementRef,
        }
        const context = new FuroDialogContext(args)

        context.setupComponent()

        expect(exposeSpy)
          .toHaveBeenCalledWith(expected)
      })
    })

    describe('to call watch() with dialogElementRef and generated callback', () => {
      const cases = [
        {
          params: {
            dialogElementRef: ref(
              document.createElement('dialog')
            ),
          },
        },
        {
          params: {
            dialogElementRef: ref(null),
          },
        },
      ]

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
        const args = {
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogElementRef: params.dialogElementRef,
        }
        const context = new FuroDialogContext(args)

        const watchSpy = jest.fn()

        /**
         * Callback function for watch()
         */
        function callbackTally () {
          // noop
        }

        // @ts-expect-error
        jest.spyOn(context, 'watch', 'get')
          // @ts-expect-error
          .mockReturnValue(watchSpy)
        jest.spyOn(context, 'generateWatchCallback')
          .mockReturnValue(callbackTally)

        context.setupComponent()

        expect(watchSpy)
          .toHaveBeenCalledWith(
            [
              params.dialogElementRef,
            ],
            callbackTally
          )
      })
    })

    describe('to return own instance for method chaining', () => {
      const cases = [
        {
          params: {
            dialogElementRef: ref(
              document.createElement('dialog')
            ),
          },
        },
        {
          params: {
            dialogElementRef: ref(null),
          },
        },
      ]

      test.each(cases)('dialogElementRef: $params.dialogElementRef', ({ params }) => {
        const args = {
          props: {},
          componentContext: {
            attrs: {},
            emit: () => {},
            expose: () => {},
            slots: {},
          },
          dialogElementRef: params.dialogElementRef,
        }
        const context = new FuroDialogContext(args)

        const actual = context.setupComponent()

        expect(actual)
          .toBe(context) // same reference
      })
    })
  })
})
