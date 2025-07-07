import {
  BaseRestfulApiCapsule,
  BaseRestfulApiLauncher,
} from '@openreachtech/furo'

import BaseRestfulApiSubmitter from '~/lib/submitters/BaseRestfulApiSubmitter.js'

import BaseFormClerk from '~/lib/clerks/BaseFormClerk.js'
import RestfulApiClient from '~/lib/clients/RestfulApiClient'

describe('BaseRestfulApiSubmitter', () => {
  describe('constructor', () => {
    const AlphaFormClerk = class extends BaseFormClerk {}
    const BetaFormClerk = class extends BaseFormClerk {}

    /**
     * @extends {BaseRestfulApiCapsule<*>}
     */
    const AlphaRestfulApiCapsule = class extends BaseRestfulApiCapsule {}

    /**
     * @extends {BaseRestfulApiCapsule<*>}
     */
    const BetaRestfulApiCapsule = class extends BaseRestfulApiCapsule {}

    const AlphaRestfulApiLauncher = class extends BaseRestfulApiLauncher {
      /** @override */
      static get Capsule () {
        return AlphaRestfulApiCapsule
      }
    }
    const BetaRestfulApiLauncher = class extends BaseRestfulApiLauncher {
      /** @override */
      static get Capsule () {
        return BetaRestfulApiCapsule
      }
    }

    describe('should keep properties', () => {
      describe('#formClerk', () => {
        const cases = [
          {
            input: {
              FormClerk: AlphaFormClerk,
              restfulApiClient: RestfulApiClient.create(AlphaRestfulApiLauncher),
            },
          },
          {
            input: {
              FormClerk: BetaFormClerk,
              restfulApiClient: RestfulApiClient.create(BetaRestfulApiLauncher),
            },
          },
        ]

        test.each(cases)('FormClerk: $input.FormClerk.name', ({ input }) => {
          const formClerkTally = input.FormClerk.create()

          const args = {
            formClerk: formClerkTally,
            restfulApiClient: input.restfulApiClient,
          }

          const submitter = new BaseRestfulApiSubmitter(args)

          expect(submitter)
            .toHaveProperty('formClerk', formClerkTally)
        })
      })

      describe('#restfulApiClient', () => {
        const cases = [
          {
            input: {
              formClerk: AlphaFormClerk.create(),
              restfulApiClient: RestfulApiClient.create(AlphaRestfulApiLauncher),
            },
          },
          {
            input: {
              formClerk: BetaFormClerk.create(),
              restfulApiClient: RestfulApiClient.create(BetaRestfulApiLauncher),
            },
          },
        ]

        test.each(cases)('RestfulApiClient#Launcher: $input.restfulApiClient.Launcher.name', ({ input }) => {
          const submitter = new BaseRestfulApiSubmitter(input)

          expect(submitter)
            .toHaveProperty('restfulApiClient', input.restfulApiClient)
        })
      })
    })
  })
})

