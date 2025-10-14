import RecipeTable, { type RecipeTableRef } from "@/components/recipe/RecipeTable";
import { Plus, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type User } from "@/api/types/user";
import { useEffect, useRef, useState } from "react";
import AddRecipe from "@/components/recipe/AddRecipe";

function RecipePage() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const recipeTableRef = useRef<RecipeTableRef>(null);

  const handleRecipeCreated = () => {
    recipeTableRef.current?.fetchRecipe();
  };

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
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 sm:p-6">
      <div className="max-w-md w-full">
        <div className="rounded-lg shadow-lg p-6 sm:p-8 border">
          {/* Icon and Title */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="bg-red-100 rounded-full p-3 sm:p-4 mb-4">
              <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-red-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-red-700 mb-2">
              Unauthorized Access
            </h2>
            <p className="text-sm sm:text-base text-foreground leading-relaxed">
              You do not have permission to view this page.
              <br />
              Please contact the administrator if you think this is a mistake.
            </p>
          </div>

          {/* Action Button */}
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="w-full touch-manipulation"
          >
            Go Back Home
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="p-4 sm:p-6 md:p-6 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold truncate">
                Recipes
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Manage and browse your recipe collection
              </p>
            </div>
            <Button
              className="flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap touch-manipulation"
              onClick={() => setOpen(true)}
            >
              <Plus className="h-4 w-4" />
              <span className="sm:inline">Add Recipe</span>
            </Button>
            <AddRecipe
              open={open}
              onOpenChange={setOpen}
              onRecipeCreated={handleRecipeCreated}
            />
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search recipes..."
                className="pl-10 touch-manipulation"
              />
            </div>
            <div className="flex gap-2 sm:gap-4">
              <Button 
                variant="outline" 
                className="flex-1 sm:flex-none touch-manipulation"
              >
                Filter
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 sm:flex-none touch-manipulation"
              >
                Sort
              </Button>
            </div>
          </div>
        </div>

        {/* Recipe Table */}
        <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
          <RecipeTable ref={recipeTableRef} />
        </div>
      </div>
    </div>
  );
}

export default RecipePage;