import { defineStore } from "pinia";
import { reactive, computed } from "vue";

export const useTodoListStore = defineStore("todoList", () => {
  // 组合式 API

  // 创建仓库数据
  const todoList = reactive({
    items: [
      {
        text: "学习 Vue 3",
        isCompleted: false,
      },
      {
        text: "学习 Pinia",
        isCompleted: false,
      },
      {
        text: "学习 Vue Router",
        isCompleted: false,
      },
    ],
    count: 0,
  });

  const doubleCount = computed(() => todoList.count * 2);

  const addTodo = (text) => {
    todoList.items.push({
      text,
      isCompleted: false,
    });
  };

  const toggleCompleted = (index) => {
    todoList.items[index].isCompleted = !todoList.items[index].isCompleted;
  };

  const removeTodo = (index) => {
    todoList.items.splice(index, 1);
  };

  return {
    todoList,
    doubleCount,
    addTodo,
    toggleCompleted,
    removeTodo,
  };
});
