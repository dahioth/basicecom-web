import { User } from "../../../types/index"

export interface GetUsersResponse {
    users: User[]
}

export interface UpdateUserRoleRequest {
    role: 'USER' | 'ADMIN'
}
