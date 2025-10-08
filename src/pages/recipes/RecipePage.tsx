import RecipeTable from "@/components/RecipeTable";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function RecipePage() {
  return (
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
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Recipe
            </Button>
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
        <div className="bg-white rounded-lg border shadow-sm">
          <RecipeTable />
        </div>
      </div>
    </div>
  );
}

export default RecipePage;
