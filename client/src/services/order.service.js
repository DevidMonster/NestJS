import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    fetchAllOrders: builder.query({
      query: () => ({ url: "/orders", credentials: "include" }),
      providesTags: ["order"],
    }),
    fetchByUserId: builder.query({
      query: (id) => ({ url: "/orders/user/" + id, credentials: "include" }),
      providesTags: ["order"],
    }),
    fetchById: builder.query({
      query: (id) => ({ url: "/orders/" + id, credentials: "include" }),
      providesTags: ["order"],
    }),
    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: "/orders",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: ["order"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: "/orders/" + id,
          method: "PATCH",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: ["order"],
    }),
    removeOrder: builder.mutation({
      query: (id) => {
        return {
          url: "/orders/" + id,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useFetchAllOrdersQuery,
  useFetchByUserIdQuery,
  useFetchByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useRemoveOrderMutation,
} = orderApi;
export default orderApi;
