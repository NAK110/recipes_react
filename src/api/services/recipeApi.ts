import axiosApi from "../config/axios";
import type { Recipe } from "../types/recipeTypes";

export interface CreateRecipeResponse {
    message: string;
    recipe: Recipe;
}

export interface UpdateRecipeResponse {
    message: string;
}

export interface DeleteRecipeResponse {
    message: string;
}

export const recipeApi = {
    getAllRecipe: async (): Promise<Recipe[]> => {
        const res = await axiosApi.get<Recipe[]>('/recipes');
        return res.data;
    },

    createRecipe: async (data: {
        name: string;
        ingredients: string;
        instructions: string
    }): Promise<CreateRecipeResponse> => {
        const res = await axiosApi.post<CreateRecipeResponse>('/recipes', data);
        return res.data;
    },

    updateRecipe: async (
        id: number,
        data: {
            name?: string;
            ingredients?: string;
            instructions?: string
        }
    ): Promise<UpdateRecipeResponse> => {
        const res = await axiosApi.put<UpdateRecipeResponse>(`/recipes/${id}`, data);
        return res.data;
    },

    deleteRecipe: async (id: number): Promise<DeleteRecipeResponse> => {
        const res = await axiosApi.delete<DeleteRecipeResponse>(`/recipes/${id}`);
        return res.data;
    }
}