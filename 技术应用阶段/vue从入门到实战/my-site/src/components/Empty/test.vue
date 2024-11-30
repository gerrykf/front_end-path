<template>
  <div class="test-container">
    <Empty />
  </div>
</template>
<script>
import Empty from "./index.vue";
export default {
  name: "TestEmpty",
  components: {
    Empty,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="less" scoped>
.test-container {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  position: relative;
}
</style>
