# BaseFormClerk

Form clerk that owns the `<form>` element ref and the validation ref, and orchestrates the `furo` form element inspector and
value hash validator.

See [Form Element Clerk](https://github.com/openreachtech/furo-nuxt/blob/main/docs/en/features/form-clerk.md) for usage.

## Members

| member | description |
| :-- | :-- |
| `.create()` | Factory method. Takes an optional `{ formElementShallowRef, validationRef }`; both default to freshly created refs. |
| `.get:validationRules` | Abstract. The validation rules of this form. Returns `[]` unless overridden. |
| `#validateFormValueHash()` | Runs the rules, writes the result into the validation ref, and returns whether it is valid. Takes an optional `{ valueHash }`, defaulting to the current form values. |
| `#isValid()` | `true` when every field of the validation hash is valid. Takes an optional `{ validationHash }`. |
| `#isInvalid()` | The negation of `#isValid()`. Takes an optional `{ validationHash }`. |
| `#extractValueHash()` | The value hash read out of the `<form>` element. |

`#extractValueHash()` throws `Error: no mounted form element` while the form element ref is still `null`.

Hand the clerk's `formElementShallowRef` to the `<form>` with `:ref`, and read messages from its `validationRef`.
