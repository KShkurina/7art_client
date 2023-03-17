import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const modalSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = modalSlice.actions;

export default modalSlice.reducer;
