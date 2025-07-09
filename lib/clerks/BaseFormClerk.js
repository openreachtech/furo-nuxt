import {
  ref,
  shallowRef,
} from 'vue'

import {
  FormElementInspector,
  ValueHashValidator,
} from '@openreachtech/furo'

/**
 * Form Clerk for orchestrating inspector and validator.
 *
 * @template {furo.FormValueHashType} [FV = furo.FormValueHashType] - Form value hash type.
 */
export default class BaseFormClerk {
  /**
   * Constructor.
   *
   * @param {BaseFormClerkParams} params - Parameters of this constructor.
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
   * @template {X extends typeof BaseFormClerk ? X : never} T, X
   * @param {BaseFormClerkFactoryParams} [params] - Parameters of this factory method.
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
   * get: Validation rules for this form clerk.
   *
   * @abstract
   * @returns {Array<furo.FieldValidatorFactoryParams>} - An array of validation rules.
   */
  static get validationRules () {
    return []
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

  /**
   * get: Constructor of this class.
   *
   * @template {typeof BaseFormClerk} T
   * @returns {T} - The constructor of this class.
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * Validate the form value hash.
   *
   * @param {{
   *   valueHash?: furo.FormValueHashType
   * }} [params] - Parameters of this method.
   * @returns {boolean} true: Valid, false: Invalid.
   * @public
   */
  validateFormValueHash ({
    valueHash = this.extractValueHash(),
  } = {}) {
    const validator = ValueHashValidator.create({
      valueHash,
      rules: this.Ctor.validationRules,
    })

    const validationHash = validator.generateValidationHash()

    this.validationRef.value = validationHash

    return this.isValid({
      validationHash,
    })
  }

  /**
   * Is valid.
   *
   * @param {{
   *   validationHash?: furo.ValidatorHashType
   * }} [params] - Parameters of this method.
   * @returns {boolean} true: valid.
   * @public
   */
  isValid ({
    validationHash = this.validationRef.value,
  } = {}) {
    return Object.values(validationHash.valid)
      .every(it => it)
  }

  /**
   * Is invalid.
   *
   * @param {{
   *   validationHash?: furo.ValidatorHashType
   * }} [params] - Parameters of this method.
   * @returns {boolean} true: invalid.
   * @public
   */
  isInvalid ({
    validationHash = this.validationRef.value,
  } = {}) {
    return !this.isValid({
      validationHash,
    })
  }

  /**
   * Extract value hash from the form element.
   *
   * @returns {FV} Hash of form control value.
   * @public
   */
  extractValueHash () {
    return /** @type {FV} */ (
      this.createFormElementInspector()
        .extractValueHash()
    )
  }

  /**
   * Create an instance of FormElementInspector.
   *
   * @returns {FormElementInspector} An instance of FormElementInspector.
   * @throws {Error} no mounted form element
   */
  createFormElementInspector () {
    const formElement = this.formElementShallowRef.value
    if (!formElement) {
      throw new Error('no mounted form element')
    }

    return FormElementInspector.create({
      formElement,
    })
  }
}

/**
 * @typedef {{
 *   formElementShallowRef: import('vue').ShallowRef<HTMLFormElement | null>
 *   validationRef: import('vue').Ref<furo.ValidatorHashType>
 * }} BaseFormClerkParams
 */

/**
 * @typedef {Partial<BaseFormClerkParams>} BaseFormClerkFactoryParams
 */
