import { defineStore } from 'pinia';
import { uid, useQuasar, Notify } from 'quasar';
import { computed, reactive, watch } from 'vue';
import { Dark, LocalStorage } from 'quasar';


export const useStoreSettings = defineStore('settings', () => {

  //state
  const settings = reactive({
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: '$',
    darkMode: false
  })

  //actions
  const saveSettings = () => {
    LocalStorage.set('settings', settings)
  }
  const loadSettings = () => {
    const savedSettings = LocalStorage.getItem('settings')
    if (savedSettings) Object.assign(settings, savedSettings)
  }

  //watcher
  watch(() => settings.darkMode, (value) => {
    Dark.set(value)
  }, { immediate: true })

  watch(settings, () => {
    saveSettings()
  })




  return {
    settings,
    loadSettings
  }
});
