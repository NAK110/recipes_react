import type { Recipe } from "@/api/types/recipeTypes";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { recipeApi } from "@/api/services/recipeApi";
import { toast } from "sonner";
import axios from "axios";

interface EditRecipeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipe: Recipe | null;
  onRecipeUpdated?: () => void;
}

function EditRecipe({
  open,
  onOpenChange,
  recipe,
  onRecipeUpdated,
}: EditRecipeProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (recipe) {
      setRecipeName(recipe.name);
      setIngredients(recipe.ingredients);
      setInstructions(recipe.instructions);
    }
  }, [recipe]);

  const handleSubmit = async () => {
    if (!recipe) return;
    setError(null);

    if (!recipeName.trim()) {
      setError("Recipe name is required");
      return;
    }
    if (!ingredients.trim()) {
      setError("Ingredients are required");
      return;
    }
    if (!instructions.trim()) {
      setError("Instructions are required");
      return;
    }

    setLoading(true);

    try {
      await recipeApi.updateRecipe(recipe.id, {
        name: recipeName.trim(),
        ingredients: ingredients.trim(),
        instructions: instructions.trim(),
      });

      toast.success("Recipe updated successfully!", {
        description: `${recipeName} has been updated.`,
        duration: 3000,
      });

      if (onRecipeUpdated) {
        onRecipeUpdated();
      }

      onOpenChange(false);
    } catch (err) {
      let errorMessage = "Failed to update recipe. Please try again.";

      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);

      toast.error("Error updating recipe", {
        description: errorMessage,
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Recipe</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="recipeName">Recipe Name</FieldLabel>
              <Input
                id="recipeName"
                type="text"
                placeholder="e.g., Chocolate Chip Cookies"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                disabled={loading}
                className="mt-1"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="ingredients">Ingredients</FieldLabel>
              <textarea
                id="ingredients"
                placeholder="Enter ingredients separated by commas&#10;e.g., flour, butter, sugar, eggs, vanilla extract"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                disabled={loading}
                rows={6}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-y"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="instructions">Instructions</FieldLabel>
              <textarea
                id="instructions"
                placeholder="Enter cooking instructions&#10;e.g., Cream butter and sugars. Add eggs and vanilla. Mix in flour. Bake at 350°F for 10-12 minutes."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                disabled={loading}
                rows={8}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-y"
              />
            </Field>
          </FieldGroup>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Updating..." : "Update Recipe"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default EditRecipe;
