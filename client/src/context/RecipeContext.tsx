import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

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

export const RecipeContext = createContext<RecipeContextType | null>(null);

const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [fetchedRecipe, setFetchedRecipe] = useState<any>(null);
  const [isActive, setIsActive] = useState<any>({});
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  const url = import.meta.env.VITE_PROD_URL + "/api";

  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const authHeaders = user?.token
    ? {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    : {};

  const fetchSavedRecipes = async () => {
    if (!user?.token) return;
    try {
      const response = await axios.get(`${url}/recipes`, authHeaders);
      setSavedRecipes(response.data);
    } catch (error) {
      console.error("Error fetching saved recipes:", error);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
     if (!user) {
      setFetchedRecipe(null);
      setIsActive({});
    }
  }, [user]);

  const saveRecipe = async (recipe: any) => {
    if (!user?.token) return;
    try {
      await axios.post(
        `${url}/recipes`,
        {
          label: recipe.label,
          ingredients: recipe.ingredients.map((ingredient: any) => ({
            text: ingredient.text,
          })),
          calories: recipe.calories,
          image_url: recipe.images.SMALL.url,
        },
        authHeaders
      );
      await fetchSavedRecipes();
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const deleteRecipe = async (id: any) => {
    if (!user?.token) return;
    try {
      await axios.delete(`${url}/recipes/${id}`, authHeaders);
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

export { RecipeProvider };
