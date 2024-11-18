<script setup lang="ts">
import { useChartStore } from './store/useChartStore'
import SearchBarComponent from './components/commons/SearchBarComponent.vue'
import HeaderComponent from './components/commons/HeaderComponent.vue'
import ChartComponent from './components/commons/ChartComponent.vue'
import InstrumentListComponent from './components/commons/InstrumentListComponent.vue'
import SummaryComponent from './components/commons/SummaryComponent.vue'
import TabComponent from './components/commons/TabComponent.vue'

const useChart = useChartStore()

useChart.getConstituents()
useChart.getHistory()
useChart.getSummary()
</script>

<template>
  <div class="container mx-auto min-h-screen bg-black text-white p-4">
    <SearchBarComponent />
    <div class="grid grid-cols-1 lg:grid-cols-4 lg:gap-7">
      <div class="col-span-4 lg:col-span-3">
        <HeaderComponent />
        <ChartComponent />
        <SummaryComponent class="lg:hidden" />
        <TabComponent>
          <template #ipsa>
            <InstrumentListComponent />
          </template>
          <template #igpa>
            <!-- Add details content here -->
          </template>
          <template #nasdaq>
            <!-- Add details content here -->
          </template>
          <template #dowjones>
            <!-- Add details content here -->
          </template>
        </TabComponent>
      </div>
      <div class="col-span-4 lg:col-span-1 hidden lg:block">
        <SummaryComponent />
      </div>
    </div>
  </div>
</template>