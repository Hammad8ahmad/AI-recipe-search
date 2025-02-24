import { useRecipeContext } from "../context/RecipeContext";

const Recipes = function () {
  const { fetchedRecipe, saveRecipe, isActive, setIsActive } = useRecipeContext();

  if (!fetchedRecipe) return null;
  console.log(fetchedRecipe)

  const saveRecipeHandler = async (recipe: any) => {
    // console.log("saved recipe in hadnler  : ",recipe)
    console.log(recipe.label)
    console.log(recipe.calories)
    console.log(recipe.ingredients)
    console.log(recipe.images.SMALL)

    const newState = !isActive;
    setIsActive(newState);

    if (newState) {
      try {
        await saveRecipe(recipe); // Save only once ✅
      } catch (error) {
        console.error("Error saving recipe:", error);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-6 justify-center items-center">
      {fetchedRecipe.map((recipe: any, recipeIndex: number) => (
        <div key={recipeIndex} className="relative w-full rounded-lg p-8 bg-[#3A4A33] shadow-lg flex flex-col items-center text-center">
          
          {/* Save icon pinned to top right */}
          <button 
            onClick={() => saveRecipeHandler(recipe.recipe)}
            className="absolute top-8 right-4 text-3xl text-white"
          >
            {isActive ? (
              <i className="fa-solid fa-bookmark"></i>
            ) : (
              <i className="fa-regular fa-bookmark"></i>
            )}
          </button>

          {/* Recipe title */}
          <h1 className="text-4xl  font-mono font-light mb-4">
            {recipe.recipe.label}
          </h1>

           {/* Ingredients list */}
          <div className="ingredients w-full flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-2 text-[#333333]">
              Ingredients
            </h2>
            <ul className="list-disc  text-[#fefae0] pl-5 text-left">
              {recipe.recipe.ingredients.map((ingredient: any, index: number) => (
                <li className="pt-2" key={index}>
                  {ingredient.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Calories */}
          <div className="text-white text-xl mt-4 font-mono  font-extralight mb-4">
            Calories: {Math.round(recipe.recipe.calories)}
          </div>

          {/* Recipe image */}
          <img
            className="rounded-full w-[150px] h-[150px] border border-black object-cover mb-4"
            src={recipe.recipe.images.SMALL.url}
            alt="Recipe image"
          />
         
        </div>
      ))}
    </div>
  );
};

export default Recipes;
