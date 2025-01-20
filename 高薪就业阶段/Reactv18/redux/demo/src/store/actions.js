/**
 * 生产action对象的工厂函数
 */

import { ADD, DELETE, CHANGE } from "./actionTypes";

export function addListAction(data) {
  return {
    type: ADD,
    data: {
      id: Date.now(),
      content: data,
    },
  };
}

export function deleteListAction(data) {
  return {
    type: DELETE,
    data,
  };
}

export function changeAction(data) {
  return {
    type: CHANGE,
    data,
  };
}
