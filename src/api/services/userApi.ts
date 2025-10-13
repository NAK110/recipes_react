import axiosApi from "../config/axios";
import type { User } from "../types/user";

export interface CreateUserResponse {
    message: string;
    user: User;
}

export interface UpdateUserResponse {
    message: string;
}

export interface DeleteUserResponse {
    message: string;
}

export const userApi = {
    getAllUser: async (): Promise<User[]> => {
        const res = await axiosApi.get<User[]>('/users');
        return res.data;
    },
    createUser: async (data: {
        username: string;
        email: string;
        password: string;
        role: string;
    }): Promise<CreateUserResponse> => {
        const res = await axiosApi.post<CreateUserResponse>('/users', data);
        return res.data;
    },

    updateUser: async (id: number, data: {
        username?: string;
        email?: string;
        password?: string; 
        role?: string;
    }): Promise<UpdateUserResponse> => {
        const res = await axiosApi.put<UpdateUserResponse>(`/users/${id}`, data);
        return res.data;
    },

    deleteUser: async (id:number): Promise<DeleteUserResponse> => {
        const res = await axiosApi.delete<DeleteUserResponse>(`/users/${id}`)
        return res.data;
    }
}
