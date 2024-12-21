import { reactive, toRefs, isProxy, isRef } from "vue";
const state = reactive({
  foo: 1,
  bar: 2,
});

const stateAsRefs = toRefs(state);

console.log(stateAsRefs.foo.value); // 1
console.log(stateAsRefs.bar.value); // 2

console.log(isProxy(stateAsRefs.foo)); // false
console.log(isRef(stateAsRefs.foo)); // false
