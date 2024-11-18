<script setup lang="ts">
import { ref, computed } from 'vue'
import { SearchIcon } from 'lucide-vue-next'
import { useChartStore } from '@/store/useChartStore'

const searchQuery = ref('')
const chartStore = useChartStore()

const filteredConstituents = computed(() => {
  return chartStore.$state.constituents.filter(constituent =>
    constituent.codeInstrument.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectConstituent = (codeInstrument: string) => {
  chartStore.getHistory(codeInstrument)
  chartStore.getSummary(codeInstrument)
  searchQuery.value = ''
}
</script>

<template>
  <div class="mb-6">
    <div class="relative">
      <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Busca un instrumento"
        class="w-full bg-[#2a2a2a] text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
      />
      <ul v-if="searchQuery && filteredConstituents.length" class="absolute left-0 right-0 bg-black border border-gray-300 mt-1 rounded-md">
        <li
          v-for="constituent in filteredConstituents"
          :key="constituent.codeInstrument"
          @click="selectConstituent(constituent.codeInstrument)"
          class="px-4 py-2 cursor-pointer hover:bg-gray-600"
        >
          {{ constituent.codeInstrument }}
        </li>
      </ul>
    </div>
  </div>
</template>