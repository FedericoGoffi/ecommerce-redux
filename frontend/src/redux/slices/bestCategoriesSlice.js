import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bestCategoriesSlice = createApi({
    reducerPath: 'bestCategoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        fetchBestCategories: builder.query({
            query: () => 'bestCategories',
        }),
    }),
});

export const { useFetchBestCategoriesQuery } = bestCategoriesSlice