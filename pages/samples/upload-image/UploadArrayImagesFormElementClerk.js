import {
  BaseFormElementClerk,
} from '@openreachtech/furo'

/**
 * Clerk class of upload image form element.
 *
 * @extends {BaseFormElementClerk<typeof UploadArrayImagesFormElementClerk, UploadArrayImagesFormValueHash, SchemaVariableHash>}
 */
export default class UploadArrayImagesFormElementClerk extends BaseFormElementClerk {
  /** @override */
  static get rules () {
    /**
     * @type {Array<furo.FieldValidatorFactoryParams>}
     */
    return [
      // images
      {
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it.length > 0,
        field: 'images',
        message: 'require image file at least one',
      },
      {
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it.length <= 3,
        field: 'images',
        message: 'up to 3 files',
      },
    ]
  }
}

/**
 * @typedef {{
 *   images: Array<File>
 * }} UploadArrayImagesFormValueHash
 */

/**
 * @typedef {{
 *   images: Array<File>
 * }} SchemaVariableHash
 */
