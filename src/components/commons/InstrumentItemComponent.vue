<script setup lang="ts">
import { defineProps } from 'vue';
import {
  TableCell,
} from '@/components/ui/table';
import { Constituent } from '@/types/constituyentes';
import { formatNumber, formatPercentage, getValueColor } from '@/helpers';

const props = defineProps<{
  data: Constituent;
}>()
</script>

<template>
  <TableCell class="font-medium text-white">{{ props.data.shortName }}</TableCell>
  <TableCell class="text-right text-white">{{ formatNumber(props.data.lastPrice) }}</TableCell>
  <TableCell class="text-right text-white">{{ formatNumber(props.data.accumulatedVolumeMoney) }}</TableCell>
  <TableCell class="text-right" :class="getValueColor(props.data.pctDay)">
    {{ formatPercentage(props.data.pctDay) }}
  </TableCell>
  <TableCell class="text-right" :class="getValueColor(props.data.pct30D)">
    {{ formatPercentage(props.data.pct30D) }}
  </TableCell>
  <TableCell class="text-right" :class="getValueColor(props.data.pct1Y)">
    {{ formatPercentage(props.data.pct1Y) }}
  </TableCell>
  <TableCell class="text-right" :class="getValueColor(props.data.pctCY)">
    {{ formatPercentage(props.data.pctCY) }}
  </TableCell>
</template>