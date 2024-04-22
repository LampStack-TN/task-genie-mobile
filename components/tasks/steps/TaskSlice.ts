import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: { clientId: 1 },
  reducers: {
    setTask: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTask } = taskSlice.actions;

export default taskSlice.reducer;
