<template>
  <div class="test-container">
    <SiteAside />
  </div>
</template>

<script>
import SiteAside from "./index.vue";
export default {
  name: "TestSiteAside",
  components: {
    SiteAside,
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
