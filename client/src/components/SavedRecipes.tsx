import { useState } from 'react';
import { useRecipeContext } from '../context/RecipeContext';
import SavedRecipe from "./savedRecipes/SavedRecipe"

const SavedRecipes = () => {
  const { savedRecipes,deleteRecipe } = useRecipeContext();
  const [showDeleteToast,setShowDeleteToast] = useState<any>(null)


 const deleteHandler = async (id:any) => {
    setShowDeleteToast(true);
      setTimeout(() => setShowDeleteToast(false), 3000); 
    await deleteRecipe(id);
    
    
  }


  return (
    <div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-center text-black mb-6 mt-6">
        Saved Recipes
      </h1>
       {showDeleteToast && (
        <div className="fixed bottom-4 right-16 sm:right-8 md:right-6 z-50 bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl animate-fade-in-out flex items-center gap-2">
          <span className="font-medium">Recipe deleted successfully!</span>
        </div>
      )}
        
      

      {/* Saved recipes component  */}

      {savedRecipes && savedRecipes.length > 0 ? (
      
        <SavedRecipe deleteHandler={deleteHandler}/>
       
      ) : ( 
        <p className="text-gray-500 text-center mt-8">No saved recipes yet.</p>
     
      )}
    </div>
  );
};


export default SavedRecipes;


