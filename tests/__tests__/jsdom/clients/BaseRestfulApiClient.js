import {
  ref,
} from 'vue'

import {
  BaseRestfulApiLauncher,
  BaseRestfulApiCapsule,
} from '@openreachtech/furo'

import BaseRestfulApiClient from '~/lib/clients/RestfulApiClient.js'

describe('BaseRestfulApiClient', () => {
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
          const client = new BaseRestfulApiClient(args)

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
          const client = new BaseRestfulApiClient(args)

          expect(client)
            .toHaveProperty('capsuleRef', input.capsuleRef)
        })
      })
    })
  })
})

describe('BaseRestfulApiClient', () => {
  describe('.create()', () => {
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
        jest.spyOn(BaseRestfulApiClient, 'generateCapsuleRef')
          .mockReturnValue(tally.capsuleRef)

        const client = BaseRestfulApiClient.create(input)

        expect(client)
          .toBeInstanceOf(BaseRestfulApiClient)
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
        jest.spyOn(BaseRestfulApiClient, 'generateCapsuleRef')
          .mockReturnValue(tally.capsuleRef)

        const SpyClass = globalThis.constructorSpy.spyOn(BaseRestfulApiClient)

        SpyClass.create(input)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('BaseRestfulApiClient', () => {
  describe('.generateCapsuleRef()', () => {
    const AlphaRestfulApiCapsule = class extends BaseRestfulApiCapsule {}
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
      const actual = BaseRestfulApiClient.generateCapsuleRef(input)

      expect(actual)
        .toHaveProperty('value', expected)
    })
  })
})

describe('BaseRestfulApiClient', () => {
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
      const client = new BaseRestfulApiClient(input)

      const actual = client.Ctor

      expect(actual)
        .toBe(BaseRestfulApiClient) // same reference
    })
  })
})
