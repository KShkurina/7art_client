import { createSlice } from "@reduxjs/toolkit";

const initialState = {

};

export const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        setCard: (state, { payload }) => {
            state.Card = payload;
        }
    },
});

export const {
    setCard
} = cardSlice.actions;

export default cardSlice.reducer;
