<template>
  <div class="image-loader-container">
    <img
      class="placeholder"
      :src="placeholder"
      alt=""
      v-if="!everyThingLoaded"
    />
    <img
      class="origin"
      :src="src"
      alt=""
      @load="handleLoad"
      :style="{
        opacity: originOpacity,
        transition: `opacity ${duration}ms`,
      }"
    />
  </div>
</template>
<script>
export default {
  name: "ImageLoader",
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  components: {},
  data() {
    return {
      loaded: false, // 原图是否加载完成
      everyThingLoaded: false, // 所有图片是否加载完成
    };
  },
  computed: {
    originOpacity() {
      return this.loaded ? 1 : 0;
    },
  },
  methods: {
    handleLoad() {
      this.loaded = true;
      this.$emit("load");
      setTimeout(() => {
        this.everyThingLoaded = true;
      }, this.duration);
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/styles/mixin.less";
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(10px);
  }
  .origin {
    opacity: 0;
  }
}
</style>
