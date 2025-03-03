<template>
  <div class="bar2">
    <div class="item" v-for="item in bars" :key="item.country">
      <label>{{ item.country }} {{ item.gdp }}</label>
      <div
        class="bar"
        :style="{ background: item.color, width: item.size + 'px' }"
      ></div>
    </div>
  </div>
</template>

<script>
import { computed, toRef } from "vue";
import { useGdp } from "../composition/useGdp";

export default {
  props: ["gdp"],
  setup(props) {
    return {
      ...useGdp(toRef(props, "gdp"), 600),
    };
  },
};
</script>

<style scoped>
.bar2 {
  width: 500px;
  box-sizing: border-box;
  margin: 3em;
  border-left: 1px solid #333;
}
.bar2::before {
  content: "";
  display: block;
  width: 1px;
  height: 100%;
  position: absolute;
  background-color: #666;
  left: 50%;
}
.item {
  display: flex;
  justify-content: center;
  color: #ffff;
  height: 35px;
  line-height: 35px;
  margin: 1em 0;
  position: relative;
}
.bar {
  width: 100px;
  height: 100%;
  margin-left: 1em;
  flex: 0 0 auto;
}
.item label {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}
.value {
  flex: 0 0 auto;
}
</style>
