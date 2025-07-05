import {
  reactive,
  shallowRef,
} from 'vue'
import RestfulApiClient from '~/lib/clients/RestfulApiClient.js'

import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'
import AccessTokenClerk from '~/lib/tools/AccessTokenClerk.js'

import AlphaExternalCallbackSuccessGetRenchanRestfulApiLauncher from '~/app/restfulapi/renchan/get/alphaExternalCallbackSuccess/AlphaExternalCallbackSuccessGetRenchanRestfulApiLauncher.js'

/**
 * RestfulApiPageContext.
 *
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class RestfulApiPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {RestfulApiPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    formElementRef,
    statusReactive,

    restfulApiClient,
  }) {
    super({
      props,
      componentContext,
    })

    this.formElementRef = formElementRef
    this.statusReactive = statusReactive

    this.restfulApiClient = restfulApiClient
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof RestfulApiPageContext ? X : never} T, X
   * @override
   * @param {RestfulApiPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
  }) {
    const formElementRef = shallowRef(null)
    const statusReactive = reactive({
      isLoading: false,
    })

    const restfulApiClient = RestfulApiClient.create(AlphaExternalCallbackSuccessGetRenchanRestfulApiLauncher)

    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        formElementRef,
        statusReactive,

        restfulApiClient,
      })
    )
  }

  /**
   * get: graphqlRequestHooks.
   *
   * @returns {GraphqlType.LauncherHooks<>} - GraphQL request hooks.
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
   * @returns {import('vue').Ref<import('../../../app/restfulapi/renchan/get/alphaExternalCallbackSuccess/AlphaExternalCallbackSuccessGetRenchanRestfulApiCapsule.js').default>} - Capsule reference.
   */
  get capsuleRef () {
    return /** @type {*} */ (
      this.restfulApiClient.capsuleRef
    )
  }

  /**
   * get: isLoading.
   *
   * @returns {boolean} - Loading status.
   */
  get isLoading () {
    return this.statusReactive.isLoading
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
   * @returns {GraphqlType.LauncherHooks<P, C>} - Hooks for the form clerk.
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
 *   restfulApiClient: import('~/lib/clients/RestfulApiClient.js').default
 *   formElementRef: import('vue').Ref<HTMLFormElement | null>
 *   statusReactive: import('vue').Reactive<Record<string, boolean>>
 * }} RestfulApiPageContextParams
 */

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<>} RestfulApiPageContextFactoryParams
 */

/**
 * @typedef {{
 *   validationRef: import('vue').Ref<furo.ValidatorHashType>
 *   submitForm: (args: {
 *     formElement: HTMLFormElement
 *     hooks?: GraphqlType.LauncherHooks<
 *       import('../../../app/graphql/client/mutations/signIn/SignInMutationGraphqlPayload.js').default,
 *       import('../../../app/graphql/client/mutations/signIn/SignInMutationGraphqlCapsule.js').default
 *     >
 *   }) => Promise<boolean>
 * }} FormClerkType
 */
