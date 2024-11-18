<script setup lang="ts">
import { computed } from 'vue';
import { useChartStore } from '@/store/useChartStore';
import { formatNumber, getValueColor } from '@/helpers';

const chartStore = useChartStore();

const currentPrice = computed(() => chartStore.$state.history.chart?.at(-1)?.openPrice ?? 0);
const previousPrice = computed(() => chartStore.$state.history.chart?.at(-2)?.openPrice ?? 0);

const priceDirection = computed(() => {
  if (currentPrice.value > previousPrice.value) return 'up';
  if (currentPrice.value < previousPrice.value) return 'down';
  return 'same';
});
</script>

<template>
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-bold text-white mb-3">{{ chartStore.$state.history.info.shortName }}, {{
        chartStore.$state.history.info.countryName }}</h1>
      <span class="text-gray-400 text-sm">Indice</span>
    </div>
  </div>
  <div class="mb-6 border-y-[1px] py-2">
    <div class="block lg:flex gap-4 text-sm text-gray-400 items-baseline space-x-2">
      <span v-if="chartStore.$state.history.chart?.at(-1)">
        Valor Actual:
        <span class="font-semibold text-white">
          <span v-if="priceDirection === 'up'" class="text-green-500 font-semibold text-lg">↑</span>
          <span v-if="priceDirection === 'down'" class="text-red-500 font-semibold text-lg">↓</span>
          {{ formatNumber(currentPrice) }}
        </span>
      </span>
      <span v-if="chartStore.$state.history.chart?.at(-1)">
        Var.% Actual:
        <span :class="getValueColor(chartStore.$state.history.chart?.at(-1)?.performanceAbsolute ?? 0)">
          {{ chartStore.$state.history.chart?.at(-1)?.performanceAbsolute ?? 0 }}%
        </span>
      </span>
      <span v-if="chartStore.$state.history.chart?.at(-1)">
        Var. Puntos Actual:
        <span :class="getValueColor(chartStore.$state.history.chart?.at(-1)?.performanceRelative  ?? 0)">
          {{ chartStore.$state.history.chart?.at(-1)?.performanceRelative.toFixed(2) ?? 0 }}%
        </span>
      </span>
    </div>
  </div>
</template>