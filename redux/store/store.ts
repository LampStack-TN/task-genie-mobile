import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../slices/TaskSlice";
import registerReducer from "../slices/registerSlice";
import userReducer from "../slices/userSlice";
import serviceReducer from "../slices/serviceSlice";

export default configureStore({
  reducer: {
    task: taskReducer,
    registerData: registerReducer,
    user: userReducer,
    service: serviceReducer,
  },
});
