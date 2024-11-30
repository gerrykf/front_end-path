<template>
  <div class="layout-container">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <main>
      <slot></slot>
    </main>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Layout",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="less" scoped>
.layout-container {
  width: 100%;
  height: 100%;
  display: flex;
  .left,
  .right {
    flex: 0 0 auto;
  }
  main {
    flex: 1 1 auto;
  }
}
</style>
