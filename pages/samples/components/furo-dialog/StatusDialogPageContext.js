import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

/**
 * StatusDialogPageContext.
 *
 * @extends {BaseFuroContext<>} - Base class <Accessor, Props, Emit>
 */
export default class StatusDialogPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {StatusDialogPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    messageAndXCloseButtonFuroDialogRef,
    dialogStatusCallbackFuroDialogRef,
    closeByClickedOnBackdropFuroDialogRef,
    statusMessageRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.messageAndXCloseButtonFuroDialogRef = messageAndXCloseButtonFuroDialogRef
    this.dialogStatusCallbackFuroDialogRef = dialogStatusCallbackFuroDialogRef
    this.closeByClickedOnBackdropFuroDialogRef = closeByClickedOnBackdropFuroDialogRef
    this.statusMessageRef = statusMessageRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof StatusDialogPageContext ? X : never} T, X
   * @override
   * @param {StatusDialogPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,

    messageAndXCloseButtonFuroDialogRef,
    dialogStatusCallbackFuroDialogRef,
    closeByClickedOnBackdropFuroDialogRef,
    statusMessageRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,

        messageAndXCloseButtonFuroDialogRef,
        dialogStatusCallbackFuroDialogRef,
        closeByClickedOnBackdropFuroDialogRef,
        statusMessageRef,
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
   * Show message and X-close button dialog.
   */
  showMessageAndXCloseButtonDialog () {
    if (!this.messageAndXCloseButtonFuroDialogRef.value) {
      return
    }

    this.showDialog({
      dialog: this.messageAndXCloseButtonFuroDialogRef.value,
    })
  }

  /**
   * Show dialog with status callback dialog.
   */
  showDialogStatusCallbackDialog () {
    if (!this.dialogStatusCallbackFuroDialogRef.value) {
      return
    }

    this.showDialog({
      dialog: this.dialogStatusCallbackFuroDialogRef.value,
    })
  }

  /**
   * Show dialog with close by clicked on backdrop dialog.
   */
  showCloseByClickedOnBackdropDialog () {
    if (!this.closeByClickedOnBackdropFuroDialogRef.value) {
      return
    }

    this.showDialog({
      dialog: this.closeByClickedOnBackdropFuroDialogRef.value,
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
   * Dismiss dialog with status callback dialog.
   */
  dismissDialogStatusCallbackDialog () {
    if (!this.dialogStatusCallbackFuroDialogRef.value) {
      return
    }

    this.dismissDialog({
      dialog: this.dialogStatusCallbackFuroDialogRef.value,
    })
  }

  /**
   * Dismiss dialog with close by clicked on backdrop dialog.
   */
  dismissCloseByClickedOnBackdropDialog () {
    if (!this.closeByClickedOnBackdropFuroDialogRef.value) {
      return
    }

    this.dismissDialog({
      dialog: this.closeByClickedOnBackdropFuroDialogRef.value,
    })
  }

  /**
   * get: statusMessage.
   *
   * @type {string | null}
   */
  get statusMessage () {
    return this.statusMessageRef.value
  }

  /**
   * Click on backdrop.
   */
  clickOnBackdrop () {
    this.statusMessageRef.value = 'Clicked on backdrop'

    if (!this.closeByClickedOnBackdropFuroDialogRef.value) {
      return
    }

    this.dismissDialog({
      dialog: this.closeByClickedOnBackdropFuroDialogRef.value,
    })
  }

  /**
   * On show dialog.
   */
  onShowDialog () {
    this.statusMessageRef.value = 'Show dialog'
  }

  /**
   * On dismiss dialog.
   */
  onDismissDialog () {
    this.statusMessageRef.value = 'Dismiss dialog'
  }
}

/**
 * @typedef {import('~/lib/contexts/BaseFuroContext.js').BaseFuroContextParams<> & {
 *   statusMessageRef: import('vue').Ref<string | null>
 *   messageAndXCloseButtonFuroDialogRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default | null>
 *   dialogStatusCallbackFuroDialogRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default | null>
 *   closeByClickedOnBackdropFuroDialogRef: import('vue').Ref<import('~/lib/components/FuroDialog.vue').default | null>
 * }} StatusDialogPageContextParams
 */

/**
 * @typedef {StatusDialogPageContextParams} StatusDialogPageContextFactoryParams
 */
