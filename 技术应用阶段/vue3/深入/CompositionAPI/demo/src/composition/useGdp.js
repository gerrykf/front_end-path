import { computed, ref, watch } from "vue";
import gsap from "gsap";

const colors = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
];
export function useGdp(gdpRef, maxSize) {
  const maxValue = computed(() =>
    Math.max(...gdpRef.value.map((item) => item.gdp))
  );

  const bars = ref([]);
  // 条的最新数据
  const barsTarget = computed(() => {
    console.log("computed");
    return gdpRef.value.map((item, i) => ({
      ...item,
      color: colors[i % colors.length],
      size: (item.gdp / maxValue.value) * maxSize,
    }));
  });

  watch(
    barsTarget,
    () => {
      for (let i = 0; i < barsTarget.value.length; i++) {
        if (!bars.value[i]) {
          bars.value[i] = { ...barsTarget.value[i], size: 0, gdp: 0 };
        }
        // bars.value[i] 中的属性 逐步变为 barsTarget.value[i] 中的属性
        gsap.to(bars.value[i], {
          ...barsTarget.value[i],
          duration: 1,
        });
      }
    },
    { deep: true }
  );

  return {
    bars,
  };
}
