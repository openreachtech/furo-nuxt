import BaseFuroContext from '../BaseFuroContext.js'

/**
 * FuroAccessControlLayoutContext
 *
 * @extends {BaseFuroContext<null, AccessControlLayoutContextProps, null>}
 */
export default class FuroAccessControlLayoutContext extends BaseFuroContext {
  /**
   * get: role
   *
   * @returns {AccessControlLayoutContextProps['role']}
   */
  get role () {
    return this.props.role
  }

  /**
   * get: allowedRoles
   *
   * @returns {AccessControlLayoutContextProps['allowed']}
   */
  get allowedRoles () {
    return this.props.allowed
  }

  /**
   * get: kickedRoles
   *
   * @returns {AccessControlLayoutContextProps['kicked']}
   */
  get kickedRoles () {
    return this.props.kicked
  }

  /**
   * Setup component context.
   *
   * @template {X extends FuroAccessControlLayoutContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    return this
  }

  /**
   * Check if the user should be allowed access.
   *
   * @returns {boolean} True if the user should be allowed access, false otherwise.
   * @public
   */
  canShowContent () {
    return Boolean(this.role)
      && this.isAllowed()
      && !this.isKicked()
  }

  /**
   * Check if role is in allowed list.
   *
   * @returns {boolean} True if the role is in allowed list.
   */
  isAllowed () {
    if (!this.role) {
      return false
    }

    if (this.allowedRoles.length === 0) {
      return true
    }

    return this.allowedRoles
      .includes(this.role)
  }

  /**
   * Check if role is in kicked list.
   *
   * @returns {boolean} True if the role is in kicked list.
   */
  isKicked () {
    if (!this.role) {
      return true
    }

    if (this.kickedRoles.length === 0) {
      return false
    }

    return this.kickedRoles
      .includes(this.role)
  }
}

/**
 * @typedef {{
 *   role: string | null
 *   allowed: Array<string>
 *   kicked: Array<string>
 * }} AccessControlLayoutContextProps
 */
