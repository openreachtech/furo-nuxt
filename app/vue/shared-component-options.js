import {
  useRuntimeConfig,
} from '#app'

import {
  onMounted,
} from 'vue'

import {
  STORAGE_KEY,
} from '~/app/constants.js'

import useFuroSetup from '~/lib/composables/useFuroSetup.js'

const {
  setupFuroEnv,
} = useFuroSetup({
  STORAGE_KEY,
})

/** @type {import('vue').ComponentOptions} */
export default {
  setup (
    props,
    context
  ) {
    onMounted(() => {
      setupFuroEnv({
        runtimeConfig: useRuntimeConfig(),
      })
    })

    return {}
  },
}
