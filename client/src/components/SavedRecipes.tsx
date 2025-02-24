import { useRecipeContext } from "../context/RecipeContext";

const SavedRecipes = () => {
  const { savedRecipes, deleteRecipe } = useRecipeContext();
  console.log("Saved recipes check:", savedRecipes);

  return (
    <>
      <h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-center text-black mb-6 mt-6"
      >
        Saved Recipes
      </h1>

      {savedRecipes.length > 0 ? (
        <div className="w-full grid px-2 grid-cols-2 mx-auto mt-4 gap-4">
          {savedRecipes.map((recipe: any) => (
            <div
              key={recipe.id}
              className="relative w-full rounded-lg p-8 bg-[#3A4A33] shadow-lg flex flex-col items-center text-center"
            >
              {/* Recipe title */}
              <h1 className="text-4xl font-mono font-light mb-4">
                {recipe.label}
              </h1>

              {/* Ingredients list */}
              <div className="ingredients w-full flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-2 text-[#333333]">
                  Ingredients
                </h2>
                <ul className="list-disc text-[#fefae0] pl-5 text-left">
                  {recipe.ingredients.map((ingredient: any, index: number) => (
                    <li className="pt-2" key={index}>
                      {ingredient.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Calories */}
              <div className="text-white text-xl mt-4 font-mono font-extralight mb-4">
                Calories: {Math.round(recipe.calories)}
              </div>

              {/* Recipe image */}
              <img
                className="rounded-full w-[150px] h-[150px] border border-black object-cover mb-4"
                src={recipe.image_url}
                alt="Recipe image"
              />

              {/* Delete Button */}
              <div className="mt-auto flex justify-end pt-4">
                <button
                  className="px-4 py-2 outline-none bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 active:scale-95 transition-all duration-200 ease-in-out"
                  onClick={() => deleteRecipe(recipe.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-8">
          No saved recipes yet.
        </p>
      )}
    </>
  );
};

export default SavedRecipes;
