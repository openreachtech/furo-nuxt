import {
  shallowRef,
  ref,
} from 'vue'

import {
  DomInflator,
} from '@openreachtech/furo'

import BaseFormClerk from '~/lib/clerks/BaseFormClerk'

describe('BaseFormClerk', () => {
  describe('constructor', () => {
    describe('should keep properties', () => {
      describe('#formElementShallowRef', () => {
        const mockValidationRef = ref({
          valid: {},
          invalid: {},
          messages: {},
          message: {},
        })

        const cases = [
          {
            input: {
              formElementShallowRef: shallowRef(null),
            },
          },
        ]

        test.each(cases)('formElementShallowRef: $input.formElementShallowRef', ({ input }) => {
          const args = {
            formElementShallowRef: input.formElementShallowRef,
            validationRef: mockValidationRef,
          }
          const clerk = new BaseFormClerk(args)

          expect(clerk)
            .toHaveProperty('formElementShallowRef', input.formElementShallowRef)
        })
      })

      describe('#validationRef', () => {
        const mockFormElementShallowRef = shallowRef(null)

        const cases = [
          {
            input: {
              validationRef: ref({
                valid: {},
                invalid: {},
                messages: {},
                message: {},
              }),
            },
          },
        ]

        test.each(cases)('validationRef: $input.validationRef', ({ input }) => {
          const args = {
            formElementShallowRef: mockFormElementShallowRef,
            validationRef: input.validationRef,
          }
          const clerk = new BaseFormClerk(args)

          expect(clerk)
            .toHaveProperty('validationRef', input.validationRef)
        })
      })
    })
  })
})

describe('BaseFormClerk', () => {
  describe('.create()', () => {
    const alphaFormHtml = `
      <form id="alpha">
        <input type="text" name="first" />
      </form>
    `
    const betaFormHtml = `
      <form id="beta">
        <input type="text" name="beta" />
      </form>
    `

    const [alphaFormElement] = DomInflator.create({
      html: alphaFormHtml,
    })
      .inflateElements()
    const [betaFormElement] = DomInflator.create({
      html: betaFormHtml,
    })
      .inflateElements()

    describe('should be an instance of own class', () => {
      describe('with full arguments', () => {
        const cases = [
          {
            input: {
              formElementShallowRef: shallowRef(alphaFormElement),
              validationRef: ref({
                valid: {},
                invalid: {},
                messages: {},
                message: {},
              }),
            },
          },
          {
            input: {
              formElementShallowRef: shallowRef(betaFormElement),
              validationRef: ref({
                valid: {},
                invalid: {},
                messages: {},
                message: {},
              }),
            },
          },
        ]

        test.each(cases)('formElementShallowRef: $input.formElementShallowRef', ({ input }) => {
          const actual = BaseFormClerk.create(input)

          expect(actual)
            .toBeInstanceOf(BaseFormClerk)
        })
      })

      describe('with lacked arguments', () => {
        const cases = [
          {
            input: {
              // formElementShallowRef: shallowRef(alphaFormElement),
              validationRef: ref({
                valid: {},
                invalid: {},
                messages: {},
                message: {},
              }),
            },
          },
          {
            input: {
              formElementShallowRef: shallowRef(betaFormElement),
              // validationRef: ref({
              //   valid: {},
              //   invalid: {},
              //   messages: {},
              //   message: {},
              // }),
            },
          },
          {
            input: {
              // formElementShallowRef: shallowRef(null),
              // validationRef: ref({
              //   valid: {},
              //   invalid: {},
              //   messages: {},
              //   message: {},
              // }),
            },
          },
        ]

        test.each(cases)('formElementShallowRef: $input.formElementShallowRef', ({ input }) => {
          const actual = BaseFormClerk.create(input)

          expect(actual)
            .toBeInstanceOf(BaseFormClerk)
        })

        test('with no arguments', () => {
          const actual = BaseFormClerk.create()

          expect(actual)
            .toBeInstanceOf(BaseFormClerk)
        })
      })
    })

    describe('should call constructor', () => {
      describe('with full arguments', () => {
        const cases = [
          {
            input: {
              formElementShallowRef: shallowRef(alphaFormElement),
              validationRef: ref({
                valid: {},
                invalid: {},
                messages: {},
                message: {},
              }),
            },
          },
          {
            input: {
              formElementShallowRef: shallowRef(betaFormElement),
              validationRef: ref({
                valid: {},
                invalid: {},
                messages: {},
                message: {},
              }),
            },
          },
        ]

        test.each(cases)('formElementShallowRef: $input.formElementShallowRef', ({ input }) => {
          const SpyClass = globalThis.constructorSpy.spyOn(BaseFormClerk)

          SpyClass.create(input)

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(input)
        })
      })

      describe('with lacked arguments', () => {
        const cases = [
          {
            input: {
              // formElementShallowRef: shallowRef(alphaFormElement),
              validationRef: ref({
                valid: {},
                invalid: {},
                messages: {},
                message: {},
              }),
            },
            expected: {
              formElementShallowRef: shallowRef(null),
              validationRef: ref({
                valid: {},
                invalid: {},
                messages: {},
                message: {},
              }),
            },
          },
          {
            input: {
              formElementShallowRef: shallowRef(betaFormElement),
              // validationRef: ref({
              //   valid: {},
              //   invalid: {},
              //   messages: {},
              //   message: {},
              // }),
            },
            expected: {
              formElementShallowRef: shallowRef(betaFormElement),
              validationRef: ref({
                valid: {},
                invalid: {},
                messages: {},
                message: {},
              }),
            },
          },
          {
            input: {
              // formElementShallowRef: shallowRef(null),
              // validationRef: ref({
              //   valid: {},
              //   invalid: {},
              //   messages: {},
              //   message: {},
              // }),
            },
            expected: {
              formElementShallowRef: shallowRef(null),
              validationRef: ref({
                valid: {},
                invalid: {},
                messages: {},
                message: {},
              }),
            },
          },
        ]

        test.each(cases)('formElementShallowRef: $input.formElementShallowRef', ({ input, expected }) => {
          const SpyClass = globalThis.constructorSpy.spyOn(BaseFormClerk)

          SpyClass.create(input)

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(expected)
        })

        test('with no arguments', () => {
          const expected = {
            formElementShallowRef: shallowRef(null),
            validationRef: ref({
              valid: {},
              invalid: {},
              messages: {},
              message: {},
            }),
          }

          const SpyClass = globalThis.constructorSpy.spyOn(BaseFormClerk)

          SpyClass.create()

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(expected)
        })
      })
    })
  })
})

