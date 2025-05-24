import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

import SampleFormElementClerk from './SampleFormElementClerk.js'

const Timber = console

/**
 * FormControlsInspectorPageContext.
 *
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class FormControlsInspectorPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {FormControlsInspectorPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    formElementRef,
    valueHashRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.formElementRef = formElementRef
    this.valueHashRef = valueHashRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof FormControlsInspectorPageContext ? X : never} T, X
   * @override
   * @param {FormControlsInspectorPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    formElementRef,
    valueHashRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        formElementRef,
        valueHashRef,
      })
    )
  }

  /**
   * Submit the form.
   */
  async submitForm () {
    /** @type {HTMLFormElement} */
    const formElement = /** @type {*} */ (
      this.formElementRef.value
    )

    const formElementClerk = SampleFormElementClerk.create({
      formElement,
    })

    const valueHash = formElementClerk.extractValueHash()

    await Timber.log(
      '🔥 formElementClerk.extractValueHash()',
      valueHash
    )

    this.valueHashRef.value = valueHash
  }
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   formElementRef: import('vue').Ref<HTMLFormElement | null>
 *   valueHashRef: import('vue').Ref<Record<string, unknown>>
 * }} FormControlsInspectorPageContextParams
 */

/**
 * @typedef {FormControlsInspectorPageContextParams} FormControlsInspectorPageContextFactoryParams
 */
