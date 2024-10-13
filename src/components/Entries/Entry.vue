<template>
    <q-slide-item
      @left="onEntrySlideLeft"
      @right="onEntrySlideRight"
      left-color="positive"
      right-color="negative"
      :id="`id-${ entry.id }`"
      :class="
        !entry.paid ? useLightOrDark('bg-white' , 'bg-black')
        : useLightOrDark('bg-grey-2' , 'bg-grey-10')
      "
    >
        <template v-slot:left>
            <q-icon name="done" />
        </template>
        <template v-slot:right>
            <q-icon name="delete" />
        </template>

        <q-item class="row">
            <q-item-section
                class="text-weight-bold col"
                :class="[useAmountColorClass(entry.amount),{'text-strike': entry.paid }]"
            >
                {{ entry.name }}
                <q-popup-edit
                    :cover="false"
                    :offset="[16, 12]"
                    anchor="top left"
                    :model-value="entry.name"
                    auto-save
                    v-slot="scope"
                    label-set="OK"
                    buttons
                    @save="onNameUpdate"
                >
                    <q-input
                        v-model="entry.name"
                        dense
                        autofocus
                        @keyup.enter="scope.set"
                        input-class="text-weight-bold letter-spacing-none"
                        v-select-all
                    />
                </q-popup-edit>
            </q-item-section>

            <q-item-section
                side
                class="text-weight-bold relative-position col"
                :class="[useAmountColorClass(entry.amount)]"
            >
                <span
                    :class="{'text-strike': entry.paid}"
                >
                    {{ useCurrencify(entry.amount) }}
                </span>
                <q-popup-edit
                    :cover="false"
                    :offset="[16, 12]"
                    anchor="top right"
                    self="top right"
                    :model-value="entry.amount"
                    auto-save
                    v-slot="scope"
                    label-set="OK"
                    buttons
                    @save="onAmountUpdate"
                >
                    <q-input
                        v-model.number="entry.amount"
                        type="number"
                        step="0.01"
                        dense
                        autofocus
                        @keyup.enter="scope.set"
                        input-class="text-weight-bold letter-spacing-none text-right"
                        v-select-all
                    />
                </q-popup-edit>
                <q-chip
                    v-if="storeSetting.settings.showRunningBalance"
                    size="9px"
                    outline
                    dense
                    :class="useAmountColorClass(storeEntries.runningBalances[index])"
                    class="running-balance absolute-bottom-right">
                    {{ useCurrencify(storeEntries.runningBalances[index]) }}
                </q-chip>
            </q-item-section>

            <q-item-section
                side v-if="storeEntries.options.sort"
            >
                <q-icon
                    name="reorder"
                    color="primary"
                    class="handle"
                />
            </q-item-section>
        </q-item>
    </q-slide-item>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useStoreEntries } from 'src/stores/storeEntries';
import { useStoreSettings } from 'src/stores/storeSetting';
import { useAmountColorClass } from 'src/use/useAmountColorClass';
import { useCurrencify } from 'src/use/useCurrencify';
import { useLightOrDark } from 'src/use/useLightOrDark';
import vSelectAll from 'src/directives/directiveSelectAll'

const $q = useQuasar()
const storeEntries = useStoreEntries()
const storeSetting = useStoreSettings()

const props = defineProps({
    entry: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
})

const onEntrySlideRight = ({ reset }) => {
    if (storeSetting.settings.promptToDelete) {
        promptToDelete(reset)
    } else {
        storeEntries.deleteEntry(props.entry.id)
    }
}

const promptToDelete = (reset) => {
    $q.dialog({
        title: 'Delete Entry',
        message: `Delete This Entry?
      <div class="${useAmountColorClass(props.entry.amount)} q-mt-md text-weight-bold">
        ${props.entry.name} : ${useCurrencify(props.entry.amount)}
      </div>
    `,
        html: true,

        ok: {
            label: 'Delete',
            color: 'negative',
            noCaps: true
        },
        cancel: {
            color: 'primary',
            noCaps: true
        },
        persistent: true
    }).onOk(() => {
        storeEntries.deleteEntry(props.entry.id)
    }).onCancel(() => {
        reset()
    })
}


const onEntrySlideLeft = ({ reset }) => {
    storeEntries.updateEntry(props.entry.id, { paid: !props.entry.paid })
    reset()
}

const onNameUpdate = (val: string) => {
    storeEntries.updateEntry(props.entry.id, { name: val })
}
const onAmountUpdate = (val: number) => {
    storeEntries.updateEntry(props.entry.id, { amount: val })
}


</script>
