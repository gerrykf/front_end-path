<template>
  <div id="app">
    <h1>APP组件</h1>
    <Pager />
  </div>
</template>

<script>
import Pager from "./components/Pager/index.vue";

export default {
  name: "App",
  components: {
    Pager,
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
</style>
