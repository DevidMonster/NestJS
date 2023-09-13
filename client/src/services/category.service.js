import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/categories'
    }),
    tagTypes: ['category'],
    endpoints: builder => ({
        fetchAllCategories: builder.query({
            query: (option = '') => "/"+option,
            providesTags: ['category']
        }),
        fetchById: builder.query({
            query: (id) => "/" + id,
            providesTags: ['category']
        }),
        createCategory: builder.mutation({
            query: (cate) => {
                return {
                    url: '/',
                    method: 'POST',
                    body: cate,
                    credentials: "include",
                }
            },
            invalidatesTags: ['category']
        }),
        updateCategory: builder.mutation({
            query: ({id, cate}) => {
                return {
                    url: '/'+id,
                    method: 'PATCH',
                    body: cate,
                    credentials: "include",
                }
            },
            invalidatesTags: ['category']
        }),
        removeCategory: builder.mutation({
            query: (id) => {
                return {
                    url: '/' + id,
                    method: 'DELETE',
                    credentials: "include",
                }
            },
            invalidatesTags: ['category']
        }),
    })
})


export const { useFetchAllCategoriesQuery, useFetchByIdQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useRemoveCategoryMutation } = categoryApi
export default categoryApi