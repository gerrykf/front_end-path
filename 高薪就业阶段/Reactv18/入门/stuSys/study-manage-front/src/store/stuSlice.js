import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStuList } from "../api/stu";

export const getStuListAsync = createAsyncThunk(
  "stu/getStuListAsync",
  async (_, thunkApi) => {
    getStuList().then((res) => {
      console.log("res", res);
      thunkApi.dispatch(initStuList(res.data));
    });
  }
);

export const stuSlice = createSlice({
  name: "stu",
  initialState: {
    stuList: [],
    detail: {},
  },
  reducers: {
    initStuList: (state, action) => {
      state.stuList = action.payload;
    },
    getDetail(state, { payload }) {
      const { id } = payload;
      state.detail = state.stuList.find((item) => item.id === id);
    },
    addStu: (state, action) => {
      state.stuList.push(action.payload);
    },
    deleteStu: (state, action) => {
      state.stuList = state.stuList.filter(
        (_item, index) => index !== action.payload
      );
    },
    changeStu: (state, action) => {
      state.stuList = state.stuList.map((item, index) => {
        if (index === action.payload) {
          item.status = !item.status;
        }
        return item;
      });
    },
  },
});

export const { initStuList, getDetail, addStu, deleteStu, changeStu } =
  stuSlice.actions;

export default stuSlice.reducer;
