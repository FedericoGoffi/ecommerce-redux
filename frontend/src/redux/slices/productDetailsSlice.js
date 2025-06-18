import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productDetailsApi = createApi({
    reducerPath: 'productDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        fetchProductById: builder.query({
            query: (id) => `products/${id}`,
        }),
    }),
});

export const { useFetchProductByIdQuery } = productDetailsApi;