<!-- pages/index.vue -->
<script>
import {
  defineComponent,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    definePageMeta({
      $furo: {
        pageTitle: 'Samples Home',
      },
    })

    return {}
  },
})
</script>

<template>
  <h1>Hello I&#39;m samples/index.vue!</h1>
</template>

<style scoped>
/* CSS styles here */
</style>
