import { ref, computed } from 'vue'
import { useChartStore } from '@/store/useChartStore'
import type { Constituent } from '@/types/constituyentes'
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-vue-next'

const useInstrumentList = () => { 

  const chartStore = useChartStore()
  const sortColumn = ref('shortName')
  const sortDirection = ref('asc')
  
  const sortedConstituents = computed(() => {
    const constituents: Constituent[] = [...chartStore.$state.constituents]
    if (sortColumn.value) {
      constituents.sort((a, b) => {
        let aValue = a[sortColumn.value]
        let bValue = b[sortColumn.value]
        
        if (['lastPrice', 'accumulatedVolumeMoney', 'pctDay', 'pct30D', 'pct1Y', 'pctCY'].includes(sortColumn.value)) {
          aValue = Number(aValue)
          bValue = Number(bValue)
        }
        
        if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1
        if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1
        return 0
      })
    }
    return constituents
  })
  
  const handleSort = (column:string) => {
    if (sortColumn.value === column) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortColumn.value = column
      sortDirection.value = 'asc'
    }
  }
  
  const getSortIcon = (column:string) => {
    if (sortColumn.value !== column) return null
    return sortDirection.value === 'asc' ? ChevronUpIcon : ChevronDownIcon
  }
  
  const handleClick = (value: string) => {
    chartStore.getHistory(value)
    chartStore.getSummary(value)
  }

  return {
    sortedConstituents,
    sortColumn,
    handleSort,
    getSortIcon,
    handleClick
  }
}

export default useInstrumentList