import {
  useRoute,
} from 'vue-router'

import {
  navigateTo,
} from 'nuxt/app'

/**
 * Redirect the user to a specific path.
 *
 * @param {{
 *   defaultPath?: string
 * }} [params] - The parameters
 * @returns {{
 *   redirectTo: (params?: { path?: string }) => Promise<void>
 * }}
 */
export default function useRedirect ({
  defaultPath = '/',
} = {}) {
  const route = useRoute()

  return {
    redirectTo,
  }

  /**
   * Resolve the path.
   *
   * @returns {string} - The resolved path
   */
  function resolvePath () {
    return extractRedirectPath()
      ?? defaultPath
  }

  /**
   * Extract the redirect path from the query.
   *
   * @returns {string | null} - The redirect path
   */
  function extractRedirectPath () {
    const path = route.query.redirect

    if (!path) {
      return null
    }

    if (Array.isArray(path)) {
      return path.at(0)
        ?? null
    }

    return path
  }

  /**
   * Redirect the user to a specific path.
   *
   * @param {{
   *   path?: string
   * }} [params] - The parameters
   */
  async function redirectTo ({
    path = resolvePath(),
  } = {}) {
    await navigateTo(path)
  }
}
