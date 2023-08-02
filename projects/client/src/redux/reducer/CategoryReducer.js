import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  category: [],
};

export const CategoryReducer = createSlice({
  name: "CategoryReducer",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.category = action.payload;
    },
    addCategory: (state, action) => {
      state.category.push(action.payload);
    },
  },
});

export const makeCategory = (data) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`http://localhost:8000/api/category`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(addCategory(res.data.data));
      console.log("Category created successfully!");
    } catch (error) {
      console.log("Failed to create category:", error);
    }
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:8000/api/category");
      dispatch(setCategories(res.data.data));
    } catch (error) {
      console.log("Failed to fetch categories:", error);
    }
  };
};

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:8000/api/category");
      dispatch(setCategories(res.data.data));
    } catch (error) {
      console.log("Failed to fetch categories:", error);
    }
  };
};

export const { setCategories, addCategory } = CategoryReducer.actions;

export default CategoryReducer.reducer;
