import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        fetchProductsByCategory: builder.query({
            query: (categoryName) => `searchCategories/category/${categoryName}`,
        }),
    }),
});

export const { useFetchProductsByCategoryQuery } = productsApi;