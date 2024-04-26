import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userData", // Slice name
  initialState: null, // Initial state of the slice
  reducers: {
    //function to add/update task
    setUser: (state, action) => {
      return action.payload; //Merge payload with current state
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
