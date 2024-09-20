<template>
  <div class="test-container">
    <Contact />
  </div>
</template>
<script>
import Contact from "./index.vue";
import "../../styles/global.less";
export default {
  name: "TestContact",
  components: {
    Contact,
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
  width: 250px;
  height: 800px;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
