import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../slices/TaskSlice";
import registerReducer from "../slices/registerSlice";
import userReducer from "../slices/userSlice";

export default configureStore({
  reducer: {
    task: taskReducer,
    registerData: registerReducer,
    user: userReducer,
  },
});
