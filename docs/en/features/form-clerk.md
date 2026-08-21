# Form Element Clerk

A form clerk reads the values out of a `<form>`, validates them, and exposes the validation result as a Vue ref.

There are two entry points, and which one to use depends on where the request lives.

| entry point | pairs with | validation rules live in |
| :-- | :-- | :-- |
| `useFormClerk()` | a `furo` `BaseFormElementClerk` subclass | the form element clerk (`.get:rules`) |
| `BaseFormClerk` | a submitter class, e.g. `BaseRestfulApiSubmitter` | the clerk subclass (`.get:validationRules`) |

## (1) `useFormClerk()`

`useFormClerk()` glues a `furo` form element clerk to a request function. `submitForm()` validates first, and only fires the
request when every rule passes.

```js
import {
  BaseFormElementClerk,
} from '@openreachtech/furo'

/**
 * @extends {BaseFormElementClerk<AlphaFormValueHash>}
 */
export default class AlphaFormElementClerk extends BaseFormElementClerk {
  /** @override */
  static get rules () {
    return [
      {
        ok: (it, valueHash) => it,
        field: 'email',
        message: 'email must be set',
      },
      {
        ok: (it, valueHash) => /^[^@]+@[^@]+\.[^@]+$/u.test(it),
        field: 'email',
        message: 'email must be valid',
      },
    ]
  }
}
```

```js
import {
  defineComponent,
  shallowRef,
} from 'vue'

import {
  useFormClerk,
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import AlphaMutationGraphqlLauncher from '~/app/graphql/client/mutations/alpha/AlphaMutationGraphqlLauncher.js'
import AlphaFormElementClerk from './AlphaFormElementClerk.js'

export default defineComponent({
  setup () {
    const {
      capsuleRef,
      invokeRequestWithFormValueHash,
    } = useGraphqlClient({
      Launcher: AlphaMutationGraphqlLauncher,
    })

    const {
      validationRef,
      submitForm,
    } = useFormClerk({
      FormElementClerk: AlphaFormElementClerk,
      invokeRequestWithFormValueHash,
    })

    /** @type {import('vue').ShallowRef<HTMLFormElement | null>} */
    const formElementRef = shallowRef(null)

    return {
      capsuleRef,
      validationRef,
      formElementRef,
      submitForm,
    }
  },
})
```

```vue
<template>
  <form
    :ref="formElementRef"
    @submit.prevent="submitForm({
      formElement: formElementRef,
    })"
  >
    <label>
      <input
        name="email"
        type="text"
      >
      <span>{{ validationRef.message.email }}</span>
    </label>

    <button type="submit">
      Send
    </button>
  </form>
</template>
```

`submitForm()` resolves to `false` when validation failed and the request was skipped, and `true` when the request was
invoked. `validationRef` holds the `furo` validation hash — `valid`, `invalid`, `messages` and `message` — keyed by field
name.

The optional `extraValueHash` merges values that are not form controls into the payload, and `hooks` / `options` are passed
straight through to the launcher.

## (2) `BaseFormClerk`

`BaseFormClerk` is the class form. Unlike `useFormClerk()`, it owns the form element ref itself, so a submitter class can hold
the whole form state.

Declare the rules by overriding `.get:validationRules`.

```js
import {
  BaseFormClerk,
} from '@openreachtech/furo-nuxt'

/**
 * @extends {BaseFormClerk<AlphaFormValueHash>}
 */
export default class AlphaFormClerk extends BaseFormClerk {
  /** @override */
  static get validationRules () {
    return [
      {
        ok: (it, valueHash) => it,
        field: 'first',
        message: 'first must be set',
      },
      {
        ok: (it, valueHash) => it,
        field: 'second',
        message: 'second must be set',
      },
    ]
  }
}
```

```js
const alphaFormClerk = AlphaFormClerk.create()

// Bind this to the <form> element with :ref.
const {
  formElementShallowRef,
  validationRef,
} = alphaFormClerk

// Reads the <form>, runs the rules, and updates validationRef.
const isValid = alphaFormClerk.validateFormValueHash()

if (isValid) {
  const valueHash = alphaFormClerk.extractValueHash()
}
```

`extractValueHash()` throws `Error: no mounted form element` when the ref is still `null`, so call it after the `<form>` has
mounted.

Usually you do not drive the clerk by hand — hand it to a submitter instead. See
[RESTful API Client](./restful-api-client.md).
