import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/users",
    credentials: "include",
  }),
  tagTypes: ["user"],

  endpoints: (builder) => ({
    fetchAll: builder.query({
      query: () => {
        return {
          url: "/",
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["user"],
    }),
    fetchOne: builder.query({
      query: (id) => ({ url: "/" + id, credentials: "include" }),
      providesTags: ["user"],
    }),
    createUser: builder.mutation({
      query: (info) => {
        return {
          url: "/",
          method: "POST",
          body: info,
          credentials: "include",
        };
      },
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ id, info }) => {
        return {
          url: "/" + id,
          method: "PATCH",
          body: info,
          credentials: "include",
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useFetchAllQuery,
  useFetchOneQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
export default userApi;
