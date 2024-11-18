import { ref, watch } from 'vue'
import { getDateFromTimesTamp, formatNumber, getDateFromTimesDate } from '../helpers'
import { useChartStore } from '@/store/useChartStore'
import type { Chart } from '@/types/history'

const useChart = () => {

  const selectedPeriod = ref('1M')
  const periods = ['1M', '3M', '6M', '1A']

  const chartStore = useChartStore()
  
  // Filter data by period
  const filterDataByPeriod = (period: string): { datetimeLastPriceTs: Chart['datetimeLastPriceTs'], openPrice: Chart['openPrice'] }[] => {
    const allTimesTamps = chartStore.$state.history.chart.map((item: Chart) => item.datetimeLastPriceTs)
    const mostRecentTimesTamp = Math.max(...allTimesTamps)
    const latestDate = getDateFromTimesTamp(mostRecentTimesTamp)
    const startDate = new Date(latestDate)
    
    switch(period) {
      case '3M':
        startDate.setMonth(latestDate.getMonth() - 3)
        break
      case '6M':
        startDate.setMonth(latestDate.getMonth() - 6)
        break
      case '1A':
        startDate.setFullYear(latestDate.getFullYear() - 1)
        break
      default: // '1M'
        startDate.setMonth(latestDate.getMonth() - 1)
    }
  
    return chartStore.$state.history.chart.filter((item: Chart ) => {
      const entryDate = getDateFromTimesTamp(item.datetimeLastPriceTs)
      return entryDate >= startDate && entryDate <= latestDate
    })
  }
  
  // Initial data with 1M
  const initialData = filterDataByPeriod('1M')

  // Chart data setup
  const chartData = ref({
    labels: initialData.map((item: { datetimeLastPriceTs: Chart['datetimeLastPriceTs'] }) => 
      getDateFromTimesDate(item.datetimeLastPriceTs)
    ),
    datasets: [{
      label: 'Precio',
      data: initialData.map((item: { openPrice: Chart['openPrice'] }) => item.openPrice),
      fill: true,
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      tension: 0,
      pointRadius: 1,
    }]
  })

  // Watch period changes
  watch(selectedPeriod, (newPeriod) => {
    const filteredData = filterDataByPeriod(newPeriod)
    chartData.value = {
      labels: filteredData.map((item: { datetimeLastPriceTs: Chart['datetimeLastPriceTs'] }) => 
        getDateFromTimesDate(item.datetimeLastPriceTs)
      ),
      datasets: [{
        label: 'Precio',
        data: filteredData.map((item: { openPrice: Chart['openPrice'] }) => item.openPrice),
        fill: true,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0,
        pointRadius: 1,
      }]
    }
  })

  // Watch history changes
  watch(() => chartStore.$state.history, () => {
    const filteredData = filterDataByPeriod(selectedPeriod.value)
    chartData.value = {
      labels: filteredData.map((item: { datetimeLastPriceTs: Chart['datetimeLastPriceTs'] }) => 
        getDateFromTimesDate(item.datetimeLastPriceTs)
      ),
      datasets: [{
        label: 'Precio',
        data: filteredData.map((item: { openPrice: Chart['openPrice'] }) => item.openPrice),
        fill: true,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0,
        pointRadius: 1,
      }]
    }
  })

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            return formatNumber(value);
          }
        }
      }
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
          color: '#374151',
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
      y: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9CA3AF',
          callback: function(value: number) {
            return formatNumber(value);
          }
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: false,
      animationDuration: 0,
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
      axis: 'x',
    },
  }

  return {
    selectedPeriod,
    periods,
    chartData,
    chartOptions
  }
}

export default useChart