describe('BaseRestfulApiSubmitter', () => {
  describe('.create()', () => {
    const AlphaFormClerk = class extends BaseFormClerk {}
    const BetaFormClerk = class extends BaseFormClerk {}

    /**
     * @extends {BaseRestfulApiCapsule<*>}
     */
    const AlphaRestfulApiCapsule = class extends BaseRestfulApiCapsule {}

    /**
     * @extends {BaseRestfulApiCapsule<*>}
     */
    const BetaRestfulApiCapsule = class extends BaseRestfulApiCapsule {}

    const AlphaRestfulApiLauncher = class extends BaseRestfulApiLauncher {
      /** @override */
      static get Capsule () {
        return AlphaRestfulApiCapsule
      }
    }
    const BetaRestfulApiLauncher = class extends BaseRestfulApiLauncher {
      /** @override */
      static get Capsule () {
        return BetaRestfulApiCapsule
      }
    }

    const cases = [
      {
        input: {
          FormClerk: AlphaFormClerk,
          Launcher: AlphaRestfulApiLauncher,
        },
      },
      {
        input: {
          FormClerk: BetaFormClerk,
          Launcher: BetaRestfulApiLauncher,
        },
      },
    ]

    describe('should create an instance of own class', () => {
      describe('with full arguments', () => {
        test.each(cases)('FormClerk: $input.FormClerk.name', ({ input }) => {
          const args = {
            formClerk: input.FormClerk.create(),
            restfulApiClient: RestfulApiClient.create(input.Launcher),
          }

          const actual = BaseRestfulApiSubmitter.create(args)

          expect(actual)
            .toBeInstanceOf(BaseRestfulApiSubmitter)
        })
      })

      describe('with lacked arguments', () => {
        describe('only formClerk', () => {
          test.each(cases)('FormClerk: $input.FormClerk.name', ({ input }) => {
            jest.spyOn(BaseRestfulApiSubmitter, 'createRestfulApiClient')
              .mockReturnValue(RestfulApiClient.create(input.Launcher))

            const args = {
              formClerk: input.FormClerk.create(),
            }

            const actual = BaseRestfulApiSubmitter.create(args)

            expect(actual)
              .toBeInstanceOf(BaseRestfulApiSubmitter)
          })
        })

        describe('only restfulApiClient', () => {
          test.each(cases)('Launcher: $input.Launcher.name', ({ input }) => {
            jest.spyOn(BaseRestfulApiSubmitter, 'createFormClerk')
              .mockReturnValue(input.FormClerk.create())

            const args = {
              restfulApiClient: RestfulApiClient.create(input.Launcher),
            }

            const actual = BaseRestfulApiSubmitter.create(args)

            expect(actual)
              .toBeInstanceOf(BaseRestfulApiSubmitter)
          })
        })

        describe('no arguments', () => {
          const formClerkTally = BaseFormClerk.create()
          const restfulApiClientTally = RestfulApiClient.create(AlphaRestfulApiLauncher)

          test('{}', () => {
            jest.spyOn(BaseRestfulApiSubmitter, 'createFormClerk')
              .mockReturnValue(formClerkTally)
            jest.spyOn(BaseRestfulApiSubmitter, 'createRestfulApiClient')
              .mockReturnValue(restfulApiClientTally)

            const actual = BaseRestfulApiSubmitter.create({})

            expect(actual)
              .toBeInstanceOf(BaseRestfulApiSubmitter)
          })

          test('none', () => {
            jest.spyOn(BaseRestfulApiSubmitter, 'createFormClerk')
              .mockReturnValue(formClerkTally)
            jest.spyOn(BaseRestfulApiSubmitter, 'createRestfulApiClient')
              .mockReturnValue(restfulApiClientTally)

            const actual = BaseRestfulApiSubmitter.create()

            expect(actual)
              .toBeInstanceOf(BaseRestfulApiSubmitter)
          })
        })
      })
    })

    describe('should call constructor', () => {
      describe('with full arguments', () => {
        test.each(cases)('FormClerk: $input.FormClerk.name', ({ input }) => {
          const SpyClass = globalThis.constructorSpy.spyOn(BaseRestfulApiSubmitter)

          const args = {
            formClerk: input.FormClerk.create(),
            restfulApiClient: RestfulApiClient.create(input.Launcher),
          }

          SpyClass.create(args)

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(args)
        })
      })

      describe('with lacked arguments', () => {
        describe('only formClerk', () => {
          test.each(cases)('FormClerk: $input.FormClerk.name', ({ input }) => {
            const formClerkTally = input.FormClerk.create()
            const restfulApiClientTally = RestfulApiClient.create(input.Launcher)

            const expectedArgs = {
              formClerk: formClerkTally,
              restfulApiClient: restfulApiClientTally,
            }

            jest.spyOn(BaseRestfulApiSubmitter, 'createRestfulApiClient')
              .mockReturnValue(restfulApiClientTally)

            const SpyClass = globalThis.constructorSpy.spyOn(BaseRestfulApiSubmitter)

            const args = {
              formClerk: formClerkTally,
            }

            SpyClass.create(args)

            expect(SpyClass.__spy__)
              .toHaveBeenCalledWith(expectedArgs)
          })
        })

        describe('only restfulApiClient', () => {
          test.each(cases)('Launcher: $input.Launcher.name', ({ input }) => {
            const formClerkTally = input.FormClerk.create()
            const restfulApiClientTally = RestfulApiClient.create(input.Launcher)

            const expectedArgs = {
              formClerk: formClerkTally,
              restfulApiClient: restfulApiClientTally,
            }

            const SpyClass = globalThis.constructorSpy.spyOn(BaseRestfulApiSubmitter)

            jest.spyOn(BaseRestfulApiSubmitter, 'createFormClerk')
              .mockReturnValue(formClerkTally)

            const args = {
              restfulApiClient: restfulApiClientTally,
            }

            SpyClass.create(args)

            expect(SpyClass.__spy__)
              .toHaveBeenCalledWith(expectedArgs)
          })
        })

        describe('no arguments', () => {
          const formClerkTally = BaseFormClerk.create()
          const restfulApiClientTally = RestfulApiClient.create(AlphaRestfulApiLauncher)

          const expectedArgs = {
            formClerk: formClerkTally,
            restfulApiClient: restfulApiClientTally,
          }

          test('{}', () => {
            const SpyClass = globalThis.constructorSpy.spyOn(BaseRestfulApiSubmitter)

            jest.spyOn(BaseRestfulApiSubmitter, 'createFormClerk')
              .mockReturnValue(formClerkTally)
            jest.spyOn(BaseRestfulApiSubmitter, 'createRestfulApiClient')
              .mockReturnValue(restfulApiClientTally)

            SpyClass.create({})

            expect(SpyClass.__spy__)
              .toHaveBeenCalledWith(expectedArgs)
          })

          test('none', () => {
            const SpyClass = globalThis.constructorSpy.spyOn(BaseRestfulApiSubmitter)

            jest.spyOn(BaseRestfulApiSubmitter, 'createFormClerk')
              .mockReturnValue(formClerkTally)
            jest.spyOn(BaseRestfulApiSubmitter, 'createRestfulApiClient')
              .mockReturnValue(restfulApiClientTally)

            SpyClass.create()

            expect(SpyClass.__spy__)
              .toHaveBeenCalledWith(expectedArgs)
          })
        })
      })
    })
  })
})

