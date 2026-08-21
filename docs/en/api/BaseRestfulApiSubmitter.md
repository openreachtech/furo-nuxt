# BaseRestfulApiSubmitter

Submitter that bundles a [form clerk](./BaseFormClerk.md) with a [RESTful API client](./RestfulApiClient.md), so a form and
the request it drives live in one class.

See [RESTful API Client](https://github.com/openreachtech/furo-nuxt/blob/main/docs/en/features/restful-api-client.md) for usage.

## Members

| member | description |
| :-- | :-- |
| `.create()` | Factory method. Takes an optional `{ formClerk, restfulApiClient }`; both default to instances built from the two getters below. |
| `.get:FormClerkCtor` | Abstract. The form clerk class of this form. Throws `Error: .get:FormClerkCtor must be inherited`. |
| `.get:RestfulApiLauncherCtor` | Abstract. The launcher class of the request. Throws `Error: .get:RestfulApiLauncherCtor must be inherited`. |
| `#formClerk` | The form clerk instance. |
| `#restfulApiClient` | The RESTful API client instance. |
| `#get:formElementShallowRef` | The clerk's `<form>` element ref, to bind with `:ref`. |
| `#get:validationRef` | The clerk's validation ref. |
| `#get:capsuleRef` | The client's capsule ref. |
| `#submitForm()` | Validates the form, then fires the request. Resolves to `false` when validation failed, `true` once sent. Takes `{ extraValueHash, hooks, options, submitEvent }`. |
