import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
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
  },
  reducers: {
    addList: (state, action) => {
      state.list.push(action.payload);
    },
    deleteList: (state, action) => {
      state.list = state.list.filter(
        (_item, index) => index !== action.payload
      );
    },
    change: (state, action) => {
      state.list = state.list.map((item, index) => {
        if (index === action.payload) {
          item.status = !item.status;
        }
        return item;
      });
    },
  },
});

export const { addList, deleteList, change } = todoSlice.actions;

export default todoSlice.reducer;
