import { createSlice } from "@reduxjs/toolkit";

const initialState = { userCart: { products: [] } };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setCart: (state, { payload }) => {
      console.log(payload);
      state.userCart = payload;
    },
  },
});

export const { increment, decrement, setCart } = cartSlice.actions;

export default cartSlice.reducer;
