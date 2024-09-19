<template>
  <div class="empty-container">
    <Icon name="empty" :size="100" />
    <div class="empty-msg">{{ msg }}</div>
  </div>
</template>
<script>
import Icon from "@/components/Icon/index.vue";
export default {
  name: "Empty",
  props: {
    msg: {
      type: String,
      default: "暂无数据",
    },
  },
  components: {
    Icon,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
.empty-container {
  .self-center();
  .empty-msg {
    color: @lightWords;
    font-size: 16px;
    margin-top: 10px;
    text-align: center;
  }
}

.icon-container {
  color: @lightWords;
}
</style>
