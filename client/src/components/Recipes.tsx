import { useRecipeContext } from "./hooks/useRecipeContext";
import React, { useState,useEffect} from "react";

const Recipes = React.memo(() => {
  const { fetchedRecipe, saveRecipe, isActive, setIsActive } = useRecipeContext();
  const [isSaved,setIsSaved] = useState<any>(false)
  const [showSavedToast, setShowSavedToast] = useState(false);



  if (!fetchedRecipe) return null;
  useEffect ( ()=> {
    setIsSaved(false)
    setIsActive(false)
  },[fetchedRecipe])

  const saveRecipeHandler = async (recipe: any,recipeIndex : number) => {
    
  try {
    // Mark the recipe as active (saved)
    setIsActive((prev: any) => ({ ...prev, [recipeIndex]: true }));
     setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);

    // Await the save operation
    await saveRecipe(recipe);
  

    // After successful save, mark the recipe as saved
    setIsSaved((prev: any) => ({ ...prev, [recipeIndex]: true }));
   
  } catch (error) {
    console.error("Error saving recipe:", error);

    // Optionally, rollback active state if save fails
    setIsActive((prev: any) => ({ ...prev, [recipeIndex]: false }));
  }

      
  }; 

  return (
    <div className="mx-2">
    <div className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-6 justify-center items-center">
      {fetchedRecipe.map((recipe: any, recipeIndex: number) => (
        <div key={recipeIndex} className="relative w-full rounded-lg p-8 bg-[#3A4A33] shadow-lg flex flex-col items-center text-center">
          
          {/* Save icon pinned to top right */}
          <button 
            onClick={() => saveRecipeHandler(recipe.recipe, recipeIndex)}
            disabled={isSaved[recipeIndex]}
            className="absolute top-8 right-4 text-3xl text-white"
          >
            {isActive[recipeIndex] ? (
              <i className="fa-solid fa-bookmark"></i>
            ) : (
              <i className="fa-regular fa-bookmark"></i>
            )}
          </button>

                     {showSavedToast && (
  <div className="fixed bottom-4  right-18 sm:right-12 md:right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl animate-fade-in-out flex items-center gap-2">
    <span className="font-medium">Recipe saved successfully!</span>
  </div>
)}


          {/* Recipe title */}
          <h1 className="text-3xl sm:text-3xl md:text-4xl  text-[#FEFAE0]  font-mono font-light mb-4">
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
            className="rounded-full w-[150px] text-[#FEFAE0] h-[150px] border border-black object-cover mb-4"
            src={recipe.recipe.images.SMALL.url}
            alt="Recipe image"
          />
         
        </div>
      ))}
    </div>
    </div>
  );
});

export default Recipes;
