import { reactive, watch, watchEffect } from "vue";

const state = reactive({
  count: 0,
});

watchEffect(() => {
  console.log("watchEffect", state.count);
});

watch(
  () => state.count,
  (count, oldVal) => {
    console.log("watch", count, oldVal);
  }
);

console.log("start");

setTimeout(() => {
  console.log("setTimeout");
  state.count++;
  state.count++;
});

state.count++;
state.count++;

console.log("end");

/**
 * 输出结果：
 * 1. watchEffect 0
 * 2. start
 * 3. end
 * 4. watchEffect 2
 * 5. watch 2 0
 * 6. setTimeout
 * 7. watchEffect 4
 * 8. watch 4 2
 */

/**
 * 代码解读：
 * 1. watchEffect 会立即执行一次，同时收集依赖 state.count
 * 2. watchEffect 会在同步任务执行完后执行
 * 3. watch 会在同步任务执行完后执行
 * 4. setTimeout 是宏任务，会在微任务(watchEffct、watch)执行完后执行
 * 5. 监听函数不管改变多少次，只会触发一次
 */
