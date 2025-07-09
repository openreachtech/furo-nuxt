import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'
import CompanySponsorsPageContextAccessor from './CompanySponsorsPageContextAccessor'

/**
 * CompanySponsorsPageContext.
 *
 * @extends {BaseFuroContext<typeof CompanySponsorsPageContextAccessor>} - Base class <Accessor, Props, Emit>
 */
export default class CompanySponsorsPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {CompanySponsorsPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    graphqlClient,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.graphqlClient = graphqlClient
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof CompanySponsorsPageContext ? X : never} T, X
   * @override
   * @param {CompanySponsorsPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    graphqlClient,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        graphqlClient,
        statusReactive,
      })
    )
  }

  /**
   * get: ContextAccessor.
   *
   * @override
   * @returns {typeof CompanySponsorsPageContextAccessor} - Context accessor.
   */
  static get ContextAccessor () {
    return CompanySponsorsPageContextAccessor
  }

  /**
   * Setup component context.
   *
   * @template {X extends CompanySponsorsPageContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.graphqlClient
      .invokeRequestOnMounted({
        hooks: this.graphqlRequestHooks,
      })

    return this
  }

  /**
   * get: graphqlRequestHooks.
   *
   * @returns {{
   *   beforeRequest: (payload: GraphqlType.Payload<*>) => Promise<boolean>
   *   afterRequest: (capsule: GraphqlType.Capsule<*>) => Promise<void>
   * }}
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
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams & {
 *   graphqlClient: furo.GraphqlClient
 *   statusReactive: import('vue').Reactive<Record<string, boolean>>
 * }} CompanySponsorsPageContextParams
 */

/**
 * @typedef {CompanySponsorsPageContextParams} CompanySponsorsPageContextFactoryParams
 */
