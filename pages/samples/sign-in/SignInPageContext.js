import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'
import AccessTokenClerk from '~/lib/tools/AccessTokenClerk.js'

/**
 * SignInPageContext.
 *
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class SignInPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {SignInPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    graphqlClient,
    formClerk,
    redirectTo,

    formElementRef,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.graphqlClient = graphqlClient
    this.formClerk = formClerk
    this.redirectTo = redirectTo

    this.formElementRef = formElementRef
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof SignInPageContext ? X : never} T, X
   * @override
   * @param {SignInPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    graphqlClient,
    formClerk,
    redirectTo,

    formElementRef,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        graphqlClient,
        formClerk,
        redirectTo,

        formElementRef,
        statusReactive,
      })
    )
  }

  /**
   * get: graphqlRequestHooks.
   *
   * @returns {furo.GraphqlLauncherHooks<>} - GraphQL request hooks.
   */
  get graphqlRequestHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoading = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoading = false
      },
    }
  }

  /**
   * get: validationRef.
   *
   * @returns {FormClerkType['validationRef']['value']} - Validation reference.
   */
  get validationRef () {
    return this.formClerk
      .validationRef
      .value
  }

  /**
   * get: capsuleRef.
   *
   * @returns {import('vue').Ref<import('../../../app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlCapsule.js').default>} - Capsule reference.
   */
  get capsuleRef () {
    return /** @type {*} */ (
      this.graphqlClient
        .capsuleRef
    )
  }

  /**
   * get: isLoading.
   *
   * @returns {boolean} - Loading status.
   */
  get isLoading () {
    return this.statusReactive
      .isLoading
  }

  /**
   * Submit form event handler.
   */
  async submitFormWithHooks () {
    if (!this.formElementRef.value) {
      return
    }

    const hooks = this.generateHooks()

    await this.formClerk
      .submitForm({
        formElement: this.formElementRef.value,
        hooks,
      })
  }

  /**
   * On fail to get access token.
   */
  onFailToGetAccessToken () {
    // alert('TODO: Please support the error here.')
  }

  /**
   * Generate hooks for the form clerk.
   *
   * @template {import('../../../app/graphql/client/mutations/signIn/SignInMutationGraphqlPayload.js').default} P
   * @template {import('../../../app/graphql/client/mutations/signIn/SignInMutationGraphqlCapsule.js').default} C
   * @returns {furo.GraphqlLauncherHooks<P, C>} - Hooks for the form clerk.
   */
  generateHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoading = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoading = false

        const hasSaved = this.saveAccessToken({
          capsule,
        })

        if (!hasSaved) {
          this.onFailToGetAccessToken()

          return
        }

        // Redirect to the path after success to sign in.
        await this.redirectTo()
      },
    }
  }

  /**
   * Save access token.
   *
   * @param {{
   *   capsule: import('../../../app/graphql/client/mutations/signIn/SignInMutationGraphqlCapsule.js').default
   * }} params - Parameters of this method.
   * @returns {Promise<boolean>} - Result
   */
  async saveAccessToken ({
    capsule,
  }) {
    return AccessTokenClerk.create()
      .saveToken({
        token: capsule.accessToken,
      })
  }
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   graphqlClient: furo.GraphqlClient
 *   formClerk: FormClerkType
 *   redirectTo: (args?: {
 *     path?: string
 *   }) => Promise<void>
 *   formElementRef: import('vue').Ref<HTMLFormElement | null>
 *   statusReactive: import('vue').Reactive<Record<string, boolean>>
 * }} SignInPageContextParams
 */

/**
 * @typedef {SignInPageContextParams} SignInPageContextFactoryParams
 */

/**
 * @typedef {{
 *   validationRef: import('vue').Ref<furo.ValidatorHashType>
 *   submitForm: (args: {
 *     formElement: HTMLFormElement
 *     hooks?: furo.GraphqlLauncherHooks<
 *       import('../../../app/graphql/client/mutations/signIn/SignInMutationGraphqlPayload.js').default,
 *       import('../../../app/graphql/client/mutations/signIn/SignInMutationGraphqlCapsule.js').default
 *     >
 *   }) => Promise<boolean>
 * }} FormClerkType
 */
