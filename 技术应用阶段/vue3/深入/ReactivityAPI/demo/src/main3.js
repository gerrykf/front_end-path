import { reactive, readonly } from "vue";

function useDebounce(obj, duration) {
  // 在这里补全函数
  const valueState = reactive(obj);
  const value = readonly(valueState);
  let timer = null;
  const setValue = (newObj) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      console.log("newObj", newObj);
      for (let key in newObj) {
        valueState[key] = newObj[key];
      }
    }, duration);
  };

  return {
    value, // 这里是一个只读对象，响应式数据，默认值为参数值
    setValue, // 这里是一个函数，传入一个新的对象，需要把新对象中的属性混合到原始对象中，混合操作需要在duration的时间中防抖
  };
}

const { value, setValue } = useDebounce({ name: "Xu Ming" }, 2000);

console.log(value); // {name: "Xu Ming"}
setValue({ name: "Deng" });
// 这两秒期间，不会触发value的更新
console.log(value); // {name: "Xu Ming"}
setTimeout(() => {
  console.log(value); // {name: "Deng"}
}, 3000);
