import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { recipeApi } from "@/api/services/recipeApi";
import { toast } from "sonner";

interface AddRecipeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRecipeCreated?: () => void; // Optional callback to refresh recipe list
}

function AddRecipe({ open, onOpenChange, onRecipeCreated }: AddRecipeProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = async () => {
    setError(null);

    // Validation
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
      const res = await recipeApi.createRecipe({
        name: recipeName,
        ingredients: ingredients
          .split("\n")
          .map((ing) => ing.trim())
          .filter((ing) => ing),
        instructions: instructions
          .split("\n")
          .map((inst) => inst.trim())
          .filter((inst) => inst),
      });

      console.log("Recipe created", res);

      // Show success toast
      toast.success("Recipe created successfully!", {
        description: `${recipeName} has been added to your recipes.`,
        duration: 3000,
      });

      // Reset form
      setRecipeName("");
      setIngredients("");
      setInstructions("");

      // Close dialog
      onOpenChange(false);

      // Call optional callback to refresh recipe list
      if (onRecipeCreated) {
        onRecipeCreated();
      }
    } catch (err: any) {
      console.error("Failed to create recipe", err);

      // Show error toast
      const errorMessage =
        err?.response?.data?.message ||
        "Failed to create recipe. Please try again.";
      setError(errorMessage);

      toast.error("Failed to create recipe", {
        description: errorMessage,
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Your Recipe</DialogTitle>
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
                placeholder="Enter each ingredient on a new line&#10;e.g.,&#10;2 cups flour&#10;1 cup sugar&#10;2 eggs"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                disabled={loading}
                rows={8}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-y"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="instructions">Instructions</FieldLabel>
              <textarea
                id="instructions"
                placeholder="Enter each step on a new line&#10;e.g.,&#10;1. Preheat oven to 350°F&#10;2. Mix dry ingredients&#10;3. Add wet ingredients"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                disabled={loading}
                rows={10}
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
              {loading ? "Creating..." : "Create Recipe"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddRecipe;
