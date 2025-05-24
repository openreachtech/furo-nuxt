import {
  StorageClerk,
} from '@openreachtech/furo'

/**
 * Access token clerk.
 */
export default class AccessTokenClerk {
  /**
   * Constructor.
   *
   * @param {AccessTokenClerkParams} params - Parameters.
   */
  constructor ({
    storage,
    key,
  }) {
    this.storage = storage
    this.key = key
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof AccessTokenClerk ? X : never} T, X
   * @param {AccessTokenClerkFactoryParams} [params] - Parameters.
   * @returns {InstanceType<T>} An instance of AccessTokenClerk.
   * @this {T}
   */
  static create ({
    storage = this.createStorageClerk(),
    key = this.STORAGE_KEY,
  } = {}) {
    return /** @type {InstanceType<T>} */ (
      new this({
        storage,
        key,
      })
    )
  }

  /**
   * Create a new instance of StorageClerk.
   *
   * @returns {StorageClerk} An instance of StorageClerk.
   */
  static createStorageClerk () {
    return StorageClerk.createAsLocal()
  }

  /**
   * get: Storage key.
   *
   * @returns {string} Access token.
   */
  static get STORAGE_KEY () {
    return 'access_token'
  }

  /**
   * Save the access token.
   *
   * @param {{
   *   token: string | null
   * }} params - Parameters.
   * @returns {boolean} true: if the access token is saved.
   */
  saveToken ({
    token,
  }) {
    if (!token) {
      this.clearToken()

      return false
    }

    this.recordToken({
      token,
    })

    return true
  }

  /**
   * Clear the access token.
   *
   * @returns {AccessTokenClerk} For method chaining.
   */
  clearToken () {
    this.storage.remove(this.key)

    return this
  }

  /**
   * Record the access token.
   *
   * @param {{
   *   token: string
   * }} params - Parameters.
   * @returns {AccessTokenClerk} For method chaining.
   */
  recordToken ({
    token,
  }) {
    this.storage.set(
      this.key,
      token
    )

    return this
  }

  /**
   * Retrieve the access token.
   *
   * @returns {string | null} Access token.
   */
  retrieveToken () {
    return this.storage.get(this.key)
  }

  /**
   * Check if the access token exists.
   *
   * @returns {boolean} True if the access token exists.
   */
  existsToken () {
    return this.retrieveToken() !== null
  }
}

/**
 * @typedef {{
 *   storage: StorageClerk
 *   key: string
 * }} AccessTokenClerkParams
 */

/**
 * @typedef {{
 *   storage?: StorageClerk
 *   key?: string
 * }} AccessTokenClerkFactoryParams
 */
