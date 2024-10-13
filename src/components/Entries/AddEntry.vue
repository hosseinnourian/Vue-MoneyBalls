<template>
    <q-form @submit="addEntryFormSubmit" class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
        <div class="col">
            <q-input
                ref="nameRef"
                v-model="addEntryForm.name"
                placeholder="Name"
                outlined
                :bg-color="useLightOrDark('white'  , 'black')"
                dense
                v-select-all
            />
        </div>
        <div class="col">
            <q-input
                v-model.number="addEntryForm.amount"
                placeholder="Amount"
                outlined
                :bg-color="useLightOrDark('white'  , 'black')"
                dense
                input-class="text-right"
                type="number"
                step="0.1"
                v-select-all
            />
        </div>
        <div class="col col-auto">
            <q-btn round color="primary" icon="add" type="submit" />
        </div>
    </q-form>
</template>

<script setup lang="ts">

import { useQuasar } from 'quasar';
import { useStoreEntries } from 'src/stores/storeEntries';
import { useAmountColorClass } from 'src/use/useAmountColorClass';
import { useLightOrDark } from 'src/use/useLightOrDark';
import { reactive, ref } from 'vue';
import vSelectAll from 'src/directives/directiveSelectAll'


const $q = useQuasar()
const nameRef = ref(null)
const storeEntries = useStoreEntries()


//actions
const addEntryFormDefault = {
    name: '',
    amount: null
}

const addEntryForm = reactive({
    ...addEntryFormDefault
})

const addEntryFormReset = () => {
    Object.assign(addEntryForm, addEntryFormDefault)
    nameRef.value.focus()
}





const addEntryFormSubmit = () => {
    storeEntries.addEntry(addEntryForm)
    addEntryFormReset()
}
</script>
