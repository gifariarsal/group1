import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducer/AuthReducer";
import CategoryReducer from "./reducer/CategoryReducer";

export const store = configureStore({
    reducer: {
        AuthReducer: AuthReducer,
        CategoryReducer: CategoryReducer,
    },
});