import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

/**
 * ButtonDialogPageContext.
 *
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class ButtonDialogPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {ButtonDialogPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    alertFuroButtonDialogRef,
    confirmFuroButtonDialogRef,
    ternaryConfirmFuroButtonDialogRef,
    feedbackMessageRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.alertFuroButtonDialogRef = alertFuroButtonDialogRef
    this.confirmFuroButtonDialogRef = confirmFuroButtonDialogRef
    this.ternaryConfirmFuroButtonDialogRef = ternaryConfirmFuroButtonDialogRef
    this.feedbackMessageRef = feedbackMessageRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof ButtonDialogPageContext ? X : never} T, X
   * @override
   * @param {ButtonDialogPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    alertFuroButtonDialogRef,
    confirmFuroButtonDialogRef,
    ternaryConfirmFuroButtonDialogRef,
    feedbackMessageRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        alertFuroButtonDialogRef,
        confirmFuroButtonDialogRef,
        ternaryConfirmFuroButtonDialogRef,
        feedbackMessageRef,
      })
    )
  }

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
   * Show Alert dialog.
   */
  showAlertDialog () {
    if (!this.alertFuroButtonDialogRef.value) {
      return
    }

    this.showDialog({
      dialog: this.alertFuroButtonDialogRef.value,
    })
  }

  /**
   * Show Confirm dialog.
   */
  showConfirmDialog () {
    if (!this.confirmFuroButtonDialogRef.value) {
      return
    }

    this.showDialog({
      dialog: this.confirmFuroButtonDialogRef.value,
    })
  }

  /**
   * Show Ternary Confirm dialog.
   */
  showTernaryConfirmDialog () {
    if (!this.ternaryConfirmFuroButtonDialogRef.value) {
      return
    }

    this.showDialog({
      dialog: this.ternaryConfirmFuroButtonDialogRef.value,
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
   * get: feedbackMessage.
   *
   * @type {string | null}
   */
  get feedbackMessage () {
    return this.feedbackMessageRef.value
  }

  /**
   * Click positive button.
   *
   * @param {{
   *   dialogType: string
   * }} params - Parameters.
   */
  clickPositiveButton ({
    dialogType,
  }) {
    this.feedbackMessageRef.value = `Positive @${dialogType}`
  }

  /**
   * Click negative button.
   *
   * @param {{
   *   dialogType: string
   * }} params - Parameters.
   */
  clickNegativeButton ({
    dialogType,
  }) {
    this.feedbackMessageRef.value = `Negative @${dialogType}`
  }

  /**
   * Click neutral button.
   *
   * @param {{
   *   dialogType: string
   * }} params - Parameters.
   */
  clickNeutralButton ({
    dialogType,
  }) {
    this.feedbackMessageRef.value = `Neutral @${dialogType}`
  }
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   alertFuroButtonDialogRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default | null>
 *   confirmFuroButtonDialogRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default | null>
 *   ternaryConfirmFuroButtonDialogRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default | null>
 *   feedbackMessageRef: import('vue').Ref<string | null>
 * }} ButtonDialogPageContextParams
 */

/**
 * @typedef {ButtonDialogPageContextParams} ButtonDialogPageContextFactoryParams
 */
