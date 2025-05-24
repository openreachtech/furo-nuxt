import {
  defineComponent,
} from 'vue'

/**
 * Build the `defineComponent` function.
 *
 * @param {{
 *   options: Array<import('vue').ComponentOptions>
 * }} params - The parameters for the function
 * @returns {typeof defineComponent} The built function
 */
export default function buildDefineComponent ({
  options,
}) {
  return /** @type {*} */ (defineAppComponent)

  /**
   * Define a new component with the given options.
   *
   * @template {import('vue').ComponentPropsOptions} P - The props options for  the component
   * @template {*} D - The data object for the component
   * @template {*} RB - The raw bindings object for the component
   * @template {import('vue').ComputedOptions} C - The computed properties for  the component
   * @template {import('vue').MethodOptions} M - The methods for the component
   * @template {import('vue').EmitsOptions} E - The emits options for the  component
   * @template {import('vue').ComponentOptionsMixin} MX - The mixins for the  component
   * @template {import('vue').SlotsType<Record<string, *>>} S - The exposed  properties for the component
   * @param {import('vue').ComponentOptions<P, D, RB, C, M, E, MX, *, S>} options - The arguments to pass to `defineComponent
   * @returns {import('vue').DefineComponent} A  defined component
   */
  function defineAppComponent ({
    setup,
    ...restOptions
  }) {
    const setupFunctions = [
      ...options
        .map(it => it.setup)
        .filter(it => it),
      setup,
    ]

    /**
     * @param {*} props - The props for the component
     * @param {import('vue').SetupContext} context - The context for the  component. `{ attrs, slots, emit, expose }`
     * @returns {Record<string, *>} The integrated setup function
     */
    const integratedSetup = function (
      props,
      context
    ) {
      return Object.fromEntries(
        setupFunctions
          .map(it =>
            it?.(props, context)
            ?? {}
          )
          .flatMap(it =>
            Object.entries(it)
          )
      )
    }

    return /** @type {*} */ (
      defineComponent({
        ...restOptions,
        setup: integratedSetup,
      })
    )
  }
}
