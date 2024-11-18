<script setup lang="ts">
import { Line as LineChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)
import Button from '@/components/ui/button/Button.vue'

import useChart from '@/composable/useChart';

const { chartData, chartOptions, periods, selectedPeriod } = useChart();

</script>

<template>
  <div class="flex h-[300px] mb-6">
    <LineChart :data="chartData" :options="chartOptions" />
  </div>
  <div class="flex gap-2 mb-6">
    <Button v-for="period in periods" :key="period" :variant="selectedPeriod === period ? 'default' : 'secondary'"
      class="text-sm" @click="selectedPeriod = period">
      {{ period }}
    </Button>
  </div>
</template>