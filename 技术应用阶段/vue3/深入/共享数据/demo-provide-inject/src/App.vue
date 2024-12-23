<template>
  <div class="nav">
    <router-link to="/">Home</router-link>

    <span v-if="state.loading">Loading...</span>
    <template v-else-if="state.user">
      <span>{{ state.user.loginId }}</span>
      <a class="ml-5" href="" @click="state.logout">退出</a>
    </template>
    <router-link v-else to="/login">登录</router-link>
  </div>
  <router-view />
</template>

<script>
import { computed, provide, ref } from "vue";
import { useStore } from "./store/useLoginUser";
export default {
  name: "App",
  components: {},
  setup() {
    provide("foo", ref(1));
    return {
      ...useStore(),
    };
  },
};
</script>
<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #409eff;
  color: #fff;
}

.nav a {
  color: #fff;
  text-decoration: none;
}

.nav a:hover {
  color: #66b1ff;
}

.nav span {
  margin-right: 10px;
}

.ml-5 {
  margin-left: 5px;
}
</style>
