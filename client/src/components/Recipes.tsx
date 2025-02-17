import { useState } from "react";
import axios from "axios";
const Recipes = function ({ recipes }: { recipes: any[] }) {

  const [isActive,setIsActive] = useState<boolean>(false);


  const saveRecipe =  async (recipe : any) => {

    setIsActive((prev) => !prev)
    console.log(recipe.name)
    console.log(recipe.ingredients)
    console.log(recipe.instructions)

      try {
    const response = await axios.post("http://localhost:3000/recipe-search/save-recipe", {
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    });
    console.log(response.data.message);
  } catch (error) {
    console.error("Error saving recipe:", error);
  }







  }


  return (
    <div className="w-full max-w-2xl mx-auto mt-4  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {recipes &&
        recipes.map((recipe: any,recipeIndex: number) => {
          return (
            <div key={recipeIndex}
             className="w-full rounded-lg p-8 bg-[#3A4A33] flex flex-col justify-center items-start gap-4 shadow-lg">
              <div className="text-4xl font-bold">{recipe.name}
                 <button className="ml-2" onClick={()=> saveRecipe(recipe)}>
                  {isActive ? <i className="fa-solid fa-bookmark"></i>  : <i className="fa-regular fa-bookmark"></i> }
                  </button> 
                  </div>
                  
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
