<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useStoreSettings } from './stores/storeSetting';
import { useStoreEntries } from './stores/storeEntries';

defineOptions({
  name: 'App'
});


const storeSetting = useStoreSettings()
const storeEntries = useStoreEntries()
onMounted(() => {
  storeSetting.loadSettings()
  storeEntries.loadEntries()
})
</script>
