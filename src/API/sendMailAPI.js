import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";


export const sendMaiAPI = createApi({

    reducerPath: `sendMail`,

    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,

    }),

    endpoints: (build) => ({
        sendMail: build.mutation({
            query: (data) => {
                console.log('data!!!!!!!', data);
                return {
                    url: `/order/sendMail/`,
                    method: `POST`,
                    body: data ,
                }
            },
        })
    })
})

export const {
    useSendMailMutation
} = sendMaiAPI;