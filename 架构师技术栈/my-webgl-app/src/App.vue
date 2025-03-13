<template>
  <div class="p-4 space-y-6">
    <h1 class="text-2xl font-bold">Vue 3 + WebGL + ECharts + D3.js + WebSocket</h1>
    <ThreeScene />
    <EChartsChart />
    <D3Scatter />
  </div>
</template>

<script setup lang="ts">
import ThreeScene from './components/ThreeScene.vue';
import EChartsChart from './components/EChartsChart.vue';
import D3Scatter from './components/D3Scatter.vue';
</script>
