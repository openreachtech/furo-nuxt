import {
  ref,
} from 'vue'

import {
  useNuxtApp,
} from 'nuxt/app'

/**
 * Composable to use a subscription GraphQL client.
 *
 * @template {furo.SubscriberCtor} S
 * @template {furo.SubscriptionCapsuleCtor<*>} C
 * @param {{
 *   Subscriber: S
 *   Capsule: C
 * }} params - Parameters.
 * @returns {{
 *   capsuleRef: import('vue').Ref<InstanceType<C>>
 *   invokeSubscribe: (args: {
 *     hooks: furo.GraphqlSubscriberHooks
 *     variables?: furo.GraphqlRequestVariables
 *     operationName?: string | null
 *     extensions?: Record<string, unknown>
 *     context?: {
 *       headers?: HeadersInit
 *       [key: string]: unknown
 *     }
 *   }) => Promise<void>
 *   invokeUnsubscribe: () => void
 * }}
 */
export default function useSubscriptionGraphqlClient ({
  Subscriber,
  Capsule,
}) {
  /**
   * @type {{
   *   $furo: furo.Share
   * }}
   */
  const {
    $furo,
  } = /** @type {*} */ (
    useNuxtApp()
  )

  /** @type {import('vue').Ref<InstanceType<C>>} */
  const capsuleRef = /** @type {*} */ (
    ref(Capsule.createAsPending())
  )

  const subscriber = Subscriber.create({
    connector: $furo.websocketConnector,
  })

  return {
    capsuleRef,

    invokeSubscribe,
    invokeUnsubscribe,
  }

  /**
   * Invoke request.
   *
   * @param {{
   *   hooks: furo.GraphqlSubscriberHooks
   *   valueHash?: Record<string, *>
   *   operationName?: string | null
   *   extensions?: Record<string, unknown>
   *   context?: {
   *     headers?: HeadersInit
   *     [key: string]: unknown
   *   }
   * }} args - Arguments.
   * @returns {Promise<void>}
   */
  async function invokeSubscribe ({
    hooks,
    valueHash = {},
    operationName = null,
    extensions = {},
    context = {},
  }) {
    /** @type {furo.GraphqlSubscriberHooks<InstanceType<*>, InstanceType<C>>} */
    const sink = {
      onPublish: capsule => {
        capsuleRef.value = capsule

        hooks.onPublish(capsule)
      },
      onDisconnected: args => {
        hooks.onDisconnected?.(args)
      },
      onTerminate: args => {
        hooks.onTerminate?.(args)
      },
    }

    const payload = Subscriber.createPayloadWithValueHash({
      valueHash,
      operationName,
      extensions,
      context,
    })

    subscriber.subscribe({
      payload,
      hooks: sink,
    })
  }

  /**
   * Unsubscribe from the subscription.
   */
  function invokeUnsubscribe () {
    subscriber.unsubscribe()

    // Reset the capsule reference
    capsuleRef.value = Capsule.createAsPending()
  }
}
