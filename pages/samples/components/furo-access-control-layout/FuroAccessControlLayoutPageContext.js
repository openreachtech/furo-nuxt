import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

/**
 * Page context for FuroAccessControlLayout.
 *
 * @extends BaseFuroContext<null>
 */
export default class FuroAccessControlLayoutPageContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {FuroAccessControlLayoutPageContextParams} params - Parameters of constructor.
   */
  constructor ({
    props,
    componentContext,

    roleRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.roleRef = roleRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof FuroAccessControlLayoutPageContext ? X : never} T, X
   * @override
   * @param {FuroAccessControlLayoutPageContextFactoryParams} params - Parameters of factory method.
   * @returns {InstanceType<T>} - New instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    roleRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        roleRef,
      })
    )
  }

  /**
   * get: role
   *
   * @returns {Role | null}
   */
  get role () {
    return this.roleRef
      .value
  }

  /**
   * get: secretMessage
   *
   * @returns {string}
   */
  get secretMessage () {
    return 'This is a secret message'
  }

  /**
   * @param {{
   *   role: Role | null
   * }} params
   */
  setRole ({
    role,
  }) {
    this.roleRef.value = role
  }
}

/**
 * @typedef {{
 *   props: import('vue').ComponentCustomProps
 *   componentContext: import('vue').SetupContext
 *   roleRef: import('vue').Ref<Role | null>
 * }} FuroAccessControlLayoutPageContextParams
 */

/**
 * @typedef {FuroAccessControlLayoutPageContextParams} FuroAccessControlLayoutPageContextFactoryParams
 */

/**
 * @typedef {'admin'
 *   | 'user'
 *   | 'guest'
 * } Role
 */
