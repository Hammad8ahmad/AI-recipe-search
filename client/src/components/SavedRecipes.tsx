import { useEffect, useState } from "react";
import axios from "axios";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);

  useEffect(() => {
    console.log("Fetching saved recipes...")
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipe-search/saved-recipes");
        setSavedRecipes(response.data); // Already parsed response
        console.log(response.data)
        
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
  <>
  <h1 className="text-5xl block font-mono font-bold mb-4 mt-4  text-center ">Saved Recipes</h1>
    <div className="w-full  grid grid-cols-2 mx-auto mt-4">
      

      {savedRecipes.length > 0 ? (
        savedRecipes.map((recipe) => (
          <div key={recipe.id} className="w-full rounded-lg p-6 bg-[#3A4A33] text-[#fefae0] shadow-lg mb-4">
            <h2 className="text-4xl font-semibold">{recipe.name}</h2>

            {/* Ingredients */}
            <div className="pt-4">
              <h3 className="text-2xl font-semibold text-[#333333]">Ingredients</h3>
              <ul className="list-disc pl-5">
                {recipe.ingredients.map((ingredient: string, index: number) => (
                  <li className="pt-4" key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="pt-4">
              <h3 className="text-2xl font-semibold text-[#333333]">Instructions</h3>
              <ol className="list-decimal pt-4 pl-5">
                {recipe.instructions.map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No saved recipes yet.</p>
      )}
    </div>
    </>
  );
};

export default SavedRecipes;
