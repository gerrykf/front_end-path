import { defineAsyncComponent, h } from "vue";
import Loading from "../components/Loading.vue";
import Error from "../components/Error.vue";
import "nprogress/nprogress.css";
import NProgress from "nprogress";

export function delay(duration = 0) {
  if (!duration) {
    duration = random(1000, 5000);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(() => void 0);
    }, duration);
  });
}

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 获取异步页面
 * @param name
 * @returns
 */
export function getAsyncPage(name) {
  return defineAsyncComponent({
    loader: async () => {
      NProgress.settings.showSpinner = false;
      NProgress.start();
      NProgress.done();
      return import(`../views/${name}.vue`);
    },
    loadingComponent: Loading,
  });
}

/**
 * 获取异步组件
 * @param name
 * @returns
 */
export function getAsyncComponent(name) {
  return defineAsyncComponent({
    loader: async () => {
      await delay();
      const value = Math.random();
      console.log(value);
      if (value < 0.5) {
        throw new TypeError("加载失败");
      }
      return import(`../components/${name}.vue`);
    },
    loadingComponent: Loading,
    errorComponent: {
      render() {
        return h(Error, {}, "加载失败");
      },
    },
  });
}
