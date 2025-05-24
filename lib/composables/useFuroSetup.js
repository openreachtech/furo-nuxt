import {
  StorageClerk,
} from '@openreachtech/furo'

/**
 * Composable for app setup.
 *
 * @param {{
 *   STORAGE_KEY: Record<string, string>
 * }} params - Parameters.
 * @returns {{
 *   setupFuroEnv: (params: {
 *     runtimeConfig: import('nuxt/schema').RuntimeConfig
 *   }) => void
 * }}
 */
export default function useFuroSetup ({
  STORAGE_KEY,
}) {
  return {
    setupFuroEnv,
  }

  /**
   * Setup furo environment.
   *
   * @param {{
   *   runtimeConfig: import('nuxt/schema').RuntimeConfig
   * }} params - Parameters.
   */
  function setupFuroEnv ({
    runtimeConfig,
  }) {
    const storageClerk = StorageClerk.createAsSession()

    storageClerk.set(
      STORAGE_KEY.FURO_ENV,
      JSON.stringify(runtimeConfig.public)
    )
  }
}
