import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "registerData", // Slice name
  initialState: {}, // Initial state of the slice
  reducers: {
    //function to add/update task
    appendData: (state, action) => {
      return { ...state, ...action.payload }; //Merge payload with current state
    },
  },
});

// Action creators are generated for each case reducer function
export const { appendData } = registerSlice.actions;

export default registerSlice.reducer;
