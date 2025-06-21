import { useState } from "react";
import { useRecipeContext } from "../../context/RecipeContext";
import AiButtons from "./AiButtons";
import AiContent from "./AiContent";

const SavedRecipe = ({deleteHandler} : any) => {
  const [NutritionAnalysis, setNutritionAnalysis] = useState(null);
  const [recipeOptimization, setRecipeOptimization] = useState(null);
  const [recipeInstructions, setRecipeInstructions] = useState(null);
  const [activeFeature, setActiveFeature] = useState("");
  const { savedRecipes, analysisHandler, optimizationHandler, instructionsHandler } = useRecipeContext();

  const [activeRecipeId, setActiveRecipeId] = useState(null);
  const [loading, setLoading] = useState(false);

  

  const handleAnalysis = async (recipe:any) => {
    if (activeRecipeId === recipe.id && NutritionAnalysis) {
      setActiveFeature("analysis");
      return; // Skip refetch if data already exists
    }

    setLoading(true);
    setActiveFeature("analysis");
    setActiveRecipeId(recipe.id);

    const analysis = await analysisHandler(recipe);
    setNutritionAnalysis(analysis);

    setLoading(false);
  };

  const handleOptimization = async (recipe:any) => {
    if (activeRecipeId === recipe.id && recipeOptimization) {
      setActiveFeature("optimization");
      return;
    }

    setLoading(true);
    setActiveFeature("optimization");
    setActiveRecipeId(recipe.id);

    const optimization = await optimizationHandler(recipe);
    setRecipeOptimization(optimization);

    setLoading(false);
  };

  const handleInstructions = async (recipe:any) => {
    if (activeRecipeId === recipe.id && recipeInstructions) {
      setActiveFeature("instructions");
      return;
    }

    setLoading(true);
    setActiveFeature("instructions");
    setActiveRecipeId(recipe.id);

    const instructions = await instructionsHandler(recipe);
    setRecipeInstructions(instructions);

    setLoading(false);
  };

  return (
    <>
      <div className="w-full max-w-4xl grid grid-col-1 px-2 mx-auto mt-4 gap-4">
        {savedRecipes.map((recipe:any) => (
          <div
            key={recipe.id}
            className="relative w-full rounded-lg p-8 bg-[#3A4A33] shadow-lg flex flex-col items-center text-center"
          >
            <h1 className="text-4xl text-[#fefae0] font-mono font-light mb-4">
              {recipe.label}
            </h1>
            <div className="ingredients w-full flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-2 text-[#333333]">
                Ingredients
              </h2>
              <ul className="list-disc text-[#fefae0] pl-5 text-left">
                {recipe.ingredients.map((ingredient:any) => (
                  <li key={ingredient.text} className="pt-2">
                    {ingredient.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-white text-xl mt-4 font-mono font-extralight mb-4">
              Calories: {Math.round(recipe.calories)}
            </div>
            <img
              className="rounded-full w-[150px] h-[150px] border border-black object-cover mb-4"
              src={recipe.image_url}
              alt="Recipe image"
            />
            <div className="text-[#333333] text-sm font-bold px-2 py-2 bg-[#A0B56D] mb-2 italic mt-2">
                These features are powered by AI and may take a few seconds to load or occasionally produce inaccurate results.
            </div>
            <AiButtons
              recipe={recipe}
              handleAnalysis={handleAnalysis}
              handleOptimization={handleOptimization}
              handleInstructions={handleInstructions}
            />
            {activeRecipeId === recipe.id && (
              <AiContent
                loading={loading}
                NutritionAnalysis={NutritionAnalysis}
                recipeOptimization={recipeOptimization}
                recipeInstructions={recipeInstructions}
                activeFeature={activeFeature}
              />
            )}
            <div className="flex justify-end items-end w-full mt-auto pt-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 active:scale-95 transition-all duration-200 ease-in-out"
                onClick={() => deleteHandler(recipe.id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      
    </>
  );
};



export default SavedRecipe;