describe('BaseRestfulApiSubmitter', () => {
  describe('.createRestfulApiClient()', () => {
    describe('should be an instance of RestfulApiClient', () => {
      /**
       * @extends {BaseRestfulApiCapsule<*>}
       */
      const AlphaRestfulApiCapsule = class extends BaseRestfulApiCapsule {}

      /**
       * @extends {BaseRestfulApiCapsule<*>}
       */
      const BetaRestfulApiCapsule = class extends BaseRestfulApiCapsule {}

      const AlphaRestfulApiLauncher = class extends BaseRestfulApiLauncher {
        /** @override */
        static get Capsule () {
          return AlphaRestfulApiCapsule
        }
      }
      const BetaRestfulApiLauncher = class extends BaseRestfulApiLauncher {
        /** @override */
        static get Capsule () {
          return BetaRestfulApiCapsule
        }
      }

      const AlphaRestfulApiSubmitter = class extends BaseRestfulApiSubmitter {
        /** @override */
        static get FormClerkCtor () {
          return /** @type {*} */ (class extends BaseFormClerk {})
        }

        /** @override */
        static get RestfulApiLauncherCtor () {
          return /** @type {*} */ (AlphaRestfulApiLauncher)
        }
      }
      const BetaRestfulApiSubmitter = class extends BaseRestfulApiSubmitter {
        /** @override */
        static get FormClerkCtor () {
          return /** @type {*} */ (class extends BaseFormClerk {})
        }

        /** @override */
        static get RestfulApiLauncherCtor () {
          return /** @type {*} */ (BetaRestfulApiLauncher)
        }
      }

      const cases = [
        {
          input: {
            Submitter: AlphaRestfulApiSubmitter,
          },
          expected: AlphaRestfulApiLauncher,
        },
        {
          input: {
            Submitter: BetaRestfulApiSubmitter,
          },
          expected: BetaRestfulApiLauncher,
        },
      ]

      test.each(cases)('Submitter: $input.Submitter.name', ({ input, expected }) => {
        const actual = input.Submitter.createRestfulApiClient()

        expect(actual)
          .toBeInstanceOf(RestfulApiClient)

        expect(actual)
          .toHaveProperty('Launcher', expected)
      })
    })

    describe('should throw an error', () => {
      test('on call Base class directly', () => {
        expect(() => BaseRestfulApiSubmitter.createRestfulApiClient())
          .toThrow('.get:RestfulApiLauncherCtor must be inherited')
      })
    })
  })
})

