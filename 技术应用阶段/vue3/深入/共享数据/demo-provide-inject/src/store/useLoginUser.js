import { reactive, readonly, provide, inject } from "vue";
import * as userServ from "../api/user";
const key = Symbol();

export function provideStore(app) {
  const state = reactive({ user: null, loading: false });

  async function login(username, password) {
    state.loading = true;
    state.user = await userServ.login(username, password);
    state.loading = false;
    return state.user;
  }

  async function logout() {
    state.loading = true;
    await userServ.logout();
    state.user = null;
    state.loading = false;
  }

  async function whoAmI() {
    state.loading = true;
    state.user = await userServ.whoAmI();
    state.loading = false;
    return state.user;
  }

  app.provide(key, {
    state: readonly(state),
    login,
    logout,
    whoAmI,
  });
}

export function useStore(defaultValue = null) {
  return inject(key, defaultValue);
}
