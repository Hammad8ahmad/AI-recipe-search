// const AiContent = ({loading,NutritionAnalysis,recipeOptimization,recipeInstructions} : any) =>  {


// return <>
//  <div>
//                   {loading ? (
//                     <div className="flex mt-6 justify-center items-center space-x-2">
//                       <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
//                       <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
//                       <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"></span>
//                     </div>
//                   ) : 
//                     <div>
//                      {NutritionAnalysis ? (
//                       <>
//                       <h3 className="text-2xl font-semibold underline decoration-amber-400 mb-2">Macros</h3>
//                       <ul className="list-disc pl-6 text-lg space-y-2">
//                         <li>Carbs: <span className="font-bold text-amber-300">{NutritionAnalysis.macros.carbohydrates}</span></li>
//                         <li>Protein: <span className="font-bold text-amber-300">{NutritionAnalysis.macros.protein}</span></li>
//                         <li>Fat: <span className="font-bold text-amber-300">{NutritionAnalysis.macros.fat}</span></li>
//                       </ul>
//                       </>) : <div className='mt-6 px-4 py-2 text-black bg-blue-400'>API LIMIT REACHED :(</div>}
//                     </div>
//                   }
//                   {recipeOptimization && (
//                   <>
//                     <h3 className="text-2xl font-semibold underline decoration-green-400 mb-2">Optimized Recipe</h3>
//                     <p className="text-lg">{recipeOptimization.suggestions}</p>
//                   </>
//                    )}
//                     {recipeInstructions && (
//                   <>
//                     <h3 className="text-2xl font-semibold underline decoration-blue-400 mb-2">Cooking Instructions</h3>
//                      <ol className="list-decimal pl-6 text-lg space-y-2">
//                       {recipeInstructions.simplified_instructions.map((step: string, index: number) => (
//                        <li key={index}>{step}</li>
//                            ))}
//                     </ol>
//                    <h4 className="text-xl mt-4">Time Estimate: {recipeInstructions.time_estimate}</h4>
//                     </>
//           )}
//                 </div>
                
// </>

// }
// export default AiContent

const AiContent = ({ loading, NutritionAnalysis, recipeOptimization, recipeInstructions }: any) => {
  return (
    <div>
      {loading ? (
        <div className="flex mt-6 justify-center items-center space-x-2">
          <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"></span>
        </div>
      ) : (
        <div>
          {NutritionAnalysis && (
            <>
              <h3 className="text-2xl font-semibold underline decoration-amber-400 mb-2">Macros</h3>
              <ul className="list-disc pl-6 text-lg space-y-2">
                <li>Carbs: <span className="font-bold text-amber-300">{NutritionAnalysis.macros.carbohydrates}</span></li>
                <li>Protein: <span className="font-bold text-amber-300">{NutritionAnalysis.macros.protein}</span></li>
                <li>Fat: <span className="font-bold text-amber-300">{NutritionAnalysis.macros.fat}</span></li>
              </ul>
            </>
          )}

          {recipeOptimization && (
            <>
              <h3 className="text-2xl font-semibold underline decoration-green-400 mb-2">Optimized Recipe</h3>
              <p className="text-lg">{recipeOptimization.suggestions}</p>
            </>
          )}

          {recipeInstructions && (
            <>
              <h3 className="text-2xl font-semibold underline decoration-blue-400 mb-2">Cooking Instructions</h3>
              <ol className="list-decimal pl-6 text-lg space-y-2">
                {recipeInstructions.simplified_instructions.map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <h4 className="text-xl mt-4">Time Estimate: {recipeInstructions.time_estimate}</h4>
            </>
          )}

          {!NutritionAnalysis && !recipeOptimization && !recipeInstructions && (
            <div className="mt-6 px-4 py-2 text-black bg-blue-400">API LIMIT REACHED :(</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AiContent;
