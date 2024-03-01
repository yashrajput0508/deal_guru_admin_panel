import { createSlice } from "@reduxjs/toolkit"
import { addProductCategory, getAllProductCategories } from "./productCategoryActions"
import { status } from "../../../constants/contants"

const productCategorySlice = createSlice({
    name: 'productCategory',
    initialState: {
        getData: {
            data: [],
            currentStatus: status.IDLE,
            error: '',
        },
        addData: {
            currentStatus: status.IDLE,
            error: '',
            successMessage: '',
        },
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllProductCategories.pending, (state, action) => {
                state.getData.currentStatus = status.LOADING
                state.getData.error = '';
            })
            .addCase(getAllProductCategories.fulfilled, (state, action) => {
                state.getData.currentStatus = status.SUCCEEDED
                state.getData.data = action.payload;
                state.getData.error = '';
            })
            .addCase(getAllProductCategories.rejected, (state, action) => {
                state.getData.currentStatus = status.FAILED
                state.getData.error = action.error.message
            })

            .addCase(addProductCategory.pending, (state) => {
                state.addData.currentStatus = status.LOADING;
                state.addData.error = '';
                state.addData.successMessage = '';
            })
            .addCase(addProductCategory.fulfilled, (state, action) => {
                state.addData.currentStatus = status.SUCCEEDED;
                state.getData.data = {...state.getData.data, ...action.payload};
                state.addData.successMessage = 'Product category added successfully';
            })
            .addCase(addProductCategory.rejected, (state, action) => {
                state.addData.currentStatus = status.FAILED;
                state.addData.error = action.error.message;
            });
    }
})

// export const {} = productCategorySlice.actions;
export default productCategorySlice.reducer;