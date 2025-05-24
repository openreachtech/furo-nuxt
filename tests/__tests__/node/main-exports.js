import {
  useFormClerk,
  useGraphqlClient,
  useFuroSetup,

  useSubscriptionConnector,

  BaseFuroContext,
  FuroAccessControlLayoutContext,
  FuroButtonDialogContext,
  FuroDialogContext,
  FuroOffCanvasMenuLayoutContext,
  FuroPageItemContext,
  FuroPaginationContext,
  FuroTabItemContext,
  FuroTabLayoutContext,

  FuroShare,
  FuroGraphqlShare,

  BaseFuroContextAccessor,

  NuxtFuroEnvLoader,

  buildDefineComponent,

  AccessTokenClerk,
  FuroMeta,
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

describe('export furo contexts', () => {
  const cases = [
    { ExportClass: BaseFuroContext },
    { ExportClass: FuroAccessControlLayoutContext },
    { ExportClass: FuroButtonDialogContext },
    { ExportClass: FuroDialogContext },
    { ExportClass: FuroOffCanvasMenuLayoutContext },
    { ExportClass: FuroPageItemContext },
    { ExportClass: FuroPaginationContext },
    { ExportClass: FuroTabItemContext },
    { ExportClass: FuroTabLayoutContext },

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
