import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Context Setup
type RecipeContextType = {
  savedRecipes: any[];
  saveRecipe: (recipe: any) => Promise<void>;
  deleteRecipe: (id: any) => Promise<void>;
  showDeleteToast: boolean;
  setShowDeleteToast: (value: boolean) => void;
  fetchedRecipe: any;
  setFetchedRecipe: (recipe: any) => void;
  isActive: any;
  setIsActive: (value: any) => void;
  analysisHandler: (recipe: any) => Promise<any>;
  optimizationHandler: (recipe: any) => Promise<any>;
  instructionsHandler: (recipe: any) => Promise<any>;
};

const RecipeContext = createContext<RecipeContextType | null>(null);

   const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [fetchedRecipe, setFetchedRecipe] = useState<any>(null);
  const [isActive, setIsActive] = useState<any>({});
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  const url = import.meta.env.VITE_PROD_URL + "/api";

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get(`${url}/recipes`);
      setSavedRecipes(response.data);
    } catch (error) {
      console.error("Error fetching saved recipes:", error);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipe: any) => {
    try {
      await axios.post(`${url}/recipes`, {
        label: recipe.label,
        ingredients: recipe.ingredients.map((ingredient: any) => ({
          text: ingredient.text,
        })),
        calories: recipe.calories,
        image_url: recipe.images.SMALL.url,
      });
      await fetchSavedRecipes();
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const deleteRecipe = async (id: any) => {
    try {
      await axios.delete(`${url}/recipes/${id}`);
      setSavedRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const analysisHandler = async (recipe: any) => {
    try {
      const response = await axios.post(`${url}/analysis`, { recipe });
      return response.data;
    } catch (error) {
      console.error("Error analyzing recipe:", error);
    }
  };

  const optimizationHandler = async (recipe: any) => {
    try {
      const response = await axios.post(`${url}/optimization`, { recipe });
      return response.data;
    } catch (error) {
      console.error("Error optimizing recipe:", error);
    }
  };

  const instructionsHandler = async (recipe: any) => {
    try {
      const response = await axios.post(`${url}/instructions`, { recipe });
      return response.data;
    } catch (error) {
      console.error("Error fetching instructions:", error);
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        savedRecipes,
        saveRecipe,
        deleteRecipe,
        showDeleteToast,
        setShowDeleteToast,
        fetchedRecipe,
        setFetchedRecipe,
        isActive,
        setIsActive,
        analysisHandler,
        optimizationHandler,
        instructionsHandler,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipeContext must be used within a RecipeProvider");
  }
  return context;
};

export { RecipeProvider, useRecipeContext };