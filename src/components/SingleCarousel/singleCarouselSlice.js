import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: [] };


export const singleCarousel = createSlice({
  name: "singleCarousel",
  initialState,
  reducers: {
    setSingleCarousel: (state, { payload }) => {
      console.log(payload);
      state.products = payload;
    },
  },
});

export const { setSingleCarousel } = singleCarousel.actions;

export default singleCarousel.reducer;