import axiosApi from "./axios";

export interface Recipe {
    id: number;
    name: string;
    ingredients: string;
    instructions: string;
}

export const recipeApi = {
    getAllRecipe: async () => {
        const res = await axiosApi.get('/recipes');
        return res.data
    }
}
