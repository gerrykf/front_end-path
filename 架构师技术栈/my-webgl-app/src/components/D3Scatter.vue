<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import {
  select as d3Select,
  scaleLinear as d3ScaleLinear,
  axisBottom,
  axisLeft,
} from "d3";
import { useWebSocket } from "@/hooks/useWebSocket";

const svgRef = ref<SVGSVGElement | null>(null);
const width = 600;
const height = 400;
const margin = { top: 20, right: 30, bottom: 30, left: 40 };

let xScale: d3.ScaleLinear<number, number>;
let yScale: d3.ScaleLinear<number, number>;
let svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
const pointsData = ref<{ x: number; y: number }[]>([]);

// **初始化 D3 图表**
const initChart = () => {
  if (!svgRef.value || svg) return;

  svg = d3Select(svgRef.value)
    .attr("width", width)
    .attr("height", height)
    .style("background", "#000000");

  // **比例尺**
  xScale = d3ScaleLinear().domain([0, 100]).range([margin.left, width - margin.right]);
  yScale = d3ScaleLinear().domain([0, 100]).range([height - margin.bottom, margin.top]);

  // **X 轴**
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(axisBottom(xScale));

  // **Y 轴**
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(axisLeft(yScale));
};

// **更新 D3 图表**
const updateChart = () => {
  if (!svg) return;

  const circles = svg.selectAll("circle").data(pointsData.value, (d: any) => d.x + "-" + d.y);

  // **进入 (新数据点)**
  circles.enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y))
    .attr("r", 0) // 初始半径
    .attr("fill", (d) => `rgb(${255 - d.y * 2}, 0, ${d.y * 2})`) // 颜色渐变
    .style("opacity", 0)
    .transition()
    .duration(500)
    .attr("r", 5) // 渐变缩放
    .style("opacity", 1);

  // **更新 (已有数据点)**
  circles.transition()
    .duration(500)
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y));

  // **退出 (旧数据点淡出)**
  circles.exit()
    .transition()
    .duration(500)
    .style("opacity", 0) // 透明度变化
    .remove();
};

// **WebSocket 监听**
useWebSocket((data: { x: number; y: number }) => {
  pointsData.value.push({ x: data.x, y: data.y });

  if (pointsData.value.length > 50) {
    pointsData.value.shift(); // 限制最大数据点数
  }

  updateChart(); // ✅ 重新渲染
});

onMounted(initChart);
onUnmounted(() => {
  pointsData.value = [];
});
</script>

<template>
  <h2>D3 Scatter Plot</h2>
  <p>数据实时更新，旧数据点会逐渐淡出</p>
  <svg ref="svgRef"></svg>
</template>

<style scoped>
svg {
  display: block;
  margin: auto;
  border: 1px solid #ccc;
}
</style>
