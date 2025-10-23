import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { errorReducer } from "./errorReducer";



const initialState = {
};

export const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer,
    },
    preloadedState: initialState,
});

export default store;