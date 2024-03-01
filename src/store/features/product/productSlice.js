import { createSlice } from "@reduxjs/toolkit";
import { status } from "../../../constants/contants";
import { addProduct, deleteProductById, editProductById, getAllProducts } from "./productActions";

const productSlice = createSlice({
    name: 'product',
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
        editData: {
            currentStatus: status.IDLE,
            error: '',
            successMessage: ''
        },
        deleteData: {
            currentStatus: status.IDLE,
            error: '',
            successMessage: 'Successfully deleted product'
        }
    },
    reducers: {
        resetAddDataStatus: state => {
            state.addData.currentStatus = status.IDLE;
            state.addData.error = '';
            state.addData.successMessage = '';
        },
        resetDeleteDataStatus: state => {
            state.deleteData.currentStatus = status.IDLE;
            state.deleteData.error = '';
            state.deleteData.successMessage = '';
        },
        resetEditDataStatus: state => {
            state.editData.currentStatus = state.IDLE;
            state.editData.error = '';
            state.editData.successMessage = '';
        }
    },
    extraReducers(builder) {
        builder
            // get all products
            .addCase(getAllProducts.pending, (state, action) => {
                state.getData.currentStatus = status.LOADING
                state.getData.error = '';
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.getData.currentStatus = status.SUCCEEDED
                state.getData.data = action.payload;
                state.getData.error = '';
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.getData.currentStatus = status.FAILED
                state.getData.error = action.error.message
            })

            // add product
            .addCase(addProduct.pending, (state) => {
                state.addData.currentStatus = status.LOADING;
                state.addData.error = '';
                state.addData.successMessage = '';
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.addData.currentStatus = status.SUCCEEDED;
                state.getData.data = { ...state.getData.data, ...action.payload };
                state.addData.successMessage = 'Product added successfully';
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.addData.currentStatus = status.FAILED;
                state.addData.error = action.error.message;
            })

            // delete product
            .addCase(deleteProductById.pending, (state) => {
                state.deleteData.currentStatus = status.LOADING;
                state.deleteData.error = '';
                state.deleteData.successMessage = '';
            })
            .addCase(deleteProductById.fulfilled, (state, action) => {
                state.deleteData.currentStatus = status.SUCCEEDED;
                const { [action.payload]: removedEntry, ...newData } = state.getData.data;
                state.getData.data = newData;
            })
            .addCase(deleteProductById.rejected, (state, action) => {
                state.deleteData.currentStatus = status.FAILED;
                state.deleteData.error = action.error.message;
            })

            // edit product
            .addCase(editProductById.pending, (state) => {
                state.editData.currentStatus = status.LOADING;
                state.editData.error = '';
                state.editData.successMessage = '';
            })
            .addCase(editProductById.fulfilled, (state, action) => {
                state.editData.currentStatus = status.SUCCEEDED;
                
                const keyToReplace = Object.keys(action.payload)[0];
                const newData = { ...state.getData.data, [keyToReplace]: action.payload[keyToReplace] };

                state.getData.data = newData;

                state.editData.successMessage = 'Successfully Edited the data';
            })
            .addCase(editProductById.rejected, (state, action) => {
                state.editData.currentStatus = status.FAILED;
                state.editData.error = action.error.message;
            });
    }
})

export const { resetAddDataStatus, resetDeleteDataStatus, resetEditDataStatus } = productSlice.actions;
export default productSlice.reducer;