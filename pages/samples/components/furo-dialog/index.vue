<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import FuroDialog from '~/lib/components/FuroDialog.vue'
import FuroButtonDialog from '~/lib/components/FuroButtonDialog.vue'
import AppDialog from '~/components/AppDialog.vue'

import ButtonDialogPageContext from './ButtonDialogPageContext.js'
import StatusDialogPageContext from './StatusDialogPageContext.js'
import DesignDialogPageContext from './DesignDialogPageContext.js'
import FormDialogPageContext from './FormDialogPageContext.js'

export default defineComponent({
  name: 'Furo Dialog Samples',

  components: {
    FuroDialog,
    FuroButtonDialog,
    AppDialog,
  },

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: 'Furo Dialog Samples',
        skipFilter: true,
      },
    })

    const defaultMessage = '???'

    ////////////////////////////////////////////////////////////////////////////

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const alertFuroButtonDialogRef = ref(null)

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const confirmFuroButtonDialogRef = ref(null)

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const ternaryConfirmFuroButtonDialogRef = ref(null)

    const feedbackMessageRef = ref(defaultMessage)

    const buttonDialogArgs = {
      props,
      componentContext,

      alertFuroButtonDialogRef,
      confirmFuroButtonDialogRef,
      ternaryConfirmFuroButtonDialogRef,
      feedbackMessageRef,
    }
    const buttonDialogContext = ButtonDialogPageContext.create(buttonDialogArgs)
      .setupComponent()

    ////////////////////////////////////////////////////////////////////////////

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const messageAndXCloseButtonFuroDialogRef = ref(null)

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const dialogStatusCallbackFuroDialogRef = ref(null)

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const closeByClickedOnBackdropFuroDialogRef = ref(null)

    const statusMessageRef = ref(defaultMessage)

    const args = {
      props,
      componentContext,

      messageAndXCloseButtonFuroDialogRef,
      dialogStatusCallbackFuroDialogRef,
      closeByClickedOnBackdropFuroDialogRef,
      statusMessageRef,
    }
    const statusDialogContext = StatusDialogPageContext.create(args)
      .setupComponent()

    ////////////////////////////////////////////////////////////////////////////

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const customDesignedFuroDialogRef = ref(null)

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const defaultAppDialogRef = ref(null)

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const customAppDialogRef = ref(null)

    const designedDialogArgs = {
      props,
      componentContext,

      customDesignedFuroDialogRef,
      defaultAppDialogRef,
      customAppDialogRef,
    }
    const designedDialogContext = DesignDialogPageContext.create(designedDialogArgs)
      .setupComponent()

    ////////////////////////////////////////////////////////////////////////////

    /** @type {import('vue').Ref<FuroDialog | null>} */
    const formDialogRef = ref(null)

    /** @type {import('vue').Ref<HTMLFormElement | null>} */
    const formElementRef = ref(null)

    const formValuesRef = ref('{}')

    const formDialogArgs = {
      props,
      componentContext,

      formDialogRef,
      formElementRef,
      formValuesRef,
    }
    const formDialogContext = FormDialogPageContext.create(formDialogArgs)
      .setupComponent()

    ////////////////////////////////////////////////////////////////////////////

    return {
      buttonDialogContext,
      statusDialogContext,
      designedDialogContext,
      formDialogContext,
    }
  },
})
</script>

