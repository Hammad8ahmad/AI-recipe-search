import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Context Setup
const RecipeContext = createContext<any>(null);

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [fetchedRecipe, setFetchedRecipe] = useState<any>(null); // Store latest fetched recipe
  const [isActive, setIsActive] = useState<any>({});
  const [NutritionAnalysis,setNutritionAnalysis] = useState<any>(null)
  



   const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/recipes");
        console.log("this is the data which is coming when we fetch the saved recipes : ",response.data)
        setSavedRecipes(response.data); // Set fetched recipes to state
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };
  

  // Fetch saved recipes on mount
  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  // Save Recipe
  const saveRecipe = async (recipe: any) => {
    // console.log("SAVED RECIPE OBJECT IN CONTEXT ----")
    // console.log(recipe.label)
    // console.log(recipe.ingredients.map(ingredient => ingredient.text))
    // console.log(recipe.calories);
    // console.log(recipe.images.SMALL.url)




    
try {
     await axios.post("http://localhost:3000/api/recipes", {
       label : recipe.label,
        ingredients:recipe.ingredients.map((ingredient : any) => ({
          text : ingredient.text,
        })),
        calories:recipe.calories,
        image_url:recipe.images.SMALL.url
       
      });

    // const savedRecipe = response.data    // Backend returns recipe with an id

    // setSavedRecipes((prev) => [...prev, savedRecipe]);
    await fetchSavedRecipes()            // Now it has an id!
  } catch (error) {
    console.error("Error saving recipe:", error);
  }



  };

  // Delete Recipe
  const deleteRecipe = async (id: any) => {
    try {
      await axios.delete(`http://localhost:3000/api/recipes/${id}`);
      // setSavedRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
      await fetchSavedRecipes()
    } catch (error) {
      console.log("Error deleting recipe:", error);
    }
  };

  // Testing ai handler

  const aiHandler = async(recipe:any) => {
    console.log("this is in the ai handler",recipe)
    try {
      const response = await axios.post("http://localhost:3000/api/open-ai",{
        recipe : recipe
      
    })
      console.log("THIS IS THE RESPONSE FROM AI ",response)
      setNutritionAnalysis(response.data)
    } catch (error) {
      
    }

  }

  return (
    <RecipeContext.Provider value={{ 
      savedRecipes, 
      saveRecipe, 
      deleteRecipe, 
      fetchedRecipe, 
      setFetchedRecipe,
      isActive,
      setIsActive,
      aiHandler,
      NutritionAnalysis,
      setNutritionAnalysis
    }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => useContext(RecipeContext);
