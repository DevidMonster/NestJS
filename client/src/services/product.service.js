import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/products",
    credentials: "include",
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: (option = "") => "/" + option,
      providesTags: ["product"],
      queryFn: (header) => {
        setTimeout(() => header, 1)
      }
    }),
    fetchOne: builder.query({
      query: (id) => "/" + id,
      providesTags: ["product"],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/",
        method: "POST",
        body: product,
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({id, product}) => ({
        url: "/" + id,
        method: "PATCH",
        body: product,
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: "/" + id,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchOneQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
export default productApi;
