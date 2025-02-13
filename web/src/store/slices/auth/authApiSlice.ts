import { apiSlice } from "../apiSlice"; 
import { LoginRequest, LoginResponse, RegisterRequest } from "./types";


const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (loginCredentials) => ({
                url: '/auth/login',
                method: "POST",
                body: loginCredentials
            })
        }),
        register: builder.mutation<void, RegisterRequest>({
            query: (registerCredentials) => ({
                url: "/auth/register",
                method: "POST",
                body: registerCredentials
            })
        })
    })
})


export const {
    useLoginMutation,
    useRegisterMutation
} = authApiSlice
