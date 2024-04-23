import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./components/tasks/steps/TaskSlice";
import registerReducer from "./components/auth/register/registerSlice";

export default configureStore({
  reducer: { task: taskReducer, registerData: registerReducer },
});
