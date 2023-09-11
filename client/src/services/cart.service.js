import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/'
    }),
    tagTypes: ['cart', 'cartItem'],
    endpoints: builder => ({
        fetchAllCarts: builder.query({
            query: () => "/cart",
            providesTags: ['cart']
        }),
        fetchById: builder.query({
            query: (id) => "/cart/" + id,
            providesTags: ['cart']
        }),
        addItem: builder.mutation({
            query: (data) => {
                return {
                    url: '/cart-items',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['cart']
        }),
        updateItem: builder.mutation({
            query: ({id, data}) => {
                return {
                    url: '/cart-items/'+id,
                    method: 'PATCH',
                    body: data
                }
            },
            invalidatesTags: ['cart']
        }),
        removeItem: builder.mutation({
            query: (id) => {
                return {
                    url: '/cart-items/' + id,
                    method: 'DELETE',
                    credentials: "include",
                }
            },
            invalidatesTags: ['cart']
        }),
    })
})


export const { 
    useFetchAllCartsQuery,
    useFetchByIdQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useRemoveItemMutation
 } = cartApi
export default cartApi