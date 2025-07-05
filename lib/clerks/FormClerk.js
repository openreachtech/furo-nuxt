import {
  ref,
  shallowRef,
} from 'vue'

/**
 * Form Clerk for orchestrating inspector and validator.
 */
export default class FormClerk {
  /**
   * Constructor.
   *
   * @param {FormClerkParams} params - Parameters of this constructor.
   */
  constructor ({
    formElementShallowRef,
    validationRef,
  }) {
    this.formElementShallowRef = formElementShallowRef
    this.validationRef = validationRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof FormClerk ? X : never} T, X
   * @param {FormClerkFactoryParams} [params] - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    formElementShallowRef = this.createFormElementShallowRef(),
    validationRef = this.createValidationRef(),
  } = {}) {
    return /** @type {InstanceType<T>} */ (
      new this({
        formElementShallowRef,
        validationRef,
      })
    )
  }

  /**
   * get: the form element reference.
   *
   * @returns {typeof ref} - The form element reference.
   */
  static get ref () {
    return ref
  }

  /**
   * get: the shallow reference.
   *
   * @returns {typeof shallowRef} - The shallow reference.
   */
  static get shallowRef () {
    return shallowRef
  }

  /**
   * Create <form> shallow reference.
   *
   * @returns {import('vue').Ref<HTMLFormElement | null>} - A form element reference.
   */
  static createFormElementShallowRef () {
    return /** @type {import('vue').Ref<HTMLFormElement | null>} */ (
      this.shallowRef(null)
    )
  }

  /**
   * Create a validation reference.
   *
   * @returns {import('vue').Ref<furo.ValidatorHashType>} - A validation reference.
   */
  static createValidationRef () {
    return /** @type {import('vue').Ref<furo.ValidatorHashType>} */ (
      this.ref({
        valid: {},
        invalid: {},
        messages: {},
        message: {},
      })
    )
  }
}

/**
 * @typedef {{
 *   formElementShallowRef: import('vue').ShallowRef<HTMLFormElement | null>
 *   validationRef: import('vue').Ref<furo.ValidatorHashType>
 * }} FormClerkParams
 */

/**
 * @typedef {Partial<FormClerkParams>} FormClerkFactoryParams
 */
