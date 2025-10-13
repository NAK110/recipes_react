import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { recipeApi } from "@/api/services/recipeApi";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import type { Recipe } from "@/api/types/recipeTypes";

interface DeleteRecipeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipe: Recipe | null;
  onRecipeDeleted?: () => void;
}

function DeleteRecipe({
  open,
  onOpenChange,
  recipe,
  onRecipeDeleted,
}: DeleteRecipeProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!recipe) return;

    setLoading(true);

    try {
      await recipeApi.deleteRecipe(recipe.id);

      toast.success("Recipe deleted successfully!", {
        description: `${recipe.name} has been removed from your recipes.`,
        duration: 3000,
      });

      if (onRecipeDeleted) {
        onRecipeDeleted();
      }
      
      onOpenChange(false);
    } catch (err) {
      let errorMessage = "Failed to delete recipe. Please try again.";

      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      toast.error("Failed to delete recipe", {
        description: errorMessage,
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <strong>{recipe?.name}</strong> and remove it from your recipes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteRecipe;
