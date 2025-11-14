import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const offersSlice = createApi({
    reducerPath: 'offersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        fetchOffers: builder.query({
            query: () => 'offers',
        }),
    }),
});

export const { useFetchOffersQuery } = offersSlice;