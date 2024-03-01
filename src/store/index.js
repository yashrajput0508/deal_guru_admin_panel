import { configureStore } from "@reduxjs/toolkit";
import productCategorySlice from "./features/productCategory/productCategorySlice";
import productSlice from "./features/product/productSlice";
import { homeApiSlice } from "../api/homeApiSlice";

export default configureStore({
    reducer: {
        productCategory: productCategorySlice,
        product: productSlice,
        [homeApiSlice.reducerPath]: homeApiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(homeApiSlice.middleware)
})