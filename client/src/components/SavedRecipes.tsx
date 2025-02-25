import { useRecipeContext } from "../context/RecipeContext";

const SavedRecipes = () => {
  const { savedRecipes, deleteRecipe,aiHandler,NutritionAnalysis} = useRecipeContext();
  console.log("Saved recipes check:", savedRecipes);
  console.log("NUTRITIONAL ANALYSIS",NutritionAnalysis)

  

  return (
    <>
      <h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-center text-black mb-6 mt-6"
      >
        Saved Recipes
      </h1>

      {savedRecipes.length > 0 ? (
        <div className="w-full grid grid-cols-2 px-2 mx-auto mt-4 gap-4">
          {savedRecipes.map((recipe: any) => (
            <div
              key={recipe.id}
              className="relative w-full rounded-lg p-8 bg-[#3A4A33] shadow-lg flex flex-col items-center text-center"
            >
              {/* Recipe title */}
              <h1 className="text-4xl font-mono font-light mb-4">
                {recipe.label}
              </h1>

              {/* Ingredients list */}
              <div className="ingredients w-full flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-2 text-[#333333]">
                  Ingredients
                </h2>
                <ul className="list-disc text-[#fefae0] pl-5 text-left">
                  {recipe.ingredients.map((ingredient: any, index: number) => (
                    <li className="pt-2" key={index}>
                      {ingredient.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Calories */}
              <div className="text-white text-xl mt-4 font-mono font-extralight mb-4">
                Calories: {Math.round(recipe.calories)}
              </div>

              {/* Recipe image */}
              <img
                className="rounded-full w-[150px] h-[150px] border border-black object-cover mb-4"
                src={recipe.image_url}
                alt="Recipe image"
              />
              {/* AI Button */}
              <button
              onClick={() =>  aiHandler(recipe)}
              className="relative px-4 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 ease-in-out">
               <span className="absolute inset-0 bg-white opacity-30 blur-md rounded-lg"></span>
               <span className="relative z-10">✨ Nutrition Insights</span>
              </button>
              {/* AI TEST */}
              {NutritionAnalysis && NutritionAnalysis.health_benefits.map((item : any) => {
                return <div>{item}</div>
              })}



              {/* Delete Button */}
              <div className="mt-auto flex justify-end pt-4">
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
      ) : (
        <p className="text-gray-500 text-center mt-8">
          No saved recipes yet.
        </p>
      )}
    </>
  );
};

export default SavedRecipes;

////////////////////
// UPDATED STYLESSSS 
////////////////////


// import { useState } from "react";
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
