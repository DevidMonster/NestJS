import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/firebase",
    credentials: "include",
  }),
  tagTypes: ["upload"],
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (file) => ({   
        url: "/upload",
        method: "POST",
        body: file,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = uploadApi;
export default uploadApi;
