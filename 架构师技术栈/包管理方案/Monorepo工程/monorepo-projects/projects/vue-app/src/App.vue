<script setup lang="ts">
import { ref } from "vue";
import { sum } from "tools";

const result = sum(3, 5);
const visible = ref(false);
function closeDialog() {
  visible.value = false;
}

function clickHandle() {
  // alert('点击了按钮')
  visible.value = true;
}
</script>

<template>
  <h1>Vue Monorepo</h1>
  <p>3 + 5 = {{ result }}</p>

  <div class="row">
    <gy-button>按钮</gy-button>
    <gy-button type="primary">primary按钮</gy-button>
    <gy-button type="success">success按钮</gy-button>
    <gy-button type="info">info按钮</gy-button>
    <gy-button type="danger">danger按钮</gy-button>
    <gy-button type="warning">warning按钮</gy-button>
  </div>
  <!-- 卡片测试1 -->
  <gy-card
    imgSrc="/images/web.png"
    summary="前端主流布局系统进阶与实战，轻松解决页面布局难题"
  />

  <div class="row">
    <gy-button type="primary" @click="clickHandle">弹窗点击</gy-button>
  </div>

  <!-- 弹出框组件测试 -->
  <gy-dialog
    title="温馨提示"
    width="30vw"
    v-model:visible="visible"
    @close="closeDialog"
  >
    这是一个 Dialog 弹出框
    <template v-slot:footer>
      <gy-button @click="closeDialog">取消</gy-button>
      <gy-button type="primary" @click="closeDialog">确定</gy-button>
    </template>
  </gy-dialog>
</template>
<style scoped>
.row {
  margin-bottom: 20px;
  width: 800px;
  display: flex;
  justify-content: space-evenly;
}

.footer {
  padding: 0 8px;
  font-size: 12px;
  text-align: left;
}

.level {
  color: #9199a1;
  margin-bottom: 8px;
}

.price {
  color: #f01414;
}

.footer-java {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 0 8px;
}
</style>
