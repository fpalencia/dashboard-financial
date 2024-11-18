<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
</script>

<template>
  <Tabs default-value="ipsa" class="w-full">
    <TabsList class="w-full flex justify-start bg-black text-white border-b-2 rounded-none pb-3">
      <TabsTrigger value="ipsa" class="text-sm">IPSA</TabsTrigger>
      <TabsTrigger value="igpa" class="text-sm">IGPA</TabsTrigger>
      <TabsTrigger value="nasdaq" class="text-sm">NASDAQ</TabsTrigger>
      <TabsTrigger value="dowjones" class="text-sm">DOW JONES</TabsTrigger>
    </TabsList>
    <TabsContent value="ipsa">
      <slot name="ipsa"></slot>
    </TabsContent>
    <TabsContent value="igpa">
      <slot name="igpa"></slot>
    </TabsContent>
    <TabsContent value="nasdaq">
      <slot name="nasdaq"></slot>
    </TabsContent>
    <TabsContent value="dowjones">
      <slot name="dowjones"></slot>
    </TabsContent>
  </Tabs>
</template>