<template>
  <div>
    <h1>Furo Dialog Samples</h1>

    <h2>&lt;FuroButtonDialog&gt; samples</h2>

    <section class="unit-section">
      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Alert Dialog -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item">
        <h3>Alert Dialog</h3>

        <button @click="buttonDialogContext.showAlertDialog()">
          show
        </button>

        <FuroButtonDialog
          :ref="buttonDialogContext.alertFuroButtonDialogRef"
          class="alert"
          @click-positive-button="buttonDialogContext.clickPositiveButton({ dialogType: 'Alert' })"
        >
          <template #contents>
            <div>Alert Dialog</div>
          </template>
          <template #positive>
            OK
          </template>
        </FuroButtonDialog>
      </div>

      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Confirm Dialog -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item">
        <h3>Confirm Dialog</h3>

        <button @click="buttonDialogContext.showConfirmDialog()">
          show
        </button>

        <FuroButtonDialog
          :ref="buttonDialogContext.confirmFuroButtonDialogRef"
          class="confirm"
          @click-positive-button="buttonDialogContext.clickPositiveButton({ dialogType: 'Confirm' })"
          @click-negative-button="buttonDialogContext.clickNegativeButton({ dialogType: 'Confirm' })"
        >
          <template #contents>
            <div>Confirm Dialog</div>
          </template>
          <template #negative>
            Cancel
          </template>
          <template #positive>
            OK
          </template>
        </FuroButtonDialog>
      </div>

      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Ternary Confirm Dialog -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item">
        <h3>Ternary Confirm Dialog</h3>

        <button @click="buttonDialogContext.showTernaryConfirmDialog()">
          show
        </button>

        <FuroButtonDialog
          :ref="buttonDialogContext.ternaryConfirmFuroButtonDialogRef"
          class="ternary"
          @click-positive-button="buttonDialogContext.clickPositiveButton({ dialogType: 'TernaryConfirm' })"
          @click-negative-button="buttonDialogContext.clickNegativeButton({ dialogType: 'TernaryConfirm' })"
          @click-neutral-button="buttonDialogContext.clickNeutralButton({ dialogType: 'TernaryConfirm' })"
        >
          <template #contents>
            <div>
              Ternary Confirm Dialog
            </div>
          </template>
          <template #neutral>
            Later
          </template>
          <template #negative>
            Cancel
          </template>
          <template #positive>
            OK
          </template>
        </FuroButtonDialog>
      </div>
    </section>

    <div class="reaction-placeholder">
      Clicked button of  {{ buttonDialogContext.feedbackMessageRef }}
    </div>

    <br>
    <br>

    <h2>&lt;FuroDialog&gt; samples</h2>

    <section class="unit-section">
      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Message with ⊗ (x-close button) -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item">
        <h3 class="design-header">
          Message with ⊗<br>(x-close button)
        </h3>

        <button @click="statusDialogContext.showMessageAndXCloseButtonDialog()">
          show
        </button>

        <FuroDialog
          :ref="statusDialogContext.messageAndXCloseButtonFuroDialogRef"
          class="x-close"
          @show-dialog="statusDialogContext.onShowDialog()"
          @dismiss-dialog="statusDialogContext.onDismissDialog()"
        >
          <template #contents>
            <span>Message with ⊗<br>(x-close button)</span>
          </template>
        </FuroDialog>
      </div>

      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Dialog Status Callbacks -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item">
        <h3>Dialog Status Callbacks</h3>

        <button @click="statusDialogContext.showDialogStatusCallbackDialog()">
          show
        </button>

        <FuroDialog
          :ref="statusDialogContext.dialogStatusCallbackFuroDialogRef"
          @show-dialog="statusDialogContext.onShowDialog()"
          @dismiss-dialog="statusDialogContext.onDismissDialog()"
        >
          <template #contents>
            <div>Dialog Status Callbacks</div>
            <br>
            <button @click="statusDialogContext.dismissDialogStatusCallbackDialog()">
              Close
            </button>
          </template>
        </FuroDialog>
      </div>

      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Close by clicked on Backdrop -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item">
        <h3 class="design-header">
          Close by clicked on Backdrop
        </h3>

        <button @click="statusDialogContext.showCloseByClickedOnBackdropDialog()">
          show
        </button>

        <FuroDialog
          :ref="statusDialogContext.closeByClickedOnBackdropFuroDialogRef"
          @click-backdrop="statusDialogContext.clickOnBackdrop()"
        >
          <template #contents>
            <div>Close by clicked on Backdrop</div>
            <br>
            <button @click="statusDialogContext.dismissCloseByClickedOnBackdropDialog()">
              Close
            </button>
          </template>
        </FuroDialog>
      </div>
    </section>

    <div class="reaction-placeholder">
      Status: {{ statusDialogContext.statusMessageRef }}
    </div>

    <br>
    <br>

    <h2>Custom Design samples</h2>

    <section class="unit-section">
      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Custom Design based <FuroDialog> -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item">
        <h3>Custom Design of &lt;FuroDialog&gt; [alpha]</h3>

        <button @click="designedDialogContext.showCustomDesignedDialog()">
          show
        </button>

        <FuroDialog
          :ref="designedDialogContext.customDesignedFuroDialogRef"
          class="design alpha"
        >
          <template #contents>
            <div>
              Custom Design from &lt;FuroDialog&gt; [alpha]
            </div>

            <button @click="designedDialogContext.dismissCustomDesignedDialog()">
              OK
            </button>
          </template>
        </FuroDialog>
      </div>

      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Default Design of <AppDialog> -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item">
        <h3>Default Design of &lt;AppDialog&gt;</h3>

        <button @click="designedDialogContext.showDefaultAppDialog()">
          show
        </button>

        <AppDialog :ref="designedDialogContext.defaultAppDialogRef">
          <template #contents>
            <div>
              Default Design of &lt;AppDialog&gt;
            </div>

            <button @click="designedDialogContext.dismissDefaultAppDialog()">
              OK
            </button>
          </template>
        </AppDialog>
      </div>

      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- Custom Design of <AppDialog> -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item">
        <h3>Custom Design of &lt;AppDialog&gt;</h3>

        <button @click="designedDialogContext.showCustomAppDialog()">
          show
        </button>

        <AppDialog
          :ref="designedDialogContext.customAppDialogRef"
          class="design beta"
        >
          <template #contents>
            <div>
              Custom Design of &lt;AppDialog&gt;
            </div>

            <button @click="designedDialogContext.dismissCustomAppDialog()">
              OK
            </button>
          </template>
        </AppDialog>
      </div>
    </section>

    <br>
    <br>

    <h2>Various Samples</h2>

    <section class="unit-section">
      <!-- ///////////////////////////////////////////////////////////////// -->
      <!-- <form> Dialog -->
      <!-- ///////////////////////////////////////////////////////////////// -->
      <div class="unit-item">
        <h3>&lt;form&gt; Dialog sample</h3>

        <button @click="formDialogContext.showDialog()">
          show
        </button>

        <FuroDialog
          :ref="formDialogContext.formDialogRef"
          class="x-close design unit-form"
        >
          <template #contents>
            <div>
              &lt;form&gt; Dialog
            </div>

            <form
              :ref="formDialogContext.formElementRef"
              class="form"
              @submit.prevent="formDialogContext.submitForm()"
            >
              <input
                type="text"
                class="input id"
                name="id"
                placeholder="Please input id here"
                value="JohnDoe"
              >
              <input
                type="text"
                class="input message"
                name="message"
                placeholder="Please input message here"
                value="Who are you?"
              >

              <button type="submit">
                Submit
              </button>
            </form>
          </template>
        </FuroDialog>

        <div class="result unit-form">
          <span>Submit &lt;form&gt; Result:</span>
          <pre class="json">{{
            formDialogContext.formValues
          }}</pre>
        </div>
      </div>
    </section>

    <br>
    <br>
  </div>
