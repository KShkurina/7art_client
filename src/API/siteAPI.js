import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../helpers/cookies";
import { API_URL } from "../config";

export const siteAPI = createApi({
  reducerPath: `siteAPI`,
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
    createCustomer: build.mutation({
      query: (body) => ({
        url: `/customers`,
        method: `POST`,
        body,
      }),
    }),
    loginCustomer: build.mutation({
      query: (body) => ({
        url: `/customers/login`,
        method: `POST`,
        body,
      }),
    }),

    getCustomer: build.mutation({
      query: () => ({
        url: `/customers/customer`,
        method: `GET`,
      }),
    }),

    updateCustomer: build.mutation({
      query: (body) => ({
        url: `/customers`,
        method: `PUT`,
        body,
      }),
    }),

    changePassword: build.mutation({
      query: (body) => ({
        url: `/customers/password`,
        method: `PUT`,
        body,
      }),
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useLoginCustomerMutation,
  useGetCustomerQuery,
  useGetCustomerMutation,
  useUpdateCustomerMutation,
  useChangePasswordMutation,
} = siteAPI;
