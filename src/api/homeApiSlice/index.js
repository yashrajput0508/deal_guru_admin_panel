import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const homeApiSlice = createApi({
    reducerPath: 'homeApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: builder => ({
        getUserClicked: builder.query({
            query: () => '/userClicked.json'
        }),
        getMessages: builder.query({
            query: () => '/message.json'
        })
    })
})

export const { useGetUserClickedQuery, useGetMessagesQuery } = homeApiSlice;
