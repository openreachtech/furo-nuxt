<script>
import {
  NuxtPage,
} from '#components'

export default {
  name: 'GatewayLayout',

  components: {
    NuxtPage,
  },
}
</script>

<template>
  <div class="unit-layout gateway">
    <header class="unit-header">
      I am Header
    </header>

    <main class="unit-main">
      <NuxtPage />
    </main>

    <footer class="unit-footer">
      I am Footer
    </footer>
  </div>
</template>

<!-- NOTE: Never use <style scoped> here -->
<style>
.unit-layout.gateway {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
}

.unit-layout.gateway > .unit-header {
  position: sticky;
  top: 0;

  height: var(--size-header-height);

  display: grid;
  place-items: center;

  background-color: rgba(0, 255, 0, .5);
  color: #fff;
}

.unit-layout.gateway > .unit-main {
  flex: 1;

  padding-block: .5rem;
  padding-inline: 1rem;
  background: #eee;
}

.unit-layout.gateway > .unit-footer {
  height: var(--size-footer-height);

  display: grid;
  place-items: center;

  background-color: rgba(0, 0, 255, .5);
  color: #fff;
}
</style>
