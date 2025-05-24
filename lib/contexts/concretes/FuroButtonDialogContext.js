import BaseFuroContext from '../BaseFuroContext.js'

/**
 * Props context class for FuroButtonDialogContext component.
 *
 * @template {typeof import('../BaseFuroContextAccessor.js').default<*> | null} [A = null] - ContextAccessor class.
 * @template {import('vue').ComponentCustomProps} [P = {}] - Props.
 * @template {string | null} [EE = null] - emit() event names.
 * @property {import('vue').Ref<HTMLDialogElement | null>} dialogRef - Dialog element.
 * @extends {BaseFuroContext<A, P, EE>} - Base class <Accessor, Props, Emit>
 */
export default class FuroButtonDialogContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {FuroButtonDialogContextParams<P>} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
    dialogComponentRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.dialogComponentRef = dialogComponentRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof FuroButtonDialogContext ? X : never} T, X
   * @override
   * @param {FuroButtonDialogContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    dialogComponentRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        dialogComponentRef,
      })
    )
  }

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      CLICK_POSITIVE_BUTTON: 'clickPositiveButton',
      CLICK_NEGATIVE_BUTTON: 'clickNegativeButton',
      CLICK_NEUTRAL_BUTTON: 'clickNeutralButton',
    }
  }

  /**
   * Setup component context.
   *
   * @template {X extends FuroButtonDialogContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.expose(
      this.generateExposeHash()
    )

    return this
  }

  /**
   * get: dialog component.
   *
   * @returns {import('../../components/FuroDialog.vue').default | null}
   */
  get dialogComponent () {
    return this.dialogComponentRef.value
  }

  /**
   * Show dialog.
   */
  showDialog () {
    this.dialogComponent?.showDialog()
  }

  /**
   * Dismiss dialog.
   */
  dismissDialog () {
    this.dialogComponent?.dismissDialog()
  }

  /**
   * Click in backdrop.
   *
   * @override
   * @returns {{
   *   showDialog: () => void,
   *   dismissDialog: () => void,
   * }}
   */
  generateExposeHash () {
    return {
      showDialog: () => this.showDialog(),
      dismissDialog: () => this.dismissDialog(),
    }
  }

  /**
   * Click in positive button.
   */
  clickPositiveButton () {
    this.emit(
      this.EMIT_EVENT_NAME
        .CLICK_POSITIVE_BUTTON
    )

    this.dismissDialog()
  }

  /**
   * Click in negative button.
   */
  clickNegativeButton () {
    this.emit(
      this.EMIT_EVENT_NAME
        .CLICK_NEGATIVE_BUTTON
    )

    this.dismissDialog()
  }

  /**
   * Click in neutral button.
   */
  clickNeutralButton () {
    this.emit(
      this.EMIT_EVENT_NAME
        .CLICK_NEUTRAL_BUTTON
    )

    this.dismissDialog()
  }
}

/**
 * @typedef {import('../BaseFuroContext').BaseFuroContextParams<P> & {
 *   dialogComponentRef: import('vue').Ref<import('../../components/FuroDialog.vue').default | null>
 * }} FuroButtonDialogContextParams
 * @template {import('vue').ComponentCustomProps | {}} [P = {}] - Props.
 */

/**
 * @typedef {FuroButtonDialogContextParams<P>} FuroButtonDialogContextFactoryParams
 * @template {import('vue').ComponentCustomProps | {}} [P = {}] - Props.
 */

/**
 * @typedef {'clickBackdrop' | 'clickPositiveButton' | 'clickNegativeButton' | 'clickNeutralButton'} FuroButtonDialogContextEmitOptions
 */

/**
 * @typedef {(
 *   event: 'clickBackdrop' | 'clickPositiveButton' | 'clickNegativeButton' | 'clickNeutralButton',
 *   ...args: Array<any>
 * ) => void} FuroButtonDialogContextEmit
 */
