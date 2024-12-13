<script setup lang="ts">
import { ref } from "vue";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { post } from "@/utils/http";
import router from "@/router";

const loginForm = ref({
  username: "",
  password: "",
});

const loginRules = ref({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const login = async () => {
  console.log("loginForm:", loginForm);
  const res = await post("/api/user/login", loginForm.value);
  console.log("res:", res);
  if (res.errno === 0) {
    ElMessage({
      message: "登录成功",
      type: "success",
    });
    router.push("/");
  }
};
</script>
<template>
  <div class="login-container">
    <h2>登录</h2>

    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped lang="scss">
.login-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }

  .el-form-item {
    margin-bottom: 20px;
  }

  .el-button {
    width: 100%;
  }

  .el-input {
    width: 100%;
  }

  .el-form-item__label {
    text-align: left;
  }

  .el-form-item__content {
    text-align: left;
  }

  .el-form-item__error {
    text-align: left;
  }

  .el-form-item__error-message {
    text-align: left;
  }

  .el-form-item__error-message {
    text-align: left;
  }

  .el-form-item__error-message {
    text-align: left;
  }
}
</style>
