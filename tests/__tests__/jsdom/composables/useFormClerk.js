import {
  ref,
} from 'vue'

import {
  BaseFormElementClerk,
} from '@openreachtech/furo'

import useFormClerk from '~/lib/composables/useFormClerk.js'

describe('useFormClerk()', () => {
  test('to be an object', () => {
    /**
     * @extends {BaseFormElementClerk<typeof DerivedFormElementClerk, *, *>}
     */
    class DerivedFormElementClerk extends BaseFormElementClerk {
      /** @override */
      static get rules () {
        return []
      }
    }

    const expected = {
      validationRef: ref({
        valid: {},
        invalid: {},
        messages: {},
        message: {},
      }),
      submitForm: expect.any(Function),
    }

    const actual = useFormClerk({
      FormElementClerk: DerivedFormElementClerk,
      invokeRequestWithFormValueHash: async () => {},
    })

    expect(actual)
      .toEqual(expected)
  })
})
