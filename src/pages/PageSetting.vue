<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered padding>

        <q-item-label header>Entries</q-item-label>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Promp To Delete</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle color="blue" v-model="storesSetting.settings.promptToDelete" val="battery" />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Show Running Balance</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle color="blue" v-model="storesSetting.settings.showRunningBalance" val="battery" />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-input label="Currency Symbol" outlined v-model="storesSetting.settings.currencySymbol" v-select-all />
          </q-item-section>
        </q-item>

        <!-- theme  -->
        <q-separator spaced />
        <q-item-label header>Appearence</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-radio
              v-model="storesSetting.settings.darkMode"
              :val="false"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Light</q-item-label>
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-radio
              v-model="storesSetting.settings.darkMode"
              :val="true"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dark</q-item-label>
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section avatar top>
            <q-radio
              v-model="storesSetting.settings.darkMode"
              val="auto"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Auto</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { useStoreSettings } from 'src/stores/storeSetting';
import vSelectAll from 'src/directives/directiveSelectAll'
const storesSetting = useStoreSettings()
</script>
