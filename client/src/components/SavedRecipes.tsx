import { useEffect, useState } from "react";
import axios from "axios";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);

  useEffect(() => {
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
    <div className="w-full max-w-2xl mx-auto mt-4">
      <h1 className="text-3xl font-bold mb-6 ">Saved Recipes</h1>

      {savedRecipes.length > 0 ? (
        savedRecipes.map((recipe) => (
          <div key={recipe.id} className="w-full rounded-lg p-6 bg-[#3A4A33] text-[#fefae0] shadow-lg mb-4">
            <h2 className="text-4xl font-semibold">{recipe.name}</h2>

            {/* Ingredients */}
            <div className="pt-4">
              <h3 className="text-2xl font-semibold">Ingredients</h3>
              <ul className="list-disc pl-5">
                {recipe.ingredients.map((ingredient: string, index: number) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="pt-4">
              <h3 className="text-2xl font-semibold">Instructions</h3>
              <ol className="list-decimal pl-5">
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
  );
};

export default SavedRecipes;
