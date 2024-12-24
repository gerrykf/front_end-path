<template>
  <div class="container">
    <!-- 添加新的待办事项 -->
    <div class="input-container">
      <input
        class="numInput"
        type="text"
        v-model="inputValue"
        placeholder="请输入待办事项"
      />
      <button class="btn" @click="addTodoItem">添加</button>
    </div>
    {{ doubleCount }}
    <!-- 待办事项列表 -->
    <div class="list">
      <div class="item" v-for="(item, index) in todoList.items" :key="index">
        <div :class="{ del: item.isCompleted }" @click="toggleComplete(index)">
          {{ item.text }}
        </div>
        <span class="close" @click="delTodo(index)">X</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useTodoListStore } from "../store/useTodoListStore";
import { ref, computed } from "vue";
import { storeToRefs } from "vpinia";

const store = useTodoListStore();
const { todoList, doubleCount } = storeToRefs(store);
const { addTodo, toggleCompleted, removeTodo } = store;
const inputValue = ref("");

const addTodoItem = () => {
  if (inputValue.value.trim() === "") {
    return;
  }
  addTodo(inputValue.value);
  inputValue.value = "";
};

const toggleComplete = (index) => {
  toggleCompleted(index);
};

const delTodo = (index) => {
  window.confirm(`确定删除${todoList.value.items[index].text}吗？`) &&
    removeTodo(index);
};
</script>

<style scoped>
.container {
  width: 300px;
  margin: 20px auto;
}

.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.numInput {
  width: 200px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
}

.btn {
  width: 20%;
  cursor: pointer;
}

.list {
  margin-top: 20px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  font-size: 20px;
  cursor: pointer;
}

.close {
  width: 20px;
  height: 20px;

  line-height: 20px;
  text-align: center;
  font-size: 12px;
  border-radius: 4px;
  background-color: rgb(243, 83, 83);
  color: #fff;
  font-weight: 400;
  cursor: pointer;
}
.del {
  text-decoration: line-through;
}
</style>
