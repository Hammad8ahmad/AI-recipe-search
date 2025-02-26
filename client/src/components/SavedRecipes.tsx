import { useRecipeContext } from '../context/RecipeContext';
import SavedRecipe from './savedRecipes/savedRecipe';

const SavedRecipes = () => {
  const { savedRecipes } = useRecipeContext();
 



  return (
    <div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-center text-black mb-6 mt-6">
        Saved Recipes
      </h1>

      {/* Saved recipes component  */}

      {savedRecipes.length > 0 ? (
        <SavedRecipe/>
       
      ) : (
        <p className="text-gray-500 text-center mt-8">No saved recipes yet.</p>
      )}
    </div>
  );
};

export default SavedRecipes;


////////////////////
// UPDATED STYLESSSS 
////////////////////


//  import { useState } from "react";
//  import { useRecipeContext } from "../context/RecipeContext";

// const SavedRecipes = () => {
//   const { savedRecipes, deleteRecipe, aiHandler, NutritionAnalysis } = useRecipeContext();
//   const [activeRecipeId, setActiveRecipeId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleAiClick = async (recipe: any) => {
//     setActiveRecipeId(recipe.id);
//     setLoading(true);
//     await aiHandler(recipe);
//     setLoading(false);
//   };

//   return (
//     <>
//       <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-gray-900 mb-10 mt-8 tracking-wide">
//         Saved Recipes
//       </h1>

//       {savedRecipes.length > 0 ? (
//         <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-col-3 gap-6 px-4">
//           {savedRecipes.map((recipe: any) => (
//             <div
//               key={recipe.id}
//               className="bg-gradient-to-br from-[#3A4A33] to-[#2C3A27] rounded-2xl p-8 shadow-lg text-white "
//             >
//               <h1 className="text-3xl font-bold mb-4 text-amber-400">
//                 {recipe.label}
//               </h1>

//               <div className="border-t border-amber-400 pt-4">
//                 <h2 className="text-xl font-medium mb-3">Ingredients</h2>
//                 <ul className="list-disc pl-5 space-y-1">
//                   {recipe.ingredients.map((ingredient: any, index: number) => (
//                     <li key={index}>{ingredient.text}</li>
//                   ))}
//                 </ul>
//               </div>

//               <p className="mt-4 text-lg font-light">
//                 <span className="font-semibold text-amber-400">Calories:</span> {Math.round(recipe.calories)}
//               </p>

//               <img
//                 src={recipe.image_url}
//                 alt="Recipe image"
//                 className="w-36 h-36 rounded-full border-4 border-amber-400 object-cover mt-4 mx-auto"
//               />

//               <button
//                 onClick={() => handleAiClick(recipe)}
//                 className="mt-6 px-5 py-3 max-w-xl bg-amber-500 rounded-lg text-lg font-semibold hover:bg-amber-600 transition-all duration-300"
//               >
//                 ✨ Nutrition Insights
//               </button>

//               {activeRecipeId === recipe.id && (
//   <div className="mt-6 p-6 rounded-lg bg-[#2c3e50] text-white shadow-md">
//     {loading ? (
//       <div className="flex justify-center items-center space-x-2">
//         <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
//         <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
//         <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"></span>
//       </div>
//     ) : (
//       <>
//         <h2 className="text-3xl font-extrabold border-t-2 border-amber-400 pt-4 mb-6 text-center tracking-wider">
//           Nutrition Insights 🍽️
//         </h2>

//         <div className="space-y-6">
//           {/* Macros */}
//           <div>
//             <h3 className="text-2xl font-semibold underline decoration-amber-400 mb-2">
//               Macros
//             </h3>
//             <ul className="list-disc pl-6 text-lg space-y-2">
//               <li>Carbs: <span className="font-bold text-amber-300">{NutritionAnalysis.macros.carbohydrates}</span></li>
//               <li>Protein: <span className="font-bold text-amber-300">{NutritionAnalysis.macros.protein}</span></li>
//               <li>Fat: <span className="font-bold text-amber-300">{NutritionAnalysis.macros.fat}</span></li>
//             </ul>
//           </div>

//           {/* Micronutrients */}
//           <div>
//             <h3 className="text-2xl font-semibold underline decoration-amber-400 mb-2">
//               Micronutrients
//             </h3>
//             <ul className="list-disc pl-6 text-lg space-y-2">
//               <li>Vitamins: <span className="font-bold text-amber-300">{NutritionAnalysis.micronutrients.vitamins.join(", ")}</span></li>
//               <li>Minerals: <span className="font-bold text-amber-300">{NutritionAnalysis.micronutrients.minerals.join(", ")}</span></li>
//             </ul>
//           </div>

//           {/* Health Benefits */}
//           {NutritionAnalysis.health_benefits && (
//             <div>
//               <h3 className="text-2xl font-semibold underline decoration-amber-400 mb-2">
//                 Health Benefits
//               </h3>
//               <ul className="list-disc pl-6 text-lg space-y-2">
//                 {NutritionAnalysis.health_benefits.map((benefit: string, index: number) => (
//                   <li key={index} className="text-amber-300">{benefit}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </>
//     )}
//   </div>
// )}


//               <button
//                 onClick={() => deleteRecipe(recipe.id)}
//                 className="mt-4 px-4 py-2 right-2 bottom-2 bg-red-600 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all duration-300"
//               >
//                 🗑 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 text-center text-lg mt-12">
//           No saved recipes yet.
//         </p>
//       )}
//     </>
//   );
// };

// export default SavedRecipes;
