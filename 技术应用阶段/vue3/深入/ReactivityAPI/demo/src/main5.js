import { reactive, ref, watch, watchEffect } from "vue";

const state = reactive({ a: 1, b: 2, c: 3 });
const countRef = ref(0);

watch([() => state.a, countRef], ([new1, new2], [old1, old2]) => {
  console.log("watch---新", new1, new2, "旧--", old1, old2);
});

// 依赖项变化时，会触发回调函数执行
state.a++;
countRef.value++;
