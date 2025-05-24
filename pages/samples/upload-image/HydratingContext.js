import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

/**
 * Props context class for HydratingContext component.
 *
 * @property {import('vue').Ref<HTMLDialogElement | null>} dialogRef - Dialog element.
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class HydratingContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {HydratingContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    statusReactive,
    uploadProgressSizeRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.statusReactive = statusReactive
    this.uploadProgressSizeRef = uploadProgressSizeRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof HydratingContext ? X : never} T, X
   * @override
   * @param {HydratingContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    statusReactive,
    uploadProgressSizeRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        statusReactive,
        uploadProgressSizeRef,
      })
    )
  }

  /**
   * Setup component context.
   *
   * @template {X extends HydratingContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    return this
  }

  /**
   * Check if the component is loading.
   *
   * @returns {boolean} - true: loading
   */
  get isLoading () {
    return this.statusReactive.isLoading
  }

  /**
   * get: Progress content size.
   *
   * @returns {number}
   */
  get progressContentSize () {
    return this.uploadProgressSizeRef.value
      .contentSize
  }

  /**
   * get: Progress uploaded size.
   *
   * @returns {number}
   */
  get progressUploadedSize () {
    return this.uploadProgressSizeRef.value
      .uploadedSize
  }
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext').BaseFuroContextParams<> & {
 *   statusReactive: import('vue').Reactive<UploadImageStatusReactive>
 *   uploadProgressSizeRef: import('vue').Ref<{
 *     contentSize: number
 *     uploadedSize: number
 *   }>
 * }} HydratingContextParams
 */

/**
 * @typedef {HydratingContextParams} HydratingContextFactoryParams
 */

/**
 * @typedef {{
 *   input: {
 *     pagination?: {
 *       limit?: number
 *       offset?: number
 *       sort?: {
 *         targetColumn?: string
 *         orderBy?: string
 *       }
 *     }
 *   }
 * }} CurriculumsDefaultVariables
 */

/**
 * @typedef {{
 *   isLoading: boolean
 * }} UploadImageStatusReactive
 */

/**
 * @typedef {{
 *   validationRef: import('vue').Ref<*>
 *   submitForm: (args?: *) => Promise<boolean>
 * }} FormClerkType
 */
