import { recipeApi } from "@/api/services/recipeApi";
import type { Recipe } from "@/api/types/recipeTypes";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

export default function RecipeTable() {
  const [array, setArray] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const recipes = await recipeApi.getAllRecipe();
      setArray(recipes);
    } catch (error) {
      setError("Error fetching recipes");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  if (loading) {
    return <div className="p-4">Loading recipes...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="p-4 w-full overflow-x-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Recipes</h1>
        <Table className="w-full">
          <TableCaption>A list of our recent recipes.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">ID</TableHead>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[300px]">Ingredients</TableHead>
              <TableHead className="min-w-[400px]">Instructions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {array.length > 0 ? (
              array.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell className="font-medium">{recipe.id}</TableCell>
                  <TableCell className="font-semibold">{recipe.name}</TableCell>
                  <TableCell className="whitespace-normal break-words">
                    {recipe.ingredients}
                  </TableCell>
                  <TableCell className="whitespace-normal break-words">
                    {recipe.instructions}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No recipe found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
