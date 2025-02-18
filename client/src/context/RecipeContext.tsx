import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Context Setup
const RecipeContext = createContext<any>(null);

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [fetchedRecipe, setFetchedRecipe] = useState<any>(null); // Store latest fetched recipe
  const [items,setItems] = useState<any>("");


  // Fetch saved recipes on mount
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipe-search/saved-recipes");
        setSavedRecipes(response.data); // Set fetched recipes to state
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, [savedRecipes]);

  // Save Recipe
  const saveRecipe = async (recipe: any) => {
    
try {
    const response = await axios.post("http://localhost:3000/recipe-search/save-recipe", {
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      });

    const savedRecipe = response.data // Backend returns recipe with an id

    setSavedRecipes((prev) => [...prev, savedRecipe]); // Now it has an id!
  } catch (error) {
    console.error("Error saving recipe:", error);
  }



  };

  // Delete Recipe
  const deleteRecipe = async (id: any) => {
    try {
      await axios.delete(`http://localhost:3000/recipe-search/saved-recipe/${id}`);
      setSavedRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.log("Error deleting recipe:", error);
    }
  };

  return (
    <RecipeContext.Provider value={{ 
      savedRecipes, 
      saveRecipe, 
      deleteRecipe, 
      fetchedRecipe, 
      setFetchedRecipe,
      items,
      setItems
    }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => useContext(RecipeContext);
