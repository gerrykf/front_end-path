/**
 * store.js
 * 1. 引入 createStore 方法
 * 2. 引入 reducer
 * 3. 创建 store 对象
 * 4. 导出 store 对象
 */

import { createStore } from "redux";
import { todoReducer } from "./reducers";

export const store = createStore(
  todoReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
