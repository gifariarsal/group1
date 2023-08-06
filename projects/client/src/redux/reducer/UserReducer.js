import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cashier: [],
};

export const UserReducer = createSlice({
    name: "UserReducer",
    initialState,
    reducers: {
        setCashier: (state, action) => {
            state.cashier = action.payload;
        },
    },
});

export const getCashier = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:8000/api/cashier");
      dispatch(setCashier(res.data.data));
    } catch (error) {
      console.log("Failed to fetch categories:", error);
    }
  };
};

export const { setCashier } = UserReducer.actions;

export default UserReducer.reducer;