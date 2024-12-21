import { reactive, ref, watch, watchEffect } from "vue";

const state = reactive({ a: 1, b: 2, c: 3 });
const countRef = ref(0);

watchEffect(() => {
  // 首先会立即执行一次，同时收集依赖state.a
  console.log("watchEffect", state.a, countRef.value); // 2
});

// 依赖项变化时，会触发回调函数执行
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;

countRef.value++;
countRef.value++;
countRef.value++;
countRef.value++;
countRef.value++;
countRef.value++;
// watchEffect 是的执行任务是放在微队列中的，所以会在同步任务执行完后执行
// watchEffect 2 6 多次修改state.a和countRef.value，只会触发一次watchEffect的回调函数
