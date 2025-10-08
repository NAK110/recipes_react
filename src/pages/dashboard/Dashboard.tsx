export default function Dashboard() {
  return (
    <div className="p-4 w-full">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Recipe Stats or Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Total Recipes
            </h3>
            <p className="text-4xl font-bold">5</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Categories
            </h3>
            <p className="text-4xl font-bold">5</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Favorites
            </h3>
            <p className="text-4xl font-bold">12</p>
          </div>
        </div>
      </div>
    </div>
  );
}
