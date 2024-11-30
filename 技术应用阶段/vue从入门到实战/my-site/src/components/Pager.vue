<template>
  <div class="pager-container">
    <a href="">|&lt;&lt;</a>
    <a href="">&lt;&lt;</a>
    <a href="">1</a>
    <a href="">1</a>
    <a href="">1</a>
    <a href="">1</a>
    <a href="">10</a>
    <a href="">1</a>
    <a href="">&gt;&gt;</a>
    <a href="">&gt;&gt;|</a>
  </div>
</template>
<script>
export default {
  name: "Pager",
  props: {},
  computed: {},
};
</script>
<style lang="less" scoped>
@import "../styles/var.less";

.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: @primary;
  }
}
</style>
