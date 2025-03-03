<template>
  <svg view-box="25 25 50 50" class="circular">
    <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
  </svg>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loading",
  setup() {
    return {};
  },
});
</script>

<style scoped>
.circular {
  margin: 0 auto;
  position: relative;
  width: 100px;
  height: 100px;
}

.path {
  animation: dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #409eff;
  stroke-linecap: round;
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
