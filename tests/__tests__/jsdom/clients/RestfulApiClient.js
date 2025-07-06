import {
  onMounted,
  ref,
} from 'vue'

import {
  BaseRestfulApiLauncher,
  BaseRestfulApiCapsule,
} from '@openreachtech/furo'

import RestfulApiClient from '~/lib/clients/RestfulApiClient.js'

describe('RestfulApiClient', () => {
  describe('constructor', () => {
    describe('should keep properties', () => {
      const AlphaRestfulApiLauncher = class extends BaseRestfulApiLauncher {}
      const BetaRestfulApiLauncher = class extends BaseRestfulApiLauncher {}

      /** @type {import('vue').Ref<InstanceType<BaseRestfulApiCapsule<*>>>} */
      const mockCapsuleRef = ref(
        BaseRestfulApiCapsule.createAsPending()
      )

      describe('#Launcher', () => {
        const cases = [
          {
            input: {
              Launcher: AlphaRestfulApiLauncher,
            },
          },
          {
            input: {
              Launcher: BetaRestfulApiLauncher,
            },
          },
        ]

        test.each(cases)('Launcher: $input.Launcher.name', ({ input }) => {
          const args = {
            Launcher: input.Launcher,
            capsuleRef: mockCapsuleRef,
          }
          const client = new RestfulApiClient(args)

          expect(client)
            .toHaveProperty('Launcher', input.Launcher)
        })
      })

      describe('#capsuleRef', () => {
        /** @type {import('vue').Ref<InstanceType<BaseRestfulApiCapsule<*>>>} */
        const alphaCapsuleRef = ref(
          BaseRestfulApiCapsule.createAsPending()
        )

        /** @type {import('vue').Ref<InstanceType<BaseRestfulApiCapsule<*>>>} */
        const betaCapsuleRef = ref(
          BaseRestfulApiCapsule.createAsPending()
        )

        const cases = [
          {
            input: {
              capsuleRef: alphaCapsuleRef,
            },
          },
          {
            input: {
              capsuleRef: betaCapsuleRef,
            },
          },
        ]

        test.each(cases)('capsuleRef: $input.capsuleRef', ({ input }) => {
          const args = {
            Launcher: BaseRestfulApiLauncher,
            capsuleRef: input.capsuleRef,
          }
          const client = new RestfulApiClient(args)

          expect(client)
            .toHaveProperty('capsuleRef', input.capsuleRef)
        })
      })
    })
  })
})

