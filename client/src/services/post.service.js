import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    credentials: "include",
  }),
  tagTypes: ["post"],
  endpoints: (builder) => ({
    fetchAllPost: builder.query({
      query: (option = '') => "/posts"+option,
      providesTags: ["post", "comment"],
      queryFn: (header) => {
        setTimeout(() => header, 1)
      }
    }),
    fetchById: builder.query({
      query: (id) => "/posts/" + id,
      providesTags: ["post"],
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
        credentials: "include",
      }),
      invalidatesTags: ["post"],
    }),
    updatePost: builder.mutation({
      query: ({ id, post }) => ({
        url: "/posts/" + id,
        method: "PATCH",
        body: post,
        credentials: "include",
      }),
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: "/posts/" + id,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useFetchAllPostQuery,
  useFetchByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postApi;
export default postApi;
