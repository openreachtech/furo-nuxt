import {
  useFormClerk,
  useGraphqlClient,
  useFuroSetup,

  useSubscriptionConnector,

  BaseFormClerk,

  BaseFuroContext,
  BaseFuroContextAccessor,

  FuroShare,
  FuroGraphqlShare,

  NuxtFuroEnvLoader,

  buildDefineComponent,

  AccessTokenClerk,
  FuroMeta,

  RestfulApiClient,
  BaseRestfulApiSubmitter,
} from '~/index.js'

describe('export composables', () => {
  const cases = [
    { composable: useFormClerk },
    { composable: useGraphqlClient },
    { composable: useFuroSetup },

    { composable: useSubscriptionConnector },
  ]

  test.each(cases)('composable: $composable.name', ({ composable }) => {
    expect(composable)
      .toBeDefined()
  })
})

describe('export DOM clerks', () => {
  const cases = [
    { ExportClass: BaseFormClerk },
  ]

  test.each(cases)('class: $ExportClass.name', ({ ExportClass }) => {
    expect(ExportClass)
      .toBeDefined()
  })
})

describe('export furo contexts', () => {
  const cases = [
    { ExportClass: BaseFuroContext },
    { ExportClass: BaseFuroContextAccessor },
  ]

  test.each(cases)('class: $ExportClass.name', ({ ExportClass }) => {
    expect(ExportClass)
      .toBeDefined()
  })
})

describe('export furo shares', () => {
  const cases = [
    { ExportClass: FuroShare },
    { ExportClass: FuroGraphqlShare },
  ]

  test.each(cases)('class: $ExportClass.name', ({ ExportClass }) => {
    expect(ExportClass)
      .toBeDefined()
  })
})

describe('export modules', () => {
  const cases = [
    { ExportClass: NuxtFuroEnvLoader },

    { ExportClass: AccessTokenClerk },
    { ExportClass: FuroMeta },
  ]

  test.each(cases)('class: $ExportClass.name', ({ ExportClass }) => {
    expect(ExportClass)
      .toBeDefined()
  })
})

describe('export vue/function', () => {
  const cases = [
    { func: buildDefineComponent },
  ]

  test.each(cases)('function: $func.name', ({ func }) => {
    expect(func)
      .toBeDefined()
  })
})

describe('export RESTful API modules', () => {
  const cases = [
    { ExportClass: RestfulApiClient },
    { ExportClass: BaseRestfulApiSubmitter },
  ]

  test.each(cases)('class: $ExportClass.name', ({ ExportClass }) => {
    expect(ExportClass)
      .toBeDefined()
  })
})
