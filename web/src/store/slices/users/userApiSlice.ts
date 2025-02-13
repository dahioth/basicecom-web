import { User } from "../../../types";
import { apiSlice } from "../apiSlice";
import { UpdateUserRoleRequest } from "./types";



export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => ({
                url: "/users"
            })
        }),
        updateUserRole: builder.mutation<User, {id: number, updateRoleBody: UpdateUserRoleRequest}>({ // TODO: check if this is compatible with backend
            query: ({id, updateRoleBody}) => ({
                url: `/users/${id}/role`,
                method: "PATCH",
                body: updateRoleBody
            })
        })
    })
})


export const {
    useGetUsersQuery,
    useUpdateUserRoleMutation
} = userApiSlice;