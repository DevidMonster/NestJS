import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/auth",
    credentials: "include",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (info) => {
        return {
          url: "/login",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: ["auth"],
    }),
    singup: builder.mutation({
      query: (info) => {
        return {
          url: "/signup",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: ["auth"],
    }),
    getToken: builder.query({
      query: () => ({
        url: "/token",
        method: "GET",
        credentials: "include",
      }),
    }),
    clearToken: builder.mutation({
      query: () => ({
        url: "/token",
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSingupMutation,
  useGetTokenQuery,
  useClearTokenMutation,
} = authApi;
export default authApi;
