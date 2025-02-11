const Recipes = function ({ recipes }: { recipes: any[] }) {


  return (
    <div className="w-full max-w-6xl mx-auto mt-12 grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {recipes &&
        recipes.map((recipe: any,recipeIndex: number) => {
          return (
            <div key={recipeIndex}
             className="w-full rounded-xl p-8 bg-[#3A4A33] flex flex-col gap-4 shadow-lg">
              <div className="text-4xl font-bold">{recipe.recipeName}</div>
              {/* Ingredients Section */}
              <div className="ingredients pt-4">
                <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                <ul className="list-inside list-disc space-y-3 text-[#333333]">
                  {recipe.ingredients.map(
                    (ingredient: string, index: number) => {
                      return (
                        <li
                          key={index}
                          className="text-lg text-[#333333] flex items-center gap-2"
                        >
                          {ingredient}
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>

              {/* Instructions Section */}
              <div className="instructions pt-4 text-[#333333]">
                <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                <div className="space-y-5">
                  {recipe.instructions.map(
                    (instruction: string, index: number) => {
                      return (
                        <p key={index}>
                          <span className="mr-2 font-bold">{index + 1}.</span>{" "}
                          {instruction}
                        </p>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Recipes;
