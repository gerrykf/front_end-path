<template>
  <div class="test-container">
    <Menu />
  </div>
</template>
<script>
import Menu from "./index.vue";
import "../../styles/var.less";
export default {
  name: "TestMenu",
  components: {
    Menu,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="less" scoped>
@import "../../styles/var.less";
.test-container {
  width: 200px;
  height: 600px;
  background-color: @dark;
  color: @gray;
  display: flex;
}
</style>
