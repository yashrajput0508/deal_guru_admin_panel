import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Apiconfig";


export const getAllProductCategories = createAsyncThunk('getAllProductCategories',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await API.get(`/product-categories.json`);

            return response.data==null?[]:response.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    })

    export const addProductCategory = createAsyncThunk('addProductCategory',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await API.post(`/product-categories.json`,payload);
            const key = response.data.name;
            return {
                [key]:payload
            };
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    })
