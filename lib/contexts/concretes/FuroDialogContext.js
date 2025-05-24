import BaseFuroContext from '../BaseFuroContext.js'

/**
 * Props context class for FuroDialogContext component.
 *
 * @template {typeof import('../BaseFuroContextAccessor.js').default<*> | null} [A = null] - ContextAccessor class.
 * @template {import('vue').ComponentCustomProps} [P = {}] - Props.
 * @template {string | null} [EE = null] - emit() event names.
 * @property {import('vue').Ref<HTMLDialogElement | null>} dialogRef - Dialog element.
 * @extends {BaseFuroContext<A, P, EE>} - Base class <Accessor, Props, Emit>
 */
export default class FuroDialogContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {FuroDialogContextParams<P>} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
    dialogElementRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.dialogElementRef = dialogElementRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof FuroDialogContext ? X : never} T, X
   * @override
   * @param {FuroDialogContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - New instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    dialogElementRef,
  }) {
    return /** @type {*} */ (
      new this({
        props,
        componentContext,
        dialogElementRef,
      })
    )
  }

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      SHOW_DIALOG: 'showDialog',
      DISMISS_DIALOG: 'dismissDialog',
      CLICK_BACKDROP: 'clickBackdrop',
    }
  }

  /**
   * Setup component context.
   *
   * @template {X extends FuroDialogContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.expose(
      this.generateExposeHash()
    )

    this.watch(
      [
        this.dialogElementRef,
      ],
      this.generateWatchCallback()
    )

    return this
  }

  /**
   * get: dialog element.
   *
   * @returns {HTMLDialogElement | null}
   */
  get dialogElement () {
    return this.dialogElementRef.value
  }

  /**
   * generate watch handler.
   *
   * @returns {import('vue').WatchCallback}
   */
  generateWatchCallback () {
    return ([newOne], [oldOne]) => {
      if (oldOne) {
        return
      }

      if (!this.dialogElementRef.value) {
        return
      }

      const handler = this.generateMutationObserverHandler()
      const observer = this.Ctor
        .createMutationObserver({
          handler,
        })

      observer.observe(this.dialogElementRef.value, {
        attributes: true,
        attributeFilter: [
          'open',
        ],
        attributeOldValue: true,
      })
    }
  }

  /**
   * Generate mutation observer handler.
   *
   * @returns {MutationCallback}
   */
  generateMutationObserverHandler () {
    return mutations => {
      const mutation = [...mutations]
        .filter(it => it.type === 'attributes')
        .filter(it => it.attributeName === 'open')
        .find(it => it.target === this.dialogElementRef.value)

      if (!mutation) {
        return
      }

      const hasOpened = this.dialogElementRef.value
        ?.hasAttribute('open')

      const resolvedEmitEvent = hasOpened
        ? this.EMIT_EVENT_NAME.SHOW_DIALOG
        : this.EMIT_EVENT_NAME.DISMISS_DIALOG

      this.emit(resolvedEmitEvent)
    }
  }

  /**
   * Show dialog.
   */
  showDialog () {
    this.dialogElement?.showModal()
  }

  /**
   * Dismiss dialog.
   */
  dismissDialog () {
    this.dialogElement?.close()
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
   * Click in inner <dialog>.
   *
   * @param {{
   *   event: MouseEvent
   * }} params - Parameters of this method.
   * @returns {void}
   */
  clickInInner ({
    event: pointerEvent,
  }) {
    const isClickedOnBackdrop = this.isClickedOnBackdrop({
      event: pointerEvent,
    })

    if (!isClickedOnBackdrop) {
      return
    }

    this.emit(
      this.EMIT_EVENT_NAME
        .CLICK_BACKDROP
    )
  }

  /**
   * Is clicked on backdrop.
   *
   * @param {{
   *   event: MouseEvent
   * }} params - Parameters of this method.
   * @returns {boolean} true: clicked on backdrop.
   */
  isClickedOnBackdrop ({
    event: {
      clientX,
      clientY,
    },
  }) {
    const dialogRect = this.extractDialogRect()

    if (!dialogRect) {
      return false
    }

    if (
      dialogRect.height === 0
      || dialogRect.width === 0
    ) {
      return false
    }

    return clientX < dialogRect.left
      || clientX > dialogRect.right
      || clientY < dialogRect.top
      || clientY > dialogRect.bottom
  }

  /**
   * Extract dialog rect.
   *
   * @returns {DOMRect | null}
   */
  extractDialogRect () {
    return this.dialogElementRef.value
      ?.getBoundingClientRect()
      ?? null
  }
}

/**
 * @typedef {import('../BaseFuroContext').BaseFuroContextParams<P> & {
 *   dialogElementRef: import('vue').Ref<HTMLDialogElement | null>
 * }} FuroDialogContextParams
 * @template {import('vue').ComponentCustomProps | {}} [P = {}] - Props.
 */

/**
 * @typedef {FuroDialogContextParams<P>} FuroDialogContextFactoryParams
 * @template {import('vue').ComponentCustomProps | {}} [P = {}] - Props.
 */

/**
 * @typedef {(
 *   event: 'clickBackdrop',
 *   ...args: Array<any>
 * ) => void} FuroDialogContextEmit
 */

/**
 * @typedef {'showDialog' | 'dismissDialog' | 'clickBackdrop'} FuroDialogContextEmitOptions
 */
