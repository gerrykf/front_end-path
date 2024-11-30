<template>
  <div class="test-container">
    <div class="item" v-for="(iconName, index) in types" :key="index">
      <Icon :name="iconName" />
      <label>{{ iconName }}</label>
    </div>
  </div>
</template>

<script>
import Icon, { types } from "./index.vue";

export default {
  name: "Test",
  components: {
    Icon: Icon,
  },
  data() {
    return {
      types,
    };
  },
};
</script>
<style scoped lang="less">
.test-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    .icon-container {
      margin-bottom: 10px;
    }
  }
}
</style>
