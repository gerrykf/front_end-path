<template>
  <div class="test-container">
    <Layout>
      <template #left>
        <div class="left-container">左侧</div>
      </template>
      <template>
        <div class="main-container">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
          debitis sunt suscipit a atque molestiae nemo asperiores ex odio non
          velit veniam maiores vel sequi, necessitatibus autem eveniet maxime
          animi.
        </div>
      </template>
      <template v-slot:right>
        <div class="right-container">右侧</div>
      </template>
    </Layout>
  </div>
</template>
<script>
import Layout from "./index.vue";
export default {
  name: "TestLayout",
  components: {
    Layout,
  },
  computed: {},
  methods: {},
};
</script>
<style lang="less" scoped>
.test-container {
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0 auto;
}

.left-container {
  width: 200px;
  height: 100%;
  background-color: #c1e3aa;
}

.main-container {
  min-width: 600px;
  flex: 0 0 auto;
  height: 100%;
  background-color: #9b9b9b;
}

.right-container {
  width: 200px;
  height: 100%;
  background-color: #f9b9b9;
}
</style>
