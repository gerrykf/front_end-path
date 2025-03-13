<template>
  <div ref="chartRef" class="w-full h-72"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import { useWebSocket } from "../WebSocketData";

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

onMounted(() => {
  if (!chartRef.value) return;
  chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption({
    title: { text: "实时数据" },
    xAxis: { type: "category", data: [] },
    yAxis: { type: "value" },
    series: [{ type: "line", data: [] }],
  });

  useWebSocket((newData) => {
    const option: any = chartInstance!.getOption();
    option.xAxis[0].data.push(new Date().toLocaleTimeString());
    option.series[0].data.push(newData);
    if (option.xAxis[0].data.length > 10) {
      option.xAxis[0].data.shift();
      option.series[0].data.shift();
    }
    chartInstance!.setOption(option);
  });
});

onUnmounted(() => chartInstance?.dispose());
</script>
