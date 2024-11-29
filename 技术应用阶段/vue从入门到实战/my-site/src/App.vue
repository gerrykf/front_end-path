<template>
  <div id="app" class="app-container">
    <Layout>
      <template v-slot:left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <template>
        <div class="main-container">
          <RouterView />
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "./components/Layout/index.vue";
import SiteAside from "./components/SiteAside/index.vue";
export default {
  name: "App",
  components: {
    Layout,
    SiteAside,
  },
  data() {
    return {
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

<style scoped lang="less">
@import "./styles/var.less";
@import "./styles/mixin.less";

.app-container {
  .self-fill(fixed);

  .aside {
    width: 250px;
    height: 100%;
    background-color: @dark;
  }
}
</style>
