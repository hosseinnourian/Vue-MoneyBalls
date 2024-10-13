<template>
    <q-page>
        <div class="q-pa-md">
            <Transition
                appear
                enter-active-class="animated jackInTheBox slower"
            >
                <NothingHere
                    v-if="!storeEntries.entries.length"
                />
            </Transition>
            <q-list
                v-if="storeEntries.entries.length"
                class="entries"
            >
                <Sortable
                    :list="storeEntries.entries"
                    item-key="id"
                    tag="div"
                    :options="{
                        handle : '.handle'
                    }"
                    @end="storeEntries.sortEnd"
                >
                    <template #item="{ element, index }">
                        <Entry
                            :key="element.id"
                            :entry="element"
                            :index="index"
                        />
                    </template>
                </Sortable>

            </q-list>
        </div>
        <q-footer class="bg-transparent">
            <Transition
                appear
                enter-active-class="animated fadeInUp"
                leave-active-class="animated fadeOutDown"
            >
                <Balance v-if="storeEntries.entries.length" />
            </Transition>
            <AddEntry />
        </q-footer>
    </q-page>
</template>

<script setup>
import Balance from 'src/components/Entries/Balance.vue';
import AddEntry from 'src/components/Entries/AddEntry.vue';
import Entry from 'src/components/Entries/Entry.vue';
import NothingHere from 'src/components/Entries/NothingHere.vue';
import { useStoreEntries } from 'src/stores/storeEntries';
import { Sortable } from 'sortablejs-vue3';
const storeEntries = useStoreEntries()
</script>
