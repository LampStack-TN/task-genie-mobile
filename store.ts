import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./components/tasks/steps/TaskSlice";

export default configureStore({
  reducer: { task: taskReducer },
});
