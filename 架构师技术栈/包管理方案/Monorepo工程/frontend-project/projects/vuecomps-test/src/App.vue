<script setup lang="ts">
import { ref } from 'vue'

const handleClick = (e: Event) => {
  console.log('click', e)
  alert('click')
}

const showDialog = ref(false)

const handleShow = () => {
  showDialog.value = true
}
</script>

<template>
  <div class="container">
    <p>公司内部组件</p>
    <div class="button-container">
      <div>
        <p>按钮</p>
        <h1>基本用法</h1>
        <gy-button type="primary" @click="handleClick">按钮</gy-button>
        <gy-button type="success">按钮</gy-button>
        <gy-button type="info">按钮</gy-button>
        <gy-button type="warning">按钮</gy-button>
        <gy-button type="danger">按钮</gy-button>
      </div>
      <div>
        <gy-button type="primary" plain>按钮</gy-button>
        <gy-button type="success" plain>按钮</gy-button>
        <gy-button type="info" plain>按钮</gy-button>
        <gy-button type="warning" plain>按钮</gy-button>
        <gy-button type="danger" plain>按钮</gy-button>
      </div>
      <div>
        <gy-button type="primary" round>按钮</gy-button>
        <gy-button type="success" round>按钮</gy-button>
        <gy-button type="info" round>按钮</gy-button>
        <gy-button type="warning" round>按钮</gy-button>
        <gy-button type="danger" round>按钮</gy-button>
      </div>
      <div>
        <gy-button type="primary" cicle>钮</gy-button>
        <gy-button type="success" cicle>钮</gy-button>
        <gy-button type="info" cicle>钮</gy-button>
        <gy-button type="warning" cicle>钮</gy-button>
        <gy-button type="danger" cicle>钮</gy-button>
      </div>
      <div>
        <gy-button type="primary" disabled>按钮</gy-button>
        <gy-button type="success" disabled>按钮</gy-button>
        <gy-button type="info" disabled>按钮</gy-button>
        <gy-button type="warning" disabled>按钮</gy-button>
        <gy-button type="danger" disabled>按钮</gy-button>
      </div>
    </div>

    <div class="card-container">
      <p>卡片</p>
      <h1>基本用法</h1>
      <gy-card
        imgSrc="https://img.yzcdn.cn/vant/cat.jpeg"
        :width="300"
        :imgHeight="100"
        summary="这是一只猫"
      >
        <template #footer>
          <gy-button type="primary">查看更多</gy-button>
        </template>
      </gy-card>
    </div>

    <div class="dialog-container">
      <p>弹窗</p>
      <h1>基本用法</h1>
      <gy-button type="primary" round @click="handleShow">打开弹窗</gy-button>
      <gy-dialog v-model:show="showDialog"></gy-dialog>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  h1 {
    margin-bottom: 20px;
    font-size: 24px;
  }
  p {
    margin: 10px 0;
    font-size: 16px;
  }
}

.button-container {
  display: flex;
  flex-direction: column;

  div {
    margin: 10px 0;
  }
  button {
    margin: 0 6px;
  }
}

.dialog-container {
  margin-top: 20px;
}
</style>
