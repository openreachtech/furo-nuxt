import {
  Ref,
} from 'vue'

import '@openreachtech/furo/types/furo.d.ts'

import FuroShare from '../lib/shares/FuroShare.js'
import FuroGraphqlShare from '~/lib/shares/FuroGraphqlShare.js'

interface GraphqlClient {
  capsuleRef: Ref<furo.Capsule<*>>
  invokeRequestOnEvent: (args?: furo.GraphqlRequestArgs) => Promise<void>
  invokeRequestOnMounted: (args?: furo.GraphqlRequestArgs) => void
  invokeRequestWithFormValueHash?: (args: {
    valueHash: Record<string, any>
    hooks?: furo.GraphqlLauncherHooks
  }) => Promise<void>
}

interface FormClerk {
  validationRef: Ref<furo.FormValidation>
  submitForm: (args?: {
    formElement: HTMLFormElement
    hooks?: furo.GraphqlLauncherHooks
    options?: RequestInit
    extraValueHash?: Record<string, any>
  }) => Promise<boolean>
}

type GraphqlConfig = {
  ENDPOINT_URL: string
  WEBSOCKET_URL: string
}

declare global {
  namespace furo {
    export {
      GraphqlClient,
      FormClerk,

      GraphqlConfig,

      // Shares
      FuroShare as Share,
      FuroGraphqlShare as GraphqlShare,
    }
  }
}
