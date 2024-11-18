<script setup lang="ts">
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import InstrumentItemComponent from '@/components/commons/InstrumentItemComponent.vue'
import useInstrumentList from '@/composable/useIntrumentList'

const { sortedConstituents, sortColumn, handleSort, getSortIcon, handleClick } = useInstrumentList()

</script>

<template>
  <div class="w-full rounded-lg">
    <div class="flex flex-col lg:flex-row lg:space-x-3">
      <div class="w-full lg:w-1/2">
        <Table>
          <TableHeader class="text-[10px]">
            <TableRow>
              <TableHead @click="handleSort('shortName')" class="text-white cursor-pointer">
                Nombre
                <component :is="getSortIcon('shortName')" v-if="sortColumn === 'shortName'" class="inline ml-1" />
              </TableHead>
              <TableHead @click="handleSort('lastPrice')" class="text-right text-white cursor-pointer">
                Último
                <component :is="getSortIcon('lastPrice')" v-if="sortColumn === 'lastPrice'" class="inline ml-1" />
              </TableHead>
              <TableHead @click="handleSort('accumulatedVolumeMoney')" class="text-right text-white cursor-pointer">
                Monto (MM)
                <component :is="getSortIcon('accumulatedVolumeMoney')" v-if="sortColumn === 'accumulatedVolumeMoney'" class="inline ml-1" />
              </TableHead>
              <TableHead @click="handleSort('pctDay')" class="text-right text-white cursor-pointer">
                Var día
                <component :is="getSortIcon('pctDay')" v-if="sortColumn === 'pctDay'" class="inline ml-1" />
              </TableHead>
              <TableHead @click="handleSort('pct30D')" class="text-right text-white cursor-pointer">
                Var 30d
                <component :is="getSortIcon('pct30D')" v-if="sortColumn === 'pct30D'" class="inline ml-1" />
              </TableHead>
              <TableHead @click="handleSort('pct1Y')" class="text-right text-white cursor-pointer">
                Año Actual
                <component :is="getSortIcon('pct1Y')" v-if="sortColumn === 'pct1Y'" class="inline ml-1" />
              </TableHead>
              <TableHead @click="handleSort('pctCY')" class="text-right text-white cursor-pointer">
                12 Meses
                <component :is="getSortIcon('pctCY')" v-if="sortColumn === 'pctCY'" class="inline ml-1" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody class="text-[10px]">
            <TableRow v-for="(data, index) in sortedConstituents.slice(0, 16)" :key="index" class="hover:bg-gray-800 cursor-pointer" @click="handleClick(data.shortName)">
              <InstrumentItemComponent :data="data" />
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div class="w-full lg:w-1/2">
        <Table>
          <TableHeader class="text-[10px]">
            <TableRow>
              <TableHead @click="handleSort('shortName')" class="text-white cursor-pointer flex items-center">
                Nombre
                <component :is="getSortIcon('shortName')" v-if="sortColumn === 'shortName'" class="inline ml-1" />
              </TableHead>
              <TableHead @click="handleSort('lastPrice')" class="text-right text-white cursor-pointer">
                Último
                <component :is="getSortIcon('lastPrice')" v-if="sortColumn === 'lastPrice'" class="inline ml-1" />
              </TableHead>
              <TableHead @click="handleSort('accumulatedVolumeMoney')" class="text-right text-white cursor-pointer">
                Monto (MM)
                <component :is="getSortIcon('accumulatedVolumeMoney')" v-if="sortColumn === 'accumulatedVolumeMoney'" class="inline ml-1" />
              </TableHead>
              <TableHead @click="handleSort('pctDay')" class="text-right text-white cursor-pointer">
                Var día
                <component :is="getSortIcon('pctDay')" v-if="sortColumn === 'pctDay'" class="inline ml-1" />
              </TableHead>
              <TableHead @click="handleSort('pct30D')" class="text-right text-white cursor-pointer">
                Var 30d
                <component :is="getSortIcon('pct30D')" v-if="sortColumn === 'pct30D'" class="inline ml-1" />
              </TableHead>
              <TableHead @click="handleSort('pct1Y')" class="text-right text-white cursor-pointer">
                Año Actual
                <component :is="getSortIcon('pct1Y')" v-if="sortColumn === 'pct1Y'" class="inline ml-1" />
              </TableHead>
              <TableHead @click="handleSort('pctCY')" class="text-right text-white cursor-pointer">
                12 Meses
                <component :is="getSortIcon('pctCY')" v-if="sortColumn === 'pctCY'" class="inline ml-1" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody class="text-[10px]">
            <TableRow v-for="(data, index) in sortedConstituents.slice(16, 32)" :key="index" class="hover:bg-gray-800 cursor-pointer" @click="handleClick(data.shortName)">
              <InstrumentItemComponent :data="data" />
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
}
</style>