import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Apiconfig";

export const getAllProducts = createAsyncThunk('getAllProducts',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await API.get(`/product-list.json`);

            return response.data == null ? [] : response.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    })


export const addProduct = createAsyncThunk('addProduct',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await API.post(`/product-list.json`, payload);
            const key = response.data.name;
            return {
                [key]: payload
            };
        } catch (error) {
            if (error.response && error.response.data.error) {
                return rejectWithValue(error.response.data.error)
            } else {
                return rejectWithValue(error.message)
            }
        }
    })

export const deleteProductById = createAsyncThunk('deleteProductById',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await API.delete(`/product-list/${productId}.json`);
            return productId;
        } catch (error) {
            if (error.response && error.response.data.error) {
                return rejectWithValue(error.response.data.error)
            } else {
                return rejectWithValue(error.message)
            }
        }
    })

export const editProductById = createAsyncThunk('editProductById',
    async ({ productId, values }, { rejectWithValue }) => {
        try {

            const response = await API.patch(`/product-list/${productId}.json`, values);
            
            return {
                [productId]: values
            };
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.error) {
                return rejectWithValue(error.response.data.error)
            } else {
                return rejectWithValue(error.message)
            }
        }
    })