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
    return <div className="p-4 text-center">Loading recipes...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600 text-center">{error}</div>;
  }

  return (
    <>
      {/* Mobile Card View */}
      <div className="block md:hidden">
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-bold mb-4">Recipes</h2>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="border rounded-lg p-4 space-y-3 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-lg truncate">
                      {recipe.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      ID: {recipe.id}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Ingredients
                    </p>
                    <p className="text-sm break-words">{recipe.ingredients}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Instructions
                    </p>
                    <p className="text-sm break-words">
                      {recipe.instructions}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="default"
                    className="flex-1 touch-manipulation"
                    onClick={() => handleEdit(recipe)}
                  >
                    <SquarePen className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1 touch-manipulation"
                    onClick={() => handleDelete(recipe)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No recipes found
            </div>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
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
                      <TableCell className="font-medium">
                        {recipe.id}
                      </TableCell>
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
                          onClick={() => handleDelete(recipe)}
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