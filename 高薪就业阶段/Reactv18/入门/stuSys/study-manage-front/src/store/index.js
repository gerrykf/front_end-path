import { configureStore } from "@reduxjs/toolkit";
import stuReducer from "./stuSlice";

export default configureStore({
  reducer: {
    // Define a top-level state field named `stu`, handled by `stuReducer`
    stu: stuReducer,
  },
});
