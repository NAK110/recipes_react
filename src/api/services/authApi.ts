import axiosApi from "../config/axios";

export interface Register {
    username: string;
    email: string; 
    password: string;
}

export interface Login {
    username: string; 
    password: string; 
}

export interface AuthResponse {
    message: string; 
    token: string; 
    user: {
        id: number;
        username: string; 
        email: string;
        role: string;
    }
}

export const authApi = {
    register: async (data: Register): Promise<AuthResponse> => {
        const res = await axiosApi.post('/auth/register', data)
        return res.data; 
    }, 
    login: async (data: Login): Promise<AuthResponse> => {
        const res = await axiosApi.post('/auth/login', data) 
        return res.data
    }
}