describe('BaseRestfulApiSubmitter', () => {
  describe('.createFormClerk()', () => {
    describe('should be an instance of FormClerk', () => {
      const AlphaFormClerk = class extends BaseFormClerk {}
      const BetaFormClerk = class extends BaseFormClerk {}

      const AlphaRestfulApiSubmitter = class extends BaseRestfulApiSubmitter {
        /** @override */
        static get FormClerkCtor () {
          return /** @type {*} */ (AlphaFormClerk)
        }

        /** @override */
        static get RestfulApiLauncherCtor () {
          return /** @type {*} */ (BaseRestfulApiLauncher)
        }
      }
      const BetaRestfulApiSubmitter = class extends BaseRestfulApiSubmitter {
        /** @override */
        static get FormClerkCtor () {
          return /** @type {*} */ (BetaFormClerk)
        }

        /** @override */
        static get RestfulApiLauncherCtor () {
          return /** @type {*} */ (BaseRestfulApiLauncher)
        }
      }

      const cases = [
        {
          input: {
            Submitter: AlphaRestfulApiSubmitter,
          },
          expected: AlphaFormClerk,
        },
        {
          input: {
            Submitter: BetaRestfulApiSubmitter,
          },
          expected: BetaFormClerk,
        },
      ]

      test.each(cases)('Submitter: $input.Submitter.name', ({ input, expected }) => {
        const actual = input.Submitter.createFormClerk()

        expect(actual)
          .toBeInstanceOf(expected)
      })
    })

    describe('should throw an error', () => {
      test('on call Base class directly', () => {
        expect(() => BaseRestfulApiSubmitter.createFormClerk())
          .toThrow('.get:FormClerkCtor must be inherited')
      })
    })
  })
})

describe('BaseRestfulApiSubmitter', () => {
  describe('.get:FormClerkCtor', () => {
    describe('should throw an error', () => {
      test('on call Base class directly', () => {
        expect(() => BaseRestfulApiSubmitter.FormClerkCtor)
          .toThrow('.get:FormClerkCtor must be inherited')
      })
    })
  })
})

describe('BaseRestfulApiSubmitter', () => {
  describe('.get:RestfulApiLauncherCtor', () => {
    describe('should throw an error', () => {
      test('on call Base class directly', () => {
        expect(() => BaseRestfulApiSubmitter.RestfulApiLauncherCtor)
          .toThrow('.get:RestfulApiLauncherCtor must be inherited')
      })
    })
  })
})

