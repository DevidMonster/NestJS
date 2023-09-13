import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rateApi = createApi({
    reducerPath: 'rateApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/rate'
    }),
    tagTypes: ['rate'],
    endpoints: builder => ({
        fetchAllRate: builder.query({
            query: () => "/",
            providesTags: ['rate']
        }),
        fetchById: builder.query({
            query: (id) => "/product/" + id,
            providesTags: ['rate']
        }),
        createRate: builder.mutation({
            query: (data) => {
                return {
                    url: '/',
                    method: 'POST',
                    body: data,
                    credentials: "include",
                }
            },
            invalidatesTags: ['rate']
        }),
        removeRate: builder.mutation({
            query: (id) => {
                return {
                    url: '/' + id,
                    method: 'DELETE',
                    credentials: "include",
                }
            },
            invalidatesTags: ['rate']
        }),
    })
})


export const { useFetchAllRateQuery, useFetchByIdQuery, useCreateRateMutation, useRemoveRateMutation } = rateApi
export default rateApi