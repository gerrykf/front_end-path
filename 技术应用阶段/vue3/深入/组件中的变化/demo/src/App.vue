<template>
  <div class="container">
    <div class="router-list">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  setup() {
    return {};
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.router-list {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.router-list a {
  margin: 0 10px;
}
</style>
