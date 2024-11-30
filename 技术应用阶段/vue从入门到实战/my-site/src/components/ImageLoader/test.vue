<template>
  <div class="test-container">
    <ImageLoader
      :src="origin"
      :placeholder="placeholder"
      :duration="1000"
      @load="handleLoaded"
    />
  </div>
</template>
<script>
import ImageLoader from "./index.vue";
import origin from "./origin.png";
import placeholder from "./placeholder.png";
export default {
  name: "TestEmpty",
  components: {
    ImageLoader,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleLoaded() {
      console.log("loaded");
    },
  },
};
</script>
<style lang="less" scoped>
.test-container {
  width: 800px;
  height: 600px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
