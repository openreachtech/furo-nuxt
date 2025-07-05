import {
  onMounted,
  ref,
} from 'vue'

/**
 * Composable to use RESTful API client.
 *
 * @template {RestfulApiType.LauncherCtor} L
 * @template C
 * @param {{
 *   Launcher: L
 *   Capsule: C
 * }} params - Parameters.
 * @returns {{
 *   capsuleRef: import('vue').Ref<InstanceType<C>>
 *   invokeRequestOnEvent: (args?: RestfulApiType.RequestArgs) => Promise<void>
 *   invokeRequestOnMounted: (args?: RestfulApiType.RequestArgs) => void
 *   invokeRequestWithFormValueHash: (args: {
 *     valueHash: furo.FormValueHashType
 *     options?: RequestInit
 *     hooks?: RestfulApiType.LauncherHooks
 *   }) => Promise<void>
 * }}
 */
export default function useRestfulApiClient ({
  Launcher,
}) {
  /** @type {import('vue').Ref<InstanceType<C>>} */
  const capsuleRef = /** @type {*} */ (
    ref(
      Launcher.createCapsuleAsPending()
    )
  )

  return {
    capsuleRef,

    /**
     * Invoke request.
     *
     * @param {RestfulApiType.RequestArgs} [args] - Arguments.
     * @returns {Promise<void>}
     */
    async invokeRequestOnEvent (args) {
      await invokeRequest(args)
    },

    /**
     * Invoke request.
     *
     * @param {RestfulApiType.RequestArgs} [args] - Arguments.
     * @returns {void}
     */
    invokeRequestOnMounted (args) {
      onMounted(async () => {
        await invokeRequest(args)
      })
    },

    /**
     * Invoke request with <form> value hash.
     *
     * @param {{
     *   valueHash: furo.FormValueHashType
     *   extraValueHash?: Record<string, any>
     *   options?: RequestInit
     *   hooks?: RestfulApiType.LauncherHooks
     * }} args - Arguments.
     */
    async invokeRequestWithFormValueHash ({
      valueHash,
      extraValueHash = {},
      options = {},
      hooks = {},
    }) {
      const payload = Launcher.createPayloadWithFormValueHash({
        valueHash,
        extraValueHash,
        options,
      })

      const capsule = await retrieveCapsule({
        payload,
        hooks,
      })

      capsuleRef.value = capsule
    },
  }

  /**
   * Invoke request.
   *
   * @param {RestfulApiType.RequestArgs} [args] - Arguments.
   * @returns {Promise<void>}
   */
  async function invokeRequest ({
    variables = {},
    options = {},
    hooks = {},
  } = {}) {
    const payload = Launcher.createPayload({
      variables,
      options,
    })

    const capsule = await retrieveCapsule({
      payload,
      hooks,
    })

    capsuleRef.value = capsule
  }

  /**
   * Retrieve capsule.
   *
   * @param {{
   *   payload: RestfulApiType.Payload<*>
   *   hooks?: RestfulApiType.LauncherHooks
   * }} args - Arguments.
   * @returns {Promise<InstanceType<C>>}
   */
  async function retrieveCapsule ({
    payload,
    hooks = {},
  }) {
    const launcher = Launcher.create()

    const capsule = await launcher.launchRequest({
      payload,
      hooks,
    })

    return /** @type {InstanceType<*>} */ (capsule)
  }
}
