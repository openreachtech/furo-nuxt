import BaseFormClerk from '~/lib/clerks/BaseFormClerk.js'

/**
 * Beta External Callback Success Form Clerk.
 *
 * @extends {BaseFormClerk<BaseExternalCallbackSuccessFormValueHash>}
 */
export default class BetaExternalCallbackSuccessFormClerk extends BaseFormClerk {
  /** @override */
  static get validationRules () {
    /**
     * @returns {Array<furo.FieldValidatorFactoryParams>}
     */
    return [
      // first
      {
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        field: 'first',
        message: 'first must be set',
      },

      // second
      {
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        field: 'second',
        message: 'second must be set',
      },
    ]
  }
}

/**
 * @typedef {{
 *   first: string
 *   second: string
 * }} BaseExternalCallbackSuccessFormValueHash
 */
