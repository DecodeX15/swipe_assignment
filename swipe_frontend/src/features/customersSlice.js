import { createSlice } from "@reduxjs/toolkit";

const initialState = []; // customers list

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    // reducers yahan add karenge
  },
});

export default customersSlice.reducer;
export const {} = customersSlice.actions;
