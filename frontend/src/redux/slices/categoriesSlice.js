import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoriesSlice = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        fetchCategories: builder.query({
            query: () => 'categories',
        }),
    }),
});

export const { useFetchCategoriesQuery } = categoriesSlice;