<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@/components/ui/table'
import { useChartStore } from '@/store/useChartStore';
import { getDateFromTimesDate, formatNumber, formatPercentage, getValueColor } from '@/helpers';

const chartStore = useChartStore()

</script>

<template>
  <Tabs default-value="detalles" class="w-full">
    <TabsList class="bg-black text-white w-full flex justify-center pb-3 border-b-2 rounded-none">
      <TabsTrigger value="resumen" class="text-sm">Resumen</TabsTrigger>
      <TabsTrigger value="detalles" class="text-sm">Detalles</TabsTrigger>
    </TabsList>
    <TabsContent value="resumen">
    </TabsContent>
    <TabsContent value="detalles" class="mt-0">
      <div class="space-y-2">
        <!-- Mayores alzas -->
        <div class="flex justify-between items-center text-sm text-white border-b-[1px] py-2">
          <h3 class="text-white">Cotización</h3>
          <span class="text-white">{{ getDateFromTimesDate(chartStore.$state.history.chart?.at(-1)?.datetimeLastPriceTs
            ?? 0) }}</span>
        </div>
        <div class="flex justify-between items-center text-sm text-white">
          <h3 class="text-white">Mercado</h3>
          <span class="text-white">Bolsa de santiago</span>
        </div>
        <Table class="w-full text-[10.5px] font-medium">
          <TableBody class="uppercase">
            <TableRow class="border-b border-gray-800">
              <TableCell class="py-2 px-0">Apertura</TableCell>
              <TableCell class="text-right px-0">{{ formatNumber(chartStore.$state.summary.price.openPrice ?? 0) }}
              </TableCell>
            </TableRow>
            <TableRow class="border-b border-gray-800">
              <TableCell class="py-2 px-0">Cierre Anterior</TableCell>
              <TableCell class="text-right px-0">{{ formatNumber(chartStore.$state.history.chart?.at(-2)?.openPrice
            ?? 0) }}
              </TableCell>
            </TableRow>
            <TableRow class="border-b border-gray-800">
              <TableCell class="py-2 px-0">Máximo Diario</TableCell>
              <TableCell class="text-right px-0">{{ formatNumber(chartStore.$state.summary.price.maxDay) }}</TableCell>
            </TableRow>
            <TableRow class="border-b border-gray-800">
              <TableCell class="py-2 px-0">Mínimo Diario</TableCell>
              <TableCell class="text-right px-0">{{ formatNumber(chartStore.$state.summary.price.minDay) }}</TableCell>
            </TableRow>
            <TableRow class="border-b border-gray-800">
              <TableCell class="py-2 px-0">Máximo 52 Semanas</TableCell>
              <TableCell class="text-right px-0">{{ formatNumber(chartStore.$state.summary.price.max52W) }}</TableCell>
            </TableRow>
            <TableRow class="border-b border-gray-800">
              <TableCell class="py-2 px-0">Mínimo 52 Semanas</TableCell>
              <TableCell class="text-right px-0">{{ formatNumber(chartStore.$state.summary.price.min52W) }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div class="flex justify-between items-center text-sm text-white">
          <h3 class="text-white">Variación</h3>
          <span class="text-white">%</span>
        </div>
        <Table class="w-full text-[10.5px] font-medium">
          <TableBody class="uppercase">
            <TableRow class="border-b border-gray-800">
              <TableCell class="py-2 px-0">1 Mes</TableCell>
              <TableCell class="text-right px-0" :class="getValueColor(chartStore.$state.summary.price.pct30D)">{{ formatPercentage(chartStore.$state.summary.price.pct30D) }}</TableCell>
            </TableRow>
            <TableRow class="border-b border-gray-800">
              <TableCell class="py-2 px-0">1 Año</TableCell>
              <TableCell class="text-right px-0" :class="getValueColor(chartStore.$state.summary.price.pctRelCY)">{{ formatPercentage(chartStore.$state.summary.price.pctRelCY) }}</TableCell>
            </TableRow>
            <TableRow class="border-b border-gray-800">
              <TableCell class="py-2 px-0">Año a la fecha</TableCell>
              <TableCell class="text-right px-0" :class="getValueColor(chartStore.$state.summary.price.pctRelW52)">{{ formatPercentage(chartStore.$state.summary.price.pctRelW52) }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </TabsContent>
  </Tabs>
</template>