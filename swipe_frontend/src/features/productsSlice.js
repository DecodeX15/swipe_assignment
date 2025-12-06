import { createSlice } from "@reduxjs/toolkit";

const initialState = []; // products list

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // reducers yahan add karenge
    },
});

export default productsSlice.reducer;
export const { } = productsSlice.actions;
