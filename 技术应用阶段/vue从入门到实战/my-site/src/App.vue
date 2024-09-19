<template>
  <div id="app">
    <h1>APP组件</h1>
    <Pager />
    <div class="test-empty">
      <Empty />
    </div>
  </div>
</template>

<script>
import Pager from "./components/Pager/index.vue";
import Empty from "./components/Empty/index.vue";

export default {
  name: "App",
  components: {
    Pager,
    Empty,
  },
  data() {
    return {
      firstName: "John",
      lastName: "Doe",
    };
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
/* 父组件的scoped会影响子组件的根元素 */
.iconfont {
  color: green;
}

.test-empty {
  width: 500px;
  height: 500px;
  background-color: #f0f0f0;
  position: relative;
}
</style>
