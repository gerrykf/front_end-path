<template>
  <div id="app">
    <h1>APP组件</h1>
    <Icon name="home" :size="50" />
    <Icon name="about" :size="50" />
  </div>
</template>

<script>
import Icon from "./components/Icon.vue";

export default {
  name: "App",
  components: {
    Icon,
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
