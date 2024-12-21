import { reactive, toRef } from "vue";

const state = reactive({
  foo: 1,
  bar: 2,
});

const fooRef = toRef(state, "foo"); // fooRef:{value: ...}

fooRef.value++;
console.log(state.foo); // 2

state.foo++;
console.log(fooRef.value); // 3
