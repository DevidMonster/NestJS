import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/'
    }),
    tagTypes: ['order'],
    endpoints: builder => ({
        fetchAllOrders: builder.query({
            query: () => "/orders",
            providesTags: ['order']
        }),
        fetchByUserId: builder.query({
            query: (id) => "/orders/user/" + id,
            providesTags: ['order']
        }),
        fetchById: builder.query({
            query: (id) => "/orders/" + id,
            providesTags: ['order']
        }),
        createOrder: builder.mutation({
            query: (data) => {
                return {
                    url: '/orders',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['order']
        }),
        updateOrder: builder.mutation({
            query: ({id, data}) => {
                return {
                    url: '/orders/'+id,
                    method: 'PATCH',
                    body: data
                }
            },
            invalidatesTags: ['order']
        }),
        removeOrder: builder.mutation({
            query: (id) => {
                return {
                    url: '/orders/' + id,
                    method: 'DELETE',
                    credentials: "include",
                }
            },
            invalidatesTags: ['order']
        }),
    })
})


export const { 
    useFetchAllOrdersQuery,
    useFetchByUserIdQuery,
    useFetchByIdQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useRemoveOrderMutation
 } = orderApi
export default orderApi