import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

export default configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todoReducer`
    todos: todoReducer,
  },
});
