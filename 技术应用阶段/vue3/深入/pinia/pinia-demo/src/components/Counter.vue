<template>
  <div class="container">
    <p class="group-title">普通增加</p>
    <div class="btn-group">
      <button class="btn" @click="decrement">-</button>
      <div class="num">{{ count }}</div>
      <button class="btn" @click="increment">+</button>
    </div>

    <p class="group-title">Getters数据</p>
    <div class="btn-group">
      <button class="btn" @click="decrement">-</button>
      <div class="num">{{ doubleCount }}</div>
      <button class="btn" @click="increment">+</button>
    </div>

    <p class="group-title">异步的增加</p>
    <div class="btn-group">
      <button class="btn" @click="decrementAsync">-</button>
      <div class="num">{{ count }}</div>
      <button class="btn" @click="incrementAsync">+</button>
    </div>

    <p class="group-title">store.$reset</p>
    <div class="btn-group">
      <button class="btn-mid" @click="store.$reset">重置</button>
    </div>

    <p class="group-title">store.$patch</p>
    <div class="btn-group">
      <input type="text" v-model="newCount" />
      <button class="btn-mid" @click="setHandle">设置</button>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../store/useCounterStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const store = useCounterStore();
const { count, doubleCount } = storeToRefs(store);
const { increment, decrement, incrementAsync, decrementAsync } = store;

const newCount = ref("");

const setHandle = () => {
  store.$patch({ count: ~~newCount.value });
  newCount.value = "";
};
</script>
<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.group-title {
  font-size: 20px;
  margin-top: 20px;
}

.btn-group {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.btn {
  width: 30px;
  height: 30px;
  line-height: 25px;
  text-align: center;
  background-color: #f0f0f0;
  cursor: pointer;
  border-radius: 5px;
}

.btn-mid {
  margin: 0 10px;
  width: 50px;
}

.btn:hover {
  background-color: #e0e0e0;
}

.num {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 0 10px;
}
</style>
