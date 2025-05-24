import {
  BaseFormElementClerk,
} from '@openreachtech/furo'

/**
 * Clerk class of upload image form element.
 *
 * @extends {BaseFormElementClerk<typeof UploadImageFormElementClerk, UploadImageFormValueHash, SchemaVariableHash>}
 */
export default class UploadImageFormElementClerk extends BaseFormElementClerk {
  /** @override */
  static get rules () {
    /**
     * @type {Array<furo.FieldValidatorFactoryParams>}
     */
    return [
      // image
      {
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        field: 'image',
        message: 'require image file',
      },
    ]
  }
}

/**
 * @typedef {{
 *   image: File
 * }} UploadImageFormValueHash
 */

/**
 * @typedef {{
 *   image: File
 * }} SchemaVariableHash
 */