describe('BaseFormClerk', () => {
  describe('.get:ref', () => {
    test('should return ref()', () => {
      const actual = BaseFormClerk.ref

      expect(actual)
        .toBe(ref) // same reference
    })
  })
})

describe('BaseFormClerk', () => {
  describe('.get:shallowRef', () => {
    test('should return shallowRef()', () => {
      const actual = BaseFormClerk.shallowRef

      expect(actual)
        .toBe(shallowRef) // same reference
    })
  })
})

describe('BaseFormClerk', () => {
  describe('.get:validationRules', () => {
    test('should be fixed value', () => {
      /** @type {Array<furo.FieldValidatorFactoryParams>} */
      const expected = []

      const actual = BaseFormClerk.validationRules

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('BaseFormClerk', () => {
  describe('.createFormElementShallowRef()', () => {
    // noop
  })
})

describe('BaseFormClerk', () => {
  describe('.createValidationRef()', () => {
    // noop
  })
})

describe('BaseFormClerk', () => {
  describe('#get:Ctor', () => {
    const alphaFormHtml = `
      <form id="alpha">
        <input type="text" name="first" />
      </form>
    `
    const betaFormHtml = `
      <form id="beta">
        <input type="text" name="beta" />
      </form>
    `

    const [alphaFormElement] = DomInflator.create({
      html: alphaFormHtml,
    })
      .inflateElements()
    const [betaFormElement] = DomInflator.create({
      html: betaFormHtml,
    })
      .inflateElements()

    describe('should be constructor of own class', () => {
      describe('with full arguments', () => {
        const cases = [
          {
            input: {
              formElementShallowRef: shallowRef(alphaFormElement),
              validationRef: ref({
                valid: {},
                invalid: {},
                messages: {},
                message: {},
              }),
            },
          },
          {
            input: {
              formElementShallowRef: shallowRef(betaFormElement),
              validationRef: ref({
                valid: {},
                invalid: {},
                messages: {},
                message: {},
              }),
            },
          },
        ]

        test.each(cases)('formElementShallowRef: $input.formElementShallowRef', ({ input }) => {
          const clerk = BaseFormClerk.create(input)

          const actual = clerk.Ctor

          expect(actual)
            .toBe(BaseFormClerk) // same reference
        })
      })

      describe('with lacked arguments', () => {
        const cases = [
          {
            input: {
              // formElementShallowRef: shallowRef(alphaFormElement),
              validationRef: ref({
                valid: {},
                invalid: {},
                messages: {},
                message: {},
              }),
            },
          },
          {
            input: {
              formElementShallowRef: shallowRef(betaFormElement),
              // validationRef: ref({
              //   valid: {},
              //   invalid: {},
              //   messages: {},
              //   message: {},
              // }),
            },
          },
          {
            input: {
              // formElementShallowRef: shallowRef(null),
              // validationRef: ref({
              //   valid: {},
              //   invalid: {},
              //   messages: {},
              //   message: {},
              // }),
            },
          },
        ]

        test.each(cases)('formElementShallowRef: $input.formElementShallowRef', ({ input }) => {
          const clerk = BaseFormClerk.create(input)

          const actual = clerk.Ctor

          expect(actual)
            .toBe(BaseFormClerk) // same reference
        })

        test('with no arguments', () => {
          const clerk = BaseFormClerk.create()

          const actual = clerk.Ctor

          expect(actual)
            .toBe(BaseFormClerk) // same reference
        })
      })
    })
  })
})

describe('BaseFormClerk', () => {
  describe('#validateFormValueHash()', () => {
    // noop
  })
})

describe('BaseFormClerk', () => {
  describe('#isValid()', () => {
    // noop
  })
})

describe('BaseFormClerk', () => {
  describe('#isInvalid()', () => {
    // noop
  })
})

describe('BaseFormClerk', () => {
  describe('#extractValueHash()', () => {
    // noop
  })
})

describe('BaseFormClerk', () => {
  describe('#createFormElementInspector()', () => {
    // noop
  })
})
