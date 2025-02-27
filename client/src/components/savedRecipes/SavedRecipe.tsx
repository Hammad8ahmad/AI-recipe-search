import { useState } from "react";
import { useRecipeContext } from "../../context/RecipeContext";
import AiButtons from "./AiButtons";
import AiContent from "./AiContent";


const SavedRecipe = () => {
  const [NutritionAnalysis,setNutritionAnalysis] = useState<any>(null)
  const [recipeOptimization,setRecipeOptimization] = useState<any>(null)
  const [recipeInstructions,setRecipeInstructions] = useState<any>(null)
  const [activeFeature,setActiveFeature] = useState<String>("")
const { savedRecipes, deleteRecipe,analysisHandler,
        optimizationHandler,instructionsHandler,} = useRecipeContext();

const [activeRecipeId, setActiveRecipeId] = useState(null);
const [loading, setLoading] = useState(false);''

const handleAnalysis = async (recipe: any) => {
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

const handleOptimization = async (recipe: any) => {
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

const handleInstructions = async (recipe: any) => {
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

    return <>

    <div className="w-full  grid grid-cols- px-2 mx-auto mt-4 gap-4">
          {savedRecipes.map((recipe : any) => (
            <div
              key={recipe.id}
              className="relative w-full rounded-lg p-8 bg-[#3A4A33] shadow-lg flex flex-col items-center text-center"
            >
              <h1 className="text-4xl font-mono font-light mb-4">{recipe.label}</h1>
              <div className="ingredients w-full flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-2 text-[#333333]">Ingredients</h2>
                <ul className="list-disc text-[#fefae0] pl-5 text-left">
                  {recipe.ingredients.map((ingredient : any ) => (
                    <li className="pt-2" >{ingredient.text}</li>
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

              {/* AI Buttons */}

              <AiButtons
            recipe={recipe}
            handleAnalysis={handleAnalysis}
            handleOptimization={handleOptimization}
            handleInstructions={handleInstructions}
          />

              {/* AI Content*/}

              {activeRecipeId === recipe.id && (
                <AiContent
                loading={loading}
                NutritionAnalysis={NutritionAnalysis}
                recipeOptimization={recipeOptimization}
                recipeInstructions={recipeInstructions}
                activeFeature={activeFeature}
                />
                
              )}

              <div className="mt-auto absolute bottom-4 right-4 pt-4">
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
    
    </>
}
export default SavedRecipe;