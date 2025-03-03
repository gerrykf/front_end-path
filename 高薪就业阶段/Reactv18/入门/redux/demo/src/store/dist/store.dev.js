"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _redux = require("redux");

var _reducers = require("./reducers");

/**
 * store.js
 * 1. 引入 createStore 方法
 * 2. 引入 reducer
 * 3. 创建 store 对象
 * 4. 导出 store 对象
 */
var store = (0, _redux.createStore)(_reducers.todoReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
exports.store = store;