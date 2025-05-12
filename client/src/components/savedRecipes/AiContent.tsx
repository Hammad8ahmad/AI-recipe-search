const AiContent = ({ loading, NutritionAnalysis, recipeOptimization, activeFeature, recipeInstructions }: any) => {
  return (
    <div>
      {loading ? (
        <div className="flex mt-6 justify-center items-center space-x-2">
          <span className="w-3 h-3 bg-[#a0b56d] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-3 h-3 bg-[#a0b56d] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-3 h-3 bg-[#a0b56d] rounded-full animate-bounce"></span>
        </div>
      ) : (
        <div>
          {NutritionAnalysis && activeFeature === "analysis" && (
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-20">
              <div>
                <h3 className="text-2xl sm:text-3xl text-[#333333] px-4 py-2 bg-[#a0b56d] mt-4 font-semibold mb-2">Macros</h3>
                <ul className="list-disc text-lg text-left space-y-1">
                  <li>Carbs: {NutritionAnalysis.macros.carbohydrates}g</li>
                  <li>Protein: {NutritionAnalysis.macros.protein}g</li>
                  <li>Fat: {NutritionAnalysis.macros.fat}g</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl text-[#333333] px-4 py-2 bg-[#a0b56d] mt-4 font-semibold mb-2">Micronutrients</h3>
                <h4 className="text-xl text-[#333333] bg-[#a0b56d] font-semibold mt-4 mb-2">Minerals</h4>
                <ul className="list-disc text-lg text-left space-y-1">
                  {NutritionAnalysis.micronutrients.minerals.map((item: any, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h4 className="text-xl text-[#333333] bg-[#a0b56d] font-semibold mt-4 mb-2">Vitamins</h4>
                <ul className="list-disc text-lg text-left space-y-1">
                  {NutritionAnalysis.micronutrients.vitamins.map((item: any, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {recipeOptimization && activeFeature === "optimization" && (
            <>
              <h3 className="text-2xl sm:text-3xl text-center mt-4 font-semibold bg-[#a0b56d] mb-2">Cooking Tips</h3>
              <ol className="list-decimal text-lg ml-4 sm:ml-6 text-left space-y-1">
                {recipeOptimization.cooking_tips.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
              <h3 className="text-2xl sm:text-3xl text-center mt-4 font-semibold bg-[#a0b56d] mb-2">Health Tips</h3>
              <ol className="list-decimal text-lg ml-4 sm:ml-6 text-left space-y-1 ">
                {recipeOptimization.health_tips.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </>
          )}

          {recipeInstructions && activeFeature === "instructions" && (
            <>
              <h3 className="text-2xl sm:text-3xl mt-4 font-semibold bg-[#a0b56d] mb-4">Cooking Instructions</h3>
              <ol className="list-decimal text-lg ml-4 text-left space-y-1 sm:ml-6 ">
                {recipeInstructions.simplified_instructions.map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <h4 className="text-xl bg-[#A0B56D] text-[#333333] sm:text-2xl font-mono mt-4">Time Estimate: {recipeInstructions.time_estimate}</h4>
            </>
          )}

          {!NutritionAnalysis && !recipeOptimization && !recipeInstructions && (
            <div className="mt-6 px-4 py-2 text-[#333333] bg-[#A0B56D] text-center">API limit reached.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AiContent;
