import {
  onMounted,
  onUnmounted,
} from 'vue'

import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

/**
 * ChatRoomSubscriptionContext.
 *
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class ChatRoomSubscriptionContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {ChatRoomSubscriptionContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,

    subscriptionGraphqlClient,
    queryGraphqlClientHash,

    chatDatabase,
    displayMessagesRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route

    this.subscriptionGraphqlClient = subscriptionGraphqlClient
    this.queryGraphqlClientHash = queryGraphqlClientHash

    this.chatDatabase = chatDatabase
    this.displayMessagesRef = displayMessagesRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof ChatRoomSubscriptionContext ? X : never} T, X
   * @override
   * @param {ChatRoomSubscriptionContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    route,

    subscriptionGraphqlClient,
    queryGraphqlClientHash,

    chatDatabase,
    displayMessagesRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        route,

        subscriptionGraphqlClient,
        queryGraphqlClientHash,

        chatDatabase,
        displayMessagesRef,
      })
    )
  }

  /**
   * Setup component context.
   *
   * @template {X extends ChatRoomSubscriptionContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    const chatRoomId = this.extractRoomId()

    if (!chatRoomId) {
      return this
    }

    onMounted(() => {
      this.subscribeChatStates({
        valueHash: {
          chatRoomId,
        },
      })
    })

    this.queryGraphqlClientHash
      .chatMessages
      .invokeRequestOnMounted({
        variables: {
          input: {
            chatRoomId,
            fetchDirection: 'before',
            limit: 30,
          },
        },
        // @ts-expect-error
        hooks: this.generateQueryGraphqlRequestHooks(),
      })

    onUnmounted(() => {
      this.subscriptionGraphqlClient.invokeUnsubscribe()
    })

    return this
  }

  /**
   * Extract room id from route.
   *
   * @returns {number} - Room id.
   */
  extractRoomId () {
    const chatRoomId = this.route.query?.room
    if (!chatRoomId) {
      return 1
    }

    return Number(chatRoomId)
  }

  /**
   * Generate GraphQL request hooks.
   *
   * @returns {{
   *   beforeRequest?: (payload: import('~/app/graphql/client/queries/chatMessages/ChatMessagesQueryGraphqlPayload.js').default) => Promise<void>
   *   afterRequest?: (capsule: import('~/app/graphql/client/queries/chatMessages/ChatMessagesQueryGraphqlCapsule.js').default) => Promise<void>
   * }} - GraphQL request hooks.
   */
  generateQueryGraphqlRequestHooks () {
    return {
      afterRequest: async capsule => {
        if (capsule.hasError()) {
          return
        }

        const entities = capsule.generateChatMessageEntities({
          roomId: this.extractRoomId(),
        })

        await this.chatDatabase.messagesStore.bulkSave({
          // @ts-expect-error
          values: entities,
        })

        const messages = await this.chatDatabase.messagesStore
          .findByIndex({
            indexName: 'roomId',
            value: this.extractRoomId(),
          })

        const messageElements = messages
          .toSorted((alpha, beta) =>
            alpha.postedAt.localeCompare(beta.postedAt)
          )

        this.displayMessagesRef.value = messageElements

        window.setTimeout(() => {
          const target = document.getElementById('messages')

          if (!target) {
            return
          }

          target.scrollTop = target.scrollHeight
        }, 0)
      },
    }
  }

  /**
   * Get subscription capsule.
   *
   * @returns {*} - Subscription capsule.
   */
  get queryChatMessagesCapsule () {
    return this.queryGraphqlClientHash
      .chatMessages
      .capsuleRef
      .value
  }

  /**
   * Subscribe to chat states.
   *
   * @param {{
   *   valueHash: {
   *     chatRoomId: number
   *   }
   * }} args - Arguments.
   * @returns {void} - A promise.
   */
  subscribeChatStates ({
    valueHash: {
      chatRoomId,
    },
  }) {
    this.subscriptionGraphqlClient.invokeSubscribe({
      valueHash: {
        chatRoomId: this.extractRoomId(),
      },
      hooks: {
        /**
         * @param {*} capsule
         */
        onPublish: capsule => {
          if (capsule.hasError()) {
            return
          }

          this.onPublishChatStates({
            capsule,
          })
        },
      },
    })
  }

  /**
   * On publish chat states.
   *
   * @param {{
   *   capsule: import('../../../app/graphql/client/subscriptions/onObserveChatStates/OnObserveChatStatesSubscriptionGraphqlCapsule.js').default
   * }} args - Arguments.
   * @returns {void}
   */
  onPublishChatStates ({
    capsule,
  }) {
    if (capsule.hasError()) {
      return
    }

    const chatRoomId = this.extractRoomId()

    if (!chatRoomId) {
      return
    }

    if (capsule.hasUnreadMessages()) {
      this.fetchChatMessages({
        valueHash: {
          chatRoomId,
        },
      })
    }
  }

  /**
   * Fetch chat messages.
   *
   * @param {{
   *   valueHash: {
   *     chatRoomId: number
   *   }
   * }} args - Arguments.
   * @returns {Promise<void>} - A promise.
   */
  async fetchChatMessages ({
    valueHash: {
      chatRoomId,
    },
  }) {
    const messages = await this.chatDatabase.messagesStore.findByIndex({
      indexName: 'roomId',
      value: this.extractRoomId(),
      limit: 1,
    })
    const lastKnownDateTime = messages.at(0)
      ?.postedAt
      ?? null
    const fetchDirection = lastKnownDateTime
      ? 'after'
      : 'before'

    const queryGraphqlClient = this.queryGraphqlClientHash.chatMessages

    queryGraphqlClient.invokeRequestOnEvent({
      variables: {
        input: {
          chatRoomId,
          offsetDateTime: lastKnownDateTime,
          fetchDirection,
          limit: 30,
        },
      },
      // @ts-expect-error
      hooks: this.generateQueryGraphqlRequestHooks(),
    })
  }

  /**
   * Generate display message entities.
   *
   * @returns {Array<ChatMessageEntity>} - Display message entities.
   */
  generateDisplayMessageEntities () {
    return this.displayMessagesRef.value
  }
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   route: import('vue-router').RouteLocationNormalizedLoadedGeneric
 *   subscriptionGraphqlClient: {
 *     capsuleRef: import('vue').Ref<*>
 *     invokeSubscribe: (args: {
 *       hooks: furo.GraphqlSubscriberHooks
 *       valueHash?: Record<string, *>
 *       operationName?: string | null
 *       extensions?: Record<string, unknown>
 *       context?: {
 *         headers?: HeadersInit
 *         [key: string]: unknown
 *       }
 *     }) => Promise<void>
 *     invokeUnsubscribe: () => void
 *   }
 *   queryGraphqlClientHash: Record<string, furo.GraphqlClient>
 *   chatDatabase: import('~/app/db/chat/ChatDatabase.js').default
 *   displayMessagesRef: import('vue').Ref<Array<ChatMessageEntity>>
 * }} ChatRoomSubscriptionContextParams
 */

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   route: import('vue-router').RouteLocationNormalizedLoadedGeneric
 *   subscriptionGraphqlClient: {
 *     capsuleRef: import('vue').Ref<*>
 *     invokeSubscribe: (args: {
 *       hooks: furo.GraphqlSubscriberHooks
 *       valueHash?: Record<string, *>
 *       operationName?: string | null
 *       extensions?: Record<string, unknown>
 *       context?: {
 *         headers?: HeadersInit
 *         [key: string]: unknown
 *       }
 *     }) => Promise<void>
 *     invokeUnsubscribe: () => void
 *   }
 *   queryGraphqlClientHash: Record<string, furo.GraphqlClient>
 *   chatDatabase: import('~/app/db/chat/ChatDatabase.js').default
 *   displayMessagesRef: import('vue').Ref<Array<ChatMessageEntity>>
 * }} ChatRoomSubscriptionContextFactoryParams
 */

/**
 * @typedef {{
 *   id: number
 *   postedAt: string
 *   content: string
 *   sender: string
 * }} ChatMessageEntity
 */
