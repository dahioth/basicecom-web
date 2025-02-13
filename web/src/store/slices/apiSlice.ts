import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout} from "./authSlice";


const baseQuery = fetchBaseQuery({
    // baseUrl: `http://${process.env.host || "localhost"}:8080/api/v1`, //TODO: add .env file
    baseUrl: "http://localhost:8080/api/v1",
    credentials: "omit",
    prepareHeaders: (headers, { getState }) => {
        // @ts-ignore
        const token = getState()?.auth?.token;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers;
    }
})

// TODO: Add baseQueryWithReauth
const customBaseQuery = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    // @ts-ignore
    if (result?.error?.originalStatus == 403) {
        api.dispatch(logout())
    }

    return result;
}


export const apiSlice = createApi({
    baseQuery: customBaseQuery,
    endpoints: () => ({})
})