import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../helpers/cookies";
import { API_URL } from "../config";

export const cartAPI = createApi({
  reducerPath: `cartAPI`,
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getCookie("accessToken");

      if (token) {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),

  endpoints: (build) => ({
    createCart: build.mutation({
      query: (productsArray) => {
        console.log(productsArray);
        return {
          url: `/cart`,
          method: `POST`,
          body: { productsArray },
        }
      },
    }),

    updateCart: build.mutation({
      query: (productsArray) => ({
        url: `/cart`,
        method: `PUT`,
        body: productsArray,   //для PUT ключ body обязателен
      }),
    }),

    addToCart: build.mutation({
      query: (productId) => ({
        url: `/cart/${productId}`,
        method: `PUT`,
      }),
    }),
    decreaseProductQuantity: build.mutation({
      query: (productId) => ({
        url: `/cart/product/${productId}`,
        method: `DELETE`,
      }),
    }),
    deleteFromCart: build.mutation({
      query: (productId) => ({
        url: `/cart/${productId}`,
        method: `DELETE`,
      }),
    }),

    getCart: build.mutation({
      query: () => ({
        url: `/cart`,
        method: `GET`,
      }),
    }),
    deleteCart: build.mutation({
      query: () => ({
        url: `/cart`,
        method: `DELETE`,
      }),
    }),
  }),
});

export const {
  useCreateCartMutation,
  useUpdateCartMutation,
  useAddToCartMutation,
  useDecreaseProductQuantityMutation,
  useDeleteFromCartMutation,
  useGetCartMutation,
  useDeleteCartMutation,
} = cartAPI;
