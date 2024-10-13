<script setup lang="ts">
import { useLightOrDark } from 'src/use/useLightOrDark';
</script>

<template>
    <div class="text-center q-pt-xl">
        <q-icon
          name="savings"
          size="100px"
          :color="useLightOrDark('grey-4' , 'grey-9')"
        />
        <div
          :class="useLightOrDark('text-grey-5','text-grey-7')"
        >
            nothing here yet
        </div>
    </div>
</template>
