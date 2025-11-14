import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentsApi = createApi({
    reducerPath: 'paymentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        createPaymentIntent: builder.mutation({
            query: (amount) => ({
                url: 'payments/create-payment-intent',
                method: 'POST',
                body: { amount },
            }),
        }),
    }),
});

export const { useCreatePaymentIntentMutation } = paymentsApi;