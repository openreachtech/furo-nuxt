import {
  computed,
} from 'vue'

import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

/**
 * UsingComputedPageContext.
 *
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class UsingComputedPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {UsingComputedPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    messageRef,
    messageLengthComputed,
  }) {
    super({
      props,
      componentContext,
    })

    this.messageRef = messageRef
    this.messageLengthComputed = messageLengthComputed
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof UsingComputedPageContext ? X : never} T, X
   * @override
   * @param {UsingComputedPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    messageRef,
  }) {
    const messageLengthComputed = this.generatedMessageLengthComputed({
      messageRef,
    })

    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        messageRef,
        messageLengthComputed,
      })
    )
  }

  /**
   * Generate messageLengthComputed.
   *
   * @param {{
   *   messageRef: import('vue').Ref<string>
   * }} params - Parameters of this method.
   * @returns {import('vue').ComputedRef<number>} - Computed message length.
   */
  static generatedMessageLengthComputed ({
    messageRef,
  }) {
    return computed(() => messageRef.value.length)
  }

  /**
   * get: messageLength.
   *
   * @returns {import('vue').ComputedRef<number>} - Message length.
   */
  get messageLength () {
    return this.messageLengthComputed
  }

  /**
   * Update message.
   *
   * @param {{
   *   message: string
   * }} params - Parameters of this method.
   */
  updateMessage ({
    message,
  }) {
    this.messageRef.value = message
  }
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   messageRef: import('vue').Ref<string>
 *   messageLengthComputed: import('vue').ComputedRef<number>
 * }} UsingComputedPageContextParams
 */

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   messageRef: import('vue').Ref<string>
 * }} UsingComputedPageContextFactoryParams
 */
