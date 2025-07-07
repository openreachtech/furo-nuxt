import {
  ref,
} from 'vue'

/**
 * Use form clerk.
 * Receive <form> clerk class and invoke request function.
 *
 * @param {{
 *   FormElementClerk: typeof import('@openreachtech/furo').BaseFormElementClerk<*>
 *   invokeRequestWithFormValueHash: (args: {
 *     valueHash: furo.FormValueHashType
 *     extraValueHash?: Record<string, any>
 *     hooks?: GraphqlType.LauncherHooks
 *     options?: RequestInit
 *   }) => Promise<void>
 * }} params - Parameters.
 * @returns {{
 *   validationRef: import('vue').Ref<furo.ValidatorHashType>
 *   submitForm: (params: {
 *     formElement: HTMLFormElement
 *     extraValueHash?: Record<string, any>
 *     hooks?: GraphqlType.LauncherHooks
 *     options?: RequestInit
 *   }) => Promise<boolean>
 * }}
 */
export default function useFormClerk ({
  FormElementClerk,
  invokeRequestWithFormValueHash,
}) {
  /**
   * @type {import('vue').Ref<furo.ValidatorHashType>}
   */
  const validationRef = ref({
    valid: {},
    invalid: {},
    messages: {},
    message: {},
  })

  return {
    validationRef,
    submitForm,
  }

  /**
   * Submit form.
   *
   * @param {{
   *   formElement: HTMLFormElement
   *   extraValueHash?: Record<string, any>
   *   hooks?: GraphqlType.LauncherHooks
   *   options?: RequestInit
   * }} params - Parameters.
   * @returns {Promise<boolean>} true: Invoke request.
   */
  async function submitForm ({
    formElement,
    extraValueHash = {},
    hooks,
    options,
  }) {
    const formElementClerk = FormElementClerk.create({
      formElement,
    })

    validationRef.value = formElementClerk.generateValidationHash()

    // Skip #launchRequest(), if invalid value hash of <form>.
    if (formElementClerk.isInvalid()) {
      return false
    }

    const valueHash = formElementClerk.extractValueHash()

    await invokeRequestWithFormValueHash({
      valueHash,
      extraValueHash,
      hooks,
      options,
    })

    return true
  }
}
