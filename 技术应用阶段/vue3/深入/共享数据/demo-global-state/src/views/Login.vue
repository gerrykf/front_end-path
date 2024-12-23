<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { loginUserStore, login } from "../store/useLoginUser";

export default {
  name: "Login",
  setup() {
    const loginId = ref("");
    const loginPwd = ref("");
    const router = useRouter();

    const handleSubmit = async () => {
      const res = await login(loginId.value, loginPwd.value);
      if (res) {
        confirm("登录成功");
        router.push("/");
      } else {
        confirm("登录失败");
      }
    };

    return {
      loginId,
      loginPwd,
      handleSubmit,
      loading: computed(() => loginUserStore.Loading),
    };
  },
};
</script>
<template>
  <div class="container">
    <!-- 写一个登录页 -->
    <div class="login">
      <h1>登录</h1>
      <input type="text" v-model="loginId" placeholder="请输入用户名" />
      <input type="password" v-model="loginPwd" placeholder="请输入密码" />
      <button @click="handleSubmit">
        {{ loading ? "Loading..." : "登录" }}
      </button>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login h1 {
  text-align: center;
}

.login input {
  width: 100%;
  margin: 10px 0;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login button {
  width: 100%;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background-color: #409eff;
  color: #fff;
}

.login button:hover {
  background-color: #66b1ff;
}
</style>
