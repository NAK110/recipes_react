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
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Button } from "../ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import EditRecipe from "./EditRecipe";
import DeleteRecipe from "./DeleteRecipe";

export interface RecipeTableRef {
  fetchRecipe: () => Promise<void>;
}

const RecipeTable = forwardRef<RecipeTableRef>((_props, ref) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //Edit Recipe State
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  //Delete Recipe State
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const recipes = await recipeApi.getAllRecipe();
      setRecipes(recipes);
    } catch (error) {
      setError("Error fetching recipes");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchRecipe,
  }));

  useEffect(() => {
    fetchRecipe();
  }, []);

  //Edit Recipe Handlers;

  const handleEdit = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setEditOpen(true);
  };

  const handleRecipeUpdated = () => {
    fetchRecipe();
  };

  //Handle Delete Recipe
  const handleDelete = (recipe: Recipe) => {
    setRecipeToDelete(recipe);
    setDeleteOpen(true);
  };
  const handleRecipeDeleted = () => {
    fetchRecipe();
  };

  if (loading) {
    return <div className="p-4">Loading recipes...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <>
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
                <TableHead className="w-[180px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <TableRow key={recipe.id}>
                    <TableCell className="font-medium">{recipe.id}</TableCell>
                    <TableCell className="font-semibold">
                      {recipe.name}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words">
                      {recipe.ingredients}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words">
                      {recipe.instructions}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="default"
                        className="text-accent"
                        onClick={() => handleEdit(recipe)}
                      >
                        <SquarePen className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="ml-2"
                        onClick={() => {
                          handleDelete(recipe);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No recipe found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <EditRecipe
        open={editOpen}
        onOpenChange={setEditOpen}
        recipe={selectedRecipe}
        onRecipeUpdated={handleRecipeUpdated}
      />

      <DeleteRecipe
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        recipe={recipeToDelete}
        onRecipeDeleted={handleRecipeDeleted}
      />
    </>
  );
});

export default RecipeTable;
