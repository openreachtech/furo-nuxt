import path from 'path'
import dotenv from 'dotenv'

export default class NuxtFuroEnvLoader {
  /**
   * Constructor.
   *
   * @param {NuxtFuroEnvLoaderParams} params
   */
  constructor ({
    processEnv,
  }) {
    this.processEnv = processEnv
  }

  /**
   * Factory method of this class.
   *
   * @param {NuxtFuroEnvLoaderFactoryParams} params - Factory parameters.
   * @returns {NuxtFuroEnvLoader} - The created instance.
   */
  static create ({
    processEnv = process.env,
  } = {}) {
    return new this({
      processEnv,
    })
  }

  /**
   * get: The dotenv module.
   *
   * @returns {typeof import('dotenv')} The dotenv module.
   */
  static get dotenv () {
    return dotenv
  }

  /**
   * get: The constructor of this class.
   *
   * @returns {typeof NuxtFuroEnvLoader} The constructor of this class.
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * Load the .furo-env file content.
   *
   * @returns {{
   *   [key: string]: string
   * }} The parsed .furo-env file content.
   */
  loadEnv () {
    const filePath = this.resolveFilePath()

    try {
      const furoEnv = dotenv.config({
        path: filePath,
      })

      return furoEnv.parsed
        ?? {}
    } catch (error) {
      return {}
    }
  }

  /**
   * Resolves the appropriate .furo-env file path based on the NODE_ENV value.
   *
   * @returns {string} The resolved .furo-env file path.
   */
  resolveFilePath () {
    const fileName = this.resolveFileName()

    return path.join(
      process.cwd(),
      fileName
    )
  }

  /**
   * Resolves the appropriate .furo-env file name based on the NODE_ENV value.
   *
   * @returns {string} The resolved .furo-env file name.
   */
  resolveFileName () {
    const baseFileName = '.furo-env'

    const nodeEnv = this.resolveNodeEnv()

    return nodeEnv === 'production'
      ? baseFileName
      : `${baseFileName}.${nodeEnv}`
  }

  /**
   * Resolves the value of process.env.NODE_ENV
   *
   * @returns {string} The resolved NODE_ENV value.
   */
  resolveNodeEnv () {
    return this.processEnv.NODE_ENV
      ?? 'development'
  }
}

/**
 * @typedef {{
 *   processEnv: NodeJS.ProcessEnv
 * }} NuxtFuroEnvLoaderParams
 */

/**
 * @typedef {{
 *   processEnv?: NodeJS.ProcessEnv
 * }} NuxtFuroEnvLoaderFactoryParams
 */