describe('RestfulApiClient', () => {
  describe('.create()', () => {
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

    /** @type {import('vue').Ref<InstanceType<BaseRestfulApiCapsule<*>>>} */
    const alphaCapsuleRef = ref(
      BaseRestfulApiCapsule.createAsPending()
    )

    /** @type {import('vue').Ref<InstanceType<BaseRestfulApiCapsule<*>>>} */
    const betaCapsuleRef = ref(
      BaseRestfulApiCapsule.createAsPending()
    )

    describe('should be an instance of own class', () => {
      const cases = [
        {
          input: {
            Launcher: AlphaRestfulApiLauncher,
          },
          tally: {
            capsuleRef: alphaCapsuleRef,
          },
        },
        {
          input: {
            Launcher: BetaRestfulApiLauncher,
          },
          tally: {
            capsuleRef: betaCapsuleRef,
          },
        },
      ]

      test.each(cases)('Launcher: $input.Launcher.name', ({ input, tally }) => {
        jest.spyOn(RestfulApiClient, 'generateCapsuleRef')
          .mockReturnValue(tally.capsuleRef)

        const args = {
          Launcher: input.Launcher,
          Capsule: input.Launcher.Capsule,
          capsuleRef: tally.capsuleRef,
        }

        const client = RestfulApiClient.create(args)

        expect(client)
          .toBeInstanceOf(RestfulApiClient)
      })
    })

    describe('should call constructor', () => {
      const cases = [
        {
          input: {
            Launcher: AlphaRestfulApiLauncher,
          },
          tally: {
            capsuleRef: alphaCapsuleRef,
          },
          expected: {
            Launcher: AlphaRestfulApiLauncher,
            capsuleRef: alphaCapsuleRef,
          },
        },
        {
          input: {
            Launcher: BetaRestfulApiLauncher,
          },
          tally: {
            capsuleRef: betaCapsuleRef,
          },
          expected: {
            Launcher: BetaRestfulApiLauncher,
            capsuleRef: betaCapsuleRef,
          },
        },
      ]

      test.each(cases)('Launcher: $input.Launcher.name', ({ input, tally, expected }) => {
        jest.spyOn(RestfulApiClient, 'generateCapsuleRef')
          .mockReturnValue(tally.capsuleRef)

        const args = {
          Launcher: input.Launcher,
          Capsule: input.Launcher.Capsule,
          capsuleRef: tally.capsuleRef,
        }

        const SpyClass = globalThis.constructorSpy.spyOn(RestfulApiClient)

        SpyClass.create(args)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('RestfulApiClient', () => {
  describe('.generateCapsuleRef()', () => {
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
          Launcher: AlphaRestfulApiLauncher,
        },
        expected: expect.any(AlphaRestfulApiCapsule),
      },
      {
        input: {
          Launcher: BetaRestfulApiLauncher,
        },
        expected: expect.any(BetaRestfulApiCapsule),
      },
    ]

    test.each(cases)('Launcher: $input.Launcher.name', ({ input, expected }) => {
      const actual = RestfulApiClient.generateCapsuleRef(input)

      expect(actual)
        .toHaveProperty('value', expected)
    })
  })
})

describe('RestfulApiClient', () => {
  describe('.get:onMounted', () => {
    test('should return onMounted() from Vue', () => {
      const actual = RestfulApiClient.onMounted

      expect(actual)
        .toBe(onMounted)
    })
  })
})

describe('RestfulApiClient', () => {
  describe('.get:onMounted', () => {
    test('should return ref() from Vue', () => {
      const actual = RestfulApiClient.ref

      expect(actual)
        .toBe(ref)
    })
  })
})

describe('RestfulApiClient', () => {
  describe('#get:Ctor', () => {
    const AlphaRestfulApiLauncher = class extends BaseRestfulApiLauncher {}
    const BetaRestfulApiLauncher = class extends BaseRestfulApiLauncher {}

    /** @type {import('vue').Ref<InstanceType<BaseRestfulApiCapsule<*>>>} */
    const alphaCapsuleRef = ref(
      BaseRestfulApiCapsule.createAsPending()
    )

    /** @type {import('vue').Ref<InstanceType<BaseRestfulApiCapsule<*>>>} */
    const betaCapsuleRef = ref(
      BaseRestfulApiCapsule.createAsPending()
    )

    const cases = [
      {
        input: {
          Launcher: AlphaRestfulApiLauncher,
          capsuleRef: alphaCapsuleRef,
        },
      },
      {
        input: {
          Launcher: BetaRestfulApiLauncher,
          capsuleRef: betaCapsuleRef,
        },
      },
    ]

    test.each(cases)('Launcher: $input.Launcher.name', ({ input }) => {
      const client = new RestfulApiClient(input)

      const actual = client.Ctor

      expect(actual)
        .toBe(RestfulApiClient) // same reference
    })
  })
})

describe('RestfulApiClient', () => {
  describe('#invokeRequestOnEvent()', () => {
    // noop
  })
})

describe('RestfulApiClient', () => {
  describe('#invokeRequestOnMounted()', () => {
    // noop
  })
})

describe('RestfulApiClient', () => {
  describe('#invokeRequestWithFormValueHash()', () => {
    // noop
  })
})

describe('RestfulApiClient', () => {
  describe('#invokeRequest()', () => {
    // noop
  })
})

describe('RestfulApiClient', () => {
  describe('#retrieveCapsule()', () => {
    // noop
  })
})
