<template>
  <div>
    <h1>2019 GDP TOP 5</h1>
    <div class="container">
      <Bar1 :gdp="gdps" />
      <Bar2 :gdp="gdps" />
    </div>
    <div class="controls">
      <div class="item" v-for="item in gdps" :key="item.country">
        <label>{{ item.country }}</label>
        <input type="number" step="0.001" min="0" v-model="item.gdp" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Bar1 from "./components/Bar1.vue";
import Bar2 from "./components/Bar2.vue";

export default {
  components: {
    Bar1,
    Bar2,
  },
  setup() {
    const gdps = ref([]);
    async function fetchGdp() {
      gdps.value = await fetch("/api/gdp.json").then((res) => res.json());
    }

    fetchGdp();

    return { gdps };
  },
};
</script>
<style scoped>
.conatiner {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.controls {
  margin: 1em;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.item {
  margin: 1em;
}
.item label {
  margin: 0 1em;
}
.item input {
  height: 26px;
  font-size: 16px;
}
h1 {
  text-align: center;
}
</style>
