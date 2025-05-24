<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  useRoute,
} from '#app'

import FuroOffCanvasMenuLayoutContext from '../contexts/concretes/FuroOffCanvasMenuLayoutContext.js'

export default defineComponent({
  name: 'FuroOffCanvasMenuLayout',

  setup (
    props,
    componentContext
  ) {
    const route = useRoute()

    /** @type {import('vue').Ref<HTMLElement | null>} */
    const rootElementRef = ref(null)

    const args = {
      props,
      componentContext,
      route,
      rootElementRef,
    }
    const context = FuroOffCanvasMenuLayoutContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div
    :ref="context.rootElementRef"
    class="furo-layout off-canvas-menu"
  >
    <header class="unit-header">
      <button
        class="button toggle-navigation"
        @click="context.clickToggleNavigation()"
      >
        <slot name="toggle-menu" />
      </button>

      <slot name="header" />
    </header>

    <nav
      class="unit-nav"
      @click="context.clickInNav({
        event: $event,
      })"
    >
      <slot name="navigation" />
    </nav>

    <main
      class="unit-main"
      @click.capture="context.clickInMainBackdrop({
        pointerEvent: $event,
      })"
    >
      <slot name="contents" />
    </main>
  </div>
</template>

<!-- NOTE: Never use <style scoped> here -->
<style>
:root {
  --time-transition-nav-toggle: 0.3s;
}

@layer furo {
  .furo-layout.off-canvas-menu {
    min-height: var(--size-screen-height);

    display: grid;
    grid-template-columns: 0 1fr;
  }

  .furo-layout.off-canvas-menu > .unit-header {
    grid-column: 1 / -1;

    height: var(--size-header-height);

    position: sticky;
    top: 0;

    display: flex;
    align-items: center;

    background-color: var(--color-background-header);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .furo-layout.off-canvas-menu > .unit-header > .button.toggle-navigation {
    margin-inline-start: 0.75rem;

    max-height: 100%;
    width: 2rem;
    aspect-ratio: 1 / 1;

    display: grid;
    place-items: center;

    background-color: transparent;

    @media (48rem <= width) {
      display: none;
    }
  }

  .furo-layout.off-canvas-menu > .unit-header > .button.toggle-navigation > * {
    max-width: 100%;
  }

  .furo-layout.off-canvas-menu > .unit-header > .button.toggle-navigation + * {
    margin-inline-start: 1rem;
  }

  /****************************************************************************/

  .furo-layout.off-canvas-menu > .unit-nav {
    transform: translateX(-100%);

    max-height: calc(
      var(--size-screen-height)
      - var(--size-header-height)
    );
    width: var(--size-nav-width);

    position: sticky;
    top: var(--size-header-height);

    background-color: var(--color-background-nav);

    overflow: auto;

    transition:
      transform var(--time-transition-nav-toggle) ease-out
    ;

    @media (48rem <= width) {
      transform: translateX(0);
    }
  }

  .furo-layout.off-canvas-menu.open-nav > .unit-nav {
    transform: translateX(0);
  }

  /****************************************************************************/

  .furo-layout.off-canvas-menu > .unit-main {
    position: relative;

    justify-self: end;

    min-height: calc(
      var(--size-screen-height)
      - var(--size-header-height)
    );
    width: 100%;

    overflow: auto;

    transition:
      width var(--time-transition-nav-toggle) ease-out
    ;

    @media (48rem <= width) {
      width: calc(100% - var(--size-nav-width));
    }
  }

  /****************************************************************************/

  .furo-layout.off-canvas-menu > .unit-main::after {
    content: '';

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgba(0, 0, 0, 0.5);

    display: none;

    transition:
      background-color var(--time-transition-nav-toggle) ease-out
    ;

    @starting-style {
      display: none;
      background-color: rgba(0, 0, 0, 0);
    }
  }

  .furo-layout.off-canvas-menu.open-nav > .unit-main::after {
    display: inherit;
  }

  /****************************************************************************/

  /* freeze the scroll in the body */
  html:has(.furo-layout.off-canvas-menu.open-nav) {
    overflow: hidden;
  }
}
</style>
