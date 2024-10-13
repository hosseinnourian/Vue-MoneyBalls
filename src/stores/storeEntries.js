import { defineStore } from 'pinia';
import { uid, useQuasar, Notify, LocalStorage } from 'quasar';
import { computed, reactive, ref, watch, nextTick } from 'vue';

export const useStoreEntries = defineStore('entries', () => {
  const $q = useQuasar()
  //state
  const entries = ref([
    // {
    //   id: 'ID 1',
    //   name: 'Salary',
    //   amount: 4999.99,
    //   paid: true
    // },
    // {
    //   id: 'ID 2',
    //   name: 'Rent',
    //   amount: -999,
    //   paid: false
    // },
    // {
    //   id: 'ID 3',
    //   name: 'Phone Bill',
    //   amount: -14.99,
    //   paid: false
    // },
    // {
    //   id: 'ID 4',
    //   name: 'Unknown',
    //   amount: 0,
    //   paid: false
    // },
  ])


  watch(entries.value, () => {
    saveEntries()
  })


  const options = reactive({
    sort: false
  })

  //getter
  const balance = computed(() => {
    return entries.value.reduce((acc, {
      amount
    }) => {
      return acc + amount
    }, 0)
  })

  const balancePaid = computed(() => {
    return entries.value.reduce((acc, { amount, paid }) => {
      return paid ? acc + amount : acc
    }, 0)
  })

  const runningBalances = computed(() => {
    let runningBalances = []
    let currentRunningBalance = 0

    if (entries.value.length) {
      entries.value.forEach(entry => {
        let entryAmount = entry.amount ? entry.amount : 0
        currentRunningBalance += entryAmount
        runningBalances.push(currentRunningBalance)
      })
    }
    return runningBalances
  })

  //actions
  const addEntry = (addEntryForm) => {
    const newEntry = Object.assign({}, addEntryForm, { id: uid(), paid: false })
    entries.value.push(newEntry)
  }

  const updateEntry = (entryId, updates) => {
    const index = getEntryIndexById(entryId)
    Object.assign(entries.value[index], updates)
  }

  const deleteEntry = (entryId) => {
    const index = getEntryIndexById(entryId)
    entries.value.splice(index, 1)
    removeSlideItemIfExist(entryId)
    Notify.create({
      message: 'Entry Deleted',
      position: 'top'
    })
  }
  const sortEnd = ({ oldIndex, newIndex }) => {
    const movedEntry = entries.value[oldIndex]
    entries.value.splice(oldIndex, 1)
    entries.value.splice(newIndex, 0, movedEntry)
  }

  const saveEntries = () => {
    LocalStorage.set('entries', entries.value)
  }

  const loadEntries = () => {
    const savedEntries = LocalStorage.getItem('entries')
    if (savedEntries) Object.assign(entries.value, savedEntries)
  }

  //helper
  const getEntryIndexById = (entryId) => {
    return entries.value.findIndex(entry => entry.id === entryId)
  }
  const removeSlideItemIfExist = (entryId) => {
    nextTick(() => {
      const slideItem = document.querySelector(`#id-${entryId}`)
      if (slideItem) slideItem.remove()
    })
  }
  //returns
  return {
    entries,
    balance,
    addEntry,
    deleteEntry,
    updateEntry,
    balancePaid,
    options,
    sortEnd,
    runningBalances,
    loadEntries
  }
});
