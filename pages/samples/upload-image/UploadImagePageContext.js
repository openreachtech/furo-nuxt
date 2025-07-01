import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

/**
 * Props context class for UploadImagePageContext component.
 *
 * @property {import('vue').Ref<HTMLDialogElement | null>} dialogRef - Dialog element.
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class UploadImagePageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {UploadImagePageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    statusReactive,
    formElementRef,
    uploadProgressSizeRef,

    graphqlClient,
    formClerk,
  }) {
    super({
      props,
      componentContext,
    })

    this.statusReactive = statusReactive
    this.formElementRef = formElementRef
    this.uploadProgressSizeRef = uploadProgressSizeRef

    this.graphqlClient = graphqlClient
    this.formClerk = formClerk
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof UploadImagePageContext ? X : never} T, X
   * @override
   * @param {UploadImagePageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    statusReactive,
    formElementRef,
    uploadProgressSizeRef,

    graphqlClient,
    formClerk,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        statusReactive,
        formElementRef,
        uploadProgressSizeRef,

        graphqlClient,
        formClerk,
      })
    )
  }

  /**
   * Setup component context.
   *
   * @template {X extends UploadImagePageContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    return this
  }

  /**
   * get: invoke request on event.
   *
   * @returns {import('vue').Ref<*>} - Invoke request on event.
   */
  get validationRef () {
    return this.formClerk.validationRef
  }

  /**
   * get: capsule reference.
   *
   * @returns {import('vue').Ref<GraphqlType.Capsule<*> | null>} - Capsule reference.
   */
  get capsuleRef () {
    return this.graphqlClient.capsuleRef
  }

  /**
   * get: launcher hooks.
   *
   * @returns {GraphqlType.LauncherHooks} - Launcher hooks.
   */
  get launcherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoading = true

        this.uploadProgressSizeRef.value = {
          contentSize: 0,
          uploadedSize: 0,
        }

        return false
      },
      afterRequest: async capsule => {
        setTimeout(
          () => {
            this.statusReactive.isLoading = false
          },
          250
        )
      },
      onUploadProgress: ({
        request,
        progressEvent,
      }) => {
        if (!progressEvent.lengthComputable) {
          return
        }

        this.uploadProgressSizeRef.value = {
          contentSize: progressEvent.total,
          uploadedSize: progressEvent.loaded,
        }
      },
    }
  }

  /**
   * Submit form.
   *
   * @returns {Promise<boolean>} - Result
   */
  async submitFormWithHooks () {
    if (!this.formElementRef.value) {
      return false
    }

    await this.formClerk
      .submitForm({
        formElement: this.formElementRef.value,
        hooks: this.launcherHooks,
      })

    return true
  }
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext').BaseFuroContextParams<> & {
 *   statusReactive: import('vue').Reactive<UploadImageStatusReactive>
 *   formElementRef: import('vue').Ref<HTMLFormElement | null>
 *   uploadProgressSizeRef: import('vue').Ref<{
 *     contentSize: number
 *     uploadedSize: number
 *   }>
 *   graphqlClient: furo.GraphqlClient
 *   formClerk: FormClerkType
 * }} UploadImagePageContextParams
 */

/**
 * @typedef {UploadImagePageContextParams} UploadImagePageContextFactoryParams
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