describe('BaseRestfulApiSubmitter', () => {
  describe('#submitForm()', () => {
    const AlphaFormClerk = class extends BaseFormClerk {}
    const BetaFormClerk = class extends BaseFormClerk {}

    /**
     * @extends {BaseRestfulApiCapsule<*>}
     */
    const AlphaRestfulApiCapsule = class extends BaseRestfulApiCapsule {}

    /**
     * @extends {BaseRestfulApiCapsule<*>}
     */
    const BetaRestfulApiCapsule = class extends BaseRestfulApiCapsule {}

    const AlphaRestfulApiLauncher = class extends BaseRestfulApiLauncher {
      /** @override */
      static get Capsule () {
        return AlphaRestfulApiCapsule
      }
    }
    const BetaRestfulApiLauncher = class extends BaseRestfulApiLauncher {
      /** @override */
      static get Capsule () {
        return BetaRestfulApiCapsule
      }
    }

    const AlphaRestfulApiSubmitter = class extends BaseRestfulApiSubmitter {
      /** @override */
      static get FormClerkCtor () {
        return /** @type {*} */ (AlphaFormClerk)
      }

      /** @override */
      static get RestfulApiLauncherCtor () {
        return /** @type {*} */ (AlphaRestfulApiLauncher)
      }
    }
    const BetaRestfulApiSubmitter = class extends BaseRestfulApiSubmitter {
      /** @override */
      static get FormClerkCtor () {
        return /** @type {*} */ (BetaFormClerk)
      }

      /** @override */
      static get RestfulApiLauncherCtor () {
        return /** @type {*} */ (BetaRestfulApiLauncher)
      }
    }

    const cases = [
      {
        input: {
          Submitter: AlphaRestfulApiSubmitter,
        },
        tally: {
          formValueHash: {
            alpha: '111',
            beta: 222,
          },
          extraValueHash: {
            first: 'one',
            second: 'two',
          },
          hooks: {
            beforeRequest: async () => false,
          },
          options: {
            method: 'GET',
          },
        },
      },
      {
        input: {
          Submitter: BetaRestfulApiSubmitter,
        },
        tally: {
          formValueHash: {
            gamma: 333,
            delta: '444',
          },
          extraValueHash: {
            third: 'three',
            fourth: 'four',
          },
          hooks: {
            afterRequest: async () => {},
          },
          options: {
            method: 'POST',
          },
        },
      },
    ]

    describe('when valid value', () => {
      test.each(cases)('Submitter: $input.Submitter.name', async ({ input, tally }) => {
        const expectedArgs = {
          valueHash: tally.formValueHash,
          extraValueHash: tally.extraValueHash,
          hooks: tally.hooks,
          options: tally.options,
        }

        const submitter = input.Submitter.create()

        jest.spyOn(submitter.formClerk, 'extractValueHash')
          .mockReturnValue(tally.formValueHash)
        jest.spyOn(submitter.formClerk, 'validateFormValueHash')
          .mockReturnValue(true) // ✅️ Valid value

        const invokeRequestWithFormValueHashSpy = jest.spyOn(submitter.restfulApiClient, 'invokeRequestWithFormValueHash')
          .mockImplementation(async () => {})

        const args = {
          extraValueHash: tally.extraValueHash,
          hooks: tally.hooks,
          options: tally.options,
        }

        const actual = await submitter.submitForm(args)

        expect(actual)
          .toBe(true)

        expect(invokeRequestWithFormValueHashSpy)
          .toHaveBeenCalledWith(expectedArgs)
      })
    })

    describe('when invalid value', () => {
      test.each(cases)('Submitter: $input.Submitter.name', async ({ input, tally }) => {
        const submitter = input.Submitter.create()

        jest.spyOn(submitter.formClerk, 'extractValueHash')
          .mockReturnValue(tally.formValueHash)
        jest.spyOn(submitter.formClerk, 'validateFormValueHash')
          .mockReturnValue(false) // ✅️ Invalid value

        const invokeRequestWithFormValueHashSpy = jest.spyOn(submitter.restfulApiClient, 'invokeRequestWithFormValueHash')
          .mockImplementation(async () => {})

        const args = {
          extraValueHash: tally.extraValueHash,
          hooks: tally.hooks,
          options: tally.options,
        }

        const actual = await submitter.submitForm(args)

        expect(actual)
          .toBe(false)

        expect(invokeRequestWithFormValueHashSpy)
          .not
          .toHaveBeenCalled()
      })
    })
  })
})
