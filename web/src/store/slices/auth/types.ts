import { User } from "../../../types";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface RegisterRequest {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}