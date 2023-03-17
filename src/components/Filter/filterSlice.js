import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stateUrl:{filterUrl:''},
    // searchParams:{},
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFiltered: (state, { payload }) => {
            state.searchParams = payload;
        },

        setStateUrl(state, action){
            // console.log('payload', action.payload.filterUrl)
            state.stateUrl.filterUrl = action.payload.filterUrl
        },

        setCurentCategory(state, action){
            console.log('payload', action.payload.curentCategory)
            state.curentCategory = action.payload.curentCategory
        },

    },
});

export const {
    // setFiltered,
    setStateUrl,
    setCurentCategory
} = filterSlice.actions;

export default filterSlice.reducer;
