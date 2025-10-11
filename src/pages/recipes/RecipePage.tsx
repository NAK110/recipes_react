import RecipeTable from "@/components/recipe/RecipeTable";
import { Plus, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type User } from "@/api/types/user";
import { useEffect, useState } from "react";
import AddRecipe from "@/components/recipe/AddRecipe";
import { recipeApi } from "@/api/services/recipeApi";

function RecipePage() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchAllRecipe = async () => {
    try {
      const res = await recipeApi.getAllRecipe();
      setRecipes(res);
    } catch (err) {
      console.error("Failed to fetch recipes", err);
    }
  };
  useEffect(() => {
    fetchAllRecipe();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        console.error("Failed to parse user from localStorage");
      }
    }
  }, []);

  if (!user) return null;

  return user.role !== "admin" ? (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full">
        <div className="rounded-lg shadow-lg p-8 border">
          {/* Icon and Title */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="bg-red-100 rounded-full p-4 mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-red-700 mb-2">
              Unauthorized Access
            </h2>
            <p className="text-foreground leading-relaxed">
              You do not have permission to view this page.
              <br />
              Please contact the administrator if you think this is a mistake.
            </p>
          </div>

          {/* Action Button */}
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="w-full"
          >
            Go Back Home
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="p-6 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Recipes</h1>
              <p className="text-gray-600 mt-1">
                Manage and browse your recipe collection
              </p>
            </div>
            <Button
              className="flex items-center gap-2"
              onClick={() => setOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Recipe
            </Button>
            <AddRecipe open={open} onOpenChange={setOpen} onRecipeCreated={fetchAllRecipe} />
          </div>

          {/* Search and Filter Bar */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search recipes..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </div>

        {/* Recipe Table */}
        <div className="bg-background rounded-lg border shadow-sm">
          <RecipeTable />
        </div>
      </div>
    </div>
  );
}

export default RecipePage;
