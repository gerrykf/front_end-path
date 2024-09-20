<template>
  <div id="app">
    <h1>APP组件</h1>
    <!-- <Pager />
    <div class="test-empty">
      <Empty />
    </div> -->
    <div class="test-image-loader">
      <ImageLoader
        :src="image1"
        :placeholder="image2"
        :duration="1000"
        @load="handleLoaded"
      />
    </div>
  </div>
</template>

<script>
import Pager from "./components/Pager/index.vue";
import Empty from "./components/Empty/index.vue";
import ImageLoader from "./components/ImageLoader/index.vue";

export default {
  name: "App",
  components: {
    Pager,
    Empty,
    ImageLoader,
  },
  data() {
    return {
      firstName: "John",
      lastName: "Doe",
      image1: require("./components/ImageLoader/origin.png"),
      image2: require("./components/ImageLoader/placeholder.png"),
    };
  },
  computed: {},
  methods: {
    handleLoaded() {
      console.log("image loaded");
    },
  },
};
</script>

<style scoped>
/* 父组件的scoped会影响子组件的根元素 */
.iconfont {
  color: green;
}

.test-empty {
  border: 1px solid red;
  width: 500px;
  height: 500px;
  background-color: #f0f0f0;
  position: relative;
}

.test-image-loader {
  width: 800px;
  height: 600px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>
