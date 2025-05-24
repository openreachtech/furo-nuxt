import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

/**
 * DesignDialogPageContext.
 *
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class DesignDialogPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {DesignDialogPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    customDesignedFuroDialogRef,
    defaultAppDialogRef,
    customAppDialogRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.customDesignedFuroDialogRef = customDesignedFuroDialogRef
    this.defaultAppDialogRef = defaultAppDialogRef
    this.customAppDialogRef = customAppDialogRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof DesignDialogPageContext ? X : never} T, X
   * @override
   * @param {DesignDialogPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    customDesignedFuroDialogRef,
    defaultAppDialogRef,
    customAppDialogRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        customDesignedFuroDialogRef,
        defaultAppDialogRef,
        customAppDialogRef,
      })
    )
  }

  /**
   * Show custom designed dialog.
   *
   * @param {{
   *   dialog: import('~/lib/components/FuroDialog.vue').default
   * }} params - Parameters.
   */

  /**
   * Show dialog.
   *
   * @param {{
   *   dialog: import('~/lib/components/FuroDialog.vue').default
   * }} params - Parameters.
   */
  showDialog ({
    dialog,
  }) {
    dialog.showDialog()
  }

  /**
   * Show default app dialog.
   */
  showCustomDesignedDialog () {
    if (!this.customDesignedFuroDialogRef.value) {
      return
    }

    this.showDialog({
      dialog: this.customDesignedFuroDialogRef.value,
    })
  }

  /**
   * Show default app dialog.
   */
  showDefaultAppDialog () {
    if (!this.defaultAppDialogRef.value) {
      return
    }

    this.showDialog({
      dialog: this.defaultAppDialogRef.value,
    })
  }

  /**
   * Show custom app dialog.
   */
  showCustomAppDialog () {
    if (!this.customAppDialogRef.value) {
      return
    }

    this.showDialog({
      dialog: this.customAppDialogRef.value,
    })
  }

  /**
   * Dismiss dialog.
   *
   * @param {{
   *   dialog: import('~/lib/components/FuroDialog.vue').default
   * }} params - Parameters.
   */
  dismissDialog ({
    dialog,
  }) {
    dialog.dismissDialog()
  }

  /**
   * Dismiss custom designed dialog.
   */
  dismissCustomDesignedDialog () {
    if (!this.customDesignedFuroDialogRef.value) {
      return
    }

    this.dismissDialog({
      dialog: this.customDesignedFuroDialogRef.value,
    })
  }

  /**
   * Dismiss default app dialog.
   */
  dismissDefaultAppDialog () {
    if (!this.defaultAppDialogRef.value) {
      return
    }

    this.dismissDialog({
      dialog: this.defaultAppDialogRef.value,
    })
  }

  /**
   * Dismiss custom app dialog.
   */
  dismissCustomAppDialog () {
    if (!this.customAppDialogRef.value) {
      return
    }

    this.dismissDialog({
      dialog: this.customAppDialogRef.value,
    })
  }
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams & {
 *   customDesignedFuroDialogRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default | null>
 *   defaultAppDialogRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default | null>
 *   customAppDialogRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default | null>
 * }} DesignDialogPageContextParams
 */

/**
 * @typedef {DesignDialogPageContextParams} DesignDialogPageContextFactoryParams
 */
