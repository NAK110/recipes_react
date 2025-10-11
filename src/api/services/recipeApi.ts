import axiosApi from "../config/axios";
// import type { Recipe } from "../types/recipeTypes";

export const recipeApi = {
    getAllRecipe: async () => {
        const res = await axiosApi.get('/recipes');
        return res.data;
    },
    createRecipe: async (data: { name: string; ingredients: string[]; instructions: string[] }) => {
        const payload = {
            name: data.name,
            ingredients: data.ingredients.join(', '),      
            instructions: data.instructions.join('. ') + '.'
        };

        const res = await axiosApi.post('/recipes', payload);
        return res.data;
    }
}
