// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (registerUser) => ({
        url: "/users",
        method: "POST",
        body: registerUser,
      }),
    }),
    login: builder.mutation({
      query: (loginUser) => ({
        url: "/auth/login",
        method: "POST",
        body: loginUser,
      }),
    }),
    account: builder.query({
      query: (token) => ({
        url: "/users/1",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    productList: builder.query({
      query: (token) => ({
        url: "/products",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Product"],
    }),
    productDetails: builder.query({
      query: ({ token, id }) => ({
        url: `/products/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: ({ token, body }) => ({
        url: "/products",
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["Plant"],
    }),
    editProduct: builder.mutation({
      query: ({ id, token, body }) => ({
        url: `/product/${id}`,
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["Plant"],
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useRegisterMutation,
  useLoginMutation,
  useAccountQuery,
  useProductDetailsQuery,
  useProductListQuery,
  useAddProductMutation,
  useEditProductMutation,
} = apiSlice;
