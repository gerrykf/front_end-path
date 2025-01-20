/**
 * 1. reducer 是一个纯函数，接收旧的 state 和 action，返回新的 state
 * 2. reducer 里面不能做异步操作，不能进行 API 请求，不能直接操作 DOM
 * 3 reducer 里面不能修改 state，只能返回一个新的 state
 */

import { ADD, DELETE, CHANGE } from "./actionTypes";

const defaultState = {
  list: [
    {
      id: 1,
      content: "学习 React",
    },
    {
      id: 2,
      content: "学习 Redux",
    },
    {
      id: 3,
      content: "学习 React-Redux",
    },
  ],
};

export function todoReducer(state = defaultState, action) {
  // console.log("reducer", state, action);
  switch (action.type) {
    case ADD:
      return {
        list: [...state.list, action.data],
      };
    case DELETE:
      return {
        list: state.list.filter((_item, index) => index !== action.data),
      };
    case CHANGE:
      return {
        list: state.list.map((item, index) => {
          if (index === action.data) {
            item.status = !item.status;
          }
          return item;
        }),
      };
    default:
      return state;
  }
}
