import axiosApi from "../config/axios";
// import type { Recipe } from "../types/recipeTypes";

export const recipeApi = {
    getAllRecipe: async () => {
        const res = await axiosApi.get('/recipes');
        return res.data
    }
}
