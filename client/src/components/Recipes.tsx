import { useState } from "react";
import { useRecipeContext } from "../context/RecipeContext"; 

const Recipes = function () {
  const { fetchedRecipe, saveRecipe } = useRecipeContext(); 
  const [isActive, setIsActive] = useState<boolean>(false);

  if (!fetchedRecipe) return null; 

  const saveRecipeHandler = async (recipe: any) => {
    setIsActive((prev) => !prev);
  try {
    await saveRecipe(recipe); // Call only once ✅
  } catch (error) {
    console.error("Error saving recipe:", error);
  }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      {Array.isArray(fetchedRecipe) && fetchedRecipe.map((recipe: any, recipeIndex: number) => (
        <div key={recipeIndex} className="w-full rounded-lg p-8 bg-[#3A4A33] shadow-lg">
          <div className="text-4xl font-bold">
            {recipe.name}
            <button className="ml-2" onClick={() => saveRecipeHandler(recipe)}>
              {isActive ? (
                <i className="fa-solid fa-bookmark"></i>
              ) : (
                <i className="fa-regular fa-bookmark"></i>
              )}
            </button>
          </div>
          <div className="ingredients pt-4">
            <h2 className="text-2xl font-semibold mb-2 text-[#333333]">Ingredients</h2>
            <ul className="list-disc text-[#fefae0] pl-5">
              {recipe.ingredients.map((ingredient: string, index: number) => (
                <li className="pt-4" key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="instructions pt-4">
            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
            <div className="space-y-5">
              {recipe.instructions.map((instruction: string, index: number) => (
                <p key={index}>
                  <span className="mr-2 font-bold">{index + 1}.</span> {instruction}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recipes;
