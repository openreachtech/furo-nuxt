import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

/**
 * FormDialogPageContext.
 *
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class FormDialogPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {FormDialogPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    formDialogRef,
    formElementRef,
    formValuesRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.formDialogRef = formDialogRef
    this.formElementRef = formElementRef
    this.formValuesRef = formValuesRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof FormDialogPageContext ? X : never} T, X
   * @override
   * @param {FormDialogPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    formDialogRef,
    formElementRef,
    formValuesRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        formDialogRef,
        formElementRef,
        formValuesRef,
      })
    )
  }

  /**
   * get: form values
   *
   * @returns {string} - response text.
   */
  get formValues () {
    return this.formValuesRef.value
  }

  /**
   * Show dialog.
   */
  showDialog () {
    this.formDialogRef.value
      ?.showDialog()
  }

  /**
   * Dismiss dialog.
   */
  dismissDialog () {
    this.formDialogRef.value
      ?.dismissDialog()
  }

  /**
   * Submit form.
   *
   * @param {{
   *   formElement?: HTMLFormElement | null
   * }} [params] - Parameters.
   */
  submitForm ({
    formElement = this.formElementRef.value,
  } = {}) {
    if (!formElement) {
      return
    }

    const value = formElement
      ? Object.fromEntries(
        new FormData(formElement)
      )
      : null

    this.formValuesRef.value = JSON.stringify(
      value,
      null,
      2
    )

    this.dismissDialog()
  }
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   formDialogRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default | null>
 *   formElementRef: import('vue').Ref<HTMLFormElement | null>
 *   formValuesRef: import('vue').Ref<string>
 * }} FormDialogPageContextParams
 */

/**
 * @typedef {FormDialogPageContextParams} FormDialogPageContextFactoryParams
 */
