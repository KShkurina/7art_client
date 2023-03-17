import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../helpers/cookies";
import { API_URL } from "../config";

export const productAPI = createApi({
  reducerPath: `productAPI`,
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
    getAllProducts: build.mutation({
      query: () => ({
        url: `/products`,
        method: `GET`,
      }),
    }),

 
    getRandomProducts: build.mutation({
      query: () => ({
        url: '/products/getRandomProducts',
        method: `GET`,
      }),
    }),

    getOneProduct: build.mutation({
      query: (itemNo) => ({
        url: `/products/${itemNo}`,
        method: `GET`,
      }),
    }),

    getFilteredProduct: build.mutation({
      query: (querystring) => ({
        url: `/products/filter?${querystring}`,
        method: `GET`,
      }),
    }),
    ///querystring example products/filter?param1=value1&param2=value2-1,value2-2,value2-3&param3=value3&perPage=2&startPage=1

    searchForProduct: build.mutation({
      query: (searchPhrases) => ({
        url: `/products/search`,
        method: `POST`,
        searchPhrases,
      }),
    }),

    addNewProduct: build.mutation({
      query: (body) => ({
        url: `/products`,
        method: `POST`,
        body,
      }),
    }),
    updateProduct: build.mutation({
      query: (id, body) => ({
        url: `/products/${id}`,
        method: `PUT`,
        body,
      }),
    }),

    //!***
  }),
});

export const {
  useGetAllProductsMutation,
  useGetRandomProductsMutation,
  useGetOneProductMutation,
  useGetFilteredProductMutation,
  useSearchForProductMutation,
  useAddNewProductMutation,
  useUpdateProductMutation,
} = productAPI;
