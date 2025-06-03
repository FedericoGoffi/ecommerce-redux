import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchSlice = createApi({
    reducerPath: 'searchApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        fetchSuggestions: builder.query({
            query: (query) => `suggestions?q=${query}`
        }),
    }),
});

export const { useFetchSuggestionsQuery } = searchSlice;