</template>

<style scoped>
/******************************************************************************/
/* page design */
/******************************************************************************/

.unit-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: stretch;
  gap: 1rem;
}

.unit-section > .unit-item {
  border-style: double;
  border-width: 0.25rem;
  border-radius: 0.5rem;

  padding-block: 0.5rem;
  padding-inline: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/******************************************************************************/
/* dialog */
/******************************************************************************/

/*
 * dialog design alpha
 */
.furo-dialog[open].design.alpha {
  border: var(--color-primary) outset 1rem;

  background-color: var(--color-secondary);
  color: var(--color-black);
  box-shadow:
    0.25rem .25rem 1rem #fff,
    -0.25rem -0.25rem 1rem #bebebe;
}

/*
 * dialog design beta
 */
.furo-dialog[open].design.beta {
  border: none;

  background-color: var(--color-secondary);
  color: var(--color-text-secondary);

  text-align: center;
}

.furo-dialog[open].design.beta::backdrop {
  background-color: rgba(255, 255, 255, 0.8);
}

/******************************************************************************/
/* dialog design unit-form */

.furo-dialog.design.unit-form > .form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  padding-block: 1rem 0.5rem;
  padding-inline: 1rem;
}

.furo-dialog.design.unit-form > .form > .input {
  width: 15rem;
}

/*
 * <form> dialog result placeholder
 */
.result.unit-form {
  margin-block-start: 1.5rem;
}

.result.unit-form > .json {
  border: var(--size-thinnest) var(--color-text) solid;

  padding-block: 0.5rem;
  padding-inline: 1rem;

  white-space: pre;
}

/******************************************************************************/

.reaction-placeholder {
  border: var(--size-thinnest) var(--color-text) solid;
  border-radius: .5rem;

  margin-block: 1rem;

  padding-block: .5rem;
  padding-inline: 1rem;

  font-size: 1.2rem;
}
</style>
