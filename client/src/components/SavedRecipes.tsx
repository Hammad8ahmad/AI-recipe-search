import { useRecipeContext } from "../context/RecipeContext";


const SavedRecipes = () => {
  const { savedRecipes, deleteRecipe } = useRecipeContext();
  console.log(savedRecipes)

  return (
    <>
  <h1
  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-center text-black 
            mb-6 mt-6"
>
  Saved Recipes
</h1>
      <div className="w-full grid px-2 grid-cols-2 mx-auto mt-4">
        {savedRecipes.length > 0 ? (
          savedRecipes.map((recipe: any) => (
            <div key={recipe.id} className="w-full rounded-lg p-6 flex flex-col bg-[#3A4A33] text-[#fefae0] shadow-lg mb-4">
              <h2 className="text-4xl font-semibold">{recipe.name}</h2>

              {/* Ingredients */}
              <div className="pt-4">
                <h3 className="text-2xl font-semibold text-[#333333]">Ingredients</h3>
                <ul className="list-disc pl-5">
                  {recipe.ingredients.map((ingredient: string, index: number) => (
                    <li className="pt-4" key={index}>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="pt-4 flex-grow">
                <h3 className="text-2xl font-semibold text-[#333333]">Instructions</h3>
                <ol className="list-decimal pt-4 pl-5">
                  {recipe.instructions.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              {/* Delete Button - Always at the Bottom */}
              <div className=" mt-auto flex justify-end pt-4">
                <button
                  className="px-4 py-2 outline-none bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 active:scale-95 transition-all duration-200 ease-in-out"
                  onClick={() => deleteRecipe(recipe.id)} // Use context's deleteRecipe
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 ">No saved recipes yet.</p>
        )}
      </div>
    </>
  );
};

export default SavedRecipes;
