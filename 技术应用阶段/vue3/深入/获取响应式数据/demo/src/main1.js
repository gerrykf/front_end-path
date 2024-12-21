import { reactive, ref, watchEffect, readonly, computed } from "vue";

const state = reactive({
  firstName: "Xu Ming",
  lastName: "Deng",
});

const fullName = computed(() => {
  console.log("fullName-changed");
  return state.lastName + "" + state.firstName;
});
console.log("state ready"); //state ready
console.log("fullName is", fullName.value); //Deng Xu Ming
console.log("fullName is", fullName.value); //Deng Xu Ming

const imState = readonly(state);
console.log(imState === state); // false

const stateRef = ref(state);
console.log(stateRef.value === state); // true

state.firstName = "Cheng";
state.lastName = "Ji";

console.log(imState.firstName, imState.lastName); //Cheng Ji
console.log("fullName is", fullName.value); // Ji Cheng
console.log("fullName is", fullName.value); // Ji Cheng

const imState2 = readonly(stateRef);
console.log(imState2 === stateRef); // false

/**
 * 代码解读：
 * 1. reactive 创建一个响应式对象 state
 * 2. computed 创建一个计算属性 fullName,只在使用的时候才会计算，并且会缓存计算结果
 * 3. readonly 创建一个只读对象 imState ，拿到的是一个新的代理对象 所以 imState !== state
 * 4. ref 创建一个引用对象 stateRef ，ref()的入参是一个代理对象，它会赋值到{value..}上面 所以 stateRef.value === state
 * 5. state.firstName = "Cheng"; state.lastName = "Ji"; 修改state的值，imState 和 fullName 都会更新，因为响应式数据会通知依赖的地方更新
 * 6. imState2 是一个只读对象，拿到的是一个新的代理对象，而stateRef时一个{value..}对象，
 * 只有imState2 === stateRef.value让两个代理对象的引用做对比才成立，所以 imState2 !== stateRef
 */
