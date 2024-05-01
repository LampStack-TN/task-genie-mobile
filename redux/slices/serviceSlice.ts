import { createSlice } from "@reduxjs/toolkit";

export const serviceSlice = createSlice({
  name: "service", // Slice name
  initialState: {}, // Initial state of the slice
  reducers: {
    //function to add/update task
    addService: (state, action) => {
      return { ...state, ...action.payload }; //Merge payload with current state
    },
  },
});

// Action creators are generated for each case reducer function
export const {addService} = serviceSlice.actions;

export default serviceSlice.reducer;