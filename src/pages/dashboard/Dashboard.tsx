export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 md:p-8 w-full">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Dashboard
        </h1>

        {/* Recipe Stats or Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-4 sm:p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow active:scale-[0.98] touch-manipulation">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
              Total Recipes
            </h3>
            <p className="text-3xl sm:text-4xl font-bold">5</p>
          </div>

          <div className="p-4 sm:p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow active:scale-[0.98] touch-manipulation">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
              Categories
            </h3>
            <p className="text-3xl sm:text-4xl font-bold">5</p>
          </div>

          <div className="p-4 sm:p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow active:scale-[0.98] touch-manipulation sm:col-span-2 md:col-span-1">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
              Favorites
            </h3>
            <p className="text-3xl sm:text-4xl font-bold">12</p>
          </div>
        </div>
      </div>
    </div>
  );
}
