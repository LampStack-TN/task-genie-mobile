import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task", // Slice name
  initialState: { clientId: 10006}, // Initial state of the slice
  reducers: {

    //function to add/update task
    addTask: (state, action) => {
      return { ...state, ...action.payload };//Merge payload with current state
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
