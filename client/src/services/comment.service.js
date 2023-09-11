import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/comments'
    }),
    tagTypes: ['comment'],
    endpoints: builder => ({
        fetchAllComment: builder.query({
            query: () => "/",
            providesTags: ['comment']
        }),
        fetchById: builder.query({
            query: (id) => "/post/" + id,
            providesTags: ['comment']
        }),
        createComment: builder.mutation({
            query: (cmt) => {
                return {
                    url: '/',
                    method: 'POST',
                    body: cmt
                }
            },
            invalidatesTags: ['comment']
        }),
        removeComment: builder.mutation({
            query: (id) => {
                return {
                    url: '/' + id,
                    method: 'DELETE',
                    credentials: "include",
                }
            },
            invalidatesTags: ['comment']
        }),
    })
})


export const { useFetchAllCommentQuery, useFetchByIdQuery, useCreateCommentMutation, useRemoveCommentMutation } = commentApi
export default commentApi