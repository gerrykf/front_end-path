import { reactive, readonly } from "vue";
import * as userServ from "../api/user";
//创建默认的全局单例响应式数据，仅供模块内部使用
const state = reactive({ user: null, Loading: false });
// 对外暴漏的数据是只读的，不能直接修改
// 也可以进一步使用toRefs进行封装，从而避免解构或展开后响应式丢失
export const loginUserStore = readonly(state);

export async function login(username, password) {
  state.Loading = true;
  const user = await userServ.login(username, password);
  state.user = user;
  state.Loading = false;
  return user;
}

export async function logout() {
  state.Loading = true;
  await userServ.logout();
  state.user = null;
  state.Loading = false;
}

export async function whoAmI() {
  state.Loading = true;
  const user = await userServ.whoAmI();
  state.user = user;
  state.Loading = false;
}
