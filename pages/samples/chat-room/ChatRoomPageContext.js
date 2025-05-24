import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'
import ChatRoomPageContextAccessor from './ChatRoomPageContextAccessor.js'

/**
 * ChatRoomPageContext.
 *
 * @extends {BaseFuroContext<typeof ChatRoomPageContextAccessor>} - Base class <Accessor, Props, Emit>
 */
export default class ChatRoomPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {ChatRoomPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    graphqlClientHash,
    formClerkHash,

    route,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route

    this.graphqlClientHash = graphqlClientHash
    this.formClerkHash = formClerkHash
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof ChatRoomPageContext ? X : never} T, X
   * @override
   * @param {ChatRoomPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    route,

    graphqlClientHash,
    formClerkHash,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        route,

        graphqlClientHash,
        formClerkHash,
      })
    )
  }

  /**
   * get: ContextAccessor.
   *
   * @override
   * @returns {typeof ChatRoomPageContextAccessor} - Context accessor.
   */
  static get ContextAccessor () {
    return ChatRoomPageContextAccessor
  }

  /**
   * Setup component context.
   *
   * @template {X extends ChatRoomPageContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
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
   * Submit form to send a chat message.
   *
   * @param {{
   *   formElement: HTMLFormElement | null
   * }} args - Arguments.
   * @returns {Promise<void>} - A promise.
   */
  async submitFormToSendChatMessage ({
    formElement,
  }) {
    if (!formElement) {
      return
    }

    const extraValueHash = {
      chatRoomId: this.extractRoomId(),
    }

    await this.formClerkHash.sendChatMessage
      .submitForm({
        formElement,
        extraValueHash,
        hooks: {
          afterRequest: async capsule => {
            if (capsule.hasError()) {
              return
            }

            formElement.reset()
          },
        },
      })
  }
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   route: import('vue-router').RouteLocationNormalizedLoadedGeneric
 *   graphqlClientHash: Record<string, furo.GraphqlClient>
 *   formClerkHash: Record<string, furo.FormClerk>
 * }} ChatRoomPageContextParams
 */

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   route: import('vue-router').RouteLocationNormalizedLoadedGeneric
 *   graphqlClientHash: Record<string, furo.GraphqlClient>
 *   formClerkHash: Record<string, furo.FormClerk>
 * }} ChatRoomPageContextFactoryParams
 */
