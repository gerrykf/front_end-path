import { reactive, readonly } from "vue";

function useUser() {
  const userState = reactive({});
  const user = readonly(userState);

  const setUserName = (name) => {
    userState.name = name;
  };

  const setUserAge = (age) => {
    userState.age = age;
  };
  return {
    user, // 这是一个只读的用户对象，响应式数据，默认为一个空对象
    setUserName, // 这是一个函数，传入用户姓名，用于修改用户的姓名
    setUserAge, // 这是一个函数，传入用户年龄，用于修改用户的年龄
  };
}

const { user, setUserName, setUserAge } = useUser();

console.log(user); // {}
setUserName("Xu Ming");
setUserAge(18);
console.log(user); // {name: "Xu Ming", age: 18}

/**
 * 代码解读：
 * userState的属性值是响应式数据，当属性值发生变化时，会通知依赖的地方更新
 * user是一个只读对象，只能读取属性值，不能修改属性值
 * 但是可以通过setUserName和setUserAge方法修改属性值
 * 会触发user响应式数据的更新